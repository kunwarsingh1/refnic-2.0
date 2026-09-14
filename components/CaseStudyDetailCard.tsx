import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { CaseStudy } from "@/lib/content/caseStudies";

function LocationPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="case-study-pin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EA7754" />
          <stop offset="100%" stopColor="#E24544" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.53 6.24 11.6 6.5 11.85a1.4 1.4 0 0 0 2 0c.26-.25 6.5-6.32 6.5-11.85C19.5 5.36 16.14 2 12 2Z"
        fill="url(#case-study-pin)"
      />
      <circle cx="12" cy="9.5" r="2.75" fill="#fff" />
    </svg>
  );
}

export default function CaseStudyDetailCard({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6">
      <div className="rounded-2xl bg-[#F8F8F8] px-6 py-10 text-[#050505] md:px-14 md:py-16">
        <div className="flex items-start justify-between">
          {cs.status && (
            <span className="inline-flex items-center gap-2 text-[21.64px] leading-[32.46px] text-[#07070C]">
              {cs.status}
              <span className="size-[27px] rounded-full bg-[#97F88C]" aria-hidden />
            </span>
          )}

          {cs.city && <LocationPinIcon className="h-8 w-8 shrink-0" />}
        </div>

        <h1
          className="mt-8 w-full max-w-xl break-words text-[#07070C]"
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "40px",
          }}
        >
          {cs.label}
        </h1>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p
            className="max-w-2xl break-words text-[#030303]"
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "32.46px",
            }}
          >
            {cs.body}
          </p>

          {cs.city && (
            <p
              className="break-words text-right text-[#3152DF] md:ml-auto"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 700,
                fontSize: "36px",
                lineHeight: "36px",
              }}
            >
              {cs.city}
              {cs.country && (
                <>
                  <br />
                  {cs.country}
                </>
              )}
            </p>
          )}
        </div>

        <div className="mt-12">
          {cs.imageUrl ? (
            <img src={cs.imageUrl} alt={cs.label} className="aspect-[1324/681] w-full rounded-xl object-cover" />
          ) : (
            <CmsImagePlaceholder className="aspect-[1324/681] w-full rounded-xl" />
          )}
        </div>

        {(cs.overviewSubheading || cs.overviewBody) && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold leading-tight text-[#050505] md:text-5xl">
              Project Overview
            </h2>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
              {cs.overviewSubheading && (
                <p className="max-w-sm font-display text-2xl font-light leading-tight text-[#050505] md:text-3xl">
                  {cs.overviewSubheading}
                </p>
              )}
              {cs.overviewBody && (
                <p className="max-w-xl whitespace-pre-line text-[21.64px] leading-[32.46px] text-[#050505] md:ml-auto">
                  {cs.overviewBody}
                </p>
              )}
            </div>
          </div>
        )}

        {(cs.challengeSubheading || cs.challengeBody) && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold leading-tight text-[#050505] md:text-5xl">
              The Challenge
            </h2>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
              {cs.challengeSubheading && (
                <p className="max-w-sm font-display text-2xl font-light leading-tight text-[#050505] md:text-3xl">
                  {cs.challengeSubheading}
                </p>
              )}
              {cs.challengeBody && (
                <p className="max-w-xl text-[21.64px] leading-[32.46px] text-[#050505] md:ml-auto">{cs.challengeBody}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-12">
          {cs.imageUrl2 ? (
            <img src={cs.imageUrl2} alt="" className="aspect-[1324/681] w-full rounded-xl object-cover" />
          ) : (
            <CmsImagePlaceholder className="aspect-[1324/681] w-full rounded-xl" />
          )}
        </div>

        {(cs.approachSubheading || cs.approachBody) && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold leading-tight text-[#050505] md:text-5xl">
              Our Approach
            </h2>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
              {cs.approachSubheading && (
                <p className="max-w-sm font-display text-2xl font-light leading-tight text-[#050505] md:text-3xl">
                  {cs.approachSubheading}
                </p>
              )}
              {cs.approachBody && (
                <p className="max-w-xl text-[21.64px] leading-[32.46px] text-[#050505] md:ml-auto">{cs.approachBody}</p>
              )}
            </div>

            {cs.approachSecondaryHeading && (
              <p className="mt-12 text-right font-display text-2xl font-light leading-tight text-[#050505] md:text-3xl">
                {cs.approachSecondaryHeading}
              </p>
            )}

            {(cs.approachIntro || cs.approachBullets.length > 0) && (
              <div className="mt-8 max-w-3xl">
                {cs.approachIntro && <p className="text-[21.64px] leading-[32.46px] text-[#050505]">{cs.approachIntro}</p>}
                {cs.approachBullets.length > 0 && (
                  <ul className="mt-2 text-[21.64px] leading-[32.46px] text-[#050505]">
                    {cs.approachBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {cs.tagline && (
          <p className="mt-16 max-w-2xl text-[21.64px] leading-[32.46px] text-[#030303]">{cs.tagline}</p>
        )}
      </div>
    </div>
  );
}
