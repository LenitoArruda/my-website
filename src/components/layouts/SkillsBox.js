import styles from "./SkillsBox.module.css";
import Stars from "../layouts/Stars";

function SkillsBox({ slideBackward, slideForward, currentSkills }) {
  return (
    <div
      className={`${styles.info_skills} ${
        slideBackward ? `${styles.slide_backward}` : ""
      } ${slideForward ? `${styles.slide_forward}` : ""}`}
    >
      {currentSkills.map((skill) => (
        <div className={styles.skill} key={skill._id}>
          <div className={styles.name_column}>{skill.name}</div>
          <Stars skill={skill} />
        </div>
      ))}
    </div>
  );
}

export default SkillsBox;
