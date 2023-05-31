import styles from "./Engines.module.css";
import { useEffect, useState } from "react";
import bgEngine from "../../img/engine.svg";

function Engines({ parallaxRef }) {
  //Rotate engines when users scroll down or up
  const [rotation, setRotation] = useState(0);
  const [opRotation, setOpRotation] = useState(0);

  useEffect(() => {
    const container = document.querySelector(".mainParallax");

    const handleScroll = () => {
      const scrollY = parallaxRef.current.current;
      const rotationValue = scrollY * -0.06;
      const opRotationValue = scrollY * 0.06;

      setRotation(rotationValue);
      setOpRotation(opRotationValue);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  });
  return (
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
  );
}

export default Engines;
