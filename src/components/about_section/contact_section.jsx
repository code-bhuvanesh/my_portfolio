import portfolioData from "../../constants";

function ContactSection() {
  const { contactSection } = portfolioData;

  return (
    <div className="xc-window animate-reveal-up [animation-delay:0.14s] overflow-hidden">
      {/* Glass titlebar */}
      <div className="xc-titlebar">
        <span className="xc-titlebar-dot xc-titlebar-dot--close"></span>
        <span className="xc-titlebar-dot xc-titlebar-dot--minimize"></span>
        <span className="xc-titlebar-dot xc-titlebar-dot--maximize"></span>
        <span className="xc-titlebar-text">contact.swift</span>
        <div className="w-[36px]"></div>
      </div>

      {/* Content */}
      <div
        className="relative z-[2] grid gap-6 px-6 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,16,26,0.6) 0%, rgba(10,10,15,0.8) 100%)",
        }}
      >
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border border-xc-cyan/20 bg-xc-cyan/8 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-xc-cyan backdrop-blur-sm"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            <span className="opacity-50">//</span>
            {contactSection.kicker}
          </span>

          <h3
            className="m-0 mt-5 text-[clamp(1.8rem,4.2vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-xc-text-primary"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {contactSection.title}
          </h3>

          <p className="mt-4 max-w-2xl text-[0.88rem] leading-7 text-xc-text-secondary">
            {contactSection.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              "Open to internships",
              "Freelance friendly",
              "App product collaborations",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-[0.72rem] font-semibold text-xc-text-dimmed backdrop-blur-sm"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <a
            className="inline-flex min-h-11 items-center justify-center gap-3 rounded-xl border border-xc-blue/25 px-5 py-3 text-[0.82rem] font-semibold text-xc-blue no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(96,184,255,0.15)]"
            href={`mailto:${contactSection.email.address}`}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              background:
                "linear-gradient(135deg, rgba(96,184,255,0.1), rgba(96,184,255,0.05))",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 24px rgba(96,184,255,0.08)",
            }}
          >
            <img
              className="h-4 w-4 object-contain invert opacity-60"
              src={contactSection.email.icon}
              alt={contactSection.email.iconAlt}
            />
            <span>{contactSection.email.address}</span>
          </a>

          <span
            className="text-[0.72rem] text-xc-text-dimmed"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            <span className="text-xc-green">// </span>
            Usually replies within a day.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
