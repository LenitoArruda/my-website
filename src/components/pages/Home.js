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
      <Parallax strength={50} bgImage={BgCta}>
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
            <div className={styles.text} id="text">
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
    </div>
  );
}

export default Home;
