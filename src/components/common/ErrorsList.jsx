export const ErrorsList = ({errors, clearErrors}) => {
    return (
        <>
            {errors.length > 0 && <button onClick={clearErrors}>X</button>}
            {errors.length > 0 && <ul>
                <div className="form-alert red-alert">
                    {errors.map((error, index) => {
                        return <ul key={index}>{error}</ul>
                    })}
                </div>
            </ul>}
        </>
    )
}