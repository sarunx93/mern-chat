import { screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { render } from '../test-utils'
import { vi } from 'vitest'
import ConversationList from '../components/sidebar/ConversationList'

const mockUseGetConversations = vi.fn()

const conversationMockData = [
    {
        fullName: 'Sam Lee',
        gender: 'male',
        profilePic: 'https://api.dicebear.com/9.x/lorelei/svg',
        username: 'samlee',
        __v: 0,
        _id: '6875b77e3e59d73f6808b945',
    },
    {
        fullName: 'Lena Liamsworth',
        gender: 'female',
        profilePic: 'https://api.dicebear.com/9.x/lorelei/svg',
        username: 'llena',
        __v: 0,
        _id: '6875b987bcf3ffa90182e4cb',
    },
]

vi.mock('../hooks/useGetConversations', () => ({
    default: () => mockUseGetConversations(),
}))

vi.mock('../components/sidebar/Conversation', () => ({
    default: () => <div data-testid='conversation'>Conversation</div>,
}))

describe('ConversationList Component', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    test('renders conversations when available', () => {
        mockUseGetConversations.mockReturnValue({
            loading: false,
            conversations: conversationMockData,
        })
        render(<ConversationList />)
        expect(screen.getAllByTestId('conversation')).toHaveLength(2)
    })
})
