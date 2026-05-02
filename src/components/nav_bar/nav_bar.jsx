import PropTypes from "prop-types";
import portfolioData from "../../constants.js";
import { motion } from "framer-motion";

function NavBar({ currentSection }) {
  const { navigation } = portfolioData;

  return (
    <nav className="fixed left-1/2 bottom-6 sm:top-4 sm:bottom-auto z-50 w-fit max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <div className="m3-top-app-bar shadow-m3-3 sm:shadow-m3-2 !p-1.5 backdrop-blur-lg">
        <ul className="flex items-center gap-1 list-none m-0 p-0 overflow-visible">
          {navigation.map((item) => {
            const isActive = currentSection === item.id;
            
            return (
              <li className="relative flex" key={item.id}>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-m3-secondary-container shadow-sm"
                    style={{ borderRadius: "var(--m3-shape-full)" }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                
                <a
                  href={`#${item.id}`}
                  className={`relative z-10 inline-flex h-11 items-center justify-center gap-2 px-4 sm:px-6 text-[0.8125rem] font-medium no-underline transition-colors duration-300 min-w-[4.2rem] sm:min-w-[6.5rem] ${
                    isActive
                      ? "text-m3-on-secondary-container"
                      : "text-m3-on-surface-variant hover:bg-m3-surface-container-highest/40"
                  }`}
                  style={{ 
                    fontFamily: '"Outfit", "Roboto", sans-serif',
                    borderRadius: "var(--m3-shape-full)"
                  }}
                >
                  <span className="material-symbols-rounded text-[24px] sm:text-[22px]">
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline-block">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  currentSection: PropTypes.string.isRequired,
};

export default NavBar;
