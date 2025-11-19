'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSendMessage, loading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-bg-medium border-t border-border p-3 sm:p-4 flex-shrink-0">
      <div className="flex items-end gap-2 sm:gap-3">
        <div className="flex-1 bg-bg-light border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about your building energy simulation..."
            disabled={loading}
            className="flex-1 bg-transparent text-text-primary placeholder-text-muted resize-none outline-none max-h-32 overflow-y-auto text-sm sm:text-base"
            rows={1}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="bg-primary hover:bg-primary-dark disabled:bg-border disabled:cursor-not-allowed text-white p-2.5 sm:p-3 rounded-xl transition-colors flex items-center justify-center flex-shrink-0"
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

