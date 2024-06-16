import { useNavigate, useParams } from 'react-router-dom'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import PaginationBtn from './PaginationBtn'

type Props = {
    totalItems: number
    itemsPerPage: number
}

const Pagination = ({ totalItems, itemsPerPage }: Props) => {
    const { searchedName, currentPage } = useParams<{ searchedName: string; currentPage: string }>()
    const navigate = useNavigate()
    const currentPageNumber = Number(currentPage)

    const navigateToPage = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        navigate(`/search/${searchedName}/page/${page}`)
    }

    const numberOfPages = Math.ceil(totalItems / itemsPerPage)

    const renderPageNumbers = () => {
        const pages = []
        let startPage, endPage

        if (currentPageNumber <= 4) {
            startPage = 2
            endPage = Math.min(5, numberOfPages)
        } else if (currentPageNumber > numberOfPages - 4) {
            startPage = numberOfPages - 4
            endPage = numberOfPages - 1
        } else {
            startPage = currentPageNumber - 1
            endPage = currentPageNumber + 1
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(<PaginationBtn key={i} onClickFnc={() => navigateToPage(i)} pageNumber={i} active={currentPageNumber === i} />)
        }

        return pages
    }

    return (
        <div className="flex items-center justify-center text-offWhite">
            <div className="flex space-x-1">
                {/* Prev & First */}
                <PaginationBtn disabledCondition={currentPageNumber === 1} onClickFnc={() => navigateToPage(currentPageNumber - 1)} Icon={HiChevronLeft} />
                <PaginationBtn onClickFnc={() => navigateToPage(1)} pageNumber={1} active={currentPageNumber === 1} />

                {currentPageNumber > 4 && <div className="self-center">...</div>}
                {/* ... Previous, Actual, Next ... */}
                {renderPageNumbers()}
                {currentPageNumber < numberOfPages - 3 && <div className="self-center">...</div>}

                {/* Last & Next */}
                {numberOfPages > 5 && (
                    <PaginationBtn onClickFnc={() => navigateToPage(numberOfPages)} pageNumber={numberOfPages} active={currentPageNumber === numberOfPages} />
                )}
                <PaginationBtn disabledCondition={currentPageNumber === numberOfPages} onClickFnc={() => navigateToPage(currentPageNumber + 1)} Icon={HiChevronRight} />
            </div>
        </div>
    )
}

export default Pagination
