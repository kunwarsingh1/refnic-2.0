import Link from "next/link";
import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function ProductsDirectoryCta({
  heading = "Ready to Build\nYour Next Plant?",
  body = "From concept to commissioning, Refnic delivers complete engineering solutions tailored to your process, capacity, and business goals.",
  imageUrl,
  ctaLabel = "Start Your Project",
  ctaHref = "/contact",
}: {
  heading?: string;
  body?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
} = {}) {
  return (
    <section className="relative overflow-hidden bg-black pb-20 pt-16 md:pb-28 md:pt-20">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="mx-auto max-w-2xl whitespace-pre-line font-sans font-bold text-3xl leading-tight text-[#EBEBEB] md:text-5xl">
          {heading}
        </h2>

        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" className="mx-auto mt-8 aspect-square w-64 rounded-2xl object-contain md:w-80" />
        ) : (
          <CmsImagePlaceholder className="mx-auto mt-8 aspect-square w-64 rounded-2xl md:w-80" />
        )}

        <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-base leading-relaxed text-white md:text-[20px] md:leading-[32.46px]">
          {body}
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href={ctaHref}
            className="inline-flex rounded-md bg-accent-blue px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
