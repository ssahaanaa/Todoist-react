import { useContext, useState } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { ErrorsList } from 'todoist/common/ErrorsList';
import { MultiSelect } from "todoist/common/MultiSelect";
import { priorityOptions, tagOptions } from "todoist/utils/common";


export const NewTaskCreation = ({toggleTaskCreationModal}) => {
    const [ newTask, updateNewTask ] = useState({});
    const [ errors, setErrors ] = useState([]);
    const { addTaskInformation, projectOptions } = useContext(MetaDataContext);
    const updateTask = ((valueToBeUpdated, prop) => {
        updateNewTask({
            ...newTask,
            [prop]: valueToBeUpdated
        });
    })
    const validateTaskInformation = ((newTask) => {
        let errors = [];
        /* eslint-disable no-extra-boolean-cast */
        if (!Boolean(newTask.title)) {
            errors.push('Title not present');
        }
        if (!Boolean(newTask.description)) {
            errors.push('Description not present');
        }
        if (!Boolean(newTask.dueDate)) {
            errors.push('Due date for task is not present');
        }
        if (!Boolean(newTask.priority)) {
            errors.push('Due date for task is not present');
        }
        if (!Boolean(newTask.tags?.length)) {
            errors.push('Due date for task is not present');
        }
        return errors;
        
    })
    const saveTaskInformation = (() => {
        let errors = validateTaskInformation();
        if (errors.length) {
            setErrors(errors);
            return;
        }
        addTaskInformation(newTask);
        return;
    })
    return (
        <>  
            <ErrorsList errors={errors}/>
            <h1>Add New Task</h1>
            <label htmlFor="task-title">Title:</label>
            <input type="text" value={newTask.title} id="task-title" />
            <label htmlFor="task-description">Description:</label>
            <textarea rows={5} cols={10} value={newTask.description} id="task-description" />

            <div className="d-flex">
                <div>
                    <label htmlFor="due-date">Due date:</label>
                    <input type="date" id="due-date" value={newTask.dueDate} />
                </div>
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <select name="priorities" id="Priority" onChange={(e) => updateTask(e.target.value, "priority")}>
                        {priorityOptions.map((option) => {
                            return (
                                <option value={option.value}>{option.label}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="Projects">Project:</label>
                    <select name="projects" id="Project" onChange={(e) => updateTask(e.target.value, "project")}>
                        {projectOptions.map((option) => {
                            return (
                                <option value={option.value}>{option.label}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <label htmlFor="tagOptions">Tags:</label>
            <MultiSelect options={tagOptions} setValue={updateNewTask} label="label" labelForDisplay="Select Applicable Tags" multiSelectLabel="select-tag-options" />
            <div className="footer-actions">
                <button onClick={() => toggleTaskCreationModal()}>Cancel</button>
                <button onClick={() => saveTaskInformation()}>Add Task</button>
            </div>

        </>
    )
}