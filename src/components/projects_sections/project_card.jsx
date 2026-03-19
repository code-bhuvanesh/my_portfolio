import PropTypes from "prop-types";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectsPopup from "./projects_popup";

function ProjectCard(props) {
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
        className="xc-window group flex h-full w-full cursor-pointer flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_72px_rgba(0,0,0,0.5)] hover:border-white/[0.16]"
        onClick={handleOpen}
        type="button"
      >
        {/* Glass titlebar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] relative z-[2]"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]"></span>
          <span className="h-[9px] w-[9px] rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]"></span>
          <span className="h-[9px] w-[9px] rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]"></span>
          <span
            className="ml-2 text-[0.62rem] font-medium tracking-wide text-xc-text-dimmed truncate"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {props.projectName.replace(/\s+/g, "_").toLowerCase()}.swift
          </span>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
            src={props.projectimage}
            alt={props.projectName + " preview"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent"></div>
          <span
            className="absolute left-3 top-3 rounded-full border border-white/[0.12] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-xc-blue backdrop-blur-md"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              background: "rgba(10, 10, 15, 0.6)",
            }}
          >
            {props.projectTag}
          </span>
          {props.projectPlaystore && (
            <span
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-xc-green backdrop-blur-md"
              style={{ background: "rgba(10, 10, 15, 0.6)" }}
            >
              <img src="/playstore_icon.svg" alt="" className="h-3 w-3 opacity-80" />
              Play Store
            </span>
          )}
        </div>

        {/* Content */}
        <div className="relative z-[2] flex flex-1 flex-col px-4 pt-4 pb-4">
          <h3
            className="m-0 text-[1.15rem] font-bold leading-[1.1] tracking-[-0.03em] text-xc-text-primary capitalize"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {props.projectName}
          </h3>
          <p className="mt-2.5 text-[0.82rem] leading-6 text-xc-text-secondary line-clamp-3">
            {props.projectDescription}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
            <span
              className="text-[0.72rem] font-semibold text-xc-blue"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {props.projectActionLabel}
            </span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-xc-blue/10 text-xc-blue text-[0.75rem] backdrop-blur-sm">
              ↗
            </span>
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <ProjectsPopup
            key="project-popup"
            closePopup={() => setIsOpen(false)}
            projectName={props.projectName}
            projectimage={props.projectimage}
            projectlink={props.projectlink}
            projectPlaystore={props.projectPlaystore}
            projectDescription={props.projectDescription}
            repoPrivate={props.repoPrivate}
            projectScreenshots={props.projectScreenshots}
            triggerRect={triggerRect}
          />
        )}
      </AnimatePresence>
    </>
  );
}

ProjectCard.propTypes = {
  projectActionLabel: PropTypes.string.isRequired,
  projectDescription: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectPlaystore: PropTypes.string,
  projectTag: PropTypes.string.isRequired,
  projectimage: PropTypes.string.isRequired,
  projectlink: PropTypes.string.isRequired,
  repoPrivate: PropTypes.bool,
  projectScreenshots: PropTypes.arrayOf(PropTypes.string),
};

export default ProjectCard;
