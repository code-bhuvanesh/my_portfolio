import ContactSection from "./contact_section";

function AboutSection() {
  return (
    <div className="mt-14 sm:mt-24 mb-6">
      <div className="w-full animate-reveal-up [animation-delay:0.08s]">
        <ContactSection />
      </div>
    </div>
  );
}

export default AboutSection;
