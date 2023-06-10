import React, { useState, useRef, useEffect } from "react";
import styles from "./MenuSkills.module.css";

function MenuSkills({ skills }) {
  const [menuSkills, setMenuSkills] = useState(skills);
  const menuRef = useRef(null);

  useEffect(() => {
    setMenuSkills(skills);
  }, [skills]);

  const [prevSkill, setPrevSkill] = useState([]);
  const [currentSkill, setcurrentSkill] = useState([]);
  const [classAnimation, setClassAnimation] = useState(``);

  useEffect(() => {
    setPrevSkill(currentSkill);
  }, [currentSkill]);

  const handleMouseUp = (evt) => {
    if (evt.target.classList.contains(styles.skill)) {
      const currentSkill = evt.target;

      currentSkill.style.color = "rgb(68, 175, 223)";
      currentSkill.style.textShadow = "0 0 30px rgb(68, 175, 223)";
      setPrevSkill(currentSkill);

      if (prevSkill !== currentSkill) {
        prevSkill.style.color = "";
        prevSkill.style.textShadow = "";
      }
    }
  };

  const handleFirstLoad = () => {
    const target = findElementByTextContent(
      menuRef.current,
      "general",
      `.${styles.skill}`
    );

    if (target) {
      target.style.color = "rgb(68, 175, 223)";
      target.style.textShadow = "0 0 30px rgb(68, 175, 223)";
      setPrevSkill(target);
      setcurrentSkill(target);
    }
  };

  const findElementByTextContent = (element, text, selector) => {
    const children = element.querySelectorAll(selector);

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.textContent.includes(text)) {
        return child;
      }
    }

    return null;
  };

  const handleListMovement = (evt) => {
    let listOfSkills = menuSkills;
    const skillSelected = menuSkills.find(
      (skill) => skill.name === evt.target.innerHTML
    );
    const index = menuSkills.indexOf(skillSelected);
    if (index === 5 || index === 6) {
      listOfSkills.push(listOfSkills.shift());
      setClassAnimation(`${styles.move_right}`);
    } else if (index === 3 || index === 2) {
      listOfSkills.unshift(listOfSkills.pop());
      setClassAnimation(`${styles.move_left}`);
    }
    setMenuSkills(listOfSkills);
  };

  useEffect(() => {
    window.addEventListener("load", handleFirstLoad);

    return () => {
      window.removeEventListener("load", handleFirstLoad);
    };
  }, []);

  const handleClassName = (index) => {
    if (index === 4) return `${styles.skill} ${classAnimation}`;
    if (index === 3)
      return `${styles.skill} ${styles.next_skill_left} ${classAnimation}`;
    if (index === 2)
      return `${styles.skill} ${styles.last_skill_left} ${classAnimation}`;
    if (index === 6)
      return `${styles.skill} ${styles.last_skill_rigth} ${classAnimation}`;
    if (index === 5)
      return `${styles.skill} ${styles.next_skill_rigth} ${classAnimation}`;
    return `${styles.hide_skill}`;
  };

  return (
    <div className={styles.menu} ref={menuRef} onClick={handleMouseUp}>
      <div className={styles.list}>
        {menuSkills.map((skill, index) => (
          <div
            key={index}
            className={handleClassName(index)}
            onClick={handleListMovement}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuSkills;
