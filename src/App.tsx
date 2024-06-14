import Toast from './components/Common/Toast/Toast'
import SearchBar from './components/Common/SearchBar'
import MovieList from './components/Movie/MovieList'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/Common/PageNotFound'

function App() {
    // TODO: MovieDetail, Favourites, root route, change bg?

    return (
        <div className="min-h-screen w-full bg-gradient-to-t from-neutral-900 via-offBlack to-neutral-800 p-6 pb-0 font-inter">
            <div className="container mx-auto flex h-full flex-col">
                <Toast />
                <SearchBar />
                <div className="relative flex-1">
                    <Routes>
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/" element={<></>} />
                        <Route path="/search/:searchedName/page/:currentPage" element={<MovieList />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
