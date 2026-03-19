import PropTypes from "prop-types";

function SocialMediaIcon(props) {
  return (
    <a
      className="social-link-chip"
      href={props.iconlink}
      rel="noreferrer"
      target="_blank"
    >
      <img
        className="h-[1rem] w-[1rem] object-contain brightness-0 invert"
        src={props.iconpath}
        alt={props.iconname + " icon"}
      />
      <span className="capitalize xs:hidden">{props.iconname}</span>
    </a>
  );
}

SocialMediaIcon.propTypes = {
  iconlink: PropTypes.string.isRequired,
  iconname: PropTypes.string.isRequired,
  iconpath: PropTypes.string.isRequired,
};

export default SocialMediaIcon;
