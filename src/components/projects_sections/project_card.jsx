import { useState } from "react";
import "./project_card.css";
import ProjectsPopup from "./projects_popup";

function ProjectCard(props) {
  var [isCardExpand, setIsCarExpand] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    console.log("pop up opend");
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        className="projects-card"
        // onClick={() => window.open(props.projectlink, "_blank")}
        onClick={() => openPopup()}
        onMouseEnter={() => setIsCarExpand(true)}
        onMouseLeave={() => setIsCarExpand(false)}
      >
        <img
          className="project-image"
          src={props.projectimage}
          alt={props.projectName + " icon"}
        />
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
      {isOpen ? (
        <ProjectsPopup
          closePopup={closePopup}
          projectName={props.projectName}
          projectimage={props.projectimage}
          projectlink={props.projectlink}
          projectDescription={props.projectDescription}
        />
      ) : null}
    </>
  );
}

export default ProjectCard;
