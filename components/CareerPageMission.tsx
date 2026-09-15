import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function CareerPageMission({
  heading,
  imageUrl,
  body,
}: {
  heading: string;
  imageUrl?: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="h-64 w-64 shrink-0 rounded-full object-cover md:h-[28rem] md:w-[28rem]"
            />
          ) : (
            <CmsImagePlaceholder className="h-64 w-64 shrink-0 rounded-full md:h-[28rem] md:w-[28rem]" />
          )}

          <div className="text-center md:max-w-[35rem] md:text-right">
            <h2 className="whitespace-pre-line font-display text-3xl md:text-5xl font-bold leading-tight text-[#EBEBEB]">
              {heading}
            </h2>
            <p className="mt-6 whitespace-pre-line text-[20px] leading-[32.46px] text-white">{body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
