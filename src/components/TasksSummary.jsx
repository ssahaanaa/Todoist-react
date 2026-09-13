export const TasksSummary = ({ tasks, updateTaskInformation, triggerTaskModal }) => {
  return (
    <div className="tasks-summary">
      {tasks.map((task) => {
        return (
          <div className={`task-summary-card cursor-pointer`} key={task.id} onClick={() => triggerTaskModal(task)}>
            <div className="d-flex items-center gap-15px">
              <input
                className={`task-priority ${task.priority} ${task.isCompleted ? "completed" : ""}`}
                type="checkbox"
                checked={task.isCompleted}
                onChange={(e) =>
                  updateTaskInformation({
                    ...task,
                    isCompleted: e.target.checked,
                  })
                }
              />
              <p
                className={`task-summary-title ${task.isCompleted ? "completed" : ""}`}
              >
                {task.title}
              </p>
            </div>
            <p className={`task-priority ${task.priority}`}>{task.priority}</p>
          </div>
        );
      })}
    </div>
  );
};
