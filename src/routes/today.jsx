import { TitleDisplay } from "todoist/components/TitleDisplay";
import { CompletionProgressBar } from "todoist/components/CompletionProgressBar";
import { CurrentTasksCompletionCard }  from "todoist/components/CurrentTasksCompletionCard";
import { TasksSummary } from "todoist/components/TasksSummary";
import { EmptyState } from 'todoist/components/common/EmptyState';
import overDueTaskEmptyState from 'todoist/assets/empty-state.svg';
import todayTasksEmptyState from 'todoist/assets/today-task-empty-state.svg';
import { compareAsc } from "date-fns";
import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';

export const Today = () => {
    const { tasks, completedTasks, unCompletedTasks, updateTaskInformation } = useContext(MetaDataContext);
    const formattedDate = new Intl.DateTimeFormat('en-CA').format(new Date());

    // length of different types of tasks
    const totalTasks = tasks.length;
    const completedTasksLength = completedTasks.length;
    const uncompletedTasksLength = unCompletedTasks.length;

    //Today Tasks
    const tasksForToday = tasks.filter((task) => {
        const result = compareAsc(new Date(task.dueOn), new Date(formattedDate));
        if (result === 0 && !task.isCompleted) {
            return task;
        }
    });
    const completedTasksForToday = tasksForToday.filter((task) => task.isCompleted);

    const overdueTasks = tasks.filter((task) => {
        const result = compareAsc(new Date(task.dueOn), new Date(formattedDate));
        if (result === -1 && !task.isCompleted) {
            return task;
        }
    })

    // length properties
    const todayTasksLength = tasksForToday.length;
    const completedTasksForTodayLength = completedTasksForToday.length;

    return (
        <>  
        {console.log("tasksForToday", tasksForToday)}
            <TitleDisplay title="Summary" time={formattedDate} additionalClasses="no-border" />
            {totalTasks} Tasks {'\u25CB'} {completedTasksLength} Completed {'\u25CB'} {uncompletedTasksLength} Uncompleted
            <div className="d-flex">
                <CompletionProgressBar numerator={completedTasksLength} denominator={totalTasks} classesToAdd="border-dashed-1px" />
                <CurrentTasksCompletionCard totalTasks={totalTasks} completedTasks={completedTasksLength} unCompletedTasks={uncompletedTasksLength} />
            </div>
            <TitleDisplay title="Overdue Tasks" />
            {overdueTasks.length ? <TasksSummary tasks={overdueTasks} isDueTimeToBeDisplayed={false} updateTaskInformation={(task) => updateTaskInformation(task)} /> : <EmptyState emptyStateLogoUrl={overDueTaskEmptyState} title="No Tasks are Overdue" /> }
            <p className="margin-bottom-20px" />
            <TitleDisplay title="Today's Tasks" />
            {tasksForToday.length ? <TasksSummary tasks={tasksForToday} isDueTimeToBeDisplayed={true} updateTaskInformation={(task) => updateTaskInformation(task)} /> :  <EmptyState emptyStateLogoUrl={todayTasksEmptyState} title="Be Chill!, no tasks for today" /> }
            <p className="margin-bottom-20px">
                <CompletionProgressBar numerator={completedTasksForTodayLength} denominator={todayTasksLength} />
            </p>
        </>
    )
}