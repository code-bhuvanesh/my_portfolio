import "./ProjectsPage.css";
import portfolioData from "../../constants";
import ProjectCard from "../../components/projects_sections/project_card";
import animationData from "../../assets/lottie_anim/box_anim.json";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
function ProjectsPage() {
  var sectionCount = 0;
  var animref = useRef(null);

  useEffect(() => {
    console.log("asdasdsadasdsadsadasdasdsadsad");
    animref.current?.setSpeed(0.1);
  }, [animref]);

  return (
    <>
      <div className="animation-div">
        {Array.from(Array(6).keys()).map((e) => {
          return (
            <Lottie
              className={`project-anim project-anim${e + 1}`}
              animationData={animationData}
              speed={0.5}
              onMouseEnter={(e) => {}}
              lottieRef={animref}
            />
          );
        })}
      </div>
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
    </>
  );
}

export default ProjectsPage;
