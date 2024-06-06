import Lottie from "lottie-react";
import "./skills_section.css";

function SkillSection(props) {
  return (
    <>
      <div className="individual-skill-container">
        <h3>{props.skillname}</h3>
        <ul style={{ padding: "0px" }}>
          {props.skills.map((d) => (
            <li>{d}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SkillSection;
