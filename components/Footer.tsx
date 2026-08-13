import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-navy-950">
      <div className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-grid-dark" aria-hidden />

        <div className="mx-auto max-w-6xl px-6 pt-6 md:pt-8 pb-2 md:pb-4 flex flex-col items-center text-center">
          <Link
            href="/careers"
            className="mb-12 inline-block rounded-md bg-[#3b4fe4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d3fe0] transition-colors md:mb-20"
          >
            View Open Positions
          </Link>

          <p
            className="pointer-events-none select-none whitespace-nowrap font-display font-black leading-none text-white/[0.06] text-[16vw] md:text-[9rem] [mask-image:linear-gradient(to_bottom,black_92%,transparent_100%)]"
            aria-hidden
          >
            REFINE NICELY
          </p>
        </div>
      </div>

      <div className="relative rounded-t-[2rem] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <div className="grid items-start gap-8 md:grid-cols-2">
            <Link
              href="/"
              className="font-sans text-xl font-bold tracking-tight text-[#2d3fe0]"
              aria-label="Refnic"
            >
              Refnic<sup className="ml-0.5 text-sm font-semibold">®</sup>
            </Link>
            <p className="max-w-md leading-relaxed text-gray-500 md:justify-self-end">
              An engineering and technology company that designs, manufactures,
              installs, and commissions world-class machinery and turnkey
              recycling and metal refining plants for lithium-ion batteries,
              e-waste, and critical metals recovery.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-gray-100 pt-6 text-sm text-gray-400 md:flex-row">
            <p>&copy; {new Date().getFullYear()} Refine Nicely. All rights reserved.</p>
            <p>Engineering a circular future, indigenously.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}