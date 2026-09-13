export const TitleDisplay = (({ title, tasksLength, description }) => {
    return (
        <div className="margin-bottom-20px">
            <h1 className="title-display">{title}</h1>
            {tasksLength > 0 && <p className="description">{tasksLength} {description}</p>}
        </div>
    )
})