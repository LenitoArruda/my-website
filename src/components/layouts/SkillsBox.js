import styles from "./SkillsBox.module.css";
import imgStar from "../../img/star.svg";
import imgActiveStar from "../../img/active-star.svg";

function SkillsBox({ slideBackward, slideForward, currentSkills }) {
  function handleStars(skill) {
    let ordenedStars = [];
    for (let i = 1; i <= 5; i++) {
      i <= skill.stars
        ? ordenedStars.push({ status: "on", id: i })
        : ordenedStars.push({ status: "off", id: i });
    }
    return (
      <div>
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

  return (
    <div
      className={`${styles.info_skills} ${
        slideBackward ? `${styles.slide_backward}` : ""
      } ${slideForward ? `${styles.slide_forward}` : ""}`}
    >
      {currentSkills.map((skill) => (
        <div className={styles.skill}>
          <div className={styles.name_column}>{skill.name}</div>
          <div>{handleStars(skill)}</div>
        </div>
      ))}
    </div>
  );
}

export default SkillsBox;
