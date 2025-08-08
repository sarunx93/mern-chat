import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'
import { UploadContextProvider } from './context/UploadContext.tsx'
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <SocketContextProvider>
                    <UploadContextProvider>
                        <App />
                    </UploadContextProvider>
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
)
