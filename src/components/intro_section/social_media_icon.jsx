import { useState } from "react";
import "./social_media_icon.css";

function SocialMediaIcon(props) {
  var [showname, setShowName] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
      onClick={() => {
        console.log(props.iconlink);
        return window.open(props.iconlink, "_blank");
      }}
      className="social-media-icon"
      style={showname ? { borderColor: "white" } : {}}
    >
      <img
        className="social-icon"
        src={props.iconpath}
        alt={props.iconname + " icon"}
      />
      <h2
        className="icon-name"
        style={{
          display: showname || props.alwaysVisible ? "block" : "None",
        }}
      >
        {props.iconname}
      </h2>
    </div>
  );
}

SocialMediaIcon.defaultProps = {
  alwaysVisible: true,
};

export default SocialMediaIcon;
