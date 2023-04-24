import styles from "./Home.module.css";
import LinkButton from "../layouts/LinkButton";
import BgAbout from "../../img/home-about.svg";
import BgCta from "../../img/home-cta.svg";
import imgProfile from "../../img/profile.svg";
import imgAvatar from "../../img/avatar.svg";
import { Parallax } from "react-parallax";
import { useEffect } from "react";
//import AOS from "aos";
//import "aos/dist/aos.css"
import TextShpere from "../../components/layouts/TextShpere";

function Home() {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        console.log("Elemento esta visivel!", entries);
      }
    });
    intersectionObserver.observe(document.querySelector("#about"));

    return () => intersectionObserver.disconnect();
  });

  return (
    <div className={styles.home_container}>
      <Parallax strength={350} bgImage={BgCta}>
        <session className={styles.cta_content}>
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
          <div className={styles.avatar}>
            <img src={imgAvatar} alt="avatar" />
          </div>
        </session>
      </Parallax>

      <Parallax strength={350} bgImage={BgAbout}>
        <session className={styles.about_content} id="about">
          <div className={styles.text}>
            <p>
              Este é um texto explicando sobre a minha vida. Blablabla Blablabla
            </p>
            <p>
              Blablabla Blablabla Blablabla Blablabla Blablabla Blablabla
              Blablabl
            </p>
            <p>Blablabla Blablabla Blablabla Blablabla Blablabla Blablabla.</p>
          </div>
          <div className={styles.picture}>
            <img src={imgProfile} alt="profile" />
          </div>
        </session>
      </Parallax>
    </div>
  );
}

export default Home;
