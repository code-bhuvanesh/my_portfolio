import portfolioData from "../../constants.js";
import "./intro_section.css";
import SocialMediaIcon from "./social_media_icon.jsx";
//import images

function IntroSection() {
  return (
    <>
      <div className="intromain-container">
        <div className="intro-container">
          <div className="introtext-container">
            <div className="main-intro">
              {/* <h1>Hi!</h1> */}
              <h1>HELLO WORLD!</h1>
              <h2>I am BHUVANESH</h2>
            </div>
            <h3>Ready to Build your Apps</h3>
            <p className="intro-text">
              I'm an Software developer specializing in building apps with
              Flutter, also has experience in native development using Java and
              Kotlin. On the backend, I work with Django and MySQL databases,
              while my frontend skills include HTML, JavaScript, and CSS. I'm
              currently exploring React.js and learning about Machine Learning
              using PyTorch. I'm a quick learner who enjoys acquiring new
              skills, and I'm ready to bring my knowledge to any development
              team.
            </p>
          </div>
          <div className="social-container">
            <div
              className="resume-download-btn"
              onClick={() => window.open("/my_resume.pdf", "_blank")}
            >
              <img src="/downloads_icon.png" alt="download icon" />
              <h2>My Resume</h2>
            </div>
            {portfolioData["social media"].map((data) => (
              <SocialMediaIcon
                iconname={data.name}
                iconlink={data.link}
                iconpath={data.image}
              />
            ))}
          </div>
          <div className="more-section">
            <a href="#projects">see my projects</a>
            <a href="#about">contact me</a>
          </div>
        </div>
        <div className="profile-container">
          <img src="/my_profile.jpg" alt="my profile" />
        </div>
      </div>
    </>
  );
}

export default IntroSection;
