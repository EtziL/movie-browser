import { useEffect, useState } from 'react'
import { TMovieListItem, TMovieAPIResponse } from '../../Types/Movie'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MovieListItem, Loader, Pagination, useToast, useFavourites } from './../index'

const MovieList = () => {
    const API_KEY = import.meta.env.VITE_API_KEY
    console.log(import.meta.env)
    const ITEMS_PER_PAGE = 10
    const [loading, setLoading] = useState<boolean>(true)
    const [movies, setMovies] = useState<TMovieListItem[]>([])
    const [totalResults, setTotalResults] = useState<number>(0)
    const location = useLocation()
    const { searchedName = '', currentPage } = useParams<{ searchedName: string; currentPage: string }>()
    const { showToast } = useToast()
    const { favourites } = useFavourites()

    const isFavouritesPage = location.pathname.startsWith('/favourites')

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

    const getAPIData = async () => {
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
            handleErrorResponse('An error occurred while getting data')
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
        if (!isFavouritesPage) {
            if (movies.length == 0 || !movies[0]?.title.toLowerCase().includes(searchedName?.toLowerCase())) {
                setLoading(true)
            }
            getAPIData()
        }
    }, [searchedName, currentPage, location])

    useEffect(() => {
        if (isFavouritesPage) {
            setMovies(favourites.slice((Number(currentPage) - 1) * ITEMS_PER_PAGE, Number(currentPage) * ITEMS_PER_PAGE))
            setTotalResults(favourites.length)
            setLoading(false)
        }
    }, [currentPage, location, favourites])

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div key={'loader'} className="h-141 text-offWhite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                    <Loader text={searchedName?.length <= 4 ? 'Try to be more specific..' : 'Getting Data'} />
                </motion.div>
            ) : (
                <motion.div key={'content'} className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                    {movies.length === 0 && isFavouritesPage ? (
                        <motion.div className="mt-12 h-141" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                            <h1 className="mt-14 text-center text-xl text-offWhite">
                                You have no <span className="text-2xl text-darkRed decoration-brightRed">favourite</span> movies
                            </h1>
                        </motion.div>
                    ) : (
                        <>
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
                                <Pagination totalItems={totalResults} itemsPerPage={ITEMS_PER_PAGE} />
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MovieList
