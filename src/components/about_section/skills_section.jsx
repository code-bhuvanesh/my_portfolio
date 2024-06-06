import Lottie from "lottie-react";
import "./skills_section.css";

function SkillSection(props) {
  return (
    <>
      <div className="individual-skill-container">
        <h2 style={{ fontSize: "40px", margin: "20px 10px" }}>
          {props.skillname.toUpperCase()}
        </h2>
        <ul style={{ padding: "0px" }}>
          {props.skills.map((d) => (
            <li>
              <img className="skill-icon" src={`/skill_icons/${d}.png`} />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SkillSection;
