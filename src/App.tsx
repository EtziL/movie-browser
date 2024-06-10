import { useEffect } from 'react'
import axios from 'axios'
import { useToast } from './components/Toast/ToastContext'
import Toast from './components/Toast/Toast'

function App() {
    const API_KEY = import.meta.env.VITE_API_KEY

    const { showToast } = useToast()

    const getData = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=batman`)
            localStorage.setItem('responseData', JSON.stringify(response.data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('responseData') === null) {
            getData()
        } else {
            const responseData = localStorage.getItem('responseData')
            if (responseData !== null) {
                console.log(JSON.parse(responseData))
            }
        }
    }, [])

    return (
        <div className="bg-offBlack font-inter container mx-auto h-screen p-6">
            <div className="flex h-full items-center justify-center">
                <button onClick={() => showToast('info', 'Info Msg')} className="bg-brightRed text-offWhite mx-auto mt-5 rounded-lg p-2">
                    Info
                </button>
                <button onClick={() => showToast('error', 'Error Msg')} className="bg-brightRed text-offWhite mx-auto mt-5 rounded-lg p-2">
                    Error
                </button>
                <button onClick={() => showToast('success', 'Success Msg')} className="bg-brightRed text-offWhite mx-auto mt-5 rounded-lg p-2">
                    Success
                </button>
            </div>
            <Toast />
        </div>
    )
}

export default App
