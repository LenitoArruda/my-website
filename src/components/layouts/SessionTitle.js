import sytles from "./SessionTitle.module.css";

//Aaos fade effects
import AOS from "aos";
import "aos/dist/aos.css";

function SessionTitle({ text }) {
  AOS.init();
  return (
    <header className={sytles.session}>
      <p className={sytles.title} data-aos="zoom-in" data-aos-duration="500">
        {text}
      </p>
    </header>
  );
}

export default SessionTitle;
