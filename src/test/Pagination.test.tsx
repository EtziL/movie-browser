import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Pagination } from '../components'
import { BrowserRouter } from 'react-router-dom'

describe('Pagination', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Pagination totalItems={5} itemsPerPage={5} />
            </BrowserRouter>
        )
    })

    it('renders correct number of page buttons if there is only 1 page', () => {
        render(
            <BrowserRouter>
                <Pagination totalItems={5} itemsPerPage={5} />
            </BrowserRouter>
        )

        // Next + 1 + Last
        expect(screen.getAllByTestId('pagination-btn').length).toBe(3)
    })

    it('renders last page number correctly if there are multiple', () => {
        render(
            <BrowserRouter>
                <Pagination totalItems={61} itemsPerPage={5} />
            </BrowserRouter>
        )

        expect(screen.getByText('13')).toBeInTheDocument()
    })
})
