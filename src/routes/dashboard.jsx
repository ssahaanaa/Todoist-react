import { useNavigate } from "react-router";
import { CompletionProgressBar } from "todoist/components/CompletionProgressBar";
import { CurrentTasksCompletionCard }  from "todoist/components/CurrentTasksCompletionCard";
import { TasksSummary } from "todoist/components/TasksSummary";
import todayTasksEmptyState from 'todoist/assets/today-task-empty-state.svg';
import { EmptyState } from 'todoist/components/common/EmptyState';
import { compareAsc } from "date-fns";
import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { isWithinInterval, set } from 'date-fns';


export const Dashboard = () => {
    const { tasks, completedTasks, pendingTasks, updateTaskInformation } = useContext(MetaDataContext);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
        day: 'numeric'
    }).format(new Date());
    const navigate = useNavigate();

    // length of different types of tasks
    const totalTasks = tasks.length;
    const completedTasksLength = completedTasks.length;
    const pendingTasksLength = pendingTasks.length;

    //Today Tasks
    const tasksForToday = tasks.filter((task) => {
        const result = compareAsc(new Date(task.dueOn), new Date(formattedDate));
        if (result === 0) {
            return task;
        }
    });
    const now = new Date();
    const startMorningTime = set(now, { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 });
    const endMorningTime = set(now, { hours: 11, minutes: 59, seconds: 59, milliseconds: 59 });
    const isMorning = isWithinInterval(now, {
      start: startMorningTime,
      end: endMorningTime
    });
    const startNoonTime = set(now, { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 });
    const endNoonTime = set(now, { hours: 17, minutes: 59, seconds: 59, milliseconds: 59 });
    const isNoon = isWithinInterval(now, {
      start: startNoonTime,
      end: endNoonTime
    });
    const startEveningTime = set(now, { hours: 18, minutes: 0, seconds: 0, milliseconds: 0 });
    const endEveningTime = set(now, { hours: 20, minutes: 59, seconds: 59, milliseconds: 59 });
    const isEvening = isWithinInterval(now, {
      start: startEveningTime,
      end: endEveningTime
    });
    let salutationTitle = 'Welcome!';
    if (isMorning) {
      salutationTitle = 'Good Morning!'
    } else if (isNoon) {
      salutationTitle = 'Good Afternoon!';
    } else if (isEvening) {
      salutationTitle = 'Good Evening!';
    }
    return (
        <>
          <p className="salutation-title">{salutationTitle}</p>
          <p className="description">Here's your productivity overview</p>
          <CurrentTasksCompletionCard totalTasks={totalTasks} completedTasks={completedTasksLength} pendingTasks={pendingTasksLength} />
          <CompletionProgressBar numerator={completedTasksLength} denominator={totalTasks} completionBarTitle="Overall Progress" isPercentageToBeDisplayed={true} titleClass="overall-progress" />
          <div className="d-flex justify-content-between margin-top-30px max-width-860px">
            <p className="sub-title">Today's tasks</p>
            <button className="overall-progress color-accent cursor-pointer" onClick={() => navigate('/today')}>View all {"->"}</button>
          </div>
          {tasksForToday.length ? <TasksSummary tasks={tasksForToday} updateTaskInformation={(task) => updateTaskInformation(task)} /> :  <EmptyState emptyStateLogoUrl={todayTasksEmptyState} title="No Tasks are to be completed for today" /> }
        </>
    )
}