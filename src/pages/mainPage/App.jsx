import NavBar from "../../components/nav_bar/nav_bar.jsx";
import HeroSection from "../../components/hero_section/hero_section.jsx";
import PublishedAppsSection from "../../components/apps_section/published_apps_section.jsx";
import OpenSourceSection from "../../components/opensource_section/opensource_section.jsx";
import ContactSection from "../../components/contact_section/contact_section.jsx";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [currentSection, setCurrentSection] = useState("home");

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
    </div>
  );
}

export default App;
