import { useEffect, useState } from 'react'
import { TMovieListItem, TMovieAPIResponse } from '../../Types/Movie'
import MovieListItem from './MovieListItem'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../Common/Loader'
import { useToast } from '../Common/Toast/ToastContext'
import { AnimatePresence, motion } from 'framer-motion'
import Pagination from '../Common/Pagination/Pagination'

const MovieList = () => {
    const API_KEY = import.meta.env.VITE_API_KEY
    const [loading, setLoading] = useState<boolean>(true)
    const [movies, setMovies] = useState<TMovieListItem[]>([])
    const { searchedName = '', currentPage } = useParams<{ searchedName: string; currentPage: string }>()
    const [totalResults, setTotalResults] = useState<number>(0)
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
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedName}*&page=${currentPage}`)
            const data = response.data as { Response: 'False' | 'True'; Error?: string; Search?: TMovieAPIResponse[]; totalResults?: string }
            if (data) {
                if (data.Response === 'False' && data.Error) {
                    handleErrorResponse(data.Error)
                } else if (data.Search && data.totalResults) {
                    handleSuccessResponse(data.Search, Number(data.totalResults))
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

    const handleSuccessResponse = (moviesData: TMovieAPIResponse[], totalResults: number) => {
        let movieListItems: TMovieListItem[] = moviesData.map((movie: TMovieAPIResponse) => ({
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            img: movie.Poster === 'N/A' ? undefined : movie.Poster,
            imdbID: movie.imdbID,
        }))
        setTotalResults(totalResults)
        setMovies(movieListItems)
        setLoading(false)
    }

    useEffect(() => {
        if (movies.length == 0 || !movies[0]?.title.toLowerCase().includes(searchedName?.toLowerCase())) {
            setLoading(true)
        }
        getData()
    }, [searchedName, currentPage])

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div key={'loader'} className="h-141 text-offWhite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                    <Loader text={searchedName?.length <= 4 ? 'Try to be more specific..' : 'Getting Data'} />
                </motion.div>
            ) : (
                <motion.div key={'content'} className="mt-12 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                    <motion.div
                        className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5"
                        variants={animationVariants.containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {movies.map((movie) => (
                            <MovieListItem key={movie.imdbID} movie={movie} variants={animationVariants.itemVariants} />
                        ))}
                    </motion.div>
                    <div className="mt-14 w-full pb-28">
                        <Pagination totalItems={totalResults} itemsPerPage={10} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MovieList
