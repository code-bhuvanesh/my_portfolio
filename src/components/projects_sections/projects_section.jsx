import ProjectCard from "./project_card";
import portfolioData from "../../constants.js";
import { useNavigate } from "react-router-dom";

function ProjectsSection() {
  const { projectsSection, projects } = portfolioData;
  const navigate = useNavigate();
  const projectCount = projects.length;

  const openAllProjects = (event) => {
    event.preventDefault();

    const navigateToProjects = () => navigate(projectsSection.viewAll.href);

    if (document.startViewTransition) {
      document.documentElement.classList.add("route-to-projects");
      const transition = document.startViewTransition(() => {
        navigateToProjects();
      });

      transition.finished.finally(() => {
        document.documentElement.classList.remove("route-to-projects");
      });
      return;
    }

    navigateToProjects();
  };

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-6 pt-12 sm:pt-20 lg:gap-7">
      <div className="grid gap-6 min-[512px]:grid-cols-[minmax(0,1fr)_15rem] xl:grid-cols-[minmax(0,1fr)_20rem] min-[512px]:items-end">
        <div className="order-2 animate-reveal-up max-w-3xl min-[512px]:order-1">
          <h2
            className="m-0 text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-xc-text-primary"
            style={{ fontFamily: '"Inter", "SF Pro Display", sans-serif' }}
          >
            {projectsSection.title}
          </h2>
          <p className="section-copy max-w-2xl">
            {projectsSection.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="metric-pill">{projectCount} total builds</span>
            <span className="metric-pill">Flutter • Django • IoT</span>
            <span className="metric-pill">Responsive UI focus</span>
          </div>
        </div>

        {/* Glass sidebar panel */}
        <div className="order-1 xc-window animate-reveal-up [animation-delay:0.08s] min-[512px]:order-2">
          <div className="xc-titlebar">
            <span className="xc-titlebar-dot xc-titlebar-dot--close"></span>
            <span className="xc-titlebar-dot xc-titlebar-dot--minimize"></span>
            <span className="xc-titlebar-dot xc-titlebar-dot--maximize"></span>
            <span className="xc-titlebar-text">archive.swift</span>
            <div className="w-[36px]"></div>
          </div>
          <div className="relative z-[2] p-5 sm:p-6">
            <p
              className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-xc-text-dimmed"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Full archive
            </p>
            <p className="mt-3 text-[0.85rem] leading-7 text-xc-text-secondary">
              Want the wider set of experiments, utilities, and app work beyond
              the featured pieces?
            </p>
            <a
              className="cta-secondary mt-5 w-full"
              href={projectsSection.viewAll.href}
              onClick={openAllProjects}
            >
              {projectsSection.viewAll.label}
            </a>
          </div>
        </div>
      </div>

      <div className="grid min-h-0 auto-rows-fr gap-5 overflow-visible pb-1 min-[512px]:grid-cols-3 animate-reveal-up [animation-delay:0.12s]">
        {projects.slice(0, projectsSection.featuredCount).map((data) => (
          <ProjectCard
            key={data.name}
            projectName={data.name}
            projectimage={data.image}
            projectlink={data.link}
            projectPlaystore={data.playstore}
            projectDescription={data.description}
            projectTag={projectsSection.cardTag}
            projectActionLabel={projectsSection.viewDetailsLabel}
            repoPrivate={data.repo_private}
            projectScreenshots={data.project_screenshots}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
