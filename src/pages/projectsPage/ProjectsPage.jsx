import "./ProjectsPage.css";
import portfolioData from "../../constants";
import ProjectCard from "../../components/projects_sections/project_card";

function ProjectsPage() {
  var sectionCount = 0;
  return (
    <div className="projects-main-container">
      <h1 className="projects-heading">My Projects</h1>
      <div className="projects-grid">
        {portfolioData.Projects.map((data) => {
          // console.log(data);
          sectionCount++;
          return (
            <section
              id={"project-section-" + sectionCount}
              className="projects-item"
              key={"project-section-" + sectionCount}
            >
              <ProjectCard
                projectName={data.name.toUpperCase()}
                projectimage={data.image}
                projectlink={data.link}
                projectDescription={data.description}
              />
              {/* <div
                style={{ height: "50vh", width: "300px", background: "white" }}
              ></div> */}
            </section>
            // <div className="projects-item"></div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsPage;
