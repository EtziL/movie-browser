import { ReactNode, createContext, useContext, useState } from 'react'

type TToastContext = {
    toast: {
        isVisible: boolean
        type: 'info' | 'error' | 'success'
        message: string
    }
    showToast: (type: 'info' | 'error' | 'success', message: string) => void
    hideToast: () => void
}

const defaultToastContext: TToastContext = {
    toast: { isVisible: false, type: 'info', message: '' },
    showToast: () => {},
    hideToast: () => {},
}

const ToastContext = createContext<TToastContext>(defaultToastContext)

export const useToast = () => {
    return useContext(ToastContext)
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<TToastContext['toast']>({ isVisible: false, type: 'info', message: '' })

    const showToast = (type: TToastContext['toast']['type'], message: TToastContext['toast']['message']) => {
        setToast({ isVisible: true, type, message })
    }

    const hideToast = () => {
        setToast({ isVisible: false, type: 'info', message: '' })
    }

    return <ToastContext.Provider value={{ toast, showToast, hideToast }}>{children}</ToastContext.Provider>
}
