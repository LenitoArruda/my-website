import styles from "./Home.module.css";

//Axios
import axios from "axios";

//Layouts
import LinkButton from "../layouts/LinkButton";
import SessionTitle from "../layouts/SessionTitle";
import TextShpere from "../layouts/TextShpere";
import SkillCard from "../layouts/SkillCard";

//React Hooks
import { useEffect, useState } from "react";

//3D effects
import { Parallax } from "react-parallax";

//Aaos fade effects
import AOS from "aos";
import "aos/dist/aos.css";

//Importing images
import BgAbout from "../../img/home-about.svg";
import BgCta from "../../img/home-cta.svg";
import imgProfile from "../../img/profile.svg";

function Home() {
  AOS.init();

  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState();
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  useEffect(() => {
    skills.map((value) => {
      if (value.name === selectedSkill.toLowerCase()) {
        axios
          .get(`http://localhost:3333/skills/${value._id}`, {
            mode: "no-cors",
            headers: headers,
          })
          .then((resp) => {
            setSkill(resp.data);
          })
          .catch((err) => console.log(err));
      }
    });
  }, [selectedSkill]);

  window.addEventListener("mouseup", (evt) => {
    if (evt.target.className === "tagcloud--item") {
      setSelectedSkill(evt.target.innerText);
    }
  });

  useEffect(() => {
    axios
      .get("http://localhost:3333/skills", {
        mode: "no-cors",
        headers: headers,
      })
      .then((resp) => {
        setSkills(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", function (event) {
      const text = document.getElementById("text");
      if (this.window.innerWidth > 1100)
        text.setAttribute("data-aos", "fade-left");
      else text.setAttribute("data-aos", "fade-down");
    });
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
        </session>
      </Parallax>

      <Parallax strength={350} bgImage={BgAbout}>
        <session className={styles.about_content} id="about">
          <SessionTitle text="about me" />
          <div className={styles.about_card}>
            <div
              className={styles.text}
              data-aos="fade-left"
              id="text"
              data-aos-duration="500"
            >
              <p>
                Este é um texto explicando sobre a minha vida. Blablabla
                Blablabla Blablabla Blablabla Blablabla Blablabla Blablabla
                Blablabla.
              </p>
            </div>
            <div
              className={styles.picture}
              data-aos="zoom-in"
              id="picture"
              data-aos-duration="500"
            >
              <img src={imgProfile} alt="profile" />
            </div>
          </div>
        </session>
      </Parallax>

      <session className={styles.skills_content} id="skills">
        <SessionTitle text="skills" />
        <div className={styles.skill_card}>
          <div
            data-aos="zoom-in"
            data-aos-duration="3000"
            className={styles.skills_shpere}
          >
            <TextShpere />
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="300"
            className={styles.skills_shpere}
          >
            {skill && (
              <SkillCard
                name={skill.name}
                description={skill.description}
                stars={skill.stars}
                experience={skill.experience}
                img={skill.img}
                key={skill._id}
              />
            )}
          </div>
        </div>
      </session>
    </div>
  );
}

export default Home;
