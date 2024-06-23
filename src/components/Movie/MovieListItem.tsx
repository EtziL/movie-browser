import { TMovieListItem } from '../../Types/Movie'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MovieImg, useFavourites } from './../index'

const MovieListItem = ({ movie, variants }: { movie: TMovieListItem; variants: any }) => {
    const navigate = useNavigate()
    const { addFavourite, removeFavourite, isInFavourites } = useFavourites()

    const isFavourited = isInFavourites(movie.imdbID)

    const handleFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (isFavourited) {
            removeFavourite(movie.imdbID)
        } else {
            addFavourite(movie)
        }
    }

    return (
        <motion.div
            data-testid="movie-list-item"
            className="flex h-90 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-b-md rounded-t-xl border border-neutral-700 border-opacity-60 shadow-sm md:h-116 xl:h-141"
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            variants={variants}
            onClick={() => navigate(`/detail/${movie.imdbID}`)}
        >
            <MovieImg imgLink={movie.img} movieTitle={movie.title} />
            <div className="flex h-32 w-full items-start justify-between gap-1 rounded-b-md bg-neutral-800 px-2">
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
