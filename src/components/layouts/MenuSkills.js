import React, { useState } from "react";
import styles from "./MenuSkills.module.css";

function MenuSkills({ skills }) {
  const [scrollX, setScrollX] = useState(0);
  const [visibleSkills, setVisibleSkills] = useState(skills.slice(0, 5)); // Limita a exibição a apenas 5 habilidades
  const itemWidth = 150; // Largura de cada habilidade (ajuste conforme necessário)

  const handleDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  console.log(visibleSkills);
  const handleDragMove = (e) => {
    setScrollX((prevScrollX) => prevScrollX - e.movementX);
  };

  const handleDragEnd = (e) => {
    const dragDistance = Math.abs(e.screenX - e.screenXStart);
    const scrollDistance = Math.round(dragDistance / itemWidth) * itemWidth;
    if (scrollDistance > itemWidth) {
      const direction = e.screenX > e.screenXStart ? 1 : -1;
      const numSkillsToScroll = Math.floor(scrollDistance / itemWidth);
      const newSkills = skills.slice(
        numSkillsToScroll * direction,
        (numSkillsToScroll + 5) * direction
      );
      setScrollX(0); // Reseta a posição do scroll
      setVisibleSkills(newSkills); // Atualiza as skills exibidas
    }
  };

  return (
    <div
      className={styles.skill_menu}
      onDragStart={handleDragStart}
      onDrag={handleDragMove}
      onDragEnd={handleDragEnd}
      draggable="true"
    >
      <div
        className={styles.skill_list}
        style={{ transform: `translateX(${scrollX}px)` }}
      >
        {visibleSkills.map((skill, index) => {
          let opacity = 1;
          if (index === 0 || index === visibleSkills.length - 1) {
            opacity = 0.5; // Opacidade para as habilidades da esquerda e direita
          } else if (index === 1 || index === visibleSkills.length - 2) {
            opacity = 0.8; // Opacidade para as habilidades adjacentes às da esquerda e direita
          }

          return (
            <div key={index} className={styles.skill} style={{ opacity }}>
              {skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuSkills;
