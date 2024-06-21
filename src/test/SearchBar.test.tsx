import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SearchBar, Toast, ToastProvider } from '../components'
import { BrowserRouter } from 'react-router-dom'

describe('SearchBar Component', () => {
    it('shows toast error message on empty input submission', async () => {
        render(
            <BrowserRouter>
                <ToastProvider>
                    <Toast />
                    <SearchBar />
                </ToastProvider>
            </BrowserRouter>
        )

        fireEvent.submit(screen.getByRole('button'))

        await waitFor(() => {
            expect(screen.getByText('Error:')).toBeInTheDocument()
        })
    })
})
