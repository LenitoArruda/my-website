import React, { useEffect, useState } from "react";

import styles from "./TextShpere.module.css";

// Importing TagCloud package
import TagCloud from "TagCloud";

const TextShpere = () => {
  const [prevSkill, setPrevSkill] = useState([]);

  const handleMouseUp = (evt) => {
    if (evt.target.className.includes("tagcloud--item")) {
      setPrevSkill(evt.target);

      if (prevSkill.textContent) {
        prevSkill.style.color = "";
        prevSkill.style.textShadow = "";
      }
      evt.target.style.color = "rgb(68, 175, 223)";
      evt.target.style.textShadow = "0 0 30px rgb(68, 175, 223)";
    }
  };

  const handleFirstLoad = () => {
    const container = document.querySelector(".tagcloud");
    const targetSpan = container.querySelector("span.tagcloud--item");
    if (targetSpan.textContent === "General") {
      targetSpan.style.color = "rgb(68, 175, 223)";
      targetSpan.style.textShadow = "0 0 30px rgb(68, 175, 223)";
      setPrevSkill(targetSpan);
    }
  };

  useEffect(() => {
    window.addEventListener("load", handleFirstLoad);

    return () => {
      window.removeEventListener("load", handleFirstLoad);
    };
  }, []);

  // Animation settings for Text Cloud
  useEffect(() => {
    return () => {
      const container = ".tagcloud";
      const texts = [
        "General",
        "HTML",
        "JavaScript",
        "React",
        "NodeJS",
        "Postgre",
        "MongoDB",
        "MySQL",
        "GitHub",
        "Git",
        "CSS",
      ];

      const options = {
        radius: 250,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };

      TagCloud(container, texts, options);
    };
  }, []);

  return (
    <>
      <div className={styles.text_shpere}>
        {/* span tag className must be "tagcloud"  */}
        <span className="tagcloud" onClick={handleMouseUp}></span>
      </div>
    </>
  );
};

export default TextShpere;
