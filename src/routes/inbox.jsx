import { UnorganizedTasksSummary } from "todoist/components/UnorganizedTasksSummary";
import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
export const Inbox = () => {
    const triggerTaskManagementModal = (task) => {
        console.log(task);
        // Todo: implement modal dialog configuration
    }
    const { unOrganizedTasks } = useContext(MetaDataContext);
    return (
        <>
            <h2>Inbox:
            Unorganized Tasks</h2>
            <div className="tasks-list-wrapper">
              <UnorganizedTasksSummary unorganizedTasks={unOrganizedTasks} triggerTaskManagementModal={(task) => triggerTaskManagementModal(task)} />
            </div>
            {unOrganizedTasks.length && <p className="margin-bottom-20px">
                {unOrganizedTasks.length} tasks in Inbox
            </p>}
        </>
    )
}