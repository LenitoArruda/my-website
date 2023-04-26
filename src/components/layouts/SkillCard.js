import styles from "./SkillCard.module.css";
import imgProfile from "../../img/skills/html5.svg";

function SkillCard({ skill }) {
  return (
    <div className={styles.skill}>
      <img src={imgProfile} alt="html5" className={styles.logo} />
    </div>
  );
}

export default SkillCard;
