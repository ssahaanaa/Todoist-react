import { navigationMenus } from "todoist/utils/navigation-Menus.js";
import { useNavigate } from "react-router";
import { TopBand } from "todoist/components/TopBand";
import { NotificationToaster } from "todoist/components/common/NotificationToaster";
import { useLocation, matchPath } from 'react-router';
import { NotificationContext } from "todoist/contexts/NotificationContext";
import 'todoist/App.scss';
import { Outlet } from "react-router";
import { useContext } from "react";

export const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let { notificationConfig, clearNotification } = useContext(NotificationContext);
  return (
    <>
      <NotificationToaster notificationConfig={notificationConfig} clearNotification={clearNotification} />
      <TopBand />
      <div className="d-flex flex-grow-1">
        <div className="navbar-button-container">
        {navigationMenus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => navigate(`/${menu.route}`)}
            className={`navbar-button ${matchPath(menu.route, pathname) ? 'active-route': ''}`}
          >
            {menu.name}
          </button>
        ))}
      </div>
      <div className="todoist-root-wrapper">
        <div className="container">
          <Outlet />
        </div>
      </div>
      </div>
    </>
  );
};