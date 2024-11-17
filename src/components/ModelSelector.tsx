import React from 'react';
import { Sparkles } from 'lucide-react';

interface ModelSelectorProps {
  model: 'ChatGPT' | 'GPT-4';
  onModelChange: (model: 'ChatGPT' | 'GPT-4') => void;
}

export function ModelSelector({ model, onModelChange }: ModelSelectorProps) {
  return (
    <div className="relative inline-block">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <Sparkles size={16} className="text-yellow-500" />
        <span>{model}</span>
      </button>
    </div>
  );
}