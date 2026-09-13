import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { ProjectsSummary } from "todoist/components/ProjectsSummary";
import { createPortal } from "react-dom";

export const ProjectsList = () => {
    let { projects } = useContext(MetaDataContext);
    const createNewProject = () => {
        // Todo: implement modal configuration
    }
    return (
        <>
            <h1>Projects</h1>
            <p onClick={createNewProject}>+ Add Project</p>
            <ProjectsSummary projects={projects} />
        </>
    )
}