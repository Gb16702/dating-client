import { create } from "zustand";

interface Message {
  id: number;
  content: string;
  sender: string;
}

interface MessageState {
  messages: Message[];
  initialize: (initialMessages: Message[]) => void;
  addMessage: (message: Message) => void;
}

export const useMessageStore = create<MessageState>(set => ({
  messages: [],
  initialize: initialMessages => {
    set({ messages: initialMessages });
  },

  addMessage: message => {
    set(state => {
      return { messages: [...state.messages, message] };
    });
  },
}));
