
export interface User {
  user_id: string;
  api_key: string;
  email: string;
}

export interface Project {
  id: string;
  domain: string;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
