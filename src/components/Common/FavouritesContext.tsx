import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { TMovieListItem } from '../../Types/Movie'

const FAVOURITES_LS_KEY = 'favourites'

type TFavouritesContext = {
    favourites: TMovieListItem[]
    addFavourite: (movie: TMovieListItem) => void
    removeFavourite: (imdbID: string) => void
    isInFavourites: (imdbID: string) => boolean
}

const defaultFavouritesContext: TFavouritesContext = {
    favourites: [],
    addFavourite: () => {},
    removeFavourite: () => {},
    isInFavourites: () => false,
}

const FavouritesContext = createContext<TFavouritesContext>(defaultFavouritesContext)

export const useFavourites = () => {
    return useContext(FavouritesContext)
}

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
    const [favourites, setFavourites] = useState<TFavouritesContext['favourites']>(JSON.parse(localStorage.getItem(FAVOURITES_LS_KEY) || '[]'))

    useEffect(() => {
        const storedFavourites = localStorage.getItem(FAVOURITES_LS_KEY)
        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(FAVOURITES_LS_KEY, JSON.stringify(favourites))
    }, [favourites])

    const addFavourite = (movie: TMovieListItem) => {
        setFavourites((prevFavourites) => [...prevFavourites, movie])
    }

    const removeFavourite = (imdbID: string) => {
        setFavourites((prevFavourites) => prevFavourites.filter((movie) => movie.imdbID !== imdbID))
    }

    const isInFavourites = (imdbID: string) => {
        return favourites.some((movie) => movie.imdbID === imdbID)
    }

    return <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isInFavourites }}>{children}</FavouritesContext.Provider>
}
