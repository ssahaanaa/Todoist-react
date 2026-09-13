import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { App } from "todoist/App";
import { Dashboard } from 'todoist/routes/dashboard';
import { Today } from 'todoist/routes/today';
import { Upcoming } from 'todoist/routes/upcoming';
import { Completed } from 'todoist/routes/Completed';
import { Inbox } from 'todoist/routes/inbox';
import { ProjectsDetails } from 'todoist/routes/projects/details';
import { ProjectsList } from 'todoist/routes/projects/index';
import { MetaDataContextProvider } from 'todoist/contexts/MetaDataContextProvider';
import "todoist/App.scss"

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <MetaDataContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="today" element={<Today />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="completed" element={<Completed />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/:project_id" element={<ProjectsDetails />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </MetaDataContextProvider>
);
