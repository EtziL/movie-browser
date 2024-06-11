import { useEffect, useState } from 'react'
import { TMovieListItem } from '../../Types/Movie'
import { HiOutlineHeart, HiHeart, HiOutlineVideoCameraSlash } from 'react-icons/hi2'
import { motion } from 'framer-motion'

const FAVOURITES_LS_KEY = 'favourites'
const MovieListItem = ({ movie, variants }: { movie: TMovieListItem; variants: any }) => {
    const [isFavourited, setIsFavourited] = useState<boolean>(false)

    useEffect(() => {
        const favourites = getFavourites()
        if (favourites.includes(movie.imdbID)) {
            setIsFavourited(true)
        }
    }, [movie.imdbID])

    const handleFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const favourites = getFavourites()
        if (favourites.includes(movie.imdbID)) {
            const filteredFavourites = favourites.filter((favourite: string) => favourite !== movie.imdbID)
            setFavourites(filteredFavourites)
            setIsFavourited(false)
        } else {
            const updatedFavourites = [...favourites, movie.imdbID]
            setFavourites(updatedFavourites)
            setIsFavourited(true)
        }
    }

    const getFavourites = (): string[] => {
        const favourites = localStorage.getItem(FAVOURITES_LS_KEY)
        return favourites ? JSON.parse(favourites) : []
    }

    const setFavourites = (favourites: string[]) => {
        localStorage.setItem(FAVOURITES_LS_KEY, JSON.stringify(favourites))
    }

    return (
        <motion.div
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl shadow-sm"
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            variants={variants}
        >
            {movie.img === undefined ? (
                <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-neutral-800">
                    <HiOutlineVideoCameraSlash size={64} className="text-offWhite" />
                </div>
            ) : (
                <img src={movie.img} alt={movie.title} className="h-full w-full rounded-t-xl" />
            )}
            <div className="flex h-32 w-full items-start justify-between gap-1 rounded-b bg-neutral-800 px-2">
                <div className="text-offWhite">
                    <h3 className="mt-2 line-clamp-2 overflow-hidden text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm font-light opacity-65">{movie.year}</p>
                </div>
                <div className="self-center">
                    <motion.button
                        className={`group rounded-full bg-opacity-0 p-2 transition-colors ${isFavourited ? 'text-brightRed hover:bg-neutral-500 hover:bg-opacity-100 hover:text-white' : 'text-offWhite hover:bg-darkRed hover:bg-opacity-30 hover:text-brightRed'}`}
                        onClick={handleFavourite}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        {isFavourited ? (
                            <div className="group-hover:">
                                <HiHeart size={32} />
                            </div>
                        ) : (
                            <div>
                                <HiOutlineHeart size={32} />
                            </div>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default MovieListItem
