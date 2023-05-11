import styles from "./Stars.module.css";
import imgStar from "../../img/star.svg";
import imgActiveStar from "../../img/active-star.svg";

function Stars({ skill }) {
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

export default Stars;
