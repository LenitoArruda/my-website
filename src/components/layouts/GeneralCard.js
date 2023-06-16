import React, { useState, useEffect } from "react";

import styles from "./GeneralCard.module.css";

import imgNext from "../../img/next.svg";
import imgPrevious from "../../img/previous.svg";

import SkillsBox from "./SkillsBox";
import CardContainer from "./CardContainer";

function GeneralCard({ skills }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [slideForward, setSlideForward] = useState(false);
  const [slideBackward, setSlideBackward] = useState(false);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSkills = skills.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSlideForward(true);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSlideBackward(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setSlideBackward(false);
      setSlideForward(false);
    }, 200);
  }, [currentSkills]);

  return (
    <CardContainer type="general">
      <div className={styles.info_header}>
        <h3 className={styles.info_title}>General</h3>
        <div className={styles.info_experience}>
          <h4>+3</h4>
          <p>years of experience</p>
        </div>
      </div>
      <div className={styles.info_box}>
        <div className={styles.img_box}>
          <img
            src={imgNext}
            alt="previous"
            className={`${styles.arrow_img} ${styles.left}`}
            onClick={handlePreviousPage}
            style={{ visibility: currentPage === 1 && "hidden" }}
          />
        </div>
        <SkillsBox
          currentSkills={currentSkills}
          slideForward={slideForward}
          slideBackward={slideBackward}
        />
        <div className={styles.img_box}>
          <img
            src={imgPrevious}
            alt="next"
            className={`${styles.arrow_img} ${styles.right}`}
            onClick={handleNextPage}
            style={{
              visibility:
                currentPage * itemsPerPage >= skills.length && "hidden",
            }}
          />
        </div>
      </div>
    </CardContainer>
  );
}

export default GeneralCard;
