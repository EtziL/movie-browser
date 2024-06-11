import { useEffect, useState } from 'react'
import { TMovieListItem, TMovieAPIResponse } from '../../Types/Movie'
import MovieListItem from './MovieListItem'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../Common/Loader'
import { useToast } from '../Common/Toast/ToastContext'
import { AnimatePresence, motion } from 'framer-motion'

const MovieList = () => {
    const API_KEY = import.meta.env.VITE_API_KEY
    const [loading, setLoading] = useState<boolean>(true)
    const [movies, setMovies] = useState<TMovieListItem[]>([])
    const { searchedName } = useParams<{ searchedName: string }>()
    const { showToast } = useToast()

    const animationVariants = {
        containerVariants: {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                },
            },
        },
        itemVariants: {
            hidden: { opacity: 0, x: -20 },
            show: { opacity: 1, x: 0 },
        },
    }

    const getData = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedName}*`)
            const data = response.data as { Response: 'False' | 'True'; Error?: string; Search?: TMovieAPIResponse[] }
            if (data) {
                if (data.Response === 'False' && data.Error) {
                    handleErrorResponse(data.Error)
                } else if (data.Search) {
                    handleSuccessResponse(data.Search)
                }
            }
        } catch (error) {
            console.error(error)
            showToast('error', 'Error fetching data. Please try again later.')
            setLoading(false)
        }
    }

    const handleErrorResponse = (error: string) => {
        if (error === 'Too many results.') {
            // Avoid showing Toast straight away
            if (searchedName && searchedName?.length > 4) {
                showToast('error', 'Too many results. Please be more specific.')
            } else return
        }
        showToast('error', error)
        setLoading(false)
    }

    const handleSuccessResponse = (moviesData: TMovieAPIResponse[]) => {
        let movieListItems: TMovieListItem[] = moviesData.map((movie: TMovieAPIResponse) => ({
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            img: movie.Poster === 'N/A' ? undefined : movie.Poster,
            imdbID: movie.imdbID,
        }))
        setMovies(movieListItems)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getData()
    }, [searchedName])

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div key={'loader'} className="h-full text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                    <Loader />
                </motion.div>
            ) : (
                <motion.div
                    className="mt-12 grid grid-cols-2 gap-5 pb-56 md:grid-cols-3 lg:grid-cols-5"
                    variants={animationVariants.containerVariants}
                    initial="hidden"
                    animate="show"
                    key={'content'}
                >
                    {movies.map((movie) => (
                        <MovieListItem key={movie.imdbID} movie={movie} variants={animationVariants.itemVariants} />
                    ))}
                    {/* TODO: Add Pagination */}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MovieList
