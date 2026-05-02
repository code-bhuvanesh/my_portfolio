import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import portfolioData from "../../constants.js";
import fetchScreenshots from "../../api/get_screenshots.js";

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ProjectPage() {
  const { projectSlug } = useParams();

  // Find project across both published apps and open source
  const allProjects = [
    ...portfolioData.publishedApps.map((p) => ({ ...p, type: "published" })),
    ...portfolioData.opensourceProjects.map((p) => ({ ...p, type: "opensource" })),
  ];
  const project = allProjects.find((p) => slugify(p.name) === projectSlug);

  const [screenshots, setScreenshots] = useState([]);
  const [loadingScreenshots, setLoadingScreenshots] = useState(true);

  /* Mouse tracking for blueprint grid */
  const handleMouseMove = useCallback((e) => {
    document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    document.documentElement.style.setProperty("--mouse-x", "-200px");
    document.documentElement.style.setProperty("--mouse-y", "-200px");
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectSlug]);

  // Fetch screenshots
  useEffect(() => {
    if (!project) return;
    setLoadingScreenshots(true);

    if (project.project_screenshots && project.project_screenshots.length > 0) {
      setScreenshots(project.project_screenshots.map((url) => ({ download_url: url })));
      setLoadingScreenshots(false);
    } else if (project.github && !project.repo_private) {
      fetchScreenshots(project.github)
        .then((data) => setScreenshots(data || []))
        .catch(() => setScreenshots([]))
        .finally(() => setLoadingScreenshots(false));
    } else {
      setScreenshots([]);
      setLoadingScreenshots(false);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-rounded text-m3-outline text-[48px]">error</span>
          <h1 className="m3-headline mt-4">Project not found</h1>
          <p className="m3-body mt-2">The project you're looking for doesn't exist.</p>
          <Link to="/" className="m3-btn-filled mt-6 inline-flex">
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isPublished = project.type === "published";

  return (
    <div className="relative overflow-x-clip">
      {/* Ambient gradient */}
      <div
        className="pointer-events-none fixed -right-40 -top-40 z-0 h-[500px] w-[500px] rounded-full blur-[180px] opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #A8C7FA, transparent)" }}
      ></div>

      {/* Top bar */}
      <nav
        className="fixed left-0 right-0 top-0 z-50 flex items-center gap-4 px-6 py-3 sm:px-10"
        style={{
          background: "color-mix(in srgb, var(--m3-surface) 85%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--m3-outline-variant)",
        }}
      >
        <Link
          to="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full-m3 text-m3-on-surface-variant transition-colors duration-200 hover:bg-m3-surface-container-highest"
        >
          <span className="material-symbols-rounded">arrow_back</span>
        </Link>
        <span
          className="flex-1 text-[1rem] font-medium text-m3-on-surface capitalize truncate"
          style={{ fontFamily: '"Outfit", sans-serif' }}
        >
          {project.name}
        </span>
        {project.playstore && (
          <a
            className="m3-btn-filled hidden sm:inline-flex"
            href={project.playstore}
            target="_blank"
            rel="noreferrer"
          >
            <span className="material-symbols-rounded text-[18px]">download</span>
            Play Store
          </a>
        )}
      </nav>

      {/* Hero banner */}
      <div className="relative pt-14">
        <div className="relative h-[50vh] min-h-[320px] max-h-[500px] overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={project.image}
            alt={project.name}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, var(--m3-surface) 0%, rgba(17,19,24,0.5) 40%, rgba(17,19,24,0.2) 100%)",
            }}
          ></div>

          {/* Title overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[80%] px-4 pb-8">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {isPublished && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-on-primary-container"
                  style={{ background: "var(--m3-primary-container)" }}
                >
                  <img src="/playstore_icon.svg" alt="" className="h-3.5 w-3.5 opacity-90" />
                  Play Store
                </span>
              )}
              {project.downloads && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-green"
                  style={{ background: "rgba(168, 218, 181, 0.12)" }}
                >
                  <span className="material-symbols-rounded text-[16px]">download</span>
                  {project.downloads} downloads
                </span>
              )}
              {project.category && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-on-surface-variant"
                  style={{ background: "var(--m3-surface-container-highest)" }}
                >
                  {project.category}
                </span>
              )}
              {!isPublished && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-on-surface-variant"
                  style={{ background: "var(--m3-surface-container-high)" }}
                >
                  <span className="material-symbols-rounded text-[14px]">code</span>
                  Open Source
                </span>
              )}
            </div>

            <h1
              className="m-0 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] text-white capitalize"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {project.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[80%] px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main content */}
          <div>
            {/* Description */}
            <div
              className="p-6 sm:p-8"
              style={{
                background: "var(--m3-surface-container)",
                borderRadius: "var(--m3-shape-extra-large)",
              }}
            >
              <h2
                className="m-0 text-[1.25rem] font-medium text-m3-on-surface mb-4"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                About this project
              </h2>
              <p className="m3-body text-[1rem] leading-[1.75]">
                {project.description}
              </p>
            </div>

            {/* Screenshots */}
            <div className="mt-8">
              <h2
                className="m-0 text-[1.25rem] font-medium text-m3-on-surface mb-5"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                <span className="material-symbols-rounded text-[20px] align-middle mr-2">photo_library</span>
                Screenshots
              </h2>

              {loadingScreenshots ? (
                <div
                  className="flex items-center gap-3 p-5"
                  style={{
                    background: "var(--m3-surface-container)",
                    borderRadius: "var(--m3-shape-large)",
                  }}
                >
                  <span className="material-symbols-rounded text-m3-primary animate-spin text-[20px]">progress_activity</span>
                  <span className="text-[0.875rem] text-m3-on-surface-variant">Loading screenshots...</span>
                </div>
              ) : screenshots.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {screenshots.map((image, i) => (
                    <img
                      key={i}
                      className="w-full object-cover shadow-m3-2"
                      style={{ borderRadius: "var(--m3-shape-large)" }}
                      src={image.download_url}
                      alt={`${project.name} screenshot ${i + 1}`}
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="flex items-center gap-3 p-5"
                  style={{
                    background: "var(--m3-surface-container)",
                    borderRadius: "var(--m3-shape-large)",
                    border: "1px dashed var(--m3-outline-variant)",
                  }}
                >
                  <span className="material-symbols-rounded text-m3-outline text-[20px]">image_not_supported</span>
                  <span className="text-[0.875rem] text-m3-on-surface-variant">No screenshots available.</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Actions card */}
            <div
              className="p-5"
              style={{
                background: "var(--m3-surface-container)",
                borderRadius: "var(--m3-shape-extra-large)",
              }}
            >
              <h3
                className="m-0 text-[0.9375rem] font-medium text-m3-on-surface mb-4"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Links
              </h3>
              <div className="flex flex-col gap-3">
                {project.playstore && (
                  <a
                    className="m3-btn-filled w-full justify-center"
                    href={project.playstore}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-rounded text-[18px]">download</span>
                    Get on Play Store
                  </a>
                )}
                {project.github && !project.repo_private && (
                  <a
                    className="m3-btn-tonal w-full justify-center"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/github_icon.png" alt="" className="h-4 w-4 object-contain invert opacity-70" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Tech stack card */}
            {project.tech && project.tech.length > 0 && (
              <div
                className="p-5"
                style={{
                  background: "var(--m3-surface-container)",
                  borderRadius: "var(--m3-shape-extra-large)",
                }}
              >
                <h3
                  className="m-0 text-[0.9375rem] font-medium text-m3-on-surface mb-4"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span className="m3-chip-filled" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Info card */}
            <div
              className="p-5"
              style={{
                background: "var(--m3-surface-container)",
                borderRadius: "var(--m3-shape-extra-large)",
              }}
            >
              <h3
                className="m-0 text-[0.9375rem] font-medium text-m3-on-surface mb-4"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Info
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-m3-on-surface-variant text-[18px]">
                    {project.repo_private ? "lock" : "lock_open"}
                  </span>
                  <span className="text-[0.8125rem] text-m3-on-surface-variant">
                    {project.repo_private ? "Private Repository" : "Open Source"}
                  </span>
                </div>
                {project.downloads && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-rounded text-m3-on-surface-variant text-[18px]">download</span>
                    <span className="text-[0.8125rem] text-m3-on-surface-variant">
                      {project.downloads} downloads
                    </span>
                  </div>
                )}
                {project.category && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-rounded text-m3-on-surface-variant text-[18px]">category</span>
                    <span className="text-[0.8125rem] text-m3-on-surface-variant">
                      {project.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { slugify };
export default ProjectPage;
