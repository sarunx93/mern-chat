import { screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { render } from '../test-utils'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { handleInputErrors } from '../utils/helpers'
import { toast } from 'react-hot-toast'

vi.mock('react-hot-toast', () => ({
    toast: {
        error: vi.fn(),
    },
}))

const mockSignup = vi.fn()

vi.mock('../hooks/useSignup', () => ({
    default: () => ({
        signup: mockSignup,
        loading: false,
    }),
}))

import Signup from '../pages/signup/Signup'

const getElements = () => ({
    fullnameInput: screen.getByLabelText(/full name/i),
    usernameInput: screen.getByLabelText(/username/i),
    passwordInput: screen.getByLabelText(/^password$/i),
    confirmPasswordInput: screen.getByLabelText(/confirm password/i),
    maleOption: screen.getByLabelText(/^male$/i),
    femaleOption: screen.getByLabelText(/^female$/i),
    submitBtn: screen.getByRole('button', { name: /sign up/i }),
})

describe('Signup form test', () => {
    let user: UserEvent

    beforeEach(() => {
        user = userEvent.setup()
        mockSignup.mockClear()
        vi.clearAllMocks()
        render(
            <>
                <Signup />
            </>
        )
    })

    test('Empty input initially', () => {
        const {
            fullnameInput,
            usernameInput,
            passwordInput,
            confirmPasswordInput,
            maleOption,
            femaleOption,
        } = getElements()

        expect(fullnameInput).toHaveValue('')
        expect(usernameInput).toHaveValue('')
        expect(passwordInput).toHaveValue('')
        expect(confirmPasswordInput).toHaveValue('')
        expect(maleOption).not.toBeChecked()
        expect(femaleOption).not.toBeChecked()
    })

    test('return false if any field is empty', async () => {
        //this is not a component test and rather a function test which displays error message on the screen via a toast.

        const result = handleInputErrors({
            fullName: 'John Doe',
            username: '',
            password: '123456',
            confirmPassword: '123456',
            gender: 'male',
        })
        expect(result).toBe(false)
        expect(toast.error).toHaveBeenCalledWith('Please fill all the fields')
    })

    test('passwords do not match', async () => {
        //this is not a component test and rather a function test which displays error message on the screen via a toast.

        const result = handleInputErrors({
            fullName: 'John Doe',
            username: 'jdoe',
            password: '123456',
            confirmPassword: '12345678',
            gender: 'male',
        })
        expect(result).toBe(false)
        expect(toast.error).toHaveBeenCalledWith('Password do not match')
    })
    test('password is less than 6 characters', async () => {
        //this is not a component test and rather a function test which displays error message on the screen via a toast.

        const result = handleInputErrors({
            fullName: 'John Doe',
            username: 'jdoe',
            password: '12345',
            confirmPassword: '12345',
            gender: 'male',
        })
        expect(result).toBe(false)
        expect(toast.error).toHaveBeenCalledWith('Password must be at least 6 characters.')
    })

    test('Submit form with valid credentials.', async () => {
        const {
            fullnameInput,
            usernameInput,
            passwordInput,
            confirmPasswordInput,
            maleOption,
            submitBtn,
        } = getElements()

        //type into inputs
        await user.type(fullnameInput, 'Harry Potter')
        await user.type(usernameInput, 'potter')
        await user.type(passwordInput, '123456')
        await user.type(confirmPasswordInput, '123456')
        await user.click(maleOption)

        //submit signuo
        await user.click(submitBtn)

        expect(mockSignup).toHaveBeenCalled()
    })
})
