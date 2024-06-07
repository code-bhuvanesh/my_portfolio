import { useEffect, useState } from "react";
import "./projects_popup.css";
import fetchScreenshots from "../../api/get_screenshots";

function ProjectsPopup(props) {
  var [screnshotImages, setScreenShotImages] = useState([]);
  useEffect(() => {
    console.log("fetching screenshots");
    fetchScreenshots(props.projectlink).then((data) => {
      setScreenShotImages(data);
      console.log("screenshots fetched");
    });

    return () => {};
  }, [props.isOpen == true]);
  return (
    <div className="App">
      <div className="projects-overlay">
        <div className="popup-background"></div>
        <div className="projects-popup">
          <div className="projects-popup-header">
            <h2>{props.projectName}</h2>
            <span className="projects-popup-close" onClick={props.closePopup}>
              &times;
            </span>
          </div>
          <div className="projects-popup-content">
            <img className="popup-project-image" src={props.projectimage} />
            <div className="popup-description">
              <div className="desc-content">{props.projectDescription}</div>
              <div className="popup-screenshots">
                {screnshotImages.length != 0
                  ? DisplayScreenshots(screnshotImages)
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPopup;

function DisplayScreenshots(images) {
  console.log("screenshot images");
  images.map((i) => console.log(i));
  return (
    <>
      <h3>Screenshots</h3>
      {images.map((i) => (
        <img className="screenshot-images" src={i.download_url} />
      ))}
    </>
  );
}
