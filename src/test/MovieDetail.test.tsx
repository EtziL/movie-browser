import { render, screen, waitFor } from '@testing-library/react'
import { MovieDetail, Toast, ToastProvider } from '../components'
import axios from 'axios'
import { MemoryRouter, Params } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('react-router-dom', async () => {
    const originalModule = await import('react-router-dom')
    return {
        ...originalModule,
        useNavigate: vi.fn(),
        useParams: (): Readonly<Params<string>> => ({ imdbID: 'tt1234567' }),
    }
})

vi.mock('axios')

describe('MovieDetail', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('shows loader while fetching data', async () => {
        vi.mocked(axios.get).mockReturnValue(new Promise((resolve) => setTimeout(() => resolve({ data: { Response: 'True' } }), 100)))

        render(<MovieDetail />, { wrapper: MemoryRouter })

        expect(screen.getByText(/getting data/i)).toBeInTheDocument()

        await waitFor(() => expect(axios.get).toHaveBeenCalled())
    })

    it('displays movie details on successful fetch', async () => {
        const mockedMovie = {
            Title: 'Test Movie',
            Response: 'True',
            Released: '10 Oct 2020',
            Runtime: '140 minutes',
            Actors: 'Cillian Murphy, Tom Hardy',
            Director: 'Christopher Nolan',
            Plot: 'Very interesting plot',
            Awards: 'N/A',
            Genre: 'N/A',
            Poster: 'N/A',
            imdbRating: '8.8',
            imdbVotes: '1,578,000',
        }

        vi.mocked(axios.get).mockResolvedValue({
            data: {
                ...mockedMovie,
                Response: 'True',
            },
        })

        render(
            <MemoryRouter>
                <MovieDetail />
            </MemoryRouter>
        )

        await waitFor(
            () => {
                expect(screen.getByText('Test Movie')).toBeInTheDocument()
                expect(screen.getByText('10 Oct 2020')).toBeInTheDocument()
                expect(screen.getByText('2h 20m')).toBeInTheDocument()
                expect(screen.getByText('Cillian Murphy, Tom Hardy')).toBeInTheDocument()
                expect(screen.getByText('Plot')).toBeInTheDocument()
                expect(screen.getByText('Director')).toBeInTheDocument()
                expect(screen.getByText('Stars')).toBeInTheDocument()
                expect(screen.getByText('Plot')).toBeInTheDocument()
                expect(screen.getByText('Very interesting plot')).toBeInTheDocument()
                expect(screen.getByText('IMDb')).toBeInTheDocument()
                expect(screen.getByText('8.8')).toBeInTheDocument()
                expect(screen.getByText('1.6M')).toBeInTheDocument()
            },
            { timeout: 1000 }
        )
    })

    it('displays error message on fetch failure', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('An error occurred'))

        render(
            <MemoryRouter>
                <ToastProvider>
                    <Toast />
                    <MovieDetail />
                </ToastProvider>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Error:')).toBeInTheDocument()
        })
    })
})
