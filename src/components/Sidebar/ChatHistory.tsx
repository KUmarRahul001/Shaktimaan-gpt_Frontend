import React from 'react';
import { format } from 'date-fns';
import type { ChatMessage } from '../../types/chat';

interface ChatHistoryProps {
  messages: ChatMessage[];
  searchQuery: string;
  dateFilter: string;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
  searchQuery,
  dateFilter
}) => {
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.content.toLowerCase().includes(searchQuery.toLowerCase());
    const messageDate = format(new Date(msg.timestamp), 'yyyy-MM-dd');
    const matchesDate = !dateFilter || messageDate === dateFilter;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {filteredMessages.map((msg) => (
        <div
          key={msg.id}
          className={`mb-4 p-3 rounded-lg ${
            msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          <div className="text-sm text-gray-500">
            {format(new Date(msg.timestamp), 'MMM d, yyyy h:mm a')}
          </div>
          <div className="mt-1">{msg.content}</div>
        </div>
      ))}
    </div>
  );
};