import styles from "./Home.module.css";

//Axios
import axios from "axios";

//Layouts
import LinkButton from "../layouts/LinkButton";
import SessionTitle from "../layouts/SessionTitle";
import TextShpere from "../layouts/TextShpere";
import SkillCard from "../layouts/SkillCard";
import GeneralCard from "../layouts/GeneralCard";

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
import bgEngine from "../../img/engine.svg";

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
    var handleSkill = skills.find(
      (skill) => skill.name === selectedSkill.toLowerCase()
    );

    if (handleSkill && handleSkill.name === selectedSkill.toLowerCase()) {
      axios
        .get(`http://localhost:3333/skills/${handleSkill._id}`, {
          mode: "no-cors",
          headers: headers,
        })
        .then((resp) => {
          setSkill(resp.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedSkill]);

  useEffect(() => {
    const handleMouseUp = (evt) => {
      if (evt.target.className.includes("tagcloud--item")) {
        setSelectedSkill(evt.target.innerText);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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

  const [rotation, setRotation] = useState(0);
  const [opRotation, setOpRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotationValue = scrollY * -0.06;
      const opRotationValue = scrollY * 0.06;
      setRotation(rotationValue);
      setOpRotation(opRotationValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.home_container}>
      <Parallax strength={350} bgImage={BgCta}>
        <div className={styles.cta_content}>
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
        <div className={styles.about_content} id="about">
          <SessionTitle text="about me" />
          <div className={styles.about_card}>
            <div
              className={styles.picture}
              data-aos="zoom-in"
              id="picture"
              data-aos-duration="500"
            >
              <img src={imgProfile} alt="profile" />
            </div>
            <div className={styles.text} id="text" data-aos="zoom-in-down">
              <p>
                Hello! My name is Lenito and I am a Full Stack developer
                passionate about technology and programming. My goal is to
                develop innovative solutions that can improve people's lives and
                make the world a better place.
              </p>

              <p>
                Since I was a child, I have always been curious and interested
                in technology. Over time, I discovered programming and fell in
                love with the process of creating solutions that can help solve
                problems and make people's lives easier.
              </p>
              <p>
                Over the years, I have dedicated myself to studying and
                improving my skills in different areas of programming. In
                addition, I always seek new challenges and learning
                opportunities to continue evolving as a professional.
              </p>
              <p>
                If you want to know more about me and my work, check out my
                [page name with more in-depth context about you] page and get in
                touch to discuss how I can help your company grow and stand out
                in the market.
              </p>
            </div>
          </div>
        </div>
      </Parallax>

      <div className={styles.skills_content} id="skills">
        <div className={styles.bg_engines}>
          <img
            className={styles.engine_1}
            src={bgEngine}
            alt="Engine"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <img
            className={styles.engine_2}
            src={bgEngine}
            alt="Engine"
            style={{ transform: `rotate(${opRotation}deg)` }}
          />
          <img
            className={styles.engine_3}
            src={bgEngine}
            alt="Engine"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
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
            {!skill._id && <GeneralCard skills={skills} />}
            {skill.name === "general" && <GeneralCard skills={skills} />}
            {skill.name !== "general" && skill._id && (
              <SkillCard
                key={skill._id}
                name={skill.name}
                description={skill.description}
                stars={skill.stars}
                experience={skill.experience}
                img={skill.img}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.projects_content}>
        <SessionTitle text="projects" />
      </div>
    </div>
  );
}

export default Home;
