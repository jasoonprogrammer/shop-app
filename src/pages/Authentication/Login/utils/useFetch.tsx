import { useState, useEffect } from "react"
import axios from 'axios'

export const useFetch = (username: string, password: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<null|string>(null)
    const api = import.meta.env.VITE_API_URL
    useEffect(() => {
        setIsLoading(true)
        const auth = async () => {
            const data = await axios.post(`${api}/token/`, { username: username, password: password})
            console.log(data)
            setIsLoading(false)
        }

        auth()
    }, [])

    return { isLoading, message}
}