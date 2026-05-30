import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
  type UIMessageStreamWriter,
} from 'ai';

export function getTextFromUIMessage(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n');
}

export function writeFallbackText(
  writer: UIMessageStreamWriter<UIMessage>,
  text: string,
): void {
  const id = 'fallback-response';

  writer.write({ type: 'text-start', id });
  writer.write({ type: 'text-delta', id, delta: text });
  writer.write({ type: 'text-end', id });
}

type FallbackStreamOptions = {
  message: string;
  originalMessages: UIMessage[];
  onAssistantMessage?: (text: string) => Promise<void>;
};

export function createFallbackStreamResponse({
  message,
  originalMessages,
  onAssistantMessage,
}: FallbackStreamOptions): Response {
  const stream = createUIMessageStream({
    originalMessages,
    execute: ({ writer }) => {
      writeFallbackText(writer, message);
    },
    onFinish: async ({ responseMessage, isAborted }) => {
      if (isAborted || !onAssistantMessage) return;

      const text = getTextFromUIMessage(responseMessage);
      if (text) {
        await onAssistantMessage(text);
      }
    },
  });

  return createUIMessageStreamResponse({ stream });
}
