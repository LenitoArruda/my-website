import styles from "./SkillCard.module.css";
import imgStar from "../../img/star.svg";
import imgActiveStar from "../../img/active-star.svg";

function SkillCard({ name, description, stars, experience, img }) {
  let imgSkill = "";
  if (img) {
    imgSkill = require(`../../img/skills/${img}`);
  } else {
    imgSkill = require("../../img/skills/html5.svg");
  }
  let ordenedStars = [];
  for (let i = 1; i <= 5; i++) {
    i <= stars ? ordenedStars.push("on") : ordenedStars.push("off");
  }

  return (
    <div className={styles.skill}>
      <div className={styles.logo}>
        <img src={imgSkill} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.info_header}>
          <h3 className={styles.info_title}>{name}</h3>
          <div className={styles.info_experience}>
            <h4>+{experience}</h4>
            <p>years of experience</p>
          </div>
        </div>
        <p className={styles.info_desc}>{description}</p>
        <div className={styles.star}>
          {ordenedStars.map((type) =>
            type === "on" ? (
              <img src={imgActiveStar} alt="star" className={styles.star_img} />
            ) : (
              <img src={imgStar} alt="star" className={styles.star_img} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
