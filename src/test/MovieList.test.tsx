import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { MemoryRouter, Params } from 'react-router-dom'
import { MovieList, Toast, ToastProvider } from '../components'

vi.mock('react-router-dom', async () => {
    const originalModule = await import('react-router-dom')
    return {
        ...originalModule,
        useNavigate: vi.fn(),
        useParams: (): Readonly<Params<string>> => ({ searchedName: 'Batman', currentPage: '1' }),
    }
})

// Mock the axios module
vi.mock('axios')

describe('MovieList', () => {
    beforeEach(() => {
        // Reset mocks before each test
        vi.resetAllMocks()
    })

    it('shows loader while fetching data', async () => {
        // Provide a mock implementation for axios.get
        vi.mocked(axios.get).mockReturnValue(new Promise((resolve) => setTimeout(() => resolve({ data: { Response: 'True', Search: [], totalResults: '0' } }), 100)))

        render(<MovieList />, { wrapper: MemoryRouter })

        expect(screen.getByText(/getting data/i)).toBeInTheDocument()

        // Wait for axios to resolve
        await waitFor(() => expect(axios.get).toHaveBeenCalled())
    })

    it('renders movies after fetching data', async () => {
        const mockMovies = [
            { Title: 'Movie 1', Year: '2021', Type: 'movie', Poster: 'N/A', imdbID: '1' },
            { Title: 'Movie 2', Year: '2022', Type: 'movie', Poster: 'N/A', imdbID: '2' },
        ]
        vi.mocked(axios.get).mockResolvedValue({ data: { Response: 'True', Search: mockMovies, totalResults: '2' } })

        render(<MovieList />, { wrapper: MemoryRouter })

        await waitFor(() => {
            expect(screen.getByText('Movie 1')).toBeInTheDocument()
            expect(screen.getByText('Movie 2')).toBeInTheDocument()
        })
    })

    it('displays error message on fetch failure', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('An error occurred'))

        render(
            <MemoryRouter>
                <ToastProvider>
                    <Toast />
                    <MovieList />
                </ToastProvider>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Error:')).toBeInTheDocument()
        })
    })
})
