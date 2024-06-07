import "./projects_popup.css";

function ProjectsPopup(props) {
  return (
    <div className="App">
      {props.isOpen && (
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
              <p>This is the content of the popup.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPopup;
