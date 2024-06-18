import { HiOutlineVideoCameraSlash } from 'react-icons/hi2'

type Props = {
    imgLink: string | undefined
    movieTitle: string
}

const MovieImg = ({ imgLink, movieTitle }: Props) => {
    return (
        <>
            {imgLink === undefined ? (
                <div className="flex h-full w-full items-center justify-center bg-neutral-800">
                    <HiOutlineVideoCameraSlash size={64} className="text-offWhite" />
                </div>
            ) : (
                <img src={imgLink} alt={movieTitle} className="h-full w-full object-cover" />
            )}
        </>
    )
}

export default MovieImg
