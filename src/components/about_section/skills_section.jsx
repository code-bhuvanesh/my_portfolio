import PropTypes from "prop-types";

function SkillSection(props) {
  return (
    <div className="surface-panel-strong flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex rounded-full bg-accent-soft px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent">
          {String(props.index + 1).padStart(2, "0")}
        </span>
        <span className="h-10 w-10 rounded-2xl bg-linear-to-br from-[#0f766e]/15 to-[#06b6d4]/18"></span>
      </div>

      <h3 className="m-0 mt-6 text-[1.32rem] font-black tracking-[-0.04em] text-text-primary">
        {props.skillname}
      </h3>

      <ul className="mt-5 flex flex-wrap items-start gap-2.5 list-none p-0 m-0">
        {props.skills.map((skill) => (
          <li className="skill-pill wrap-break-word" key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

SkillSection.propTypes = {
  index: PropTypes.number.isRequired,
  skillname: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillSection;
