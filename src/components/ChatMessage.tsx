import React from 'react';
import { Bot, User, Volume2, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  // Function to handle copying code to clipboard
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  // Function to handle text-to-speech for reading the code aloud
  const handleReadAloud = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ease-in-out ${
        message.role === 'assistant' ? 'bg-gray-800' : ''
      }`}
    >
      <div
        className={`p-2 rounded-lg ${
          message.role === 'assistant' ? 'bg-green-600' : 'bg-blue-600'
        }`}
      >
        {message.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1 prose prose-invert max-w-none">
        <ReactMarkdown
          children={message.content}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, children, ...props }: { inline: boolean; children: React.ReactNode }) {
              const codeText = String(children).trim();

              return !inline ? (
                <div className="relative bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre>
                    <code className="text-sm text-gray-200" {...props}>
                      {children}
                    </code>
                  </pre>
                  {message.role === 'assistant' && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      {/* Copy Button */}
                      <button
                        className="text-gray-400 hover:text-white p-1 rounded-full bg-gray-700"
                        onClick={() => handleCopy(codeText)}
                        title="Copy Code"
                      >
                        <Copy size={14} />
                      </button>
                      {/* Read Aloud Button */}
                      <button
                        className="text-gray-400 hover:text-white p-1 rounded-full bg-gray-700"
                        onClick={() => handleReadAloud(codeText)}
                        title="Read Aloud"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <code className="bg-gray-700 p-1 rounded">{children}</code>
              );
            },
          }}
        />
      </div>
    </div>
  );
}
