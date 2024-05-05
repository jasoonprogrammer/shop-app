import { useContext, useState } from "react";
import { useFetch } from "./utils/useFetch";
import React from "react";
import axios from "axios";
import loading from '../../../assets/loading.gif'
import { AuthContext } from "../../../context/AuthContextProvider";
const LoginForm = () => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const api = import.meta.env.VITE_API_URL

    const handleLogin = e => {
        e.preventDefault();
        const auth = async () => {
            setIsLoading(true)
            const data = await axios.post(`${api}/token/`, {username: username, password: password})
            .catch(err => {
                if (err.response.status === 401) {
                    setError("Invalid Credentials")
                } else {
                    setError('')
                }

            }).catch(err => {
                alert("Network Error")
            })
            if (data !== undefined) {
                setError('')
                setIsAuthenticated(true)
                localStorage.setItem('access', data.data.access)
                localStorage.setItem('refresh', data.data.refresh)
            } else {
            }

            setIsLoading(false)
        }
        auth()
    }

    return (
        <>
        <div className="content-center py-5 md:py-0">
            <form className="w-full flex justify-center" onSubmit = { handleLogin }>
                {/* made the div relative and header absolute so the form is always centered */}
                <div className="grid gap-3 md:w-full w-96 px-8">
                    <h1 className='font-semibold text-2xl md:top-[-3rem] md:left-8'>Login</h1>

                    <input type="text" 
                    className="tailwind-input" 
                    placeholder="Username" 
                    value = { username } 
                    onChange = {e => { setUsername(e.target.value) } }
                    required/>


                    <input type="password" 
                    className="tailwind-input" 
                    placeholder="Password" 
                    value = { password } 
                    onChange = {e => { setPassword(e.target.value) } }
                    required/>

                    {!isLoading ?
                    <button className="btn-primary">Submit</button> :
                    <div className="flex justify-center h-8">
                        <img src={loading} alt="Loading GIF" />
                    </div>
                    }
                    <div className="flex justify-end">
                        <a className="cursor-pointer me-auto" href="/register">
                            <small className="text-blue-600">Register Here</small>
                        </a>
                        <a className="cursor-pointer">
                            <small className="text-gray-400">Forgot password?</small>
                        </a>
                    </div>
                    {error && 
                    <div className="flex justify-center bg-red-400 rounded-md">
                        <span className="text-center text-md  text-white py-1">{error}</span>
                    </div>
                    }
                </div>
            </form>
        </div>
        </>
    )
}

export default LoginForm