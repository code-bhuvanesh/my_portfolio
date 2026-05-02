import portfolioData from "../../constants.js";

function HeroSection() {
  const { hero, skills } = portfolioData;

  return (
    <div className="grid h-full min-h-0 content-center gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
      {/* Left: Text content */}
      <div className="order-1 flex flex-col justify-center gap-8 lg:order-1">
        {/* Greeting chip */}
        <div className="animate-m3-reveal-up">
          <span className="m3-label text-[1rem] sm:text-[1.125rem] px-5 py-2 sm:px-6 sm:py-2.5 gap-3">
            <span className="material-symbols-rounded text-[20px] sm:text-[24px]">waving_hand</span>
            {hero.greeting}
          </span>
        </div>
        {/* Headline */}
        <h1
          className="animate-m3-reveal-up [animation-delay:0.05s] m-0 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          style={{ fontFamily: '"Outfit", "Roboto", sans-serif' }}
        >
          <span className="text-m3-primary">Building apps</span>{" "}
          <span className="text-m3-on-surface">that people</span>
          <br />
          <span className="text-m3-tertiary">love to use.</span>
        </h1>

        {/* Description */}
        <p className="m3-body animate-m3-reveal-up [animation-delay:0.1s] max-w-3xl text-[1.0625rem] leading-[1.75]">
          {hero.description}
        </p>

        {/* Stats row */}
        <div className="animate-m3-reveal-up [animation-delay:0.15s] grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 xl:grid-cols-3">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="m3-card-outlined flex items-center gap-4 px-4 py-3 sm:px-5 sm:py-4 transition-all duration-300 hover:bg-m3-surface-container-low"
              style={{ borderRadius: "var(--m3-shape-large)" }}
            >
              <span
                className="inline-flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full-m3 text-m3-primary"
                style={{ background: "color-mix(in srgb, var(--m3-primary) 12%, transparent)" }}
              >
                <span className="material-symbols-rounded text-[20px] sm:text-[22px]">{stat.icon}</span>
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[1.125rem] sm:text-[1.25rem] font-medium text-m3-on-surface truncate" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {stat.value}
                </p>
                <p className="m-0 text-[0.75rem] sm:text-[0.8125rem] text-m3-on-surface-variant truncate">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons + Social links row */}
        <div className="animate-m3-reveal-up [animation-delay:0.2s] flex flex-wrap items-center gap-4">
          {hero.actions.map((action) => (
            <a
              key={action.label}
              className={action.variant === "filled" ? "m3-btn-filled" : "m3-btn-tonal"}
              href={action.href}
            >
              <span className="material-symbols-rounded text-[18px]">{action.icon}</span>
              {action.label}
            </a>
          ))}

          <span className="hidden sm:inline-block h-6 w-px bg-m3-outline-variant"></span>

          {hero.socialMedia.map((social) => (
            <a
              key={social.name}
              className="m3-chip"
              href={social.link}
              rel="noreferrer"
              target="_blank"
            >
              <img
                className="h-4 w-4 object-contain brightness-0 invert"
                src={social.image}
                alt={social.name + " icon"}
              />
              {social.name}
            </a>
          ))}
        </div>
        </div>

      {/* Right: Hero illustration */}
      <div className="relative order-2 flex items-center justify-center animate-m3-reveal-up [animation-delay:0.1s] lg:order-2">
        <img
          className="w-full max-w-md lg:max-w-none object-contain rounded-[4.625rem] animate-m3-float drop-shadow-[0_20px_60px_rgba(168,199,250,0.15)]"
          src="/hero_illustration.png"
          alt="Android developer illustration — an Android robot mascot coding with Flutter, Play Store, and IoT elements"
        />
      </div>
    </div>
  );
}

export default HeroSection;
