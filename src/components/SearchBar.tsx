import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

const SearchBar = () => {
    return (
        <form className="flex items-center gap-2">
            <div className="relative mx-auto flex w-full min-w-64 max-w-96 items-center rounded-lg border border-neutral-600 shadow-sm">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="w-full rounded-lg bg-neutral-700 p-2 pr-12 text-offWhite placeholder:text-neutral-400 focus:outline-none focus:outline-offset-0 focus:outline-darkRed"
                />
                <button
                    type="submit"
                    className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-r-lg bg-neutral-800 text-offWhite transition-colors duration-150 hover:bg-darkRed hover:text-white"
                >
                    <HiOutlineMagnifyingGlass size={'1.75rem'} />
                </button>
            </div>
        </form>
    )
}

export default SearchBar
