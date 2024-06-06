import "./ProjectsPage.css";
import portfolioData from "../../constants";
import ProjectCard from "../../components/projects_sections/project_card";

function ProjectsPage() {
  var sectionCount = 0;
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <div className="projects-main-container">
      <h1 className="projects-heading">My Projects</h1>
      <div className="projects-grid">
        {portfolioData.Projects.map((data) => {
          // console.log(data);
          return (
            <section
              id={"project-section-" + sectionCount}
              className="projects-item"
            >
              <ProjectCard
                projectName={data.name.toUpperCase()}
                projectimage={data.image}
                projectlink={data.link}
                projectDescription={data.description}
              />
            </section>
            // <div className="projects-item"></div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsPage;
