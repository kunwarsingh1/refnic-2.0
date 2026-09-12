import Link from "next/link";
import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function ProductsDirectoryCta() {
  return (
    <section className="relative overflow-hidden bg-black pb-20 pt-16 md:pb-28 md:pt-20">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="mx-auto max-w-2xl font-sans font-bold text-3xl leading-tight text-[#EBEBEB] md:text-5xl md:leading-[64px]">
          Ready to Build Your Next Plant?
        </h2>

        <CmsImagePlaceholder className="mx-auto mt-8 h-36 w-36 md:h-40 md:w-40" />

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white md:text-[20px] md:leading-[32.46px]">
          From concept to commissioning, Refnic delivers complete engineering solutions tailored
          to your process, capacity, and business goals.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-accent-blue px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}
