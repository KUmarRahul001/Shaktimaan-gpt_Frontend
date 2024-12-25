import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-4 ${
        isUser 
          ? 'bg-blue-500 text-white dark:bg-blue-600' 
          : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-100'
      } transition-colors duration-200`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};