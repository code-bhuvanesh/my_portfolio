import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectPopup from "../project_popup/project_popup.jsx";
import fetchScreenshots from "../../api/get_screenshots";

/* ── Auto-looping screenshot carousel ── */
function ScreenshotCarousel({ screenshots, appName }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = [...screenshots, ...screenshots];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || screenshots.length === 0) return;

    let animationId;
    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += 0.6;
        const halfScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= halfScroll) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, screenshots.length]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12"
        style={{ background: "linear-gradient(to right, var(--m3-surface-container), transparent)" }}
      ></div>
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12"
        style={{ background: "linear-gradient(to left, var(--m3-surface-container), transparent)" }}
      ></div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-hidden py-1"
        style={{ scrollBehavior: "auto" }}
      >
        {items.map((url, index) => (
          <img
            key={index}
            className="h-44 flex-none rounded-md-m3 object-cover shadow-m3-1 sm:h-52"
            src={url}
            alt={`${appName} screenshot ${(index % screenshots.length) + 1}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

/* ── Published app card with full details + carousel ── */
function AppCard({ app }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState(null);
  const [screenshots, setScreenshots] = useState(app.project_screenshots || []);
  const [loadingScreenshots, setLoadingScreenshots] = useState(false);

  // Fetch screenshots from GitHub if not provided locally
  useEffect(() => {
    if (screenshots.length > 0 || !app.github || app.repo_private) return;

    setLoadingScreenshots(true);
    fetchScreenshots(app.github)
      .then((data) => {
        if (data && data.length > 0) {
          setScreenshots(data.map((img) => img.download_url));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingScreenshots(false));
  }, [app.github, app.repo_private, screenshots.length]);

  const handleOpen = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTriggerRect(rect);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="m3-card overflow-hidden"
        style={{ borderRadius: "var(--m3-shape-extra-large)" }}
      >
        {/* Horizontal layout: image + details */}
        <button
          className="group flex w-full cursor-pointer flex-col overflow-hidden text-left lg:flex-row border-none p-0 bg-transparent"
          onClick={handleOpen}
          type="button"
        >
          {/* Image side */}
          <div className="relative overflow-hidden lg:w-[38%] xl:w-[34%]">
            <img
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] lg:h-full lg:aspect-auto"
              src={app.image}
              alt={app.name + " preview"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-container/70 via-transparent to-transparent"></div>

            {/* Play Store badge */}
            {app.playstore && (
              <div
                className="absolute left-3 top-3 flex items-center gap-2"
                style={{
                  background: "var(--m3-primary-container)",
                  borderRadius: "var(--m3-shape-full)",
                  padding: "6px 14px",
                }}
              >
                <img src="/playstore_icon.svg" alt="" className="h-4 w-4 opacity-90" />
                <span
                  className="text-[0.75rem] font-medium text-m3-on-primary-container"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  Play Store
                </span>
              </div>
            )}
          </div>

          {/* Content side */}
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
            {/* Title */}
            <h3
              className="m-0 text-[1.75rem] font-medium leading-tight text-m3-on-surface capitalize"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {app.name}
            </h3>

            {/* Badges row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {app.downloads && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-green"
                  style={{ background: "rgba(168, 218, 181, 0.12)" }}
                >
                  <span className="material-symbols-rounded text-[16px]">download</span>
                  {app.downloads} downloads
                </span>
              )}
              <span
                className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-on-surface-variant"
                style={{ background: "var(--m3-surface-container-highest)" }}
              >
                {app.category}
              </span>
            </div>

            {/* Description */}
            <p className="m3-body mt-4 max-w-xl line-clamp-3">
              {app.description}
            </p>

            {/* Tech chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {app.tech?.map((tech) => (
                <span className="m3-chip-filled" key={tech}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {app.playstore && (
                <a
                  className="m3-btn-filled"
                  href={app.playstore}
                  rel="noreferrer"
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="material-symbols-rounded text-[18px]">download</span>
                  Get on Play Store
                </a>
              )}
              {!app.repo_private && app.github && (
                <a
                  className="m3-btn-tonal"
                  href={app.github}
                  rel="noreferrer"
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src="/github_icon.png" alt="" className="h-4 w-4 object-contain invert opacity-70" />
                  Source Code
                </a>
              )}
              <span className="m3-btn-text">
                <span className="material-symbols-rounded text-[18px]">info</span>
                View Details
              </span>
            </div>
          </div>
        </button>

        {/* Screenshot carousel strip */}
        {screenshots.length > 0 && (
          <div
            className="border-t px-6 py-5 sm:px-8 sm:py-6"
            style={{ borderColor: "var(--m3-outline-variant)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-rounded text-m3-on-surface-variant text-[16px]">photo_library</span>
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-m3-on-surface-variant">
                Screenshots
              </span>
              <span className="text-[0.6875rem] text-m3-outline">
                ({screenshots.length})
              </span>
            </div>
            <ScreenshotCarousel screenshots={screenshots} appName={app.name} />
          </div>
        )}

        {loadingScreenshots && (
          <div
            className="flex items-center gap-3 border-t px-6 py-4 sm:px-8"
            style={{ borderColor: "var(--m3-outline-variant)" }}
          >
            <span className="material-symbols-rounded text-m3-primary animate-spin text-[18px]">progress_activity</span>
            <span className="text-[0.8125rem] text-m3-on-surface-variant">Loading screenshots...</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <ProjectPopup
            key="app-popup"
            closePopup={() => setIsOpen(false)}
            projectName={app.name}
            projectimage={app.image}
            projectlink={app.github}
            projectPlaystore={app.playstore}
            projectDescription={app.description}
            repoPrivate={app.repo_private}
            projectScreenshots={screenshots}
            triggerRect={triggerRect}
            tech={app.tech}
          />
        )}
      </AnimatePresence>
    </>
  );
}

ScreenshotCarousel.propTypes = {
  screenshots: PropTypes.arrayOf(PropTypes.string).isRequired,
  appName: PropTypes.string.isRequired,
};

AppCard.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string.isRequired,
    playstore: PropTypes.string,
    github: PropTypes.string,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    downloads: PropTypes.string,
    tech: PropTypes.arrayOf(PropTypes.string),
    repo_private: PropTypes.bool,
    project_screenshots: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default AppCard;
