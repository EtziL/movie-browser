import { createContext, useContext, useState } from 'react'
import { TToastContext, TToastProviderProps } from '../../Types/Toast'

const defaultToastContext: TToastContext = {
    toast: { isVisible: false, type: 'info', message: '' },
    showToast: () => {},
    hideToast: () => {},
}

const ToastContext = createContext<TToastContext>(defaultToastContext)

export const useToast = () => {
    return useContext(ToastContext)
}

export const ToastProvider = ({ children }: TToastProviderProps) => {
    const [toast, setToast] = useState<TToastContext['toast']>({ isVisible: false, type: 'info', message: '' })

    const showToast = (type: TToastContext['toast']['type'], message: TToastContext['toast']['message']) => {
        setToast({ isVisible: true, type, message })
    }

    const hideToast = () => {
        setToast({ isVisible: false, type: 'info', message: '' })
    }

    return <ToastContext.Provider value={{ toast, showToast, hideToast }}>{children}</ToastContext.Provider>
}
