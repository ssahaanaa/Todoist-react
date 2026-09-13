export const CompletedTasksSummary = (({ tasks }) => {
    return (
      <div className="tasks-summary">
        {tasks.map((task) => {
            return (
              <div className="task-summary-card" key={task.id}>
                ✔
                  <div className="task-summary-card-information">
                      {task.title}
                      <div className="d-flex">
                          {task.tags.map((tag, index) => {
                          return (
                            <span key={index} >{tag} {index != task.tags.length -1 ? '●' : null }</span>
                          )
                      })}
                      </div>
                      due On: {task.dueOn}
                  </div>
                  <p className={`task-priority ${task.priority}`}>{task.priority}</p>
              </div>
            )
        })}
      </div>
    )
});