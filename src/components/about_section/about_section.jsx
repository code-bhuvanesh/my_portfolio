import Lottie from "lottie-react";
import portfolioData from "../../constants";
import "./about_section.css";
import ContactSection from "./contact_section";
import SkillSection from "./skills_section";
import skillanimation from "../../assets/lottie_anim/skills_anim.json";

function AboutSection() {
  var skill = [];
  Object.keys(portfolioData.skills).forEach((key) => {
    skill.push(
      <SkillSection skillname={key} skills={portfolioData.skills[key]} />
    );
  });
  return (
    <div className="aboutmain-container">
      <h1>MY SKILLS</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="skills-container">{...skill}</div>
        <Lottie
          style={{ marginLeft: "200px" }}
          animationData={skillanimation}
        />
      </div>

      <ContactSection />
    </div>
  );
}

export default AboutSection;
