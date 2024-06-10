import { ReactNode } from "react"

export type TToastContext = {
    toast: {
        isVisible: boolean
        type: "info" | "error" | "success"
        message: string
    }
    showToast: (type: "info" | "error" | "success", message: string) => void
    hideToast: () => void
}

export type TToastProviderProps = {
    children: ReactNode
}