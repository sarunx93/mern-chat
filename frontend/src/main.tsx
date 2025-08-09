import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'
import { UploadContextProvider } from './context/UploadContext.tsx'
import { MessageContextProvider } from './context/MessageContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <SocketContextProvider>
                    <MessageContextProvider>
                        <UploadContextProvider>
                            <App />
                        </UploadContextProvider>
                    </MessageContextProvider>
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
)
