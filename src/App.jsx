import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthRouter } from './routers/AuthRouter.jsx'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContextProvider from './context/AuthContextProvider.jsx'


axios.interceptors.request.use(
  config => {
    config.headers.authorization = "Bearer " + localStorage.getItem("access")
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.defaults.withCredentials = true

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const api = import.meta.env.VITE_API_URL
  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("access")}`
    const headers = {'Content-Type': "application/json", "Authorization": token}
    const auth = async () => {
      const res = await axios.post(`${api}/token/verify/`).catch(err => {
        if(err.code === "ERR_NETWORK") {
          alert(err.message)
        } else {
            
          if(err.response.status !== 401) {

            setIsAuthenticated(true)
          } else {
            axios.post(`${api}/token/refresh/`, { refresh: localStorage.getItem("refresh")}).then(
              res => {
                localStorage.setItem("access", res.data.access)
                localStorage.setItem("refresh", res.data.refresh)
                setIsAuthenticated(true)
              }
            ).catch(err => {
              
            })
          }
        }
      })
      
      

    }

    auth()
  }, [])
return (
    <>
    <AuthContextProvider value = {{ isAuthenticated: isAuthenticated, setIsAuthenticated: setIsAuthenticated}}>
    {!isAuthenticated ?
    <RouterProvider router = {AuthRouter} />
    :
    <div>Welcome!</div>
    }
    </AuthContextProvider>
    </>
  )
}

export default App
