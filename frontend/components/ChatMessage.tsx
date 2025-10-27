'use client';

import { Message } from './ChatInterface';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex gap-3 max-w-[70%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0 ${
            isUser
              ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
              : 'bg-gradient-to-br from-indigo-500 to-blue-600'
          }`}
        >
          {isUser ? 'U' : 'AI'}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold text-sm">
              {isUser ? 'You' : 'SimPrompt AI'}
            </span>
            <span className="text-xs text-text-muted">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? 'bg-primary text-white'
                : 'bg-bg-medium border border-border'
            }`}
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

