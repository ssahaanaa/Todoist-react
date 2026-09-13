export const TitleDisplay = (({ title, time = "", additionalClasses = "" }) => {
    return (
        <div className={`title-display ${additionalClasses.length ?  additionalClasses: ""}`}>
            <h1 className="title">{title}</h1>
            {time.length>0 && <p className="time">{time}</p>}
        </div>
    )
})