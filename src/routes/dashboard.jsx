import { TitleDisplay } from "todoist/components/TitleDisplay";
import { CompletionProgressBar } from "todoist/components/CompletionProgressBar";
import { CurrentTasksCompletionCard }  from "todoist/components/CurrentTasksCompletionCard";
import { TasksSummary } from "todoist/components/TasksSummary";
import todayTasksEmptyState from 'todoist/assets/today-task-empty-state.svg';
import { EmptyState } from 'todoist/components/common/EmptyState';
import { compareAsc } from "date-fns";
import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';

export const Dashboard = () => {
    const { tasks, completedTasks, unCompletedTasks, updateTaskInformation } = useContext(MetaDataContext);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
        day: 'numeric'
    }).format(new Date());

    // length of different types of tasks
    const totalTasks = tasks.length;
    const completedTasksLength = completedTasks.length;
    const uncompletedTasksLength = unCompletedTasks.length;

    //Today Tasks
    const tasksForToday = tasks.filter((task) => {
        const result = compareAsc(new Date(task.dueOn), new Date(formattedDate));
        if (result === 0) {
            return task;
        }
    });
    return (
        <>
            <TitleDisplay title="Dashboard" time={formattedDate} />
            Hello User, Welcome to your Todo 👋
            <div className="d-flex">
                <CompletionProgressBar numerator={completedTasksLength} denominator={totalTasks} classesToAdd="border-dashed-1px" />
                <CurrentTasksCompletionCard totalTasks={totalTasks} completedTasks={completedTasksLength} unCompletedTasks={uncompletedTasksLength} />
            </div>
            <TitleDisplay title="Today's Tasks" />
            {tasksForToday.length ? <TasksSummary tasks={tasksForToday} isDueTimeToBeDisplayed={true} updateTaskInformation={(task) => updateTaskInformation(task)} /> :  <EmptyState emptyStateLogoUrl={todayTasksEmptyState} title="Be Chill!, no tasks for today" /> }
            <p className="margin-bottom-20px">
                <CompletionProgressBar numerator={completedTasksLength} denominator={totalTasks} />
            </p>
        </>
    )
}