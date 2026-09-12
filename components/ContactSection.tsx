import { GradientCtaButton } from "@/components/ui/primitives";
import { getFooterConfig } from "@/lib/content/footer";

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path
        d="M5 4h3l2 5-2 1.5a12 12 0 005.5 5.5L17 14l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default async function ContactSection() {
  const { contactEmail, contactPhone, contactAddress } = await getFooterConfig();

  return (
    <section id="contact" className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      {/* TOP AREA */}
      <div className="relative mx-auto max-w-6xl px-6 pt-0 pb-10">
        <div className="hidden items-end justify-between gap-10 md:flex">
          <p className="w-[24%] text-sm leading-relaxed text-white/60">
            Whether enabling new recycling ventures or modernizing existing
            facilities
          </p>

          <div className="relative w-[62%]">
            <div
              className="absolute left-1/2 top-1/2 -z-0 h-[85%] w-[85%] -translate-x-1/2 translate-y-[calc(-50%+8rem)] rounded-full bg-accent-blue/40 blur-3xl"
              aria-hidden
            />
            <img
              src="/footer image plant.png"
              alt="Refnic industrial plant"
              className="relative z-10 w-full translate-y-32 drop-shadow-2xl"
            />
          </div>

          <p className="w-[28%] text-right text-lg leading-relaxed text-white">
            Refnic delivers the technology, engineering, and execution
            required to build the next generation of resource recovery
            infrastructure.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:hidden">
          <p className="text-sm leading-relaxed text-white/60">
            Whether enabling new recycling ventures or modernizing existing
            facilities
          </p>
          <div className="relative">
            <div
              className="absolute left-1/2 top-1/2 -z-0 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/40 blur-3xl"
              aria-hidden
            />
            <img
              src="/footer image plant.png"
              alt="Refnic industrial plant"
              className="relative z-10 w-full rounded-xl"
            />
          </div>
          <p className="text-right text-base leading-relaxed text-white">
            Refnic delivers the technology, engineering, and execution
            required to build the next generation of resource recovery
            infrastructure.
          </p>
        </div>
      </div>

      {/* BOTTOM AREA (contact info + link to the full Contact Us page/form) */}
      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-10">
        <div
          className="p-px"
          style={{ backgroundImage: "linear-gradient(to top right, #1f1313, #737373, #191717)" }}
        >
          <div className="bg-black/80 px-8 py-6 backdrop-blur-sm md:px-12">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-sans font-bold text-3xl text-white md:text-4xl">
                  Contact Information
                </h2>

                <div className="mt-8 flex flex-col gap-6 text-sm">
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="mt-0.5 h-5 w-5 text-accent-blue" />
                    <div>
                      <p className="font-bold text-white">Email</p>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="mt-1 block text-white/60 transition-colors hover:text-white"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneIcon className="mt-0.5 h-5 w-5 text-accent-blue" />
                    <div>
                      <p className="font-bold text-white">Phone</p>
                      <a
                        href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                        className="mt-1 block text-white/60 transition-colors hover:text-white"
                      >
                        {contactPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <LocationIcon className="mt-0.5 h-5 w-5 text-accent-blue" />
                    <div>
                      <p className="font-bold text-white">Address</p>
                      <p className="mt-1 leading-relaxed text-white/60">{contactAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4">
                <p className="text-sm leading-relaxed text-white/60">
                  Have a project in mind? Send us the details on our Contact Us page and our team will get
                  back to you.
                </p>
                <GradientCtaButton href="/contact#contact-form">Go to Contact Us</GradientCtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
