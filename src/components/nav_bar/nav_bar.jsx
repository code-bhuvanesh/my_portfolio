import PropTypes from "prop-types";
import portfolioData from "../../constants.js";

function NavBar({ currentSection }) {
  const { intro, navigation } = portfolioData;
  const resumeAction = intro.actions.find((action) =>
    action.label.toLowerCase().includes("resume")
  );

  return (
    <nav className="fixed left-1/2 top-3 z-50 w-fit max-w-[calc(100vw-1rem)] -translate-x-1/2 sm:top-4">
      <div
        className="inline-flex w-fit max-w-full items-center gap-1 rounded-2xl border px-2 py-2 sm:px-3"
        style={{
          background: "rgba(16, 16, 26, 0.6)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >

        <ul className="flex items-center gap-1 list-none m-0 p-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navigation.map((item) => (
            <li className="flex" key={item.id}>
              <a
                href={`#${item.id}`}
                className={`inline-flex min-h-9 items-center justify-center rounded-xl px-4 py-1.5 text-[0.76rem] font-semibold no-underline transition-all duration-300 sm:min-w-[5.5rem] ${
                  currentSection === item.id
                    ? "bg-white/[0.1] text-xc-blue shadow-[0_0_16px_rgba(96,184,255,0.12)]"
                    : "text-xc-text-secondary hover:text-xc-text-primary hover:bg-white/[0.06]"
                }`}
                style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
              >
                {currentSection === item.id && (
                  <span className="mr-1.5 text-[0.65rem] opacity-50">▸</span>
                )}
                {item.label}
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
