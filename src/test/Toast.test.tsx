import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ToastProvider, Toast, useToast } from '../components'
import { useEffect } from 'react'

describe('Toast', () => {
    it('renders without crashing', () => {
        render(
            <ToastProvider>
                <Toast />
            </ToastProvider>
        )
    })

    it('displays correct message and type (success)', async () => {
        const TestComponent = () => {
            const { showToast } = useToast()

            useEffect(() => {
                showToast('success', 'Success message')
            }, [])

            return null
        }

        render(
            <ToastProvider>
                <TestComponent />
                <Toast />
            </ToastProvider>
        )

        expect(screen.getByText('Success:')).toBeInTheDocument()
        expect(screen.getByText('Success message')).toBeInTheDocument()
        await waitFor(() => {
            expect(screen.getByTestId('toast-container')).toBeVisible()
        })
    })
    it('displays correct message and type (error)', () => {
        const TestComponent = () => {
            const { showToast } = useToast()

            useEffect(() => {
                showToast('error', 'Error message')
            }, [])

            return null
        }

        render(
            <ToastProvider>
                <TestComponent />
                <Toast />
            </ToastProvider>
        )

        expect(screen.getByText('Error:')).toBeInTheDocument()
        expect(screen.getByText('Error message')).toBeInTheDocument()
    })

    it('displays correct message and type (info)', () => {
        const TestComponent = () => {
            const { showToast } = useToast()

            useEffect(() => {
                showToast('info', 'Info message')
            }, [])

            return null
        }

        render(
            <ToastProvider>
                <TestComponent />
                <Toast />
            </ToastProvider>
        )

        expect(screen.getByText('Info:')).toBeInTheDocument()
        expect(screen.getByText('Info message')).toBeInTheDocument()
    })

    it('hides when hideToast is called', () => {
        const TestComponent = () => {
            const { showToast, hideToast } = useToast()

            useEffect(() => {
                showToast('info', 'Info message')
                hideToast()
            }, [])

            return null
        }

        render(
            <ToastProvider>
                <TestComponent />
                <Toast />
            </ToastProvider>
        )

        expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument()
    })
})
