import { useContext, useState } from "react";
import { MetaDataContext } from "todoist/contexts/MetaDataContext";
import { ErrorsList } from "todoist/components/common/ErrorsList";
import { MultiSelect } from "todoist/components/common/MultiSelect";
import { priorityOptions, tagOptions } from "todoist/utils/common";
import closeOptionUrl from "todoist/assets/close-x.svg";

export const NewTaskCreation = ({ dismiss }) => {
  const [newTask, updateNewTask] = useState({
    title: '',
    dueDate: '',
    priority: '',
    tags: [],
    description: ''
  });
  const [errors, setErrors] = useState([]);
  const { addTaskInformation, projects } = useContext(MetaDataContext);
  const updateTask = (valueToBeUpdated, prop) => {
    updateNewTask({
      ...newTask,
      [prop]: valueToBeUpdated,
    });
  };
  const validateTaskInformation = (newTask) => {
    let errors = [];
    /* eslint-disable no-extra-boolean-cast */
    if (!Boolean(newTask.title)) {
      errors.push("Title not present");
    }
    if (!Boolean(newTask.dueDate)) {
      errors.push("Due date for task is not present");
    }
    if (!Boolean(newTask.priority)) {
      errors.push("Priority is not present for this task");
    }
    if (!Boolean(newTask.tags?.length)) {
      errors.push("Tags are not configured for this task");
    }
    return errors;
  };
  const saveTaskInformation = () => {
    let errors = validateTaskInformation(newTask);
    if (errors.length) {
      setErrors(errors);
      return;
    }
    addTaskInformation(newTask);
    dismiss();
    return;
  };
  const clearErrors = () => {
    setErrors([]);
  };
  return (
    <>
      <div className="modal-dialog-title-actions">
        <span>Add New Task</span>
        <button className="p-0 m-0 bg-transparent">
          <img
            src={closeOptionUrl}
            className="icon icon-sm close-option cursor-pointer"
            onClick={dismiss}
          />
        </button>
      </div>
      <ErrorsList errors={errors} clearErrors={clearErrors} />
      <div className="modal-dialog-body">
        <div className="flex flex-col">
          <label htmlFor="task-title" className="input-field-label">
            Task Name:
          </label>
          <input
            type="text"
            value={newTask.title}
            id="task-title"
            className="input-field w-full"
            onChange={(e) => updateTask(e.target.value, 'title')}
          />
        </div>

        <div className="flex-container-wrapper">
          <div className="flex-container-child-field">
            <label htmlFor="due-date" className="input-field-label d-block">
              Due date:
            </label>
            <input
              type="date"
              id="due-date"
              value={newTask.dueDate}
              className="input-field"
              onChange={(e) => updateTask(e.target.value, 'dueDate')}
            />
          </div>
          <div className="flex-container-child-field" >
            <label htmlFor="priority" className="input-field-label d-block">
              Priority:
            </label>
            <select
              name="priorities"
              id="Priority"
              defaultValue="high"
              onChange={(e) => updateTask(e.target.value, "priority")}
              className="input-field py-0"
            >
              {priorityOptions.map((option) => {
                return (
                  <option value={option.value} key={option.value} >
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex-container-wrapper">
          <div className="flex-container-child-field">
            <label htmlFor="Projects" className="input-field-label">
              Project:
            </label>
            <select
              name="projects"
              id="Project"
              onChange={(e) => updateTask(e.target.value, "project")}
              className="input-field"
            >
              {projects.map((option) => {
                return (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex-container-child-field">
            <label htmlFor="tagOptions" className="input-field-label">
              Tags:
            </label>
            <MultiSelect
              options={tagOptions}
              setValue={(updatedTags) => updateTask(updatedTags, 'tags')}
              label="label"
              labelForDisplay="Select Applicable Tags"
              multiSelectLabel="select-tag-options"
            />
          </div>
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="task-description" className="input-field-label">
            Description:
          </label>
          <textarea
            rows={3}
            cols={10}
            value={newTask.description}
            id="task-description"
            className="input-textarea"
            placeholder="Add Notes (Optional)"
            onChange={(e) => updateTask(e.target.value, 'description')}
          />
        </div>
      </div>
      <div className="footer-actions">
        <button className="btn-default" onClick={() => dismiss()}>Cancel</button>
        <button className="btn-default accent" onClick={() => saveTaskInformation()}>Add Task</button>
      </div>
    </>
  );
};
