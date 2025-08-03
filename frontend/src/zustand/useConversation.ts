import { create } from 'zustand'
import type { SelectedConversationUser, MessageType } from '../utils/types'

type ConversationState = {
    selectedConversation: SelectedConversationUser | null
    setSelectedConversation: (selectedConversation: SelectedConversationUser | null) => void
    messages: MessageType[]
    setMessages: (messages: MessageType[]) => void
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: SelectedConversationUser | null) =>
        set({ selectedConversation }),
    messages: [],
    setMessages: (messages: MessageType[]) => set({ messages }),
}))

export default useConversation
