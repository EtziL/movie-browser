import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FavouritesProvider, useFavourites } from '../components'
import { TMovieListItem } from '../Types/Movie'

interface Store {
    [key: string]: string
}

const localStorageMock = (function () {
    let store: Store = {}
    return {
        getItem(key: string): string | null {
            return store[key] || null
        },
        setItem(key: string, value: string): void {
            store[key] = value.toString()
        },
        clear(): void {
            store = {}
        },
    }
})()

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
})

const TestComponent = () => {
    const { favourites, addFavourite, removeFavourite, isInFavourites } = useFavourites()
    return (
        <div>
            <button onClick={() => addFavourite({ imdbID: 'tt0111161', title: 'The Shawshank Redemption', year: '1994' } as TMovieListItem)}>Add Movie</button>
            <button onClick={() => removeFavourite('tt0111161')}>Remove Movie</button>
            <div>{isInFavourites('tt0111161') ? 'In Favourites' : 'Not In Favourites'}</div>
            <div data-testid="favourites-count">{favourites.length}</div>
        </div>
    )
}

describe('FavouritesContext', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders children correctly', () => {
        render(
            <FavouritesProvider>
                <div>Child Component</div>
            </FavouritesProvider>
        )
        expect(screen.getByText('Child Component')).toBeInTheDocument()
    })

    it('adds and removes a movie from favourites', async () => {
        render(
            <FavouritesProvider>
                <TestComponent />
            </FavouritesProvider>
        )

        const addButton = screen.getByText('Add Movie')
        const removeButton = screen.getByText('Remove Movie')
        const user = userEvent.setup()

        await user.click(addButton)
        expect(screen.getByTestId('favourites-count')).toHaveTextContent('1')
        expect(screen.getByText('In Favourites')).toBeInTheDocument()

        await user.click(removeButton)
        expect(screen.getByTestId('favourites-count')).toHaveTextContent('0')
        expect(screen.getByText('Not In Favourites')).toBeInTheDocument()
    })
})
