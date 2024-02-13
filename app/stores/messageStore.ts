import {create} from "zustand";

interface Message {
    id: number;
    content: string;
    sender: string;
}

interface Conversation {
    [conversationId: string]: Message[];
}

interface MessageState {
    conversations: Conversation;
    initializeConversation: (conversationId: string, initialMessages: Message[]) => void;
    addMessageToConversation: (conversationId: string, message: Message) => void;
    getMessagesFromConversation: (conversationId: string) => Message[];
}

export const useMessageStore = create<MessageState>((set, get) => ({
    conversations: {},

    initializeConversation: (conversationId, initialMessages) => {
        set(state => {
            const newConversation = initialMessages.map(message => ({
                id: message.id,
                content: message.content,
                //@ts-ignore
                sender: message.sender_id,
            }));
            return {
                conversations: {
                    ...state.conversations,
                    [conversationId]: newConversation,
                },
            };
        });
    },

    addMessageToConversation: (conversationId, message) => {
        set(state => ({
            conversations: {
                ...state.conversations,
                [conversationId]: [...(state.conversations[conversationId] || []), message],
            },
        }));
    },

    getMessagesFromConversation: (conversationId) => {
        const state = get();
        return state.conversations[conversationId] || [];
    },
}));