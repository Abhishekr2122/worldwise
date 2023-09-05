/* eslint-disable react/prop-types */
import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";
export function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
