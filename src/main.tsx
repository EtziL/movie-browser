import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider, FavouritesProvider } from './components/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastProvider>
                <FavouritesProvider>
                    <App />
                </FavouritesProvider>
            </ToastProvider>
        </BrowserRouter>
    </React.StrictMode>
)
