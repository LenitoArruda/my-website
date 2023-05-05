import React, { useState } from "react";

import styles from "./GeneralCard.module.css";
import imgStar from "../../img/star.svg";
import imgNext from "../../img/next.svg";
import imgPrevious from "../../img/previous.svg";
import imgActiveStar from "../../img/active-star.svg";

function GeneralCard({ skills }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [slideForward, setSlideForward] = useState(false);
  const [slideBackward, setSlideBackward] = useState(false);

  const itemsPerPage = 5;

  const handleNextPage = () => {
    setSlideForward(true);
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setSlideBackward(true);
    setCurrentPage(currentPage - 1);
  };

  function handleStars(skill) {
    let ordenedStars = [];
    for (let i = 1; i <= 5; i++) {
      i <= skill.stars
        ? ordenedStars.push({ status: "on", id: i })
        : ordenedStars.push({ status: "off", id: i });
    }
    return (
      <div className={styles.star}>
        {ordenedStars.map((type) =>
          type.status === "on" ? (
            <img
              src={imgActiveStar}
              alt="star"
              className={styles.star_img}
              key={type.id}
            />
          ) : (
            <img
              src={imgStar}
              alt="star"
              className={styles.star_img}
              key={type.id}
            />
          )
        )}
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSkills = skills.slice(startIndex, endIndex);

  return (
    <div className={styles.skills}>
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
            className={styles.arrow_img}
            onClick={handlePreviousPage}
            style={{ display: currentPage === 1 && "none" }}
          />
        </div>
        <div
          className={`${styles.info_skills} ${
            slideBackward ? `${styles.slide_backward}` : ""
          } ${slideForward ? `${styles.slide_forward}` : ""}`}
        >
          {currentSkills.map((skill) => (
            <div className={styles.skill}>
              <div className={styles.name_column}>{skill.name}</div>
              <div className={styles.start_column}>{handleStars(skill)}</div>
            </div>
          ))}
        </div>
        <div className={styles.img_box}>
          <img
            src={imgPrevious}
            alt="next"
            className={styles.arrow_img}
            onClick={handleNextPage}
            style={{
              display: currentPage * itemsPerPage >= skills.length && "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralCard;
