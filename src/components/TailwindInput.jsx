const TailwindInput = (props) => {
    const {type, value, onChange, placeholder, className, errors} = props
    return(
        <>
        <input type={type} value={value} onChange = {onChange} className={className} placeholder = {placeholder}/>
        {errors.map(error => {
            if(error) {
            return <p className="text-red-500 justify-self-start text-[12px]">{error}</p>
            }
        })
        }
        </>
    )
}

export default TailwindInput