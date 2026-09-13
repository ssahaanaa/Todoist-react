export const ErrorsList = ({errors}) => {
    return (
        <>
            {errors.length && <ul>
                <div className="form-alert red-alert">
                    {errors.map((error, index) => {
                        return <ul key={index}>{error}</ul>
                    })}
                </div>
            </ul>}
        </>
    )
}