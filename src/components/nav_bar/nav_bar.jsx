import PropTypes from "prop-types";
import portfolioData from "../../constants.js";
import { motion } from "framer-motion";

function NavBar({ currentSection }) {
  const { navigation } = portfolioData;

  return (
    <nav className="fixed left-1/2 bottom-6 sm:top-4 sm:bottom-auto z-50 w-fit max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <div 
        className="!p-1.5 flex items-center"
        style={{
          background: "color-mix(in srgb, var(--m3-surface) 30%, transparent)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "var(--m3-shape-full)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
      >
        <ul className="flex items-center gap-1 list-none m-0 p-0 overflow-visible">
          {navigation.map((item) => {
            const isActive = currentSection === item.id;
            
            return (
              <li className="relative flex" key={item.id}>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 shadow-sm"
                    style={{ 
                      background: "color-mix(in srgb, var(--m3-secondary-container) 80%, transparent)",
                      borderRadius: "var(--m3-shape-full)",
                      border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}
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
