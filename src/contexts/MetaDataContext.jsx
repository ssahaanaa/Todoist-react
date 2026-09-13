import { createContext } from "react";

const defaultOptions = {
  tasks: [],
  completedTasks: [],
  unCompletedTasks: [],
  unOrganizedTasks: [],
  projects: [],
  addProject: () => {},
  addTaskInformation: () => {},
  updateTaskInformation: () => {}
};

export const MetaDataContext = createContext({defaultOptions});