import { useContext, useState } from "react";
import { MetaDataContext } from "todoist/contexts/MetaDataContext";
import { ErrorsList } from "todoist/components/common/ErrorsList";
import { Dropdown } from "todoist/components/Dropdown";
import closeOptionUrl from "todoist/assets/close-x.svg";

export const NewProjectCreation = ({ dismiss }) => {
  const [newProject, updateNewProject] = useState({
    title: '',
    color: '',
    description: ''
  });
  const [errors, setErrors] = useState([]);
  const { addProjectInformation } = useContext(MetaDataContext);
  const updateProject = (valueToBeUpdated, prop) => {
    updateNewProject({
      ...newProject,
      [prop]: valueToBeUpdated,
    });
  };
  const validateProjectInformation = (newProject) => {
    let errors = [];
    /* eslint-disable no-extra-boolean-cast */
    if (!Boolean(newProject.title)) {
      errors.push("Project title not present");
    }
    return errors;
  };
  const saveProjectInformation = () => {
    let errors = validateProjectInformation(newProject);
    if (errors.length) {
      setErrors(errors);
      return;
    }
    addProjectInformation(newProject);
    dismiss();
    return;
  };
  const clearErrors = () => {
    setErrors([]);
  };
  return (
    <>
      <div className="modal-dialog-title-actions">
        <span>Add New Project</span>
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
          <label htmlFor="project-title" className="input-field-label">
            Project Name:
          </label>
          <input
            type="text"
            value={newProject.title}
            id="project-title"
            className="input-field w-full"
            onChange={(e) => updateProject(e.target.value, 'title')}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="project-description" className="input-field-label">
            Description:
          </label>
          <textarea
            rows={3}
            cols={10}
            value={newProject.description}
            id="project-description"
            className="input-textarea"
            placeholder="Add Notes (Optional)"
            onChange={(e) => updateProject(e.target.value, 'description')}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="project-color" className="input-field-label">
            Color:
          </label>
          <Dropdown
            rows={3}
            cols={10}
            value={newProject.color}
            id="project-color"
            className="input-textarea"
            placeholder="Add Notes (Optional)"
            onChange={(e) => updateProject(e.target.value, 'color')}
          />
        </div>
      </div>
      <div className="footer-actions">
        <button className="btn-default" onClick={() => dismiss()}>Cancel</button>
        <button className="btn-default accent" onClick={() => saveProjectInformation()}>Add Project</button>
      </div>
    </>
  );
};
