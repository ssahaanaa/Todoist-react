import { useState } from "react"
import { createPortal } from 'react-dom';
import { NewTaskCreation } from "todoist/components/NewTaskCreation";
import { ModalDialog } from "todoist/components/common/ModalDialog";
import { SearchTasks } from "todoist/components/searchTasks";

export const TopBand = () => {
  const [canShowCreationModal, toggleCreationModal] = useState(false);

  return (
    <>
      <div className="top-band">
        <SearchTasks />
        <button onClick={() => toggleCreationModal(true)} className="add-task-top-band">+ Add Task</button>
        {canShowCreationModal && createPortal(
          <ModalDialog isModalOpen={canShowCreationModal} triggerClose={(() => toggleCreationModal(false))} classNamesForContent="modal-dialog medium">
            <NewTaskCreation dismiss={() => toggleCreationModal(false)}/>
          </ModalDialog>,
        document.body)}

      </div>
    </>
  )
}