import portfolioData from "../../constants";

function ContactSection() {
  const { contactSection, hero } = portfolioData;

  return (
    <div className="animate-m3-reveal-up [animation-delay:0.12s]">
      {/* Contact card */}
      <div
        className="overflow-hidden"
        style={{
          background: "var(--m3-surface-container)",
          borderRadius: "var(--m3-shape-extra-large)",
        }}
      >
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <span className="m3-label">
              <span className="material-symbols-rounded text-[16px]">mail</span>
              {contactSection.label}
            </span>

            <h3
              className="m3-headline mt-5"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {contactSection.title}
            </h3>

            <p className="m3-body mt-4 max-w-2xl">
              {contactSection.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {contactSection.tags.map((tag) => (
                <span
                  key={tag}
                  className="m3-chip"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              className="m3-btn-filled"
              href={`mailto:${contactSection.email.address}`}
            >
              <span className="material-symbols-rounded text-[18px]">mail</span>
              {contactSection.email.address}
            </a>

            {/* Social links */}
            <div className="flex gap-2">
              {hero.socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full-m3 text-m3-on-surface-variant transition-colors duration-200 hover:bg-m3-surface-container-highest"
                >
                  <img
                    className="h-5 w-5 object-contain brightness-0 invert opacity-70"
                    src={social.image}
                    alt={social.name}
                  />
                </a>
              ))}
            </div>

            <span className="flex items-center gap-2 text-[0.8125rem] text-m3-on-surface-variant">
              <span className="material-symbols-rounded text-m3-green text-[16px]">schedule</span>
              Usually replies within a day.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
