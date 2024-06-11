import { TMovieListItem } from '../../Types/Movie'
import MovieListItem from './MovieListItem'

const MovieList = ({ movies }: { movies: TMovieListItem[] }) => {
    return (
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {movies.map((movie) => (
                <MovieListItem key={movie.imdbID} movie={movie} />
            ))}
        </div>
    )
}

export default MovieList
