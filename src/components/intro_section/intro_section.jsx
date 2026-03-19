import portfolioData from "../../constants.js";
import SocialMediaIcon from "./social_media_icon.jsx";

function IntroSection() {
  const { intro } = portfolioData;
  const featuredSkills = portfolioData.skills
    .flatMap((group) => group.items)
    .slice(0, 6);

  return (
    <div className="grid h-full min-h-0 content-center gap-8 lg:gap-10 min-[512px]:grid-cols-[minmax(0,1.05fr)_minmax(15rem,0.95fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(21rem,0.95fr)]">
      {/* Left: Intro text */}
      <div className="order-2 max-w-3xl animate-reveal-up min-[512px]:order-1">
        <span className="section-kicker">{intro.eyebrow}</span>

        <h1
          className="mt-6 text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.96] tracking-[-0.04em]"
          style={{ fontFamily: '"Inter", "SF Pro Display", sans-serif' }}
        >
          {intro.titleLines.map((line, index) => (
            <span key={line} className="block">
              <span
                className={
                  index === 0
                    ? "text-xc-blue"
                    : index === 1
                    ? "text-xc-purple"
                    : "text-xc-green"
                }
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="section-copy max-w-2xl">{intro.lead}</p>

        {/* CTA row */}
        <div className="mt-8 flex flex-wrap gap-3">
          {intro.actions.map((action) => (
            <a
              key={action.label}
              className={`${
                action.variant === "primary" ? "cta-primary" : "cta-secondary"
              }`}
              href={action.href}
              target={action.target}
              rel={action.rel}
            >
              {action.variant === "primary" && (
                <span className="text-[0.65rem] opacity-70">⌘</span>
              )}
              {action.label}
            </a>
          ))}
        </div>

        {/* Social links */}
        <div className="mt-5 flex flex-wrap gap-3">
          {intro.socialMedia.map((data) => (
            <SocialMediaIcon
              key={data.name}
              iconname={data.name}
              iconlink={data.link}
              iconpath={data.image}
            />
          ))}
        </div>

        {/* Skill pills */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {featuredSkills.map((skill) => (
            <span className="skill-pill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Right: Profile image as liquid glass window */}
      <div className="relative order-1 animate-reveal-up [animation-delay:0.1s] min-[512px]:order-2">
        <div className="xc-window overflow-hidden">
          {/* Titlebar */}
          <div className="xc-titlebar">
            <span className="xc-titlebar-dot xc-titlebar-dot--close"></span>
            <span className="xc-titlebar-dot xc-titlebar-dot--minimize"></span>
            <span className="xc-titlebar-dot xc-titlebar-dot--maximize"></span>
            <span className="xc-titlebar-text">profile.swift</span>
            <div className="w-[36px]"></div>
          </div>

          {/* Image area */}
          <div className="relative">
            <img
              className="aspect-[4/4.9] w-full object-cover object-center"
              src={intro.profile.image}
              alt={intro.profile.imageAlt}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.6) 40%, transparent 100%)",
              }}
            >
              {/* Code-style name display */}
              <div
                className="text-[0.68rem] leading-relaxed opacity-60"
                style={{
                  fontFamily: '"JetBrains Mono", "SF Mono", monospace',
                }}
              >
                <span className="text-xc-purple">let</span>{" "}
                <span className="text-xc-text-primary">developer</span>{" "}
                <span className="text-xc-text-dimmed">=</span>
              </div>
              <p className="m-0 mt-1 text-[1.3rem] font-bold tracking-[-0.03em] text-white">
                {intro.profile.name}
              </p>
              <p
                className="mt-1.5 text-[0.72rem] leading-5 text-white/50"
                style={{
                  fontFamily: '"JetBrains Mono", "SF Mono", monospace',
                }}
              >
                <span className="text-xc-green">// </span>
                {intro.profile.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroSection;
