export interface Message {
  content: string;
  role: 'assistant' | 'user';
  id: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  model: 'ShakitmaanGpt' | 'GPT-4';
}

export interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  model: 'ShakitmaanGpt' | 'GPT-4';
}
