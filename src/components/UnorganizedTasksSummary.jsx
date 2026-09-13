export const UnorganizedTasksSummary = ({unorganizedTasks, triggerTaskManagementModal}) => {
    return (
        <>
            {unorganizedTasks.length ? unorganizedTasks.map((task) => {
                return (
                    <div key={task.id} className="unorganized-task-card" onClick={(task) => triggerTaskManagementModal(task)}>
                        <div className="unorganized-task-card-title">
                            <p>{task.title}</p>
                            <p>{task.priority}</p>
                        </div>
                        <div>
                            No Project {"\u25CB"}
                            {task.dueOn ? <p>{task.dueOn}</p> : <p>No Due Date</p>}
                        </div>
                    </div>
                )
            }) : <p>No Unorganized Tasks</p>}
        </>
    )
}