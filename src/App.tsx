import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { EmptyState } from './components/EmptyState';
import { useFirebaseStorage } from './hooks/useFirebaseStorage';
import type { ChatState, Chat, Message } from './types';
import axios from 'axios';
import { Bot } from 'lucide-react';

const API_URL = 'https://shaktimaan-gpt-backend.onrender.com/api/chat';

function App() {
  const [chatState, setChatState] = useFirebaseStorage<ChatState>('chat-state', {
    chats: [],
    activeChat: null,
    model: 'ShakitmaanGpt',
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chatState.chats.find((chat) => chat.id === chatState.activeChat);
  const messages = activeChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      model: chatState.model,
    };

    setChatState((prev) => ({
      ...prev,
      chats: [newChat, ...prev.chats],
      activeChat: newChat.id,
    }));
  };

  const updateChatTitle = (chatId: string, messages: Message[]) => {
    if (messages.length === 1) {
      const title = messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '');
      setChatState((prev) => ({
        ...prev,
        chats: prev.chats.map((chat) =>
          chat.id === chatId ? { ...chat, title } : chat
        ),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage: Message = {
      content: input,
      role: 'user',
      id: Date.now().toString(),
    };

    if (!chatState.activeChat) {
      createNewChat();
    }

    setChatState((prev) => ({
      ...prev,
      chats: prev.chats.map((chat) => {
        if (chat.id === prev.activeChat) {
          const updatedMessages = [...chat.messages, newMessage];
          updateChatTitle(chat.id, updatedMessages);
          return { ...chat, messages: updatedMessages };
        }
        return chat;
      }),
    }));

    setInput('');
    setLoading(true);

    try {
      const currentChat = chatState.chats.find((chat) => chat.id === chatState.activeChat);
      const chatHistory = currentChat?.messages || [];

      const response = await axios.post(API_URL, {
        message: input,
        history: chatHistory,
      });

      setChatState((prev) => ({
        ...prev,
        chats: prev.chats.map((chat) =>
          chat.id === prev.activeChat
            ? { ...chat, messages: [...chat.messages, response.data] }
            : chat
        ),
      }));
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        content: "Sorry, I encountered an error while processing your request.",
        role: 'assistant',
        id: Date.now().toString(),
      };
      setChatState((prev) => ({
        ...prev,
        chats: prev.chats.map((chat) =>
          chat.id === prev.activeChat
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        ),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = (model: 'ShakitmaanGpt' | 'GPT-4') => {
    setChatState((prev: ChatState) => ({ ...prev, model }));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar
        chats={chatState.chats}
        activeChat={chatState.activeChat}
        onNewChat={createNewChat}
        onSelectChat={(chatId) => setChatState((prev) => ({ ...prev, activeChat: chatId }))}
        onDeleteChat={(chatId) => {
          setChatState((prev) => {
            const newChats = prev.chats.filter((chat) => chat.id !== chatId);
            return {
              ...prev,
              chats: newChats,
              activeChat: newChats.length > 0 ? newChats[0].id : null,
            };
          });
        }}
      />

      <div className="flex-1 flex flex-col">
        <header className="border-b border-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Shaktimaan GPT</h1>
          <select
            value={chatState.model}
            onChange={(e) => handleModelChange(e.target.value as 'ShakitmaanGpt' | 'GPT-4')}
            className="bg-gray-800 text-gray-100 p-2 rounded"
          >
            <option value="ShakitmaanGpt">Shakitmaan GPT</option>
            <option value="GPT-4">GPT-4</option>
          </select>
        </header>

        <div className="flex-1 overflow-y-auto">
          {!activeChat ? (
            <EmptyState />
          ) : (
            <div className="max-w-4xl mx-auto p-4 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && (
                <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                  <div className="p-2 rounded-lg bg-green-600">
                    <Bot size={20} />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput
          input={input}
          loading={loading}
          onSubmit={handleSubmit}
          onInputChange={setInput}
        />
      </div>
    </div>
  );
}

export default App;
