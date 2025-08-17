import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'
import { UploadContextProvider } from './context/UploadContext.tsx'
import { MessageContextProvider } from './context/MessageContext.tsx'
import { BrowserRouter } from 'react-router-dom'


// eslint-disable-next-line react-refresh/only-export-components
const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <SocketContextProvider>
                    <MessageContextProvider>
                        <UploadContextProvider>
                            {/* <Toaster /> */}
                            {children}
                        </UploadContextProvider>
                    </MessageContextProvider>
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
