import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { handleAIResponse } from './utils/aiHandler';
import { saveToStorage, loadFromStorage } from './utils/storage';
import type { ChatState, ChatMessage as ChatMessageType } from './types/chat';

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    sidebarOpen: false,
    searchQuery: '',
    dateFilter: ''
  });

  useEffect(() => {
    const savedMessages = loadFromStorage();
    setState(prev => ({ ...prev, messages: savedMessages }));
  }, []);

  useEffect(() => {
    saveToStorage(state.messages);
  }, [state.messages]);

  const handleSendMessage = async (content: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const newMessage: ChatMessageType = {
        id: uuidv4(),
        role: 'user',
        content,
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));

      const assistantMessage = await handleAIResponse(content);
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage]
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to get response. Please try again.'
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-200">
      <ThemeToggle />
      <Sidebar
        isOpen={state.sidebarOpen}
        onClose={() => setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))}
        messages={state.messages}
        searchQuery={state.searchQuery}
        dateFilter={state.dateFilter}
        onSearchChange={(query) => setState(prev => ({ ...prev, searchQuery: query }))}
        onDateFilterChange={(date) => setState(prev => ({ ...prev, dateFilter: date }))}
      />

      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-center mb-8">ShaktimaanGPT</h1>
        
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg">
          <div className="h-[calc(100vh-300px)] overflow-y-auto p-4 md:p-6">
            {state.messages.map((message) => (
              <ChatMessage 
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
          </div>
          
          {state.error && (
            <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg mx-4 mb-4">
              {state.error}
            </div>
          )}
          
          <div className="p-4 border-t dark:border-gray-700">
            <ChatInput 
              onSendMessage={handleSendMessage}
              isLoading={state.isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;