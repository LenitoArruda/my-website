import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../img/logo.svg";
import { useState } from "react";

function Navbar() {
  const [mode, setMode] = useState(false);
  const ToggleMode = () => {
    setMode(!mode);
  };

  return (
    <header>
      <nav
        className={mode ? `${styles.navbarMenu}` : `${styles.navbar}`}
        onClick={ToggleMode}
      >
        <div
          className={mode ? `${styles.icon} ${styles.iconActive}` : styles.icon}
          onClick={ToggleMode}
        >
          <div
            className={`${styles.hamburguer} ${styles.hamburguerIcon}`}
          ></div>
        </div>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>

        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Projects</Link>
          </li>
          <li className={styles.item}>
            <Link to="/skills">Skills</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
