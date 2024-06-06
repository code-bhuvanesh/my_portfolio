import portfolioData from "../../constants";
import "./about_section.css";
import ContactSection from "./contact_section";

function AboutSection() {
  var skill = [];
  Object.keys(portfolioData.skills).forEach((key) => {
    skill.push(
      <IndividualSkills skillname={key} skills={portfolioData.skills[key]} />
    );
  });
  return (
    <div className="aboutmain-container">
      <div className="skills-container">
        <h1>My Skills</h1>
        <div>{...skill}</div>
      </div>
      <br></br>
      <ContactSection />
    </div>
  );
}

function IndividualSkills(props) {
  // console.log(props.skillname);
  var allSkills = "";
  props.skills.forEach((e) => (allSkills += e + ", "));
  allSkills = allSkills.substring(0, allSkills.length - 2);
  return (
    <div className="individual-skills-container">
      <h3>{props.skillname.toUpperCase() + " : "}</h3>
      <p>{allSkills}</p>
    </div>
  );
}

export default AboutSection;
