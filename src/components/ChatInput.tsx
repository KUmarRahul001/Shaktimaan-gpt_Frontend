import React, { useRef } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (value: string) => void;
}

export function ChatInput({ input, loading, onSubmit, onInputChange }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-800 p-4">
      <form onSubmit={onSubmit} className="relative max-w-3xl mx-auto">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          rows={1}
          className="w-full bg-gray-700 text-gray-100 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          style={{ minHeight: '3rem', maxHeight: '200px' }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-2 bottom-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
      <p className="text-center text-xs text-gray-400 mt-2">
        Free Research Preview. ShaktimaanGpt may produce inaccurate information.
      </p>
    </div>
  );
}