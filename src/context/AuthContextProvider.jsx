import { createContext } from "react"

export const AuthContext = createContext()

const AuthContextProvider = (props) => (<AuthContext.Provider value = {props.value}>
    { props.children }
</AuthContext.Provider>)

export default AuthContextProvider