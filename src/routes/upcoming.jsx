import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { compareAsc, differenceInCalendarDays } from "date-fns";
import { TitleDisplay } from "todoist/components/TitleDisplay";
import { TasksSummary } from "todoist/components/TasksSummary";
import { daysOfWeek } from 'todoist/utils/days';

export const Upcoming = () => {
    let { tasks, updateTaskInformation } = useContext(MetaDataContext);
    let upcomingTasksGroupedByDates = {};
    const formattedDate =  new Intl.DateTimeFormat('en-CA').format(new Date());
    const formatDay = (day) => {
        let formattedDate =  new Intl.DateTimeFormat('en-CA').format(new Date(day));
        let index = new Date(formattedDate).getDay();
        let formattedDay =  daysOfWeek[index];
        if (differenceInCalendarDays(new Date(day), new Date()) === 1) {
            formattedDay = 'Tomorrow';
        }
        if (differenceInCalendarDays(new Date(day), new Date()) === 2) {
          formattedDay = 'Day After Tomorrow';
      }
        return `${formattedDay} ${"\u25CF"} ${formattedDate}`;
    }
    tasks.filter((task) => {
        const result = compareAsc(new Date(task.dueOn), new Date(formattedDate))
        if (result === 1) {
            if (!Object.hasOwn(upcomingTasksGroupedByDates, task.dueOn)) {
                upcomingTasksGroupedByDates[task.dueOn] =  [];
                upcomingTasksGroupedByDates[task.dueOn].push(task);
            } else {
                upcomingTasksGroupedByDates[task.dueOn].push(task);
            }
            return task;
        }
    });
    return (
        <>
         <h2>Upcoming Tasks</h2>
        <div className="tasks-list-wrapper">
          {Object.keys(upcomingTasksGroupedByDates).map((day) => {
                return (
                    <div key={day} className="tasks-wrapper">
                        <TitleDisplay title={formatDay(day)} />
                        <TasksSummary tasks={upcomingTasksGroupedByDates[day]} updateTaskInformation={(task) => updateTaskInformation(task)} />
                    </div>
                )
            })}
         </div>
        </>    
    )

}