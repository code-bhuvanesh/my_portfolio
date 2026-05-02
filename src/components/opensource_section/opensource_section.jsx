import portfolioData from "../../constants.js";
import ProjectCard from "./project_card.jsx";

function OpenSourceSection() {
  const { opensourceSection, opensourceProjects } = portfolioData;

  return (
    <div className="animate-m3-reveal-up [animation-delay:0.08s]">
      {/* Section header */}
      <div className="mb-8">
        <span className="m3-label">
          <span className="material-symbols-rounded text-[16px]">code</span>
          {opensourceSection.label}
        </span>
        <h2 className="m3-display mt-4">{opensourceSection.title}</h2>
        <p className="m3-body mt-3 max-w-2xl">{opensourceSection.description}</p>

        <div className="mt-4 flex items-center gap-3">
          <span className="m3-chip-filled">
            <span className="material-symbols-rounded text-[16px]">folder_open</span>
            {opensourceProjects.length} Projects
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="m3-divider mb-10" />

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {opensourceProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}

export default OpenSourceSection;
