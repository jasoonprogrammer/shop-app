import loginImage from "./assets/pc_purchase.jpg"

const LoginImage = () => {
    return(
        <>
        <div className="h-64 md:justify-center md:items-center md:flex md:w-full md:h-full overflow-hidden p-2 md:p-0">
            <img src={loginImage} alt="Purchasing PC" className="md:scale-[1.6] md:translate-x-10 md:translate-y-5"/>
        </div>
        </>
    )
}

export default LoginImage