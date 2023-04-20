import styles from "./Home.module.css";
import LinkButton from "../layouts/LinkButton";
import BgAbout from "../../img/home-about.svg";
import BgCta from "../../img/home-cta.svg";
import { Parallax, Background } from "react-parallax";

function Home() {
  return (
    <div className={styles.home_container}>
      <Parallax strength={350} bgImage={BgCta} className={styles.test}>
        <div className={styles.content}>
          <div className={styles.cta}>
            <h1>
              <p>Hello, I'm Lenito Arruda.</p>
              <p>
                I'm a{" "}
                <span className={styles.name}>full-stack web developer</span>.
              </p>
            </h1>
            <LinkButton text="View my work" to="/projects" />
          </div>
        </div>
      </Parallax>

      <Parallax strength={350} bgImage={BgAbout}>
        <div className={styles.content}>
          <div className={styles.text_content}>Normal Parallax</div>
        </div>
      </Parallax>
    </div>
  );
}

export default Home;
