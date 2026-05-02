import NavBar from "../../components/nav_bar/nav_bar.jsx";
import HeroSection from "../../components/hero_section/hero_section.jsx";
import PublishedAppsSection from "../../components/apps_section/published_apps_section.jsx";
import OpenSourceSection from "../../components/opensource_section/opensource_section.jsx";
import ContactSection from "../../components/contact_section/contact_section.jsx";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../../constants.js";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [showSplash, setShowSplash] = useState(true);

  // Hide splash screen after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      window.scrollTo(0, 0); // Ensure we start at the top
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Framer Motion Variants for Hero Splash ── */
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.5, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

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

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-section]"));
    
    // Intersection Observer to detect when a section is in the middle of the screen
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Tight center trigger
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Fallback for top of page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setCurrentSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-x-clip">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: "var(--m3-surface)" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Ambient gradients for splash */}
            <div
              className="absolute inset-0 z-0 opacity-30"
              style={{
                background: "radial-gradient(circle at 50% 40%, rgba(168,199,250,0.15) 0%, transparent 50%), radial-gradient(circle at 50% 60%, rgba(214,190,228,0.1) 0%, transparent 50%)"
              }}
            />
            
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Glowing backdrop behind everything */}
              <div className="absolute inset-0 rounded-full blur-[80px] bg-m3-primary opacity-20 scale-[2] animate-pulse" />
              
              <motion.div 
                className="flex flex-wrap justify-center overflow-hidden mb-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {"<code_bhuvanesh />".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="m-0 text-[clamp(2rem,6vw,4rem)] font-bold text-transparent bg-clip-text tracking-tight"
                    style={{ 
                      fontFamily: '"JetBrains Mono", "Outfit", monospace',
                      backgroundImage: "linear-gradient(135deg, var(--m3-on-surface) 0%, var(--m3-primary) 100%)"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-4 flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <div className="h-[1px] w-12 bg-m3-primary opacity-50" />
                <p className="m-0 text-m3-primary tracking-[0.3em] uppercase text-[0.75rem] sm:text-[0.875rem] font-semibold">
                  Portfolio
                </p>
                <div className="h-[1px] w-12 bg-m3-primary opacity-50" />
              </motion.div>
            </motion.div>

            {/* Loading progress bar */}
            <motion.div 
              className="absolute bottom-16 sm:bottom-20 h-1 bg-m3-primary rounded-full overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
            >
              <motion.div 
                className="h-full w-full bg-white opacity-40"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* M3 ambient gradient orbs */}
      <div
        className="pointer-events-none fixed -right-40 -top-40 z-0 h-[500px] w-[500px] rounded-full blur-[180px] opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, #A8C7FA, transparent)",
        }}
      ></div>
      <div
        className="pointer-events-none fixed -bottom-40 -left-20 z-0 h-[400px] w-[400px] rounded-full blur-[160px] opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, #D6BEE4, transparent)",
        }}
      ></div>

      {/* Only show content after splash starts exiting, or let it sit underneath */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <NavBar currentSection={currentSection} />

        <main className="relative z-10 w-full">
          <section id="home" data-section="home" className="flex min-h-[100dvh] items-center scroll-mt-0">
            <div className="page-frame w-full py-20 sm:py-24 lg:py-28">
              <HeroSection />
            </div>
          </section>

          <section id="apps" data-section="apps" className="flex min-h-[100dvh] items-center scroll-mt-0">
            <div className="page-frame w-full py-12 sm:py-16 lg:py-20">
              <PublishedAppsSection />
            </div>
          </section>

          <section id="opensource" data-section="opensource" className="flex min-h-[100dvh] items-center scroll-mt-0">
            <div className="page-frame w-full py-12 sm:py-16 lg:py-20">
              <OpenSourceSection />
            </div>
          </section>

          <section id="contact" data-section="contact" className="flex min-h-[100dvh] items-center scroll-mt-0">
            <div className="page-frame w-full py-12 sm:py-16 lg:py-20">
              <ContactSection />
            </div>
          </section>
        </main>
      </motion.div>
    </div>
  );
}

export default App;
