import { ImagePlaceholder } from "./ui/primitives";
import Link from "next/link";

export type GridCard = { title: string; body: string };

export type GridVariant = "products" | "solutions" | "services";

const cardImages: Record<string, string> = {
  "Li-ion Battery Recycling Plant": "/Li-ion battery recycling.png",
  "E-Waste Recycling Line": "/E-waste recycling line.png",
  "Battery Assembly Line": "/Battery assembling line.png",
  "Metal Refining / Hydrometallurgy": "/Metal refining hydrometellury.png",
  "Solvent Extraction": "/Solvant extract.png",
  "Lithium-ion Battery Recycling": "/Li-ion battery recycling solution.png",
  "Comprehensive Engineering Services": "/Comprehensive eng service desk.png",
  "Customized Equipment Design & Manufacturing": "/Customised equip design.png",
  "Process Engineering": "/Process eng service.png",
};

export default function CardGridSection({
  eyebrow,
  title,
  subtitle,
  cards,
  variant = "products",
  exploreHref,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  cards: GridCard[];
  variant?: GridVariant;
  exploreHref?: string;
}) {
  const light = variant === "solutions";
  const dark = !light;

  return (
      <section className={`relative overflow-hidden py-8 md:py-10 ${dark ? "bg-navy-950" : "bg-white"}`}>
      {dark && <div className="absolute inset-0 bg-grid-dark" aria-hidden />}

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-2">
          <div>
            {eyebrow && (
              <p className="mb-4 text-xs font-bold tracking-[0.2em] text-accent-blue">{eyebrow}</p>
            )}
            <h2 className={`font-sans font-bold text-3xl leading-tight md:text-5xl ${light ? "text-black" : "text-white"}`}>
              {title}
            </h2>
          </div>
          <p className={`max-w-md ${light ? "text-gray-500" : "text-white/60"}`}>{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={i}
              style={variant === "products" || variant === "services" ? { borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" } : undefined}
              className={`flex flex-col ${variant === "solutions" || variant === "services" ? "" : "rounded-2xl"} ${variant === "products" || variant === "services" ? "border border-transparent bg-transparent" : "border border-gray-200 bg-white"} p-5`}
            >
              {cardImages[c.title] ? (
                <img
                  src={cardImages[c.title]}
                  alt={c.title}
                  className={`w-full ${light ? "object-contain aspect-square rounded-xl" : variant === "services" ? "object-contain aspect-[4/3] rounded-xl" : "object-cover aspect-[4/3] rounded-xl"}`}
                />
              ) : (
                <ImagePlaceholder
                  dark={dark}
                  className={`w-full ${light ? "aspect-square rounded-xl" : "aspect-[4/3] rounded-xl"}`}
                />
              )}
              <h3 className={`mt-5 font-sans font-bold text-lg md:text-xl ${light ? "text-black" : "text-white"}`}>
                {c.title}
              </h3>
              <p className={`mt-2 flex-1 text-sm leading-relaxed ${light ? "text-gray-500" : "text-white/55"}`}>
                {c.body}
              </p>
              <Link href="/products" className="mt-6 self-start rounded-none bg-accent-blue px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark">
                View
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          {exploreHref ? (
            <Link
              href={exploreHref}
              className="rounded-none bg-accent-blue px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark"
            >
              Explore all
            </Link>
          ) : (
            <Link href="/products" className="rounded-none bg-accent-blue px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark">
              Explore all
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
