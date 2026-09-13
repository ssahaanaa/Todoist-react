import { createContext } from "react";

const defaultOptions = {
  tasks: [],
  completedTasks: [],
  pendingTasks: [],
  unOrganizedTasks: [],
  projects: [],
  addProject: () => {},
  addTaskInformation: () => {},
  updateTaskInformation: () => {}
};

export const MetaDataContext = createContext({defaultOptions});