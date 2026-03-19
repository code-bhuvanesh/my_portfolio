import { useEffect, useCallback } from "react";
import portfolioData from "../../constants";
import ProjectCard from "../../components/projects_sections/project_card";
import FloatingIcons from "../../components/floating_icons/floating_icons";

function ProjectsPage() {
  const { projectsPage, projects } = portfolioData;

  /* ── Mouse tracking for blueprint grid spotlight ── */
  const handleMouseMove = useCallback((e) => {
    const root = document.documentElement;
    root.style.setProperty("--mouse-x", `${e.clientX}px`);
    root.style.setProperty("--mouse-y", `${e.clientY}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const root = document.documentElement;
    root.style.setProperty("--mouse-x", "-200px");
    root.style.setProperty("--mouse-y", "-200px");
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="relative overflow-x-clip">
      <FloatingIcons />

      {/* Liquid glass ambient orbs */}
      <div
        className="pointer-events-none fixed -left-24 top-12 z-0 h-80 w-80 rounded-full blur-[140px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(196,156,255,0.35), transparent)",
        }}
      ></div>
      <div
        className="pointer-events-none fixed right-0 top-40 z-0 h-96 w-96 rounded-full blur-[140px] opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(96,184,255,0.3), transparent)",
        }}
      ></div>

      <div className="page-frame pt-28 sm:pt-32 lg:pt-36 pb-20">
        <section className="page-section pt-0">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end">
            <header className="animate-reveal-up max-w-4xl">
              <a className="cta-secondary mb-5 inline-flex" href="/">
                {projectsPage.backLinkText}
              </a>
              <div>
                <span className="section-kicker">{projectsPage.kicker}</span>
                <h1
                  className="mt-6 max-w-4xl text-[clamp(2.6rem,6.4vw,5.2rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-xc-text-primary"
                  style={{
                    fontFamily: '"Inter", "SF Pro Display", sans-serif',
                  }}
                >
                  {projectsPage.title}
                </h1>
                <p className="section-copy max-w-2xl">
                  {projectsPage.description}
                </p>
              </div>
            </header>

            {/* Glass stats panel */}
            <div className="xc-window animate-reveal-up [animation-delay:0.08s]">
              <div className="xc-titlebar">
                <span className="xc-titlebar-dot xc-titlebar-dot--close"></span>
                <span className="xc-titlebar-dot xc-titlebar-dot--minimize"></span>
                <span className="xc-titlebar-dot xc-titlebar-dot--maximize"></span>
                <span className="xc-titlebar-text">stats.swift</span>
                <div className="w-[36px]"></div>
              </div>
              <div className="relative z-[2] p-5 sm:p-6">
                <p
                  className="m-0 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-xc-text-dimmed"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  Snapshot
                </p>
                <strong
                  className="mt-3 block text-[2.2rem] leading-none tracking-[-0.04em] text-xc-blue"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {projects.length}
                </strong>
                <p className="mt-3 text-[0.78rem] leading-6 text-xc-text-secondary">
                  Projects across Flutter, Android, tooling, experiments, and
                  connected-device ideas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section border-t border-white/[0.04] pt-10 sm:pt-12">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 animate-reveal-up [animation-delay:0.1s]">
            {projects.map((data) => (
              <section
                id={`project-${data.name}`}
                className="flex"
                key={data.name}
              >
                <ProjectCard
                  projectName={data.name}
                  projectimage={data.image}
                  projectlink={data.link}
                  projectPlaystore={data.playstore}
                  projectDescription={data.description}
                  projectTag={projectsPage.cardTag}
                  projectActionLabel={projectsPage.viewDetailsLabel}
                  repoPrivate={data.repo_private}
                  projectScreenshots={data.project_screenshots}
                />
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProjectsPage;
