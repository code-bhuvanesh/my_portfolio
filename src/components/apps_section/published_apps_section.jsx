import portfolioData from "../../constants.js";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../pages/projectPage/ProjectPage.jsx";

function PublishedAppsSection() {
  const { appsSection, publishedApps } = portfolioData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const total = publishedApps.length;
  const activeApp = publishedApps[activeIndex];
  const nextIndex = (activeIndex + 1) % total;
  const nextApp = publishedApps[nextIndex];

  const goTo = useCallback(
    (index) => setActiveIndex(((index % total) + total) % total),
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Auto-advance every 6s
  useEffect(() => {
    if (isPaused || total <= 1) return;
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, next, total]);

  const handleOpen = () => {
    navigate(`/project/${slugify(activeApp.name)}`);
  };

  /* Framer Motion variants */
  const contentVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 1.08 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const titleVariants = {
    enter: { opacity: 0, y: 60 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  return (
    <div className="animate-m3-reveal-up">
      {/* Section header */}
      <div className="mb-8">
        <span className="m3-label">
          <span className="material-symbols-rounded text-[16px]">verified</span>
          {appsSection.label}
        </span>
        <h2 className="m3-display mt-4">{appsSection.title}</h2>
        <p className="m3-body mt-3 max-w-2xl">{appsSection.description}</p>
      </div>

      <hr className="m3-divider mb-8" />

      {/* Carousel: active card + next preview */}
      <div
        className="flex gap-5 items-stretch"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ── Active full-detail card ── */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden"
          style={{
            background: "var(--m3-surface-container)",
            borderRadius: "var(--m3-shape-extra-large)",
          }}
        >
          <button
            className="flex w-full h-full cursor-pointer flex-col text-left lg:flex-row border-none p-0 bg-transparent overflow-hidden"
            onClick={handleOpen}
            type="button"
          >
            {/* Image side */}
            <div className="relative overflow-hidden lg:w-[42%] xl:w-[38%]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeApp.name + "-img"}
                  className="aspect-[16/10] w-full object-cover lg:h-full lg:aspect-auto"
                  src={activeApp.image}
                  alt={activeApp.name}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-container/70 via-transparent to-transparent"></div>

              {/* Play Store badge */}
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
            </div>

            {/* Content side */}
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp.name + "-content"}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.05, 0.7, 0.1, 1] }}
                >
                  {/* Title */}
                  <motion.h3
                    className="m-0 text-[1.75rem] font-medium leading-tight text-m3-on-surface capitalize"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                    variants={titleVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.05, 0.7, 0.1, 1], delay: 0.05 }}
                  >
                    {activeApp.name}
                  </motion.h3>

                  {/* Badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {activeApp.downloads && (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-green"
                        style={{ background: "rgba(168, 218, 181, 0.12)" }}
                      >
                        <span className="material-symbols-rounded text-[16px]">download</span>
                        {activeApp.downloads} downloads
                      </span>
                    )}
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full-m3 px-3 py-1.5 text-[0.8125rem] font-medium text-m3-on-surface-variant"
                      style={{ background: "var(--m3-surface-container-highest)" }}
                    >
                      {activeApp.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="m3-body mt-4 max-w-xl line-clamp-3">
                    {activeApp.description}
                  </p>

                  {/* Tech chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeApp.tech?.map((tech) => (
                      <span className="m3-chip-filled" key={tech}>{tech}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {activeApp.playstore && (
                      <a
                        className="m3-btn-filled"
                        href={activeApp.playstore}
                        rel="noreferrer"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="material-symbols-rounded text-[18px]">download</span>
                        Get on Play Store
                      </a>
                    )}
                    {!activeApp.repo_private && activeApp.github && (
                      <a
                        className="m3-btn-tonal"
                        href={activeApp.github}
                        rel="noreferrer"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img src="/github_icon.png" alt="" className="h-4 w-4 object-contain invert opacity-70" />
                        Source Code
                      </a>
                    )}
                    <span className="m3-btn-text">
                      <span className="material-symbols-rounded text-[18px]">open_in_new</span>
                      View Details
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </button>

          {/* Dot indicators */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {publishedApps.map((app, i) => (
                <button
                  key={app.name}
                  type="button"
                  aria-label={`Go to ${app.name}`}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  className="border-none cursor-pointer p-0 transition-all duration-300"
                  style={{
                    width: activeIndex === i ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "var(--m3-shape-full)",
                    background: activeIndex === i ? "var(--m3-primary)" : "var(--m3-outline-variant)",
                  }}
                ></button>
              ))}
            </div>
          )}
        </div>

        {/* ── Next app preview card ── */}
        {total > 1 && (
          <button
            type="button"
            onClick={() => goTo(nextIndex)}
            className="relative hidden lg:flex flex-col justify-end overflow-hidden border-none p-0 cursor-pointer"
            style={{
              width: "220px",
              flexShrink: 0,
              borderRadius: "var(--m3-shape-extra-large)",
              background: "var(--m3-surface-container-low)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={nextApp.name + "-preview"}
                className="absolute inset-0 h-full w-full object-cover"
                src={nextApp.image}
                alt={nextApp.name + " preview"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)",
              }}
            ></div>
            <div className="relative z-10 p-5">
              <span className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-m3-on-surface-variant">
                Up next
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={nextApp.name + "-preview-title"}
                  className="m-0 mt-2 text-[1.125rem] font-medium text-white capitalize leading-snug"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.05, 0.7, 0.1, 1] }}
                >
                  {nextApp.name}
                </motion.p>
              </AnimatePresence>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="material-symbols-rounded text-m3-primary text-[14px]">arrow_forward</span>
                <span className="text-[0.6875rem] text-m3-on-surface-variant">
                  {nextApp.downloads || nextApp.category}
                </span>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default PublishedAppsSection;
