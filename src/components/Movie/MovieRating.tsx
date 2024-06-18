type Props = {
    source: string
    rating: string
    numberOfVotes?: string
    maxValue?: string
}

const MovieRating = ({ source, rating, numberOfVotes, maxValue }: Props) => {
    return (
        <div className="flex select-none flex-col items-center">
            <div className="text-sm tracking-wider text-offWhite text-opacity-80">{source}</div>
            <p>
                <span className="text-xl font-bold text-offWhite">{rating}</span>
                {maxValue && <span className="text-sm text-offWhite text-opacity-50">/{maxValue}</span>}
            </p>
            {numberOfVotes && <div className="text-xs text-offWhite text-opacity-65">{numberOfVotes}</div>}
        </div>
    )
}

export default MovieRating
