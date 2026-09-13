import { useContext, useState } from "react";
import { MetaDataContext } from "todoist/contexts/MetaDataContext";
import { MultiSelect } from "todoist/components/common/MultiSelect";
import { priorityOptions, tagOptions } from "todoist/utils/common";
import { InlineErrorDisplay } from "todoist/components/common/inlineErrorDisplay";
import closeOptionUrl from "todoist/assets/close-x.svg";
import { hasError } from "todoist/utils/common";
import { NotificationContext } from "todoist/contexts/NotificationContext";

export const TaskDetailsModal = ({ dismiss, updateTaskInformation, taskDetails }) => {
  const [newTask, updateNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'low',
    tags: [],
    description: ''
  });
  const [errors, setErrors] = useState([]);
  const { addTaskInformation, projects } = useContext(MetaDataContext);
  const { success, failure } = useContext(NotificationContext);

  const updateTask = (valueToBeUpdated, prop) => {
    updateNewTask({
      ...newTask,
      [prop]: valueToBeUpdated,
    });
  };
  const minDate = new Date().toLocaleDateString('en-CA');
  const validateTaskInformation = (newTask) => {
    let errors = [];
    /* eslint-disable no-extra-boolean-cast */
    if (!Boolean(newTask.title)) {
      errors.title = "Title not present";
    }
    if (!Boolean(newTask.dueDate)) {
      errors.dueDate = "Due date for task is not present";
    }
    if (!Boolean(newTask.priority)) {
      errors.priority = "Priority is not present for this task";
    }
    if (!Boolean(newTask.tags?.length)) {
      errors.tags = "Tags are not configured for this task";
    }
    return errors;
  };
  const saveTaskInformation = () => {
    let errors = validateTaskInformation(newTask);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    addTaskInformation(newTask);
    dismiss();
    success({ message: 'Task has been updated successfully'});
    return;
  };
  return (
    <>
      <div className="modal-dialog-title-actions">
        <span>Task Details</span>
        <button className="p-0 m-0 bg-transparent">
          <img
            src={closeOptionUrl}
            className="icon icon-sm close-option cursor-pointer"
            onClick={dismiss}
          />
        </button>
      </div>
      <div className="modal-dialog-body">
        <div className="flex flex-col mb-">
          <input
            className={`task-priority ${taskDetails.priority} ${taskDetails.isCompleted ? "completed" : ""}`}
            type="checkbox"
            checked={taskDetails.isCompleted}
            onChange={(e) =>
              updateTaskInformation({
                ...task,
                isCompleted: e.target.checked,
              })
            }
          />
            {taskDetails.title}
        </div>

        <div className="flex-container-wrapper">
          <div className="flex-container-child-field">
            <label htmlFor="due-date" className="input-field-label d-block">
              Due date:
            </label>
            <input
              type="date"
              id="due-date"
              min={minDate}
              value={newTask.dueDate}
              className={`input-field  ${hasError('dueDate', errors) ? 'has-error': ''}`}
              onChange={(e) => updateTask(e.target.value, 'dueDate')}
            />
            <InlineErrorDisplay errors={errors} fieldKey="dueDate" />
          </div>
          <div className="flex-container-child-field" >
            <label htmlFor="priority" className="input-field-label d-block">
              Priority:
            </label>
            <select
              name="priorities"
              id="Priority"
              value={newTask.priority}
              onChange={(e) => updateTask(e.target.value, "priority")}
              className={`input-field py-0 ${hasError('priority', errors) ? 'has-error': ''}`}
            >
              {priorityOptions.map((option) => {
                return (
                  <option value={option.value} key={option.value}  >
                    {option.label}
                  </option>
                );
              })}
            </select>
            <InlineErrorDisplay errors={errors} fieldKey="priority" />
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
            
          </div>

        </div>
        <div className="d-flex flex-column">
          <label htmlFor="task-description" className="input-field-label">
            Description:
          </label>
          <textarea
            rows={3}
            cols={10}
            value={taskDetails.description}
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
