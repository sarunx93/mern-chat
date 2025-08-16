import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'
import { UploadContextProvider } from './context/UploadContext.tsx'
import { MessageContextProvider } from './context/MessageContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <SocketContextProvider>
                    <MessageContextProvider>
                        <UploadContextProvider>{children}</UploadContextProvider>
                    </MessageContextProvider>
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
