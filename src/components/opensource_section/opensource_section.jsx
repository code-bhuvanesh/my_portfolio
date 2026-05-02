import portfolioData from "../../constants.js";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../pages/projectPage/ProjectPage.jsx";

function OpenSourceSection() {
  const { opensourceSection, opensourceProjects } = portfolioData;
  const navigate = useNavigate();

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
      <hr className="m3-divider mb-8" />

      {/* Projects grid — image + name only */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {opensourceProjects.map((project) => (
          <button
            key={project.name}
            type="button"
            className="group relative cursor-pointer overflow-hidden border-none p-0 outline-none text-left"
            style={{ borderRadius: "var(--m3-shape-extra-large)", background: "transparent" }}
            onClick={() => navigate(`/project/${slugify(project.name)}`)}
          >
            <div
              className="overflow-hidden"
              style={{
                borderRadius: "var(--m3-shape-extra-large)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <img
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                src={project.image}
                alt={project.name}
              />
              {/* Name overlay */}
              <div
                className="absolute inset-x-0 bottom-0 flex items-end p-4"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                  borderRadius: "0 0 var(--m3-shape-extra-large) var(--m3-shape-extra-large)",
                  height: "55%",
                }}
              >
                <p
                  className="m-0 text-[0.9375rem] font-medium text-white capitalize truncate w-full"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {project.name}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default OpenSourceSection;
