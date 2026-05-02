import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ProjectCard({ project }) {
  const projectColor = project.color || "var(--m3-primary)";
  const projectLink = `/project/${slugify(project.name)}`;

  return (
    <Link
      to={projectLink}
      className="m3-card-elevated group flex h-full w-full cursor-pointer flex-col overflow-hidden text-left border-none p-0 no-underline"
      style={{ borderRadius: "var(--m3-shape-extra-large)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          src={project.image}
          alt={project.name + " preview"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Open source badge */}
        <div
          className="absolute left-3 top-3 flex items-center gap-1.5"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            borderRadius: "var(--m3-shape-full)",
            padding: "4px 10px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <span className="material-symbols-rounded text-white text-[14px]">code</span>
          <span className="text-[0.625rem] font-bold tracking-wider uppercase text-white">
            Open Source
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3
          className="m-0 text-[1rem] font-semibold leading-tight text-m3-on-surface capitalize"
          style={{ fontFamily: '"Outfit", sans-serif' }}
        >
          {project.name}
        </h3>

        <p className="m3-body-small mt-2 line-clamp-2 text-[0.8rem] opacity-80">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech?.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md px-2 py-0.5 text-[0.625rem] font-medium"
              style={{
                background: "var(--m3-surface-container-highest)",
                color: "var(--m3-on-surface-variant)"
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action area in project color */}
      <div 
        className="mt-auto flex items-center justify-between px-4 py-3 transition-colors duration-300"
        style={{ 
          background: `color-mix(in srgb, ${projectColor} 15%, var(--m3-surface-container-high))`,
          borderTop: `1px solid color-mix(in srgb, ${projectColor} 20%, transparent)`
        }}
      >
        <span
          className="text-[0.75rem] font-bold uppercase tracking-wider"
          style={{ 
            fontFamily: '"Outfit", sans-serif',
            color: projectColor
          }}
        >
          View
        </span>
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:translate-x-1"
          style={{ background: projectColor }}
        >
          <span className="material-symbols-rounded text-[16px]">arrow_forward</span>
        </span>
      </div>
    </Link>
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
    color: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
