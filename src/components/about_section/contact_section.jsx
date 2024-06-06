import "./contact_section.css";

function ContactSection() {
  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <br></br>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          className="email-icon"
          src="src\assets\email_icon.png"
          alt="email icon"
        />
        <p className="email-text">bhuvaneshdeavaraj@gmail.com</p>
      </div>
    </div>
  );
}

export default ContactSection;
