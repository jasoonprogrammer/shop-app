import signupImage from "./assets/sign_up.jpg"

const SignupImage = () => {
    return(
        <>
        <div className={`flex-grow-[1] md:flex md:justify-center md:items-center md:w-full md:h-full overflow-hidden hidden`}>
            <img src={signupImage} alt="Signing Up" className="scale-y-[1.8] scale-x-[-1.8]"/>
        </div>
        </>
    )
}

export default SignupImage