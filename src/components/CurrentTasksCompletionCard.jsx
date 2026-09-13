export const CurrentTasksCompletionCard = (({ totalTasks, completedTasks, pendingTasks }) => {
    return (
        <div className="current-tasks-completion-progress">
           <div className="task-category-card">
                <span className="task-category-title">Total Tasks</span>
                <span className="tasks-count">{totalTasks}</span>
            </div>
            <div className="task-category-card">
                <span className="task-category-title">Completed Tasks</span>
                <span className="tasks-count">{completedTasks}</span>
            </div>
            <div className="task-category-card">
                <span className="task-category-title">Pending Tasks</span>
                <span className="tasks-count">{pendingTasks}</span>
            </div>
        </div>
    )
});