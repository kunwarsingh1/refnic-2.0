import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { WhyNowReason } from "@/lib/content/investorsPage";

export default function InvestorsWhyNowSection({
  heading,
  reasons,
}: {
  heading: string;
  reasons: WhyNowReason[];
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="whitespace-pre-line text-center font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-5xl">
          {heading}
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
                aria-hidden
              />
              <div className="relative flex h-full flex-col gap-6 p-5">
                {reason.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={reason.imageUrl} alt="" className="mx-auto h-32 w-32 rounded-xl object-contain" />
                ) : (
                  <CmsImagePlaceholder className="mx-auto h-32 w-32 rounded-xl" />
                )}
                <p className="text-[26px] leading-[1.15] text-[#EBEBEB]">{reason.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
