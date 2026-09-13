import { navigationMenus } from "todoist/utils/navigation-Menus.js";
import { useNavigate } from "react-router";
import { TopBand } from "todoist/components/TopBand";
import { useLocation, matchPath } from 'react-router';
import 'todoist/App.scss';
import { Outlet } from "react-router";

export const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <>
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