import { useState } from "react";
import "./project_card.css";

function ProjectCard(props) {
  var [isCardExpand, setIsCarExpand] = useState(false);

  return (
    <div
      className="projects-card"
      onClick={() => window.open(props.projectlink, "_blank")}
      onMouseEnter={() => setIsCarExpand(true)}
      onMouseLeave={() => setIsCarExpand(false)}
    >
      <img className="project-image" src={props.projectimage} />
      <h2 className="project-name">{props.projectName}</h2>
      <p
        className="project-description"
        style={{
          color: isCardExpand
            ? "rgb(170, 170, 170)"
            : "rgba(170, 170, 170, .3)",
        }}
      >
        {props.projectDescription}
      </p>
    </div>
  );
}

export default ProjectCard;
