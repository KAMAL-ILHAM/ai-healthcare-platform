import type { UIMessage } from 'ai';

type ChatAttachment = {
  fileType: 'IMAGE' | 'PDF' | 'WORD';
  fileName: string;
  fileUrl: string;
  extractedText: string | null;
};

export {
  AI_CONFIG,
  getAIProvider,
  getAIModel,
  getAIAbortSignal,
  isAIConfigured,
} from '@/lib/ai-config';

export {
  parseAIError,
  logAIError,
  getFriendlyChatError,
  type ParsedAIError,
  type AIErrorCode,
} from '@/lib/ai-errors';

export {
  createFallbackStreamResponse,
  getTextFromUIMessage,
  writeFallbackText,
} from '@/lib/ai-fallback-stream';

function inferImageMediaType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'jpg':
    case 'jpeg':
    default:
      return 'image/jpeg';
  }
}

export function buildPromptWithAttachment(
  basePrompt: string,
  attachment: ChatAttachment | null,
): string {
  if (!attachment) return basePrompt;

  if (attachment.fileType === 'IMAGE') {
    return `${basePrompt}

[LAMPIRAN GAMBAR MEDIS]
Nama file: ${attachment.fileName}
URL: ${attachment.fileUrl}

Analisis gambar medis berdasarkan pertanyaan user. Jika informasi visual tidak cukup, jelaskan keterbatasan dan minta detail tambahan.`;
  }

  if (attachment.extractedText) {
    return `${basePrompt}

[REFERENSI DOKUMEN DARI USER]:
"${attachment.extractedText}"

Gunakan dokumen di atas sebagai konteks utama untuk menjawab pertanyaan user saat ini.`;
  }

  return basePrompt;
}

export function applyAttachmentToMessages(
  uiMessages: UIMessage[],
  attachment: ChatAttachment | null,
): UIMessage[] {
  if (!attachment || attachment.fileType !== 'IMAGE') {
    return uiMessages;
  }

  const messages = [...uiMessages];
  const lastIndex = messages.length - 1;
  const lastMessage = messages[lastIndex];

  if (!lastMessage || lastMessage.role !== 'user') {
    return messages;
  }

  messages[lastIndex] = {
    ...lastMessage,
    parts: [
      ...lastMessage.parts,
      {
        type: 'file',
        mediaType: inferImageMediaType(attachment.fileName),
        filename: attachment.fileName,
        url: attachment.fileUrl,
      },
    ],
  };

  return messages;
}
