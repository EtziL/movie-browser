import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatDuration, format } from 'date-fns'
import { TMovieDetail, TMovieDetailAPIResponse } from '../../Types/Movie'
import { Loader, MovieImg, MovieRating, MovieDetailTextSection, useToast } from '../index'

const MovieDetail = () => {
    const API_KEY = import.meta.env.VITE_API_KEY
    const { showToast } = useToast()
    const { imdbID } = useParams<{ imdbID: string }>()
    const [movie, setMovie] = useState<TMovieDetail>({
        title: '',
        releaseDate: '',
        runtime: '',
        actors: '',
        director: '',
        plot: '',
        awards: '',
        genres: [],
        img: undefined,
        imdbRating: '',
        imdbVotes: '',
        rottenTomatoesRating: '',
        metacriticRating: '',
    })
    const [loading, setLoading] = useState<boolean>(true)

    const getData = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
            const data = response.data as TMovieDetailAPIResponse
            if (data) {
                if (data.Response === 'False' && data.Error) {
                    handleErrorResponse(data.Error)
                } else if (data.Response === 'True') {
                    handleSuccessResponse(data)
                }
            }
        } catch (error) {
            handleErrorResponse('An error occurred while getting data')
        }
    }

    const handleErrorResponse = (error: string) => {
        showToast('error', error)
        setLoading(false)
    }

    const handleSuccessResponse = (movieData: TMovieDetailAPIResponse) => {
        const movieDetailData = {
            title: movieData.Title,
            releaseDate: movieData.Released !== 'N/A' ? format(new Date(movieData.Released), 'dd MMM yyyy') : 'Unknown release date',
            runtime: formatRuntime(movieData.Runtime),
            actors: movieData.Actors !== 'N/A' ? movieData.Actors : '',
            director: movieData.Director,
            plot: movieData.Plot !== 'N/A' ? movieData.Plot : '',
            awards: movieData.Awards !== 'N/A' ? movieData.Awards : '',
            genres: movieData.Genre.split(','),
            img: movieData.Poster === 'N/A' ? undefined : movieData.Poster,
            imdbRating: movieData.imdbRating !== 'N/A' ? movieData.imdbRating : undefined,
            imdbVotes: formatVoteCount(Number(movieData.imdbVotes.replace(/,/g, ''))),
            rottenTomatoesRating: movieData.Ratings?.find((rating) => rating.Source === 'Rotten Tomatoes')?.Value,
            metacriticRating: movieData.Ratings?.find((rating) => rating.Source === 'Metacritic')?.Value,
        }
        setMovie(movieDetailData)
        setLoading(false)
    }

    const formatRuntime = (runtime: string) => {
        if (!runtime) return 'Unknown runtime'
        const minutes = parseInt(runtime.split(' ')[0])
        const duration = { hours: Math.floor(minutes / 60), minutes: minutes % 60 }
        const formatedRuntime = formatDuration(duration)
        const formattedRuntime = formatedRuntime.replace('minutes', 'm').replace('hours', 'h').replace('hour', 'h')
        return formattedRuntime.replace(/\d\s/g, (match) => match.trim())
    }

    const formatVoteCount = (votes: number) => {
        if (votes === 0) return undefined
        if (votes >= 1_000_000) {
            return (votes / 1_000_000).toFixed(1) + 'M'
        } else if (votes >= 1_000) {
            return (votes / 1_000).toFixed(1) + 'K'
        } else {
            return votes.toString()
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div key={'loader'} className="h-141 text-offWhite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                    <Loader text="Getting Data" />
                </motion.div>
            ) : (
                <motion.div key={'content'} className="w-full text-offWhite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33 }}>
                    <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-center text-5xl font-medium sm:text-start">{movie.title}</h1>
                            <ul className="mb-2 mt-4 flex justify-center gap-4 text-sm font-light text-neutral-300 sm:justify-start">
                                <li>{movie.releaseDate}</li>
                                <li>{movie.runtime}</li>
                            </ul>
                        </div>
                        <div className="my-4 flex gap-4 sm:my-0 sm:gap-6">
                            {movie.imdbRating && <MovieRating source="IMDb" rating={movie.imdbRating} numberOfVotes={movie.imdbVotes} maxValue="10" />}
                            {movie.metacriticRating && (
                                <MovieRating source="Metacritic" rating={movie.metacriticRating.split('/')[0]} maxValue={movie.metacriticRating.split('/')[1]} />
                            )}
                            {movie.rottenTomatoesRating && <MovieRating source="Rotten Tomatoes" rating={movie.rottenTomatoesRating} />}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                        <div className="h-116 w-72 shrink-0 overflow-hidden rounded-md">
                            <MovieImg imgLink={movie.img} movieTitle={movie.title || ''} />
                        </div>
                        <div>
                            <MovieDetailTextSection heading="Plot" text={movie.plot} />
                            <MovieDetailTextSection heading="Director" text={movie.director} />
                            <MovieDetailTextSection heading="Stars" text={movie.actors} />
                            {movie.awards !== '' && <MovieDetailTextSection heading="Awards" text={movie.awards} />}
                            <div className="mt-4 flex gap-2">
                                {movie.genres.map((genre, index) => (
                                    <div
                                        key={index}
                                        className="center select-none rounded-xl border border-neutral-700 px-2 py-1 text-sm text-offWhite text-opacity-65 transition-colors hover:bg-darkRed hover:bg-opacity-30 hover:text-opacity-100"
                                    >
                                        {genre}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MovieDetail
