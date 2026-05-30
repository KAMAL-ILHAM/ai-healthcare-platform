import {
  APICallError,
  LoadAPIKeyError,
  NoSuchModelError,
} from 'ai';

export type AIErrorCode =
  | 'missing_api_key'
  | 'invalid_api_key'
  | 'insufficient_quota'
  | 'rate_limit_exceeded'
  | 'model_not_found'
  | 'timeout'
  | 'provider_unavailable'
  | 'unknown';

export type ParsedAIError = {
  code: AIErrorCode;
  userMessage: string;
  statusCode: number;
  logMessage: string;
};

const USER_MESSAGES: Record<AIErrorCode, string> = {
  missing_api_key:
    'Layanan AI sedang tidak tersedia karena konfigurasi API belum lengkap. Silakan hubungi administrator.',
  invalid_api_key:
    'Layanan AI sedang tidak tersedia karena kredensial API tidak valid. Silakan hubungi administrator.',
  insufficient_quota:
    'Layanan AI sedang tidak tersedia karena quota API telah habis. Silakan hubungi administrator.',
  rate_limit_exceeded:
    'Layanan AI sedang sibuk karena batas permintaan tercapai. Silakan coba lagi dalam beberapa saat.',
  model_not_found:
    'Layanan AI sedang tidak tersedia karena model AI tidak ditemukan. Silakan hubungi administrator.',
  timeout:
    'Layanan AI membutuhkan waktu terlalu lama untuk merespons. Silakan coba lagi.',
  provider_unavailable:
    'Layanan AI sedang tidak tersedia saat ini. Silakan coba lagi nanti.',
  unknown:
    'Layanan AI sedang tidak tersedia. Silakan coba lagi nanti atau hubungi administrator.',
};

function mapProviderCode(rawCode: string | undefined): AIErrorCode {
  switch (rawCode) {
    case 'missing_api_key':
    case 'invalid_api_key':
    case 'insufficient_quota':
    case 'rate_limit_exceeded':
    case 'model_not_found':
    case 'timeout':
    case 'provider_unavailable':
      return rawCode;
    default:
      return 'unknown';
  }
}

function parseProviderResponseBody(responseBody?: string): {
  code?: string;
  message?: string;
} {
  if (!responseBody) return {};

  try {
    const parsed = JSON.parse(responseBody) as {
      error?: { code?: string; type?: string; message?: string };
    };
    return {
      code: parsed.error?.code ?? parsed.error?.type,
      message: parsed.error?.message,
    };
  } catch {
    return {};
  }
}

function inferCodeFromStatus(statusCode?: number, rawCode?: string): AIErrorCode {
  const mapped = mapProviderCode(rawCode);
  if (mapped !== 'unknown') return mapped;

  if (statusCode === 401) return 'invalid_api_key';
  if (statusCode === 429) return 'rate_limit_exceeded';
  if (statusCode === 404) return 'model_not_found';
  if (statusCode === 402) return 'insufficient_quota';
  if (statusCode === 408) return 'timeout';
  if (statusCode === 502 || statusCode === 503 || statusCode === 504) {
    return 'provider_unavailable';
  }

  return 'unknown';
}

function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      error.name === 'AbortError' ||
      error.name === 'TimeoutError' ||
      message.includes('timeout') ||
      message.includes('timed out') ||
      message.includes('aborted')
    );
  }
  return false;
}

function isProviderUnavailableError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('fetch failed') ||
      message.includes('network') ||
      message.includes('econnrefused') ||
      message.includes('enotfound') ||
      message.includes('service unavailable')
    );
  }
  return false;
}

export function parseAIError(error: unknown): ParsedAIError {
  if (LoadAPIKeyError.isInstance(error)) {
    return {
      code: 'missing_api_key',
      userMessage: USER_MESSAGES.missing_api_key,
      statusCode: 503,
      logMessage: error.message,
    };
  }

  if (NoSuchModelError.isInstance(error)) {
    return {
      code: 'model_not_found',
      userMessage: USER_MESSAGES.model_not_found,
      statusCode: 404,
      logMessage: `Model tidak ditemukan: ${error.modelId}`,
    };
  }

  if (isTimeoutError(error)) {
    return {
      code: 'timeout',
      userMessage: USER_MESSAGES.timeout,
      statusCode: 408,
      logMessage: error instanceof Error ? error.message : 'Request timeout',
    };
  }

  if (isProviderUnavailableError(error)) {
    return {
      code: 'provider_unavailable',
      userMessage: USER_MESSAGES.provider_unavailable,
      statusCode: 503,
      logMessage: error instanceof Error ? error.message : 'Provider unavailable',
    };
  }

  if (APICallError.isInstance(error)) {
    const body = parseProviderResponseBody(error.responseBody);
    const code = inferCodeFromStatus(error.statusCode, body.code);

    return {
      code,
      userMessage: USER_MESSAGES[code],
      statusCode: error.statusCode ?? 502,
      logMessage: body.message ?? error.message,
    };
  }

  if (error instanceof Error) {
    const normalized = error.message.toLowerCase();

    if (normalized.includes('ai_api_key_missing')) {
      return {
        code: 'missing_api_key',
        userMessage: USER_MESSAGES.missing_api_key,
        statusCode: 503,
        logMessage: error.message,
      };
    }

    if (normalized.includes('insufficient_quota') || normalized.includes('insufficient balance')) {
      return {
        code: 'insufficient_quota',
        userMessage: USER_MESSAGES.insufficient_quota,
        statusCode: 402,
        logMessage: error.message,
      };
    }

    if (normalized.includes('invalid_api_key') || normalized.includes('authentication')) {
      return {
        code: 'invalid_api_key',
        userMessage: USER_MESSAGES.invalid_api_key,
        statusCode: 401,
        logMessage: error.message,
      };
    }

    if (normalized.includes('rate_limit') || normalized.includes('rate limit')) {
      return {
        code: 'rate_limit_exceeded',
        userMessage: USER_MESSAGES.rate_limit_exceeded,
        statusCode: 429,
        logMessage: error.message,
      };
    }

    if (normalized.includes('model_not_found') || normalized.includes('does not exist')) {
      return {
        code: 'model_not_found',
        userMessage: USER_MESSAGES.model_not_found,
        statusCode: 404,
        logMessage: error.message,
      };
    }
  }

  return {
    code: 'unknown',
    userMessage: USER_MESSAGES.unknown,
    statusCode: 500,
    logMessage: error instanceof Error ? error.message : 'Unknown AI provider error',
  };
}

export function logAIError(
  context: string,
  parsed: ParsedAIError,
  rawError: unknown,
): void {
  const details: Record<string, unknown> = {
    context,
    provider: 'deepseek',
    code: parsed.code,
    statusCode: parsed.statusCode,
    logMessage: parsed.logMessage,
    timestamp: new Date().toISOString(),
  };

  if (APICallError.isInstance(rawError)) {
    details.url = rawError.url;
    details.responseStatus = rawError.statusCode;
    details.responseBody = rawError.responseBody;
    details.isRetryable = rawError.isRetryable;
  }

  if (rawError instanceof Error) {
    details.errorName = rawError.name;
    details.errorMessage = rawError.message;
  }

  console.error('[AI_ERROR]', details);
}

export function getFriendlyChatError(error: Error): string {
  return parseAIError(error).userMessage;
}
