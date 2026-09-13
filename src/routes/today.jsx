import { TitleDisplay } from "todoist/components/TitleDisplay";
import { CompletionProgressBar } from "todoist/components/CompletionProgressBar";
import { TasksSummary } from "todoist/components/TasksSummary";
import { EmptyState } from 'todoist/components/common/EmptyState';
import todayTasksEmptyState from 'todoist/assets/today-task-empty-state.svg';
import { compareAsc } from "date-fns";
import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';

export const Today = () => {
    const { tasks, updateTaskInformation } = useContext(MetaDataContext);
    const formattedDate = new Intl.DateTimeFormat('en-CA').format(new Date());

    //Today Tasks
    const tasksForToday = tasks.filter((task) => {
        const result = compareAsc(new Date(task.dueOn), new Date(formattedDate));
        if (result === 0) {
            return task;
        }
    });
    const completedTasksForToday = tasksForToday.filter((task) => task.isCompleted);

    // length properties
    const todayTasksLength = tasksForToday.length;
    const completedTasksForTodayLength = completedTasksForToday.length;

    return (
        <>  
            <TitleDisplay title="Today" tasksLength={todayTasksLength} description=" task(s) scheduled" />
            <div className="margin-bottom-20px">
                <CompletionProgressBar completionBarTitle="Progress" numerator={completedTasksForTodayLength} denominator={todayTasksLength} />
            </div>
            {tasksForToday.length>0 ? <TasksSummary tasks={tasksForToday} updateTaskInformation={(task) => updateTaskInformation(task)} /> :  <EmptyState emptyStateLogoUrl={todayTasksEmptyState} title="No Tasks are to be completed for today" /> }
        </>
    )
}