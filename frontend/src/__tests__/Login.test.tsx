import { fireEvent, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { render } from '../test-utils'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import Login from '../pages/login/Login'

const getElements = () => ({
    usernameInput: screen.getByLabelText(/username/i),
    passwordInput: screen.getByLabelText(/password/i),
    submitBtn: screen.getByRole('button', { name: /login/i }),
})
const mockLogin = vi.fn()

describe('Log-in Form', () => {
    let user: UserEvent

    beforeEach(() => {
        user = userEvent.setup()
        mockLogin.mockClear()
    })

    vi.mock('../hooks/useLogin', () => ({
        default: () => ({
            login: mockLogin,
            loading: false,
        }),
    }))

    test('Empty input initially', () => {
        render(<Login />)
        const { usernameInput, passwordInput } = getElements()
        expect(usernameInput).toHaveValue('')
        expect(passwordInput).toHaveValue('')
    })

    test('test login with correct credentials', async () => {
        // const user = userEvent.setup()
        render(<Login />)
        const { usernameInput, passwordInput, submitBtn } = getElements()

        //type into inputs
        await user.type(usernameInput, 'aaaa')
        await user.type(passwordInput, 'aaaaaa')

        //submitting the form
        await user.click(submitBtn)

        expect(mockLogin).toHaveBeenCalledWith('aaaa', 'aaaaaa')
    })

    test('test login with empty credentials', async () => {
        render(<Login />)
        const { submitBtn } = getElements()
        await user.click(submitBtn)
        expect(mockLogin).not.toHaveBeenCalled()
    })
})
