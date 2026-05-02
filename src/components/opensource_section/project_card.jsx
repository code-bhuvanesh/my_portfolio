import PropTypes from "prop-types";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectPopup from "../project_popup/project_popup.jsx";

function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState(null);

  const handleOpen = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTriggerRect(rect);
    setIsOpen(true);
  };

  return (
    <>
      <button
        className="m3-card-elevated group flex h-full w-full cursor-pointer flex-col overflow-hidden text-left border-none p-0"
        onClick={handleOpen}
        type="button"
        style={{ borderRadius: "var(--m3-shape-extra-large)" }}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            src={project.image}
            alt={project.name + " preview"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-container-low/70 via-transparent to-transparent"></div>

          {/* Open source badge */}
          <div
            className="absolute left-3 top-3 flex items-center gap-1.5"
            style={{
              background: "var(--m3-surface-container-high)",
              borderRadius: "var(--m3-shape-full)",
              padding: "5px 12px",
            }}
          >
            <span className="material-symbols-rounded text-m3-primary text-[14px]">code</span>
            <span className="text-[0.6875rem] font-medium text-m3-on-surface-variant">
              Open Source
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3
            className="m-0 text-[1.1rem] font-medium leading-tight text-m3-on-surface capitalize"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            {project.name}
          </h3>

          <p className="m3-body-small mt-2.5 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full-m3 px-2.5 py-1 text-[0.6875rem] font-medium text-m3-secondary"
                style={{
                  background: "var(--m3-surface-container-highest)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-m3-outline-variant pt-4">
            <span
              className="text-[0.8125rem] font-medium text-m3-primary"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              View project
            </span>
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full-m3 text-m3-primary"
              style={{ background: "color-mix(in srgb, var(--m3-primary) 12%, transparent)" }}
            >
              <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <ProjectPopup
            key="project-popup"
            closePopup={() => setIsOpen(false)}
            projectName={project.name}
            projectimage={project.image}
            projectlink={project.github}
            projectDescription={project.description}
            projectScreenshots={project.project_screenshots}
            triggerRect={triggerRect}
            tech={project.tech}
          />
        )}
      </AnimatePresence>
    </>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    github: PropTypes.string,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string),
    project_screenshots: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
