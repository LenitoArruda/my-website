/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Home.module.css";

//Axios
import axios from "axios";

//Layouts
import LinkButton from "../layouts/LinkButton";
import SessionTitle from "../layouts/SessionTitle";
import TextShpere from "../layouts/TextShpere";
import SkillCard from "../layouts/SkillCard";
import GeneralCard from "../layouts/GeneralCard";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Engines from "../layouts/Engines";
import MenuSkills from "../layouts/MenuSkills";

//React Hooks
import { useEffect, useState, useRef } from "react";

//3D effects
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

//Importing images
import BgCta from "../../img/home-cta.svg";
import imgProfile from "../../img/profile.svg";

function Home() {
  const parallaxRef = useRef();
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("general");
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  //When selecttedSkill is changed updates skillCard acording the skill selected
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

  //When users left click verify if the target is the text sphere and attribute the skill selected to selectedSkill
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

  //Get skills from backend
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

  //mode is used to alternate menu and sidebar menu
  const [mode, setMode] = useState(false);
  const [phoneMode, setPhoneMode] = useState(false);

  const handleClique = () => {
    setMode(!mode);
  };

  //Verify if screen width is larger than 900px to disable sidebar menu
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) setMode(false);
      if (window.innerWidth < 500) {
        setPhoneMode(true);
      } else setPhoneMode(false);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //When users left click outside from sidebar menu, it closes sidebar
  useEffect(() => {
    const handleMouseUp = (evt) => {
      if (!evt.target.className.includes("sidebar")) setMode(false);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.home_container}>
      <Parallax
        className="mainParallax"
        ref={parallaxRef}
        pages={5}
        style={{
          overflow: mode ? "hidden" : "auto",
        }}
      >
        <ParallaxLayer
          style={{
            backgroundImage: `url(${BgCta})`,
            backgroundSize: "cover",
            overflow: "hidden",
            filter: mode ? "blur(5px)" : "none",
            minHeight: "500px",
            border: "none",
          }}
        />

        <ParallaxLayer
          style={{
            zIndex: mode ? "1" : "0",
          }}
        >
          <Navbar handleClique={handleClique} mode={mode} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.2}
          speed={0.3}
          style={{
            filter: mode ? "blur(5px)" : "none",
            minHeight: "700px",
          }}
        >
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
        </ParallaxLayer>

        <ParallaxLayer offset={1}>
          <div className={styles.about_content} id="about">
            <SessionTitle text="about me" />
            <div className={styles.about_card}>
              <div className={styles.picture} id="picture">
                <img src={imgProfile} alt="profile" />
              </div>
              <div className={styles.text} id="text">
                <p>
                  Hello! My name is Lenito and I am a Full Stack developer
                  passionate about technology and programming. My goal is to
                  develop innovative solutions that can improve people's lives
                  and make the world a better place.
                </p>

                <p>
                  Since I was a child, I have always been curious and interested
                  in technology. Over time, I discovered programming and fell in
                  love with the process of creating solutions that can help
                  solve problems and make people's lives easier.
                </p>
                <p>
                  Over the years, I have dedicated myself to studying and
                  improving my skills in different areas of programming. In
                  addition, I always seek new challenges and learning
                  opportunities to continue evolving as a professional.
                </p>
                <p>
                  If you want to know more about me and my work, check out my
                  [page name with more in-depth context about you] page and get
                  in touch to discuss how I can help your company grow and stand
                  out in the market.
                </p>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.1}
          style={{
            zIndex: "-1",
          }}
        >
          <Engines parallaxRef={parallaxRef} />
        </ParallaxLayer>

        <ParallaxLayer offset={phoneMode ? 2.15 : 2}>
          <div className={styles.skills_content} id="skills">
            <SessionTitle text="skills" />
            <div className={styles.skill_card}>
              <MenuSkills skills={skills} />
              <TextShpere />

              {(!skill._id || skill.name === "general") && (
                <GeneralCard skills={skills} />
              )}
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
        </ParallaxLayer>

        <ParallaxLayer offset={4.3}>
          <div className={styles.projects_content}>
            <SessionTitle text="projects" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={4.8} style={{ bottom: "0%" }}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Home;
