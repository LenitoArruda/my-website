import React, { useState, useRef, useEffect } from "react";
import styles from "./MenuSkills.module.css";

function MenuSkills({ skills }) {
  const [menuSkills, setMenuSkills] = useState(skills);
  const menuRef = useRef(null);

  useEffect(() => {
    setMenuSkills(skills);
  }, [skills]);

  const [prevSkill, setPrevSkill] = useState();
  const [currentSkill, setcurrentSkill] = useState([]);
  const [centerSkillAnimation, setCenterSkillAnimation] = useState(``);
  const [secondLeftSkillAnimation, setSecondLeftSkillAnimation] = useState(``);
  const [secondRightSkillAnimation, setSecondRightSkillAnimation] =
    useState(``);
  const [thirdRightSkillAnimation, setThirdRightSkillAnimation] = useState(``);
  const [thirdLeftSkillAnimation, setThirdLeftSkillAnimation] = useState(``);
  const [fourthLeftSkillAnimation, setFourthLeftSkillAnimation] = useState(``);
  const [fourthRightSkillAnimation, setFourthRightSkillAnimation] =
    useState(``);

  useEffect(() => {
    setPrevSkill(currentSkill);
  }, [currentSkill]);

  const handleMouseUp = (evt) => {
    if (evt.target.classList.contains(styles.skill)) {
      const currentSkill = evt.target;

      currentSkill.classList.add("skill_selected");
      setPrevSkill(currentSkill);

      if (prevSkill === ![] && prevSkill !== currentSkill) {
        console.log(prevSkill);
        prevSkill.classList.add("reset");
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
      setPrevSkill(target);
      setcurrentSkill(target);
    }
  };

  const handleAnimationEnd = () => {
    setCenterSkillAnimation("");
    setSecondLeftSkillAnimation("");
    setSecondRightSkillAnimation("");
    setThirdRightSkillAnimation("");
    setThirdLeftSkillAnimation("");
    setFourthLeftSkillAnimation("");
    setFourthRightSkillAnimation("");
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
      setTimeout(() => listOfSkills.push(listOfSkills.shift()), 200);

      setCenterSkillAnimation(`${styles.center_left}`);
      setSecondLeftSkillAnimation(`${styles.second_left_left}`);
      setSecondRightSkillAnimation(`${styles.second_right_left}`);
      setThirdRightSkillAnimation(`${styles.third_right_left}`);
      setThirdLeftSkillAnimation(`${styles.third_left_left}`);
      setFourthRightSkillAnimation(`${styles.fourth_right_left}`);
    } else if (index === 3 || index === 2) {
      setTimeout(() => listOfSkills.unshift(listOfSkills.pop()), 200);
      setCenterSkillAnimation(`${styles.center_right}`);
      setSecondLeftSkillAnimation(`${styles.second_left_right}`);
      setSecondRightSkillAnimation(`${styles.second_right_right}`);
      setThirdLeftSkillAnimation(`${styles.third_left_right}`);
      setThirdRightSkillAnimation(`${styles.third_right_right}`);
      setFourthLeftSkillAnimation(`${styles.fourth_left_right}`);
    }
  };

  useEffect(() => {
    window.addEventListener("load", handleFirstLoad);

    return () => {
      window.removeEventListener("load", handleFirstLoad);
    };
  }, []);

  const handleClassName = (index) => {
    if (index < 2)
      return `${styles.skill} ${styles.fourth_skill_left} ${fourthLeftSkillAnimation}`;
    if (index === 4) return `${styles.skill} ${centerSkillAnimation}`;
    if (index === 3)
      return `${styles.skill} ${styles.second_skill_left} ${secondLeftSkillAnimation}`;
    if (index === 2)
      return `${styles.skill} ${styles.third_skill_left} ${thirdLeftSkillAnimation}`;
    if (index === 6)
      return `${styles.skill} ${styles.third_skill_rigth} ${thirdRightSkillAnimation}`;
    if (index === 5)
      return `${styles.skill} ${styles.second_skill_rigth} ${secondRightSkillAnimation}`;
    return `${styles.skill} ${styles.fourth_skill_rigth} ${fourthRightSkillAnimation}`;
  };

  return (
    <div className={styles.menu} ref={menuRef} onClick={handleMouseUp}>
      <div className={styles.list}>
        {menuSkills.map((skill, index) => (
          <div
            key={index}
            className={handleClassName(index)}
            onClick={handleListMovement}
            onAnimationEnd={handleAnimationEnd}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuSkills;
