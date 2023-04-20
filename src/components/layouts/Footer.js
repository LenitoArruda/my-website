import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer(props) {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a
            href="https://www.facebook.com/lenito.arruda"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/lenitoarruda/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/lenito-arruda/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/LenitoArruda"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Copyright</span> &copy; 2023
      </p>
    </footer>
  );
}

export default Footer;
