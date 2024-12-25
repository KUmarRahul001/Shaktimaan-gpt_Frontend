import React from 'react';
import { SearchBar } from './SearchBar';
import { DateFilter } from './DateFilter';
import { ChatHistory } from './ChatHistory';
import { useSwipeable } from 'react-swipeable';
import type { ChatMessage } from '../../types/chat';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  searchQuery: string;
  dateFilter: string;
  onSearchChange: (query: string) => void;
  onDateFilterChange: (date: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  messages,
  searchQuery,
  dateFilter,
  onSearchChange,
  onDateFilterChange
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: onClose,
    trackMouse: true
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        {...handlers}
        className={`fixed top-0 left-0 h-full w-80 bg-white transform transition-transform duration-300 ease-in-out z-50 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Chat History</h2>
            <SearchBar value={searchQuery} onChange={onSearchChange} />
            <DateFilter value={dateFilter} onChange={onDateFilterChange} />
          </div>

          <ChatHistory messages={messages} searchQuery={searchQuery} dateFilter={dateFilter} />
        </div>
      </div>

      {/* Handle for mobile */}
      <button
        aria-label="Open chat history"
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-r-md 
          hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          md:hidden"
        onClick={() => !isOpen && onClose()}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
};