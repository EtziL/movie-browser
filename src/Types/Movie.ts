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
