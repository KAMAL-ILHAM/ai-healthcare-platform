import { createGroq } from '@ai-sdk/groq';

// Menggunakan model Llama 3 70B yang sangat cerdas untuk logika farmasi/medis
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const DEFAULT_TIMEOUT_MS = 60_000;

export const AI_CONFIG = {
  provider: 'groq' as const,
  // Otomatis mencari GROQ_API_KEY di file .env
  apiKey: process.env.GROQ_API_KEY?.trim(),
  model: process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL,
  timeoutMs: Number(process.env.GROQ_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS,
};

export function getAIApiKey(): string | undefined {
  const apiKey = AI_CONFIG.apiKey;
  if (!apiKey) return undefined;
  return apiKey;
}

export function isAIConfigured(): boolean {
  return Boolean(getAIApiKey());
}

let cachedProvider: ReturnType<typeof createGroq> | null = null;

export function getAIProvider() {
  const apiKey = getAIApiKey();

  if (!apiKey) {
    console.error('[AI_CONFIG] GROQ_API_KEY kosong atau tidak ditemukan di environment.');
    throw new Error('AI_API_KEY_MISSING');
  }

  if (!cachedProvider) {
    // Menginisialisasi koneksi ke server Groq
    cachedProvider = createGroq({
      apiKey,
    });

    console.info('[AI_CONFIG] Groq provider siap.', {
      provider: AI_CONFIG.provider,
      model: AI_CONFIG.model,
      timeoutMs: AI_CONFIG.timeoutMs,
      keyPrefix: `${apiKey.slice(0, 4)}...`,
    });
  }

  return cachedProvider;
}

export function getAIModel() {
  return getAIProvider()(AI_CONFIG.model);
}

export function getAIAbortSignal(): AbortSignal {
  return AbortSignal.timeout(AI_CONFIG.timeoutMs);
}