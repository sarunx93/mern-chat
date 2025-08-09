import { create } from 'zustand'
import type { SelectedConversationUser, MessageType } from '../utils/types'

type ConversationState = {
    selectedConversationUser: SelectedConversationUser | null
    setSelectedConversationUser: (selectedConversation: SelectedConversationUser | null) => void
    messages: MessageType[]
    setMessages: (messages: MessageType[] | ((prev: MessageType[]) => MessageType[])) => void
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversationUser: null,
    setSelectedConversationUser: (selectedConversationUser: SelectedConversationUser | null) =>
        set({ selectedConversationUser }),
    messages: [],
    setMessages: (update) =>
        set((state) => ({
            messages: typeof update === 'function' ? update(state.messages) : update,
        })),
}))

export default useConversation
