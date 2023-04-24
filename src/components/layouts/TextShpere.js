import React, { useEffect } from "react";

import "./TextShpere.module.css";

//importing TagCloud package
import TagCloud from "TagCloud";

const TextShpere = () => {
  useEffect(() => {
    return () => {
      const container = ".tagcloud";
      const texts = [
        "CSS",
        "HTML",
        "JavaScript",
        "React",
        "NodeJS",
        "Postgree",
        "MongoDB",
        "MySQL",
        "GitHub",
      ];

      const options = {
        radius: 300,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };
      TagCloud(container, texts, options);
    };
  }, []);

  return (
    <>
      <div className="text-shpere">
        {/* span tag className must be "tagcloud" */}
        <span className="tagcloud"></span>
      </div>
    </>
  );
};

export default TextShpere;
