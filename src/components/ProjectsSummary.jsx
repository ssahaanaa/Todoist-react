import { CompletionProgressBar } from "todoist/components/CompletionProgressBar";

export const ProjectsSummary = ({projects}) => {
    return (
        <>
            {projects.map((project) => {
                return (
                    <div>
                        <div className="d-flex justify-content-around">
                            <p className="project-title">{project.title}</p>
                            {">"}
                        </div>
                        <p>{project.totalTasks} Tasks</p>
                        <p>{project.completedTasks}</p>
                        <p>{project.completedPercentage}</p>
                        <CompletionProgressBar numerator={project.completedTasks} denominator={project.totalTasks} />
                    </div>
                )
            })}
        </>
    )
}