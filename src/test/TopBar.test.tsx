import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import { TopBar } from '../components'

vi.mock('react-router-dom', async () => {
    const originalModule = await import('react-router-dom')
    return {
        ...originalModule,
        useNavigate: vi.fn(),
        useLocation: vi.fn(() => ({
            pathname: '/',
            state: {},
            key: 'defaultKey',
            search: '',
            hash: '',
        })),
    }
})

describe('TopBar Component', () => {
    it('shows back arrow on detail page', () => {
        vi.mocked(useLocation).mockReturnValue({
            pathname: '/detail/123',
            state: {},
            key: 'detailKey',
            search: '',
            hash: '',
        })
        render(
            <MemoryRouter>
                <TopBar />
            </MemoryRouter>
        )
        expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('hides back arrow on non-detail/non-favourites pages', () => {
        vi.mocked(useLocation).mockReturnValue({
            pathname: '/other',
            state: {},
            key: 'otherKey',
            search: '',
            hash: '',
        })
        render(
            <MemoryRouter>
                <TopBar />
            </MemoryRouter>
        )
        expect(screen.queryAllByRole('button')).toHaveLength(2)
    })

    it('navigates back when back arrow is clicked', async () => {
        const mockNavigate = vi.fn()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)
        vi.mocked(useLocation).mockReturnValue({
            pathname: '/detail/123',
            state: {},
            key: 'navigateBackKey',
            search: '',
            hash: '',
        })

        render(
            <MemoryRouter>
                <TopBar />
            </MemoryRouter>
        )

        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(3)
        await userEvent.click(buttons[0])

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('shows favourites button correctly based on path', () => {
        const { rerender } = render(
            <MemoryRouter>
                <TopBar />
            </MemoryRouter>
        )

        // Path is not favourites
        vi.mocked(useLocation).mockReturnValue({
            pathname: '/other',
            state: {},
            key: 'notFavKey',
            search: '',
            hash: '',
        })
        rerender(
            <MemoryRouter>
                <TopBar />
            </MemoryRouter>
        )
        expect(screen.getAllByRole('button')).toHaveLength(2)

        // Path is favourites
        vi.mocked(useLocation).mockReturnValue({
            pathname: '/favourites',
            state: {},
            key: 'favKey',
            search: '',
            hash: '',
        })
        rerender(
            <MemoryRouter>
                <TopBar />
            </MemoryRouter>
        )
        expect(screen.getAllByRole('button')).toHaveLength(2) // Adjust based on actual visibility logic
    })
})
