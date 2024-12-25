import CryptoJS from 'crypto-js';
import type { ChatMessage } from '../types/chat';

const STORAGE_KEY = 'shaktimaan_chat_history';
const ENCRYPTION_KEY = 'your-secure-key'; // In production, use environment variable
const MAX_MESSAGES = 1000;

export const encryptMessage = (text: string): string => {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

export const decryptMessage = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveToStorage = (messages: ChatMessage[]): void => {
  try {
    // Encrypt sensitive data before storage
    const encryptedMessages = messages.map(msg => ({
      ...msg,
      content: msg.encrypted ? msg.content : encryptMessage(msg.content),
      encrypted: true
    }));

    // Implement cleanup if exceeding storage limits
    if (encryptedMessages.length > MAX_MESSAGES) {
      encryptedMessages.splice(0, encryptedMessages.length - MAX_MESSAGES);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(encryptedMessages));
  } catch (error) {
    console.error('Storage error:', error);
  }
};

export const loadFromStorage = (): ChatMessage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const messages: ChatMessage[] = JSON.parse(stored);
    return messages.map(msg => ({
      ...msg,
      content: msg.encrypted ? decryptMessage(msg.content) : msg.content,
      encrypted: false
    }));
  } catch (error) {
    console.error('Loading error:', error);
    return [];
  }
};