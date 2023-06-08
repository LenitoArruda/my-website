import styles from "./CardContainer.module.css";

function CardContainer(props) {
  return (
    <div
      className={`${styles.container} ${styles[props.customClass]}`}
      style={{
        flexDirection: props.type === "skills" ? "" : "column",
      }}
    >
      {props.children}
    </div>
  );
}

export default CardContainer;
