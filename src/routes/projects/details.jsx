import { useParams } from "react-router";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { useContext } from 'react';
import { CompletionProgressBar } from "todoist/components/CompletionProgressBar";
import { TasksSummary } from 'todoist/components/TasksSummary';

export const ProjectsDetails = () => {
    const { projects, updateTaskInformation, tasks } = useContext(MetaDataContext);
    const { project_id } = useParams();
    const projectInformation = projects.filter((project) =>  project.id === project_id);
    const tasksAssociatedWithProject = tasks.filter((task) => task.projecId === project_id);
    return (
        <>
            <h1>{projectInformation.title}</h1>
            <p>{projectInformation.description}</p>
            <p className="margin-bottom-20px" />
            <CompletionProgressBar numerator={projectInformation.completedTasks} denominator={projectInformation.totalTasks} />
            <div className="d-flex">
                {projectInformation.totalTasks} {"\u25CB"} {projectInformation.completedTasks} {"\u25CB"} {projectInformation.uncompletedTasks}
            </div>
            <p className="margin-bottom-20px" />
            <TasksSummary tasks={tasksAssociatedWithProject} updateTaskInformation={(task) => updateTaskInformation(task)} />
        </>
    )
}