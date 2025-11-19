'use client';

import { Message } from './ChatInterface';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[70%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0 ${
            isUser
              ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
              : 'bg-gradient-to-br from-indigo-500 to-blue-600'
          }`}
        >
          {isUser ? 'U' : 'AI'}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className="flex items-baseline gap-1 sm:gap-2 mb-1">
            <span className="font-semibold text-xs sm:text-sm">
              {isUser ? 'You' : 'SimPrompt AI'}
            </span>
            <span className="text-[10px] sm:text-xs text-text-muted">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div
            className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
              isUser
                ? 'bg-primary text-white'
                : 'bg-bg-medium border border-border'
            }`}
          >
            <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

