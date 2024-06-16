import { useEffect, useState } from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from './Toast/ToastContext'

const SearchBar = () => {
    const [searchedName, setSearchedName] = useState<string>('')
    const [debouncedName, setDebouncedName] = useState<string>('')
    const { pageNumber = '1' } = useParams<{ pageNumber: string }>()
    const navigate = useNavigate()
    const { showToast } = useToast()

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedName(searchedName)
        }, 250)

        return () => {
            clearTimeout(timerId)
        }
    }, [searchedName])

    useEffect(() => {
        if (debouncedName) {
            const formatedSearchedName = debouncedName.trim().replace(/\s/g, '+')
            navigate(`/search/${formatedSearchedName}/page/${pageNumber}`)
        }
    }, [debouncedName])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (searchedName.trim() === '') {
            showToast('error', 'Please enter a movie name.')
            return
        }

        e.currentTarget.reset()
    }

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <div className="relative mx-auto flex w-full min-w-64 max-w-96 items-center rounded-lg border border-neutral-600 shadow-sm">
                <input
                    onChange={(e) => setSearchedName(e.target.value)}
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
