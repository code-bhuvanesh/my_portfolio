import "./nav_bar.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      {/* <Link className="nav-link" to="intro" smooth={true} duration={500}>
        Home
      </Link>
      <Link className="nav-link" to="projects" smooth={true} duration={500}>
        Projects
      </Link>
      <Link className="nav-link" to="skills" smooth={true} duration={500}>
        Skills
      </Link> */}
      <ul>
        <li className="nav-link">
          <a href="#intro">Home</a>
        </li>
        <li className="nav-link">
          <a href="#projects">Projects</a>
        </li>
        <li className="nav-link">
          <a href="#about">About</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
