export const CurrentTasksCompletionCard = (({ totalTasks, completedTasks, unCompletedTasks }) => {
    return (
        <div className="current-tasks-completion-progress">
            {totalTasks}
            Total Tasks
            {completedTasks} {"\u2705"}
            {unCompletedTasks} {"\u25CB"}
        </div>
    )
});