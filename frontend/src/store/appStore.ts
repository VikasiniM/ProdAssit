import { create } from 'zustand';
import type { ChatMessage, SessionSummary } from '../types/api';

type AppState = {
  sessionId: string;
  sessions: SessionSummary[];
  messages: ChatMessage[];
  isSidebarOpen: boolean;
  setSessionId: (sessionId: string) => void;
  setSessions: (sessions: SessionSummary[]) => void;
  setMessages: (messages: ChatMessage[]) => void;
  appendMessage: (message: ChatMessage) => void;
  toggleSidebar: () => void;
  resetChat: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  sessionId: 'default-session',
  sessions: [],
  messages: [],
  isSidebarOpen: true,
  setSessionId: (sessionId) => set({ sessionId }),
  setSessions: (sessions) => set({ sessions }),
  setMessages: (messages) => set({ messages }),
  appendMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  resetChat: () =>
    set({
      messages: [],
      sessionId: 'default-session',
    }),
}));
