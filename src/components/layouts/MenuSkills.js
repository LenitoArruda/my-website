import React, { useState, useRef, useEffect } from "react";
import styles from "./MenuSkills.module.css";

function MenuSkills({ skills }) {
  const [menuSkills, setMenuSkills] = useState(skills);
  const [dragStart, setDragStart] = useState(null);
  const [positions, setPositions] = useState({});
  const [scrollLeft, setScrollLeft] = useState(0);
  const menuRef = useRef(null);
  const updateInterval = useRef(0); // Contador de atualizações
  const updateThreshold = 10; // Limite de atualizações antes de chamar updateSkills()

  const handleDragStart = (event) => {
    setDragStart(event.clientX);
    menuRef.current.classList.add(styles.grabbing);
    updateSkills();
  };

  const handleDragMove = (event) => {
    handleFirstLoad();
    if (dragStart === null) return;

    const scrollDistance = event.clientX - dragStart;
    menuRef.current.scrollLeft -= scrollDistance;
    setScrollLeft(menuRef.current.scrollLeft);
    setDragStart(event.clientX);

    // Verificar se o scroll alcançou o início ou o fim da lista
    const scrollLeft = menuRef.current.scrollLeft;
    const scrollWidth = menuRef.current.scrollWidth;
    const clientWidth = menuRef.current.clientWidth;

    const isScrollLeftEnd = scrollLeft <= 0;
    const isScrollRightEnd = scrollLeft + clientWidth >= scrollWidth;

    if (isScrollLeftEnd) {
    } else if (isScrollRightEnd) {
    }

    // Incrementar o contador de atualizações
    updateInterval.current++;

    // Verificar se o limite de atualizações foi atingido
    if (updateInterval.current >= updateThreshold) {
      updateSkills();
      updateInterval.current = 0; // Reiniciar o contador
    }
  };

  useEffect(() => {
    setMenuSkills(skills);
  }, [skills]);

  const handleDragEnd = () => {
    setDragStart(null);
    menuRef.current.classList.remove(styles.grabbing);
    updateSkills();
  };

  const updateSkills = () => {
    const { initialLeft, initialRight } = positions;
    const maxDistance = Math.max(initialRight - initialLeft, 1);
    const centerPosition = (initialLeft + initialRight) / 2;

    for (let i = 0; i < menuSkills.length; i++) {
      const skillElement = menuRef.current.getElementsByClassName(styles.skill)[
        i
      ];

      if (skillElement) {
        const { left: skillLeft, right: skillRight } =
          skillElement.getBoundingClientRect();
        const skillPosition = (skillLeft + skillRight) / 2;

        // Calcular a distância da skill em relação ao centro do elemento pai
        const distanceToCenter = Math.abs(skillPosition - centerPosition);

        // Calcular o fator de tamanho e opacidade com base na distância ao centro
        const sizeFactor = 1 - distanceToCenter / maxDistance;
        const opacity = sizeFactor < 0.2 ? 0 : sizeFactor;

        // Aplicar os estilos de transformação e opacidade
        const skillStyles = {
          transform: `scale(${sizeFactor})`,
          opacity: opacity,
        };

        skillElement.style.transform = skillStyles.transform;
        skillElement.style.opacity = skillStyles.opacity;
      }
    }

    // Verificar se ainda há atualizações pendentes
    if (updateInterval.current < updateThreshold) {
      requestAnimationFrame(updateSkills);
    }
  };

  useEffect(() => {
    const element = menuRef.current;
    if (element) {
      const { left: initialLeft, right: initialRight } =
        element.getBoundingClientRect();
      setPositions({ initialLeft, initialRight });
      setScrollLeft(element.scrollLeft);
    }
  }, []);

  useEffect(() => {
    const updateSkillsOnResize = () => {
      updateSkills();
    };

    window.addEventListener("resize", updateSkillsOnResize);

    return () => {
      window.removeEventListener("resize", updateSkillsOnResize);
    };
  }, []);

  useEffect(() => {
    updateSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**************************************************************************************/

  const [prevSkill, setPrevSkill] = useState([]);

  const handleMouseUp = (evt) => {
    if (evt.target.className.trim("skill")) {
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
    const target = findElementByTextContent(
      menuRef.current,
      "general",
      `.${styles.skill}`
    );

    if (target) {
      target.style.color = "rgb(68, 175, 223)";
      target.style.textShadow = "0 0 30px rgb(68, 175, 223)";
      setPrevSkill(target);
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
  useEffect(() => {
    window.addEventListener("load", handleFirstLoad);

    return () => {
      window.removeEventListener("load", handleFirstLoad);
    };
  }, []);

  /**************************************************************************************/

  return (
    <div
      className={styles.skill_menu}
      ref={menuRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onClick={handleMouseUp}
    >
      <div
        className={styles.skill_list}
        style={{ transform: `translateX(-${scrollLeft}px)` }}
      >
        {menuSkills.map((skill, index) => (
          <div key={index} className={styles.skill}>
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuSkills;
