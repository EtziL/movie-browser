export type TMovieListItem = {
    title: string
    year: string
    type: 'movie' | 'series' | 'episode'
    img: string | undefined
    imdbID: string
}
