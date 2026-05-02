import PropTypes from "prop-types";
import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import fetchScreenshots from "../../api/get_screenshots";

/* ── M3 Emphasized Motion ── */
const CONTAINER_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
  restDelta: 0.001,
};

const OVERLAY_TRANSITION = {
  duration: 0.25,
  ease: [0.2, 0, 0, 1],
};

const EMPTY_SCREENSHOTS = [];

function ProjectPopup({
  closePopup,
  projectDescription,
  projectName,
  projectimage,
  projectlink,
  projectPlaystore,
  repoPrivate = false,
  projectScreenshots = EMPTY_SCREENSHOTS,
  triggerRect = null,
  tech = [],
}) {
  const primaryLink = projectPlaystore || (!repoPrivate ? projectlink : null);
  const hasPlayStore = Boolean(projectPlaystore);
  const [screenshotImages, setScreenshotImages] = useState([]);
  const [isLoadingScreenshots, setIsLoadingScreenshots] = useState(true);

  /* ── Compute transform-origin from trigger card ── */
  const originStyle = useMemo(() => {
    if (!triggerRect) return { transformOrigin: "50% 50%" };
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const cx = triggerRect.left + triggerRect.width / 2;
    const cy = triggerRect.top + triggerRect.height / 2;
    return {
      transformOrigin: `${(cx / winW) * 100}% ${(cy / winH) * 100}%`,
    };
  }, [triggerRect]);

  /* ── Framer Motion variants ── */
  const shellVariants = {
    hidden: {
      scale: 0.85,
      y: 30,
      opacity: 0,
      borderRadius: "28px",
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      borderRadius: "28px",
    },
    exit: {
      scale: 0.9,
      y: 20,
      opacity: 0,
      borderRadius: "28px",
    },
  };

  /* ── Screenshot fetching ── */
  useEffect(() => {
    let isMounted = true;
    setIsLoadingScreenshots(true);

    if (repoPrivate && projectScreenshots.length > 0) {
      setScreenshotImages(
        projectScreenshots.map((url) => ({ download_url: url }))
      );
      setIsLoadingScreenshots(false);
    } else if (projectlink) {
      fetchScreenshots(projectlink)
        .then((data) => {
          if (isMounted) {
            setScreenshotImages(data);
            setIsLoadingScreenshots(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setScreenshotImages([]);
            setIsLoadingScreenshots(false);
          }
        });
    } else {
      setScreenshotImages([]);
      setIsLoadingScreenshots(false);
    }

    return () => {
      isMounted = false;
    };
  }, [projectlink, repoPrivate, projectScreenshots]);

  /* ── Lock body scroll + Escape key ── */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopup]);

  const popupContent = (
    <motion.div
      className="project-popup-overlay fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={closePopup}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={OVERLAY_TRANSITION}
    >
      {/* Shell */}
      <motion.div
        className="project-popup-shell mx-auto flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden"
        style={{
          background: "var(--m3-surface-container)",
          borderRadius: "var(--m3-shape-extra-large)",
          boxShadow:
            "0 8px 24px rgba(0, 0, 0, 0.5)",
          willChange: "transform, opacity",
          ...originStyle,
        }}
        onClick={(event) => event.stopPropagation()}
        variants={shellVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={CONTAINER_TRANSITION}
      >
        {/* ── Top bar ── */}
        <div
          className="flex shrink-0 items-center gap-3 px-5 py-4 sm:px-6"
          style={{
            background: "var(--m3-surface-container-high)",
            borderBottom: "1px solid var(--m3-outline-variant)",
          }}
        >
          <button
            type="button"
            onClick={closePopup}
            aria-label="Close popup"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full-m3 border-none cursor-pointer text-m3-on-surface-variant transition-colors duration-200 hover:bg-m3-surface-container-highest"
            style={{ background: "transparent" }}
          >
            <span className="material-symbols-rounded">close</span>
          </button>

          <span
            className="flex-1 text-center text-[1rem] font-medium text-m3-on-surface capitalize"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            {projectName}
          </span>

          {/* Open in new tab */}
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full-m3 text-m3-primary transition-colors duration-200 hover:bg-m3-surface-container-highest"
            >
              <span className="material-symbols-rounded text-[20px]">open_in_new</span>
            </a>
          )}
          {!primaryLink && <div className="w-10"></div>}
        </div>

        {/* ── Content ── */}
        <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.15fr)]">
          {/* Left: Image + meta */}
          <div
            className="relative overflow-y-auto"
            style={{ background: "var(--m3-surface-container-low)" }}
          >
            <div className="p-5 sm:p-6">
              {/* Project image */}
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "var(--m3-shape-large)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  className="aspect-[4/4.5] w-full object-cover object-center"
                  src={projectimage}
                  alt={projectName}
                />
              </div>

              {/* Meta chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span className="m3-chip-filled" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.75rem] font-medium text-m3-on-surface-variant"
                  style={{ background: "var(--m3-surface-container-highest)" }}
                >
                  <span className="material-symbols-rounded text-[14px]">
                    {repoPrivate ? "lock" : "lock_open"}
                  </span>
                  {repoPrivate ? "Private Repository" : "Open Source"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
              {/* Description */}
              <div
                className="p-4"
                style={{
                  background: "var(--m3-surface-container-high)",
                  borderRadius: "var(--m3-shape-large)",
                }}
              >
                <p className="m3-body">{projectDescription}</p>
              </div>

              {/* Action buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                {hasPlayStore && (
                  <a
                    className="m3-btn-filled"
                    href={projectPlaystore}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-rounded text-[18px]">download</span>
                    Get on Play Store
                  </a>
                )}
                {!repoPrivate && projectlink && (
                  <a
                    className={hasPlayStore ? "m3-btn-tonal" : "m3-btn-filled"}
                    href={projectlink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img
                      src="/github_icon.png"
                      alt=""
                      className="h-4 w-4 object-contain invert opacity-70"
                    />
                    {hasPlayStore ? "GitHub" : "View on GitHub"}
                  </a>
                )}
                <span className="m3-chip-filled">
                  <span className="material-symbols-rounded text-[14px]">photo_library</span>
                  {isLoadingScreenshots
                    ? "Loading..."
                    : screenshotImages.length > 0
                    ? `${screenshotImages.length} screenshots`
                    : "No screenshots"}
                </span>
              </div>

              {/* Screenshots */}
              {isLoadingScreenshots ? (
                <div
                  className="mt-6 flex items-center gap-3 p-4"
                  style={{
                    background: "var(--m3-surface-container-high)",
                    borderRadius: "var(--m3-shape-medium)",
                  }}
                >
                  <span className="material-symbols-rounded text-m3-primary animate-spin text-[20px]">progress_activity</span>
                  <span className="text-[0.875rem] text-m3-on-surface-variant">
                    Loading screenshots...
                  </span>
                </div>
              ) : screenshotImages.length > 0 ? (
                <div className="mt-6">
                  <h3
                    className="m-0 text-[1.125rem] font-medium text-m3-on-surface"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    Screenshots
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {screenshotImages.map((image) => (
                      <img
                        key={image.download_url}
                        className="w-full object-cover shadow-m3-1"
                        style={{
                          borderRadius: "var(--m3-shape-medium)",
                          background: "var(--m3-surface-container-lowest)",
                        }}
                        src={image.download_url}
                        alt={`${projectName} screenshot`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="mt-6 flex items-center gap-3 p-4"
                  style={{
                    background: "var(--m3-surface-container-high)",
                    borderRadius: "var(--m3-shape-medium)",
                    border: "1px dashed var(--m3-outline-variant)",
                  }}
                >
                  <span className="material-symbols-rounded text-m3-outline text-[20px]">
                    image_not_supported
                  </span>
                  <span className="text-[0.875rem] text-m3-on-surface-variant">
                    No screenshots available for this project.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(popupContent, document.body);
}

ProjectPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  projectDescription: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectPlaystore: PropTypes.string,
  projectimage: PropTypes.string.isRequired,
  projectlink: PropTypes.string,
  repoPrivate: PropTypes.bool,
  projectScreenshots: PropTypes.arrayOf(PropTypes.string),
  triggerRect: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  tech: PropTypes.arrayOf(PropTypes.string),
};

export default ProjectPopup;
