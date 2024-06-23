import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { MovieListItem } from '../components'
import { TMovieListItem } from '../Types/Movie'
import userEvent from '@testing-library/user-event'

vi.mock('react-router-dom', async () => {
    const originalModule = await import('react-router-dom')
    return {
        ...originalModule,
        useNavigate: vi.fn(),
    }
})

vi.mock('react-icons/hi2', async () => {
    const originalModule = await import('react-icons/hi2')
    return {
        ...originalModule,
        HiOutlineHeart: () => <div>HiOutlineHeartIcon</div>,
        HiHeart: () => <div>HiHeartIcon</div>,
        HiOutlineVideoCameraSlash: () => <div>HiOutlineVideoCameraSlashIcon</div>,
    }
})

const mockMovie: TMovieListItem = {
    title: 'Test Movie',
    type: 'movie',
    img: 'test.jpg',
    year: '2021',
    imdbID: 'tt1234567',
}
describe('MovieListItem Component', () => {
    it('renders movie information correctly', () => {
        render(
            <BrowserRouter>
                <MovieListItem movie={mockMovie} variants={{}} />
            </BrowserRouter>
        )

        expect(screen.getByText('Test Movie')).toBeInTheDocument()
        expect(screen.getByText('2021')).toBeInTheDocument()
        expect(screen.getByText('HiOutlineHeartIcon')).toBeInTheDocument()
    })

    it('renders img correctly if its undefined', () => {
        const mockMovieNoImg: TMovieListItem = {
            ...mockMovie,
            img: undefined,
        }
        render(
            <BrowserRouter>
                <MovieListItem movie={mockMovieNoImg} variants={{}} />
            </BrowserRouter>
        )

        expect(screen.getByText('Test Movie')).toBeInTheDocument()
        expect(screen.getByText('2021')).toBeInTheDocument()
        expect(screen.getByText('HiOutlineHeartIcon')).toBeInTheDocument()
        expect(screen.getByText('HiOutlineVideoCameraSlashIcon')).toBeInTheDocument()
    })

    it('correctly navigates to detail page', async () => {
        const mockNavigate = vi.fn()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        render(
            <BrowserRouter>
                <MovieListItem movie={mockMovie} variants={{}} />
            </BrowserRouter>
        )

        const movieListItem = screen.getByTestId('movie-list-item')
        expect(movieListItem).toBeInTheDocument()
        await userEvent.click(movieListItem)
        expect(mockNavigate).toHaveBeenCalledWith('/detail/tt1234567')

        expect(screen.getByText('Test Movie')).toBeInTheDocument()
        expect(screen.getByText('2021')).toBeInTheDocument()
        expect(screen.getByText('HiOutlineHeartIcon')).toBeInTheDocument()
    })
})
