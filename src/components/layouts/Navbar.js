import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../img/logo.svg";

function Navbar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/">
          <img src={logo} alt="Wise Project" className={styles.logo} />
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
