import { useLocation, useNavigate } from 'react-router-dom'
import { SearchBar } from './../index'
import { HiArrowLongLeft, HiBookmark } from 'react-icons/hi2'

const TopBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isFavouritesPage = location.pathname.startsWith('/favourites')
    const isBackArrowVisible = location.pathname.startsWith('/detail/') || isFavouritesPage

    return (
        <div className="flex h-11 items-center justify-between gap-4 sm:gap-0">
            <div className="flex-1 text-start">
                {isBackArrowVisible ? (
                    <button
                        className="rounded-full text-offWhite transition-colors hover:bg-darkRed hover:bg-opacity-15 hover:text-brightRed"
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        <HiArrowLongLeft size={40} />
                    </button>
                ) : (
                    <div className="text-offWhite opacity-0">
                        <HiArrowLongLeft size={40} />
                    </div>
                )}
            </div>
            <div className="flex-grow">
                <SearchBar />
            </div>
            <div className="flex-1 text-end">
                {isFavouritesPage ? (
                    <div className="text-offWhite opacity-0">
                        <HiBookmark size={36} />
                    </div>
                ) : (
                    <button
                        className="text-offWhite opacity-75 transition-all hover:scale-105 hover:opacity-100"
                        onClick={() => {
                            if (location.pathname.startsWith('/favourites')) {
                                return
                            }
                            navigate('/favourites/page/1')
                        }}
                    >
                        <HiBookmark size={36} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default TopBar
