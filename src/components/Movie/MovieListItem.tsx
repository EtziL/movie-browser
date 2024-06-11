import { useEffect, useState } from 'react'
import { TMovieListItem } from '../../Types/Movie'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2'
import { motion } from 'framer-motion'

const MovieListItem = ({ movie }: { movie: TMovieListItem }) => {
    const [isFavourited, setIsFavourited] = useState<boolean>(false)

    useEffect(() => {
        const favourites = localStorage.getItem('favourites')
        if (favourites) {
            const favouritesArray = JSON.parse(favourites)
            if (favouritesArray.includes(movie.imdbID)) {
                setIsFavourited(true)
            }
        }
    }, [movie.imdbID])

    const handleFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const favourites = localStorage.getItem('favourites')
        if (favourites) {
            const favouritesArray = JSON.parse(favourites)
            if (favouritesArray.includes(movie.imdbID)) {
                const filteredFavourites = favouritesArray.filter((favourite: string) => favourite !== movie.imdbID)
                localStorage.setItem('favourites', JSON.stringify(filteredFavourites))
                setIsFavourited(false)
            } else {
                const updatedFavourites = [...favouritesArray, movie.imdbID]
                localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
                setIsFavourited(true)
            }
        } else {
            localStorage.setItem('favourites', JSON.stringify([movie.imdbID]))
            setIsFavourited(true)
        }
    }

    return (
        <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl shadow-sm sm:transition-transform sm:hover:scale-105">
            <img src={movie.img} alt={movie.title} className="h-full w-full rounded-t-xl" />
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
        </div>
    )
}

export default MovieListItem
