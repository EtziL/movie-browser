export type TMovieListItem = {
    title: string
    year: string
    type: 'movie' | 'series' | 'episode'
    img: string | undefined
    imdbID: string
}

export type TMovieAPIResponse = {
    Title: string
    Year: string
    Type: 'movie' | 'series' | 'episode'
    Poster: string
    imdbID: string
}

export type TMovieDetail = {
    title: string
    releaseDate: string
    runtime: string
    actors: string
    director: string
    plot: string
    awards: string
    genres: string[]
    img: string | undefined
    imdbRating: string | undefined
    imdbVotes: string | undefined
    rottenTomatoesRating: string | undefined
    metacriticRating: string | undefined
}

export type TMovieDetailAPIResponse = {
    Title: string
    Released: string
    Runtime: string
    Actors: string
    Director: string
    Plot: string
    Awards: string
    Genre: string
    Poster: string
    imdbRating: string
    imdbVotes: string
    Ratings: [
        {
            Source: string
            Value: string
        },
    ]
    Response: 'False' | 'True'
    Error?: string
}
