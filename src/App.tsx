import { Route, Routes } from 'react-router-dom'
import { Toast, MovieList, PageNotFound, MovieDetail, TopBar } from './components/index'
import { HiArrowUp } from 'react-icons/hi2'

function App() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-t from-neutral-900 via-offBlack to-neutral-800 py-6 font-inter sm:pl-[calc(100vw-100%)]">
            <div className="container mx-auto flex h-full flex-col px-6">
                <Toast />
                <TopBar />
                <div className="relative mt-12 flex-1">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <HiArrowUp className="mx-auto animate-bounce text-4xl text-white" />
                                </div>
                            }
                        />
                        <Route path="/search/:searchedName/page/:currentPage" element={<MovieList />} />
                        <Route path="/detail/:imdbID" element={<MovieDetail />} />
                        <Route path="/favourites/page/:currentPage" element={<MovieList />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
