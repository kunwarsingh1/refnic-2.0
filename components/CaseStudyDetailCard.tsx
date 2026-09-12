import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { CaseStudy } from "@/lib/content/caseStudies";

export default function CaseStudyDetailCard({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6">
      <div className="rounded-2xl bg-[#F8F8F8] px-6 py-10 text-[#050505] md:px-14 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {cs.status && (
            <span className="inline-flex items-center gap-2 text-[21.64px] leading-[32.46px] text-[#07070C]">
              {cs.status}
              <span className="size-[27px] rounded-full bg-[#97F88C]" aria-hidden />
            </span>
          )}

          {cs.city && (
            <div className="flex items-center gap-3 md:ml-auto">
              {cs.country && (
                <span className="flex h-14 w-9 overflow-hidden rounded" aria-hidden>
                  <span className="h-full w-1/2 bg-[#EA7754]" />
                  <span className="h-full w-1/2 bg-[#E24544]" />
                </span>
              )}
              <p className="text-right font-display text-3xl font-bold leading-tight text-[#3152DF] md:text-3xl">
                {cs.city}
                {cs.country && (
                  <>
                    <br />
                    {cs.country}
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        <h1 className="mt-8 max-w-xl font-display text-4xl font-bold leading-tight text-[#07070C] md:text-5xl">
          {cs.label}
        </h1>
        <p className="mt-6 max-w-2xl text-[21.64px] leading-[32.46px] text-[#030303]">{cs.body}</p>

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
