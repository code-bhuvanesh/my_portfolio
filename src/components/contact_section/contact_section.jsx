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
        <div className="flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="m3-label">
              <span className="material-symbols-rounded text-[16px]">mail</span>
              {contactSection.label}
            </span>

            <h3
              className="m3-headline mt-5 max-w-[18ch] sm:max-w-none"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {contactSection.title}
            </h3>

            <p className="m3-body mt-4 max-w-2xl text-[0.875rem] sm:text-[1rem]">
              {contactSection.description}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {contactSection.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="m3-chip"
                >
                  {tag.icon.endsWith('.svg') || tag.icon.startsWith('/') ? (
                    <span 
                      className="h-[18px] w-[18px] bg-m3-primary"
                      style={{
                        maskImage: `url(${tag.icon})`,
                        WebkitMaskImage: `url(${tag.icon})`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain'
                      }}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="material-symbols-rounded text-[18px] text-m3-primary">{tag.icon}</span>
                  )}
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 lg:items-end">
            <a
              className="m3-btn-filled w-full sm:w-auto overflow-hidden text-ellipsis px-6 py-4"
              href={`mailto:${contactSection.email.address}`}
            >
              <span className="material-symbols-rounded text-[20px] shrink-0">mail</span>
              <span className="truncate">{contactSection.email.address}</span>
            </a>

            <div className="flex flex-col items-center gap-4 lg:items-end">
              {/* Social links */}
              <div className="flex gap-3">
                {hero.socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full-m3 border border-m3-outline-variant text-m3-on-surface-variant transition-all duration-200 hover:bg-m3-primary hover:text-m3-on-primary hover:border-m3-primary"
                    aria-label={social.name}
                  >
                    <img
                      className="h-5 w-5 object-contain brightness-0 invert opacity-70 transition-all duration-200 group-hover:opacity-100"
                      src={social.image}
                      alt={social.name}
                    />
                  </a>
                ))}
              </div>

              {/* <span className="flex items-center gap-2 text-[0.8125rem] font-medium text-m3-on-surface-variant">
                <span className="material-symbols-rounded text-m3-green text-[18px]">schedule</span>
                Usually replies within a day.
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
