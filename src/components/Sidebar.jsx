import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { AppNav } from "./AppNav";
import { Outlet } from "react-router-dom";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <Logo />
      </Link>

      <AppNav />

      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
