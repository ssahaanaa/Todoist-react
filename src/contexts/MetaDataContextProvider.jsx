import { useState } from "react";
import { MetaDataContext } from "todoist/contexts/MetaDataContext";
import { compareAsc } from "date-fns";

export const MetaDataContextProvider = (({children}) => {
  const compareFunction = ((a,b) => {
    return compareAsc(new Date(a.dueOn), new Date(b.dueOn));
   })
   const fetchTasksFromLocal = (() => {
        let localisedTasks = window.localStorage.getItem('tasks');
        if (!localisedTasks) {
          return [];
        }
        return JSON.parse(localisedTasks).sort(compareFunction);
   });
   const fetchProjectsFromLocal = (() => {
     let localisedProjects = window.localStorage.getItem('projects');
     return JSON.parse(localisedProjects) || [];
   })
   const [tasks, setTasks] = useState(() => fetchTasksFromLocal());
   const [projects, setProjects] = useState(() => fetchProjectsFromLocal());

   // Filtering different tasks
   const completedTasks = tasks.filter((task) => task.isCompleted);
   const unCompletedTasks = tasks.filter((task) => !task.isCompleted);
   const unOrganizedTasks = tasks.filter((task) => !task.projectId);
   // UPDATE, CREATE Tasks
   const updateTaskInformation = (task) => {
     let otherTasks = tasks.filter((t) => t.id !== task.id);
     let updatedTasks = [...otherTasks, task];   
     updatedTasks.sort(compareFunction)
     setTasks(updatedTasks);
     window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
   };
   const addTaskInformation = (task) => {
     let updatedTasks = [...tasks, task];
     setTasks(updatedTasks);
     window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
   }
   const addProject = (project) => {
     let updatedProjects = [...projects, project];
     setProjects(updatedProjects);
     window.localStorage.setItem('projects', updatedProjects);
   }

   return <MetaDataContext value={{
    tasks,
    completedTasks,
    unCompletedTasks,
    unOrganizedTasks,
    projects,
    addProject,
    addTaskInformation,
    updateTaskInformation }}>{children}</MetaDataContext>
})