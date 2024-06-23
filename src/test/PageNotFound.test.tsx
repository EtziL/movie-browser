import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ToastProvider, PageNotFound } from '../components'

describe('PageNotFound', () => {
    it('renders correctly without crashing', () => {
        render(
            <ToastProvider>
                <PageNotFound />
            </ToastProvider>
        )

        expect(screen.getByText('404')).toBeInTheDocument()
        expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    })
})
