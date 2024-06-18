type Props = {
    heading: string
    text: string
}

const MovieDetailTextSection = ({ heading, text }: Props) => {
    return (
        <>
            <h2 className="mt-2 text-xl font-medium">{heading}</h2>
            <p className="border-b pb-2 text-base text-offWhite text-opacity-85">{text}</p>
        </>
    )
}

export default MovieDetailTextSection
