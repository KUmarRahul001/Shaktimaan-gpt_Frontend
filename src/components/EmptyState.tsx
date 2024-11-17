import React from 'react';
import { Bot } from 'lucide-react';


export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold mb-2">ShaktimaanGpt</h1>
      <div className="mb-8 text-gray-400">
        <Bot size={32} className="mx-auto mb-4" />
        <p>How can I help you today?</p>
      </div>
      
    </div>
  );
}