import PropTypes from "prop-types";
import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import fetchScreenshots from "../../api/get_screenshots";
import portfolioData from "../../constants.js";

/* ── macOS-style minimize / restore spring config ── */
const GENIE_TRANSITION = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.9,
  restDelta: 0.001,
};

const OVERLAY_TRANSITION = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

const EMPTY_SCREENSHOTS = [];

function ProjectsPopup({
  closePopup,
  projectDescription,
  projectName,
  projectimage,
  projectlink,
  projectPlaystore,
  repoPrivate = false,
  projectScreenshots = EMPTY_SCREENSHOTS,
  triggerRect = null,
}) {
  const primaryLink = projectPlaystore || (!repoPrivate ? projectlink : null);
  const hasPlayStore = Boolean(projectPlaystore);
  const [screenshotImages, setScreenshotImages] = useState([]);
  const [isLoadingScreenshots, setIsLoadingScreenshots] = useState(true);
  const { projectPopup } = portfolioData;

  /* ── Compute transform-origin from trigger card position ── */
  const originStyle = useMemo(() => {
    if (!triggerRect) return { transformOrigin: "50% 80%" };
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
      scale: 0.15,
      scaleX: 0.35,
      y: 120,
      opacity: 0,
      filter: "blur(16px) brightness(1.6)",
      borderRadius: "32px",
    },
    visible: {
      scale: 1,
      scaleX: 1,
      y: 0,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      borderRadius: "16px",
    },
    exit: {
      scale: 0.12,
      scaleX: 0.3,
      y: 160,
      opacity: 0,
      filter: "blur(20px) brightness(1.8)",
      borderRadius: "32px",
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

  /* ── Rendered content ── */
  const popupContent = (
    /* Overlay — fade in/out */
    <motion.div
      className="project-popup-overlay fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6"
      style={{
        backdropFilter: "blur(28px) saturate(1.4)",
        WebkitBackdropFilter: "blur(28px) saturate(1.4)",
        background:
          "radial-gradient(circle at 20% 20%, rgba(96,184,255,0.06), transparent 40%), radial-gradient(circle at 80% 80%, rgba(196,156,255,0.05), transparent 40%), rgba(4,4,8,0.7)",
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
      {/* Shell — macOS Genie spring animation */}
      <motion.div
        className="project-popup-shell mx-auto flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-white/10"
        style={{
          background: "rgba(16, 16, 26, 0.85)",
          backdropFilter: "blur(40px) saturate(1.8)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          willChange: "transform, opacity, filter",
          ...originStyle,
        }}
        onClick={(event) => event.stopPropagation()}
        variants={shellVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={GENIE_TRANSITION}
      >
        {/* ── Glass titlebar ── */}
        <div
          className="flex shrink-0 items-center gap-3 border-b border-white/8 px-5 py-3 sm:px-6"
          style={{ background: "rgba(255, 255, 255, 0.03)" }}
        >
          {/* Traffic light buttons */}
          <div className="group/dots flex items-center gap-2">
            {/* Close — red */}
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close popup"
              className="relative h-3.25 w-3.25 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)] cursor-pointer border-0 p-0 transition-all duration-150 hover:brightness-110"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-black/0 group-hover/dots:text-black/70 transition-colors leading-none">
                ×
              </span>
            </button>

            {/* Minimize — yellow */}
            <button
              type="button"
              onClick={closePopup}
              aria-label="Minimize popup"
              className="relative h-3.25 w-3.25 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)] cursor-pointer border-0 p-0 transition-all duration-150 hover:brightness-110"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-black/0 group-hover/dots:text-black/70 transition-colors leading-none">
                −
              </span>
            </button>

            {/* Full screen / Link dot — green */}
            {primaryLink ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Open project in new tab"
                className="relative block h-3.25 w-3.25 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)] cursor-pointer border-0 p-0 transition-all duration-150 hover:brightness-110"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-black/0 group-hover/dots:text-black/70 transition-colors leading-none">
                  ⤢
                </span>
              </a>
            ) : (
              <div
                aria-hidden="true"
                className="relative h-3.25 w-3.25 rounded-full border border-[#28c840]/20 bg-[#28c840]/30"
              />
            )}
          </div>

          {/* Centered filename */}
          <span
            className="flex-1 text-center text-[0.68rem] font-semibold tracking-wide text-xc-text-dimmed"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {projectName.replace(/\s+/g, "_").toLowerCase()}.swift
          </span>

          {/* Spacer */}
          <div className="w-13"></div>
        </div>

        {/* ── Two-column content ── */}
        <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.1fr)]">
          {/* Left: Image */}
          <div
            className="relative overflow-hidden"
            style={{
              background:
                "linear-gradient(165deg, rgba(20,20,32,0.9) 0%, rgba(10,10,15,0.95) 86%)",
            }}
          >
            <div className="relative flex h-full flex-col p-4 sm:p-6">
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full border border-xc-blue/20 bg-xc-blue/8 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-xc-blue backdrop-blur-sm"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                <span className="opacity-50">{"//"}</span>
                {projectPopup.tag}
              </span>

              <h2
                className="m-0 mt-5 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold capitalize leading-[0.98] tracking-[-0.04em] text-white"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {projectName}
              </h2>

              <p
                className="mt-3 max-w-md text-[0.75rem] leading-6 text-white/40"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                <span className="text-xc-green">{"// "}</span>A closer look at
                the product direction and implementation.
              </p>

              <div className="relative mt-6 overflow-hidden rounded-xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <img
                  className="aspect-[4/4.8] w-full object-cover object-center"
                  src={projectimage}
                  alt={projectName}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[0.62rem] font-semibold text-xc-text-dimmed backdrop-blur-sm"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {repoPrivate ? "Private Repository" : "Repository-backed"}
                </span>
                <span
                  className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[0.62rem] font-semibold text-xc-text-dimmed backdrop-blur-sm"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {repoPrivate ? "Internal screenshots" : "GitHub screenshots"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div
            className="flex min-h-0 flex-col"
            style={{ background: "rgba(20, 20, 32, 0.6)" }}
          >
            {/* Scrollable content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
              <div
                className="rounded-xl border border-white/8 p-4"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-[0.85rem] leading-7 text-xc-text-secondary">
                  {projectDescription}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {hasPlayStore && (
                  <a
                    className="cta-primary"
                    href={projectPlaystore}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img
                      src="/playstore_icon.svg"
                      alt=""
                      className="h-4 w-4 opacity-80"
                    />
                    View on Play Store
                  </a>
                )}
                {!repoPrivate && (
                  <a
                    className={hasPlayStore ? "cta-secondary" : "cta-primary"}
                    href={projectlink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img
                      src="/github_icon.png"
                      alt=""
                      className="h-4 w-4 object-contain invert opacity-60"
                    />
                    {hasPlayStore ? "GitHub" : "View GitHub Repository"}
                  </a>
                )}
                <span className="metric-pill">
                  {isLoadingScreenshots
                    ? "Loading..."
                    : screenshotImages.length > 0
                    ? `${screenshotImages.length} screenshots`
                    : "No screenshots"}
                </span>
              </div>

              {isLoadingScreenshots ? (
                <div
                  className="mt-6 rounded-xl border border-white/8 p-4 text-[0.78rem] leading-6 text-xc-text-secondary"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    background: "rgba(255, 255, 255, 0.03)",
                  }}
                >
                  <span className="text-xc-orange">fetching</span>
                  <span className="text-xc-text-dimmed">(</span>
                  <span className="text-xc-green">{'"screenshots"'}</span>
                  <span className="text-xc-text-dimmed">)</span>
                  <span className="text-xc-text-dimmed">...</span>
                </div>
              ) : screenshotImages.length > 0 ? (
                <div className="mt-6">
                  <h3
                    className="m-0 text-[1.2rem] font-bold tracking-[-0.03em] text-xc-text-primary"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {projectPopup.screenshotsTitle}
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {screenshotImages.map((image) => (
                      <img
                        key={image.download_url}
                        className="w-full rounded-xl border border-white/8 object-cover shadow-soft"
                        style={{ background: "rgba(10,10,15,0.8)" }}
                        src={image.download_url}
                        alt={`${projectName} screenshot`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="mt-6 rounded-xl border border-dashed border-white/12 p-4 text-[0.78rem] leading-6 text-xc-text-dimmed"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    background: "rgba(255, 255, 255, 0.02)",
                  }}
                >
                  <span className="text-xc-green">{"// "}</span>
                  No screenshots folder found in this repository.
                </div>
              )}
            </div>
          </div>
          {/* end grid */}
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(popupContent, document.body);
}

ProjectsPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  projectDescription: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectPlaystore: PropTypes.string,
  projectimage: PropTypes.string.isRequired,
  projectlink: PropTypes.string.isRequired,
  repoPrivate: PropTypes.bool,
  projectScreenshots: PropTypes.arrayOf(PropTypes.string),
  triggerRect: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

export default ProjectsPopup;
