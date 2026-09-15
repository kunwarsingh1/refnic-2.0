import Link from "next/link";
import { getFooterConfig } from "@/lib/content/footer";

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.98h4v12.02H3V8.98Zm6 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76v6.57h-4v-5.83c0-1.39-.03-3.18-1.94-3.18-1.94 0-2.24 1.5-2.24 3.08v5.93H9V8.98Z" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.6 7.3a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.83.53A2.5 2.5 0 0 0 2.4 7.3 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.83-.53a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.7ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
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
        d="M5 4h3l2 5-2 1.5a12 12 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default async function Footer() {
  const config = await getFooterConfig();

  return (
    <footer className="relative bg-black">
      <div className="relative">
        <div
          className="absolute bg-grid-dark"
          style={{ top: "-64px", left: 0, right: 0, height: "220px" }}
          aria-hidden
        />

        <div className="relative h-[clamp(3.5rem,9.5vw,90px)]">
         <p
  className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[15%] select-none whitespace-nowrap text-center font-display font-black leading-none  drop-shadow-[0_0_25px_rgba(255,255,255,0.35)] text-[clamp(2.5rem,13vw,9rem)]"
  aria-hidden
  style={{
  background: "linear-gradient(0deg, #232323, #919191 54.33%, #fffefe)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}}
>
  {config.watermarkText}
</p>
        </div>
      </div>

      <div className="relative rounded-t-[2rem] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1.2fr]">
            <div>
              <Link
                href="/"
                className="font-sans text-2xl font-bold tracking-tight text-[#2d3fe0]"
                aria-label={config.brandName}
              >
                {config.brandName}
                <sup className="ml-0.5 text-sm font-semibold">®</sup>
              </Link>
              <p className="mt-4 max-w-xs whitespace-pre-line text-sm leading-relaxed text-gray-500">
                {config.tagline}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={config.social.linkedin}
                  aria-label="LinkedIn"
                  className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-accent-blue hover:text-accent-blue"
                >
                  <LinkedInIcon className="size-4" />
                </a>
                <a
                  href={config.social.youtube}
                  aria-label="YouTube"
                  className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-accent-blue hover:text-accent-blue"
                >
                  <YoutubeIcon className="size-4" />
                </a>
                <a
                  href={config.social.email}
                  aria-label="Email"
                  className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-accent-blue hover:text-accent-blue"
                >
                  <MailIcon className="size-4" />
                </a>
              </div>
            </div>

            {config.linkColumns.map((col) => (
              <div key={col.title}>
                <p className="font-sans font-bold text-sm text-black">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="transition-colors hover:text-accent-blue">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="font-sans font-bold text-sm text-black">{config.contactHeading}</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="flex items-start gap-2 transition-colors hover:text-accent-blue"
                >
                  <MailIcon className="mt-0.5 size-4 shrink-0 text-accent-blue" />
                  {config.contactEmail}
                </a>
                <a
                  href={`tel:${config.contactPhone.replace(/\s+/g, "")}`}
                  className="flex items-start gap-2 transition-colors hover:text-accent-blue"
                >
                  <PhoneIcon className="mt-0.5 size-4 shrink-0 text-accent-blue" />
                  {config.contactPhone}
                </a>
                <p className="flex items-start gap-2 whitespace-pre-line">
                  <LocationIcon className="mt-0.5 size-4 shrink-0 text-accent-blue" />
                  {config.contactAddress}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 text-sm text-gray-400 md:flex-row">
            <p>&copy; {new Date().getFullYear()} {config.copyrightName}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {config.bottomLinks.map((l) => (
                <Link key={l.label} href={l.href} className="transition-colors hover:text-accent-blue">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
