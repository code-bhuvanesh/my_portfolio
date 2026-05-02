import PropTypes from "prop-types";
import portfolioData from "../../constants.js";

function NavBar({ currentSection }) {
  const { navigation } = portfolioData;

  return (
    <nav className="fixed left-1/2 top-3 z-50 w-fit max-w-[calc(100vw-1rem)] -translate-x-1/2 sm:top-4">
      <div className="m3-top-app-bar">
        <ul className="flex items-center gap-1 list-none m-0 p-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navigation.map((item) => (
            <li className="flex" key={item.id}>
              <a
                href={`#${item.id}`}
                className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full-m3 px-4 py-2 text-[0.8125rem] font-medium no-underline transition-all duration-300 sm:min-w-[5.5rem] ${
                  currentSection === item.id
                    ? "bg-m3-secondary-container text-m3-on-secondary-container shadow-m3-1"
                    : "text-m3-on-surface-variant hover:bg-m3-surface-container-highest"
                }`}
                style={{ fontFamily: '"Outfit", "Roboto", sans-serif' }}
              >
                <span className="material-symbols-rounded text-[20px]">
                  {item.icon}
                </span>
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  currentSection: PropTypes.string.isRequired,
};

export default NavBar;
