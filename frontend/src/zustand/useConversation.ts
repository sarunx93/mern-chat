import { create } from 'zustand'

type SelectedConversationUser = {
    fullName: string
    gender: string
    profilePic: string
    username: string
    __v: number
    _id: string
}

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}))

export default useConversation
