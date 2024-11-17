import React from 'react';
import { MessagesSquare, SunMoon, Trash2 } from 'lucide-react';
import { Chat } from '../types';

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function Sidebar({ chats, activeChat, onNewChat, onSelectChat, onDeleteChat }: SidebarProps) {
  return (
    <div className="hidden md:flex w-64 flex-col bg-gray-800 p-4">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <MessagesSquare size={20} />
        <span>New Chat</span>
      </button>
      
      <div className="mt-4 flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
              activeChat === chat.id ? 'bg-gray-700' : 'hover:bg-gray-700/50'
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <MessagesSquare size={16} className="shrink-0" />
            <span className="flex-1 truncate text-sm">{chat.title}</span>
            {activeChat === chat.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4">
        <button className="flex items-center gap-2 w-full px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          <SunMoon size={20} />
          <span>Theme</span>
        </button>
      </div>
    </div>
  );
}