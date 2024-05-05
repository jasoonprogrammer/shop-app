import LoginForm from "./LoginForm"
import LoginImage from "./LoginImage"
const Login = () => {
    return(
        <div className="w-screen h-screen bg-gradient-to-br  from-cyan-300 to-yellow-500 flex justify-center items-center">
            <div className="w-[40rem] md:h-[18rem] justify-center items-center md:grid md:grid-cols-2 bg-white shadow md:mx-0 mx-16">
                <LoginImage />
                <LoginForm />
            </div>
        </div>
    )
}

export default Login