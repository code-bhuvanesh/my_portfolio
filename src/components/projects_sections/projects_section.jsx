import ProjectCard from "./project_card";
import "./projects_section.css";
import portfolioData from "../../constants.js";

function ProjectsSection() {
  return (
    <div className="projectsmain-container">
      <h1>RECENT PROJECTS</h1>
      <div className="all-btn">
        <p>see all</p>
      </div>
      <div className="projects-cotainer">
        {portfolioData.Projects.slice(0, 3).map((data) => {
          // console.log(data);
          return (
            <ProjectCard
              projectName={data.name.toUpperCase()}
              projectimage={data.image}
              projectlink={data.link}
              projectDescription={data.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsSection;
