import { useContext, useState } from "react"
import signupImage from "./assets/sign_up.jpg"
import axios from "axios"
import TailwindInput from "../../../components/TailwindInput"
import { AuthContext } from "../../../context/AuthContextProvider"
import { redirect, useNavigate } from "react-router-dom"

const SignupForm = () => {
    const nav = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [email1, setEmail1] = useState('')
    const [email2, setEmail2] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [passwordMismatch, setPasswordMismatch] = useState('')
    const [emailMismatch, setEmailMismatch] = useState('')
    const [errors, setErrors] = useState({})
    const api = import.meta.env.VITE_API_URL
    const register = e => {
        e.preventDefault();
        let hasError = false
        if(email1 !== email2) {
            setEmailMismatch(current => 'Emails dont match')
            hasError = true
        }
        else {
            setEmailMismatch(current => '')
        }
        if(password1 !== password2) {
            setPasswordMismatch(current => 'Passwords dont match')
            hasError = true
        } else {
            setPasswordMismatch(current => '')
        }


        if(!hasError) {
            console.log("aOk")
            axios.post(`${api}/user/create/`, {
                username: username,
                password: password1,
                email: email1,
                birthdate: birthdate,
                first_name: firstName,
                last_name: lastName
            }).then(data => {
                axios.post(`${api}/token/`, { username: username, password: password1}).then(
                    res => {
                        console.log(res)
                        localStorage.setItem("access", res.data.access)
                        localStorage.setItem("refresh", res.data.refresh)
                        nav("/")
                        setIsAuthenticated(true)
                    }
                )
            }).catch(err => {
                setErrors(() => err.response.data)
            })
        }
        
    }

    return(
        <>
            <div className={`flex-grow-[2] flex justify-center items-center signup-background`}>
                <div className="justify-center items-center text-center px-12">
                    <h1 className="font-semibold text-2xl block text-white md:text-black">Sign Up</h1>
                    <form className="w-full grid gap-2 mt-3" onSubmit = {register}>
                        <TailwindInput type="text" className="tailwind-input" placeholder="Username" value = { username } onChange = { e => { setUsername(e.target.value) }} errors = {[errors.username]}/>
                        <TailwindInput type="email" className="tailwind-input" placeholder="Email" value = { email1 } onChange = { e => { setEmail1(e.target.value) }} errors = {[emailMismatch, errors.email]}/>

                        <input type="email" className="tailwind-input" placeholder="Confirm Email" value = { email2 } onChange = { e => { setEmail2(e.target.value) }}/>
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" className="tailwind-input" placeholder="First name" value = { firstName } onChange = { e => { setFirstName(e.target.value) }}/>
                            <input type="text" className="tailwind-input" placeholder="Last name" value = { lastName } onChange = { e => { setLastName(e.target.value) }}/>
                        </div>
                        <div className="flex items-center">
                            <span className="me-2 px-2 py-1 rounded bg-slate-200">Birthdate: </span>
                            <input type="date" className="tailwind-input w-full" value = {birthdate} onChange = {e => { setBirthdate(e.target.value) }} required/>
                        </div>
                        <TailwindInput type="password" className="tailwind-input" placeholder="Password" value = { password1 } onChange = { e => { setPassword1(e.target.value) }} errors = {[errors.password, passwordMismatch]}/>
                        
                        <input type="password" className="tailwind-input" placeholder="Confirm Password" value = { password2 } onChange = { e => { setPassword2(e.target.value) }}/>
                        <button className="btn-primary">Register</button>
                        <div className="flex items-center">
                            <small className="text-slate-400 me-2"><span>Already registered?</span></small>
                            <a href="/"><small className="text-blue-600"><span>Sign in Here</span></small></a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupForm