import { Route, Routes } from 'react-router-dom'
import { Toast, MovieList, PageNotFound, MovieDetail, TopBar } from './components/index'

function App() {
    // TODO: Update MovieList on "/favourites" based on removal from localStorage | come-up with better root path | Unit / Integration tests

    return (
        <div className="min-h-screen w-full bg-gradient-to-t from-neutral-900 via-offBlack to-neutral-800 py-6 font-inter sm:pl-[calc(100vw-100%)]">
            <div className="container mx-auto flex h-full flex-col px-6">
                <Toast />
                <TopBar />
                <div className="relative mt-12 flex-1">
                    <Routes>
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/" element={<></>} />
                        <Route path="/search/:searchedName/page/:currentPage" element={<MovieList />} />
                        <Route path="/detail/:imdbID" element={<MovieDetail />} />
                        <Route path="/favourites" element={<MovieList />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
