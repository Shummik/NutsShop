import { Outlet } from "react-router-dom";
import s from "./styles.module.scss";

function Layout() {
  return (
    <div className={s.layout}>
      {/* An <Outlet> renders whatever child route is currently active in App.js */}
      <Outlet />
    </div>
  );
}

export default Layout;
