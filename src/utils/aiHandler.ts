import { v4 as uuidv4 } from 'uuid';
import { model } from '../config/gemini';
import { filterContent } from './contentFilter';
import type { ChatMessage } from '../types/chat';

export async function handleAIResponse(content: string): Promise<ChatMessage> {
  const result = await model.generateContent(content);
  const response = await result.response;
  const text = filterContent(response.text());

  return {
    id: uuidv4(),
    role: 'assistant',
    content: text,
    timestamp: Date.now()
  };
}