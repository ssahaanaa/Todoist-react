import searchTasksUrl from "todoist/assets/search.svg"
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { useContext } from "react";

export const SearchTasks = () => {
  const { tasks } = useContext(MetaDataContext);
  const searchTasks = (taskName) => {
    return tasks.filter((task) => task.includes(taskName)) || [];
  }
  return (
    <div className="search-container">
      <img src={searchTasksUrl} className="icon"/>
      <input type="text" onChange={(e) => searchTasks(e.target.value)} placeholder="Search Tasks" />
    </div>
  )
}