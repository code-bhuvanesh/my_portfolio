import AboutSection from "../../components/about_section/about_section.jsx";
import IntroSection from "../../components/intro_section/intro_section.jsx";
import ProjectsSection from "../../components/projects_sections/projects_section.jsx";
import NavBar from "../../components/nav_bar/nav_bar.jsx";
import { useEffect, useState, useCallback } from "react";
import portfolioData from "../../constants.js";
import FloatingIcons from "../../components/floating_icons/floating_icons.jsx";

const sectionComponents = {
  intro: IntroSection,
  projects: ProjectsSection,
  about: AboutSection,
};

function App() {
  const availableSections = portfolioData.navigation.filter(
    (section) => sectionComponents[section.id]
  );
  const [currentSection, setCurrentSection] = useState(
    availableSections[0]?.id || "intro"
  );

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
    const lastSectionId = sections[sections.length - 1]?.id;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -30% 0px",
        threshold: [0.05, 0.2, 0.4],
      }
    );

    sections.forEach((section) => observer.observe(section));

    /* Detect bottom-of-page to activate the last section */
    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight - scrollBottom < 100 && lastSectionId) {
        setCurrentSection(lastSectionId);
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
      <FloatingIcons />

      {/* Liquid glass ambient orbs */}
      <div
        className="pointer-events-none fixed -right-32 top-10 z-0 h-96 w-96 rounded-full blur-[140px] animate-drift opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(96,184,255,0.4), transparent)",
        }}
      ></div>
      <div
        className="pointer-events-none fixed -bottom-32 -left-20 z-0 h-80 w-80 rounded-full blur-[140px] animate-drift-reverse opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(196,156,255,0.35), transparent)",
        }}
      ></div>
      <div
        className="pointer-events-none fixed right-1/4 top-1/2 z-0 h-64 w-64 rounded-full blur-[120px] animate-drift opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(126,232,168,0.3), transparent)",
        }}
      ></div>

      <NavBar currentSection={currentSection} />

      <main className="page-frame pb-6 pt-24 sm:pb-8 sm:pt-28 lg:pt-32">
        {availableSections.map((section) => {
          const SectionComponent = sectionComponents[section.id];

          return (
            <section
              id={section.id}
              data-section={section.id}
              key={section.id}
              className={`${
                section.id === "about"
                  ? ""
                  : "min-h-[calc(100dvh-7.5rem)] sm:min-h-[calc(100dvh-8rem)] lg:min-h-[calc(100dvh-8.5rem)]"
              } scroll-mt-24 py-0 ${
                section.id === "intro"
                  ? ""
                  : "border-t border-white/[0.04]"
              }`}
            >
              <SectionComponent />
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;
