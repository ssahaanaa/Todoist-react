export const TasksSummary = (({tasks, isDueTimeToBeDisplayed, updateTaskInformation }) => {
    return (
        <div className="today-tasks-summary">
            {tasks.map((task) => {
                return (
                    <div className={`task-summary-card cursor-pointer ${task.isCompleted ? 'line-through' : ''}`} key={task.id} >
                        <input type="checkbox" checked={task.isCompleted} onChange={(e) => updateTaskInformation({...task, isCompleted: e.target.checked})} />
                        <p className="task-summary-title">{task.title}</p>
                        <p className="task-priority {task.priority}">{task.priority}</p>
                        {isDueTimeToBeDisplayed && <p className="task-summary-due-date">{task.dueOn}</p>}
                    </div>
                )
            })}
        </div>
    )
});