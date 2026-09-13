import { useContext } from "react";
import { MetaDataContext } from 'todoist/contexts/MetaDataContext';
import { compareAsc, differenceInCalendarDays } from "date-fns";
import { TitleDisplay } from "todoist/components/TitleDisplay";
import { CompletedTasksSummary } from "todoist/components/CompletedTasksSummary";

export const Completed = () => {
    let { completedTasks } = useContext(MetaDataContext);
    let completedTasksGroupedByDate = {};
    const fetchFormattedDayOrDate = (date) => {
        let difference, formattedDate, formattedTaskDate;
        formattedTaskDate = new Intl.DateTimeFormat('en-CA').format(new Date(date));
        formattedDate = new Intl.DateTimeFormat('en-CA').format(new Date());
        let compareResult = compareAsc(formattedDate, formattedTaskDate);
        if (compareResult === 1) {
            difference = differenceInCalendarDays(new Date(date), new Date());
            switch (difference){
                case "1": formattedTaskDate = 'Tomorrow';
                          break;
                case "2": formattedTaskDate = 'Day After Tomorrow';
                          break;
            }
        } else if (compareResult === 0) {
          formattedTaskDate = 'Today';
        } else {
            difference = differenceInCalendarDays(new Date(), new Date(date));
             switch (difference){
                case "1": formattedTaskDate = 'Yesterday';
                          break;
                case "2": formattedTaskDate = 'Day Before Yesterday';
                          break;
            }
        }
        return formattedTaskDate;
    }
    completedTasks.filter((task) => {
        if (!Object.hasOwn(completedTasksGroupedByDate, task.dueOn)) {
            completedTasksGroupedByDate[task.dueOn] =  [];
            completedTasksGroupedByDate[task.dueOn].push(task);
        } else {
            completedTasksGroupedByDate[task.dueOn].push(task);
        }
        return task;
    });
    return (
        <>  
            <h2>Completed Tasks</h2>
            <div className="tasks-list-wrapper">
              {Object.keys(completedTasksGroupedByDate).map((day) => {
              return (
                  <div key={day} className="tasks-wrapper">
                      <TitleDisplay title={fetchFormattedDayOrDate(day)} />
                      <CompletedTasksSummary tasks={completedTasksGroupedByDate[day]} />
                  </div>
              )})}
            </div>
        </>    
    )

}