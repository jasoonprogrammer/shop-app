import SignupImage from "./SignupImage"
import SignupForm from "./SignupForm"
const SignUp = () => {
    return(
        <>
        <div className="w-screen h-screen bg-gradient-to-br  from-cyan-300 to-yellow-500 flex justify-center items-center">
            <div className="w-[40rem] md:h-[30rem] justify-center items-center bg-white shadow md:mx-0 mx-16 md:flex">
                <SignupForm />
                <SignupImage />
            </div>
        </div>
        </>
    )
}

export default SignUp