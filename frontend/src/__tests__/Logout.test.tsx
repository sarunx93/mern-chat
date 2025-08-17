import { screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { render } from '../test-utils'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import LogoutButton from '../components/sidebar/LogoutButton'

const mockLogout = vi.fn()

describe('logout button', () => {
    let user: UserEvent
    beforeEach(() => {
        user = userEvent.setup()
        mockLogout.mockClear()
    })
    vi.mock('../hooks/useLogout', () => ({
        default: () => ({
            loading: false,
            logout: mockLogout,
        }),
    }))
    test('logout user when clicked', async () => {
        render(<LogoutButton />)
        const logoutBtn = screen.getByRole('button', { name: /logout/i })

        await user.click(logoutBtn)
        expect(mockLogout).toHaveBeenCalled()
    })
})
