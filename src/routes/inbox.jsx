import { TasksSummary } from "todoist/components/TasksSummary";
import { useContext, useState } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { NotificationContext } from "todoist/contexts/NotificationContext";
import { InlineErrorDisplay } from "todoist/components/common/inlineErrorDisplay";
import { hasError } from "todoist/utils/common";
import { TaskDetailsModal } from "todoist/components/TaskDetailsModal";
import { createPortal } from 'react-dom';
import { ModalDialog } from "todoist/components/common/ModalDialog";

export const Inbox = () => {
    const { unOrganizedTasks, updateTaskInformation, addTaskInformation } = useContext(MetaDataContext);
    const [canShowTaskDetailsModal, toggleDetailsModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [taskDetails, setTaskDetails] = useState({});
    const { success, failure } = useContext(NotificationContext);
    const [newTask, updateNewTask] = useState({
      title: '',
      isCompleted: false,
      priority: 'medium'
    });
    const updateTask = (valueToBeUpdated, prop) => {
      updateNewTask({
        ...newTask,
        [prop]: valueToBeUpdated,
      });
    };
    const handleKeyDown = (event) => {
      let validations = {};
      if (event.key === 'Enter') {
        /* eslint-disable no-extra-boolean-cast */
        if (!newTask.title?.trim()) {
          validations.title = "Title not present";
        }
        if (Object.keys(validations).length) {
          setErrors(validations);
          return;
        }
        addTaskInformation(newTask);
        // Updating new task husk to contain skeleton data after creating task entry
        updateNewTask({
          title: '',
          isCompleted: false,
          priority: 'medium'
        });
        success({ message: 'Unorganized Task has been added successfully'});
        return;
      } else {
        setErrors({});
      }
    }
    const triggerTaskModal = (task) => {
      toggleDetailsModal(!canShowTaskDetailsModal);
      setTaskDetails(task);
    }
    return (
        <> 
            <p className="salutation-title">Inbox</p>
            <p className="description">Capture Tasks before organizing them</p>
            <div className="quick-create-unorg-task">
              <input type="text" value={newTask.title} onChange={(e) => updateTask(e.target.value, 'title')} className={`input-field ${hasError('title', errors) ? 'has-error' : ''}`} placeholder="+ Add a task and press Enter" onKeyDown={handleKeyDown} />
              <InlineErrorDisplay errors={errors} fieldKey="title" />
            </div>
            <div>
              <TasksSummary tasks={unOrganizedTasks} updateTaskInformation={(task) => updateTaskInformation(task)} triggerTaskModal={triggerTaskModal} />
            </div>
            <p className="description margin-top-30px">Select a task to view or edit its details.</p>

            {/* Task Details Modal dialog */}
            {canShowTaskDetailsModal && createPortal(
              <ModalDialog isModalOpen={canShowTaskDetailsModal} triggerClose={(() => toggleDetailsModal(false))} classNamesForContent="modal-dialog medium">
                <TaskDetailsModal taskDetails={taskDetails} dismiss={() => toggleDetailsModal(false)}/>
              </ModalDialog>,
            document.body)}
        </>
    )
}