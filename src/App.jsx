import "./App.css";
import AboutSection from "./components/about_section/about_section.jsx";
import IntroSection from "./components/intro_section/intro_section.jsx";
import ProjectsSection from "./components/projects_sections/projects_section.jsx";
import Lottie from "lottie-react";
import animationData from "./assets/lottie_anim/box_anim.json";
import { useRef, useState, useEffect } from "react";

function App() {
  const containerRef = useRef(null);
  var [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      rootMargin: "100px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("current section : " + entry.target.id);
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const sections = containerRef.current.querySelectorAll(".scroll-item");

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="scroll-container" ref={containerRef}>
      <section id="intro" className="scroll-item" key="intro">
        {currentSection === "intro" ? (
          <div className="animation-div">
            <Lottie
              className="intro-anim intro-anim1"
              animationData={animationData}
            />
            <Lottie
              className="intro-anim intro-anim2"
              animationData={animationData}
            />
            <Lottie
              className="intro-anim intro-anim3"
              animationData={animationData}
            />
          </div>
        ) : null}
        <IntroSection />
      </section>
      <section id="projects" className="scroll-item" key="projects">
        <ProjectsSection />
      </section>
      <section id="about" className="scroll-item" key="about">
        <AboutSection />
      </section>
    </div>
  );
}

export default App;
