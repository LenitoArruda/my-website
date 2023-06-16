import React, { useState, useRef, useEffect } from "react";
import styles from "./MenuSkills.module.css";

function MenuSkills({ skills, skill, setSkill }) {
  const [menuSkills, setMenuSkills] = useState(skills);
  const [generalIndex, setGeneralIndex] = useState();
  const menuRef = useRef(null);

  function findGeneral(objeto) {
    return objeto.nome.toUpperCase() === "GENERAL";
  }

  const handleGeneralPosition = (arr) => {
    const index = arr.findIndex(findGeneral);
    if (index <= 2) {
      return arr.unshift(arr.pop());
    }
    return arr;
  };

  useEffect(() => {
    const handleArray = (arr1, arr2) => {
      if (arr1.name < arr2.name) return -1;
      if (arr1.name > arr2.name) return 1;
      return 0;
    };

    setMenuSkills(skills.sort(handleArray));
  }, [skills]);

  const [centerSkillAnimation, setCenterSkillAnimation] = useState(``);
  const [secondLeftSkillAnimation, setSecondLeftSkillAnimation] = useState(``);
  const [secondRightSkillAnimation, setSecondRightSkillAnimation] =
    useState(``);
  const [thirdRightSkillAnimation, setThirdRightSkillAnimation] = useState(``);
  const [thirdLeftSkillAnimation, setThirdLeftSkillAnimation] = useState(``);

  const handleAnimationEnd = () => {
    setCenterSkillAnimation("");
    setSecondLeftSkillAnimation("");
    setSecondRightSkillAnimation("");
    setThirdRightSkillAnimation("");
    setThirdLeftSkillAnimation("");
  };

  const handleListMovement = (evt) => {
    let listOfSkills = menuSkills;
    setSkill(
      menuSkills.find(
        (skill) =>
          skill.name.toUpperCase() === evt.target.innerHTML.toUpperCase()
      )
    );
    const index = menuSkills.indexOf(skill);
    if (index === 3 || index === 4) {
      setTimeout(() => listOfSkills.push(listOfSkills.shift()), 200);
      setCenterSkillAnimation(`${styles.center_left}`);
      setSecondLeftSkillAnimation(`${styles.second_left_left}`);
      setSecondRightSkillAnimation(`${styles.second_right_left}`);
      setThirdRightSkillAnimation(`${styles.third_right_left}`);
      setThirdLeftSkillAnimation(`${styles.third_left_left}`);
    } else if (index === 0 || index === 1) {
      setTimeout(() => listOfSkills.unshift(listOfSkills.pop()), 200);
      setCenterSkillAnimation(`${styles.center_right}`);
      setSecondLeftSkillAnimation(`${styles.second_left_right}`);
      setSecondRightSkillAnimation(`${styles.second_right_right}`);
      setThirdLeftSkillAnimation(`${styles.third_left_right}`);
      setThirdRightSkillAnimation(`${styles.third_right_right}`);
    }
  };

  const handleClassName = (index) => {
    if (index === 2) return `${styles.skill} ${centerSkillAnimation}`;
    if (index === 1)
      return `${styles.skill} ${styles.second_skill_left} ${secondLeftSkillAnimation}`;
    if (index === 0)
      return `${styles.skill} ${styles.third_skill_left} ${thirdLeftSkillAnimation}`;
    if (index === 4)
      return `${styles.skill} ${styles.third_skill_rigth} ${thirdRightSkillAnimation}`;
    if (index === 3)
      return `${styles.skill} ${styles.second_skill_rigth} ${secondRightSkillAnimation}`;
  };

  return (
    <div className={styles.menu} ref={menuRef}>
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
