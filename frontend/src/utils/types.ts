export type SelectedConversationUser = {
    fullName: string
    gender: string
    profilePic: string
    username: string
    __v?: number
    _id: string
}

export type MessageType = {
    __v?: number
    _id: string
    createdAt: string
    receiverId: string
    senderId: string
    updatedAt: string
    message: string
}

export type ImageFileType = {
    file: File | null
    url: string
    blob: string
    type: string
}
