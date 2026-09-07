import { ImagePlaceholder } from "./ui/primitives";
import Link from "next/link";
import { ModelViewer } from "./ModelViewer";

export type GridCard = { title: string; body: string; imageUrl?: string; modelUrl?: string };

export type GridVariant = "products" | "solutions" | "services";

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
  const isProducts = variant === "products";
  const isServices = variant === "services";
  const titleOnTop = true;
  const subtitleMaxW = isServices ? "md:max-w-[540px]" : "md:max-w-[420px]";
  const subtitleFontSize = isServices
    ? "md:text-[clamp(0.8rem,calc(2.213vw_-_3.7px),21.64px)]"
    : isProducts || light
    ? "md:text-[clamp(0.8rem,calc(2.213vw_-_5.34px),20px)]"
    : "md:text-[clamp(9px,calc(2.213vw_-_3.7px),11px)]";

  return (
      <section className={`relative overflow-hidden bg-black ${isProducts ? "py-16 md:py-24" : "py-8 md:py-10"}`}>
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div
        className={
          light
            ? "relative mx-4 overflow-hidden bg-[#f8f8f8] px-6 py-6 md:mx-8 md:px-10 md:py-8"
            : "relative mx-auto max-w-6xl px-6"
        }
      >
        {light && <div className="absolute inset-0 bg-grid-light" aria-hidden />}
        <div className={light ? "relative mx-auto max-w-6xl" : ""}>
        <div className={`grid items-start gap-8 md:grid-cols-2 ${light ? "mb-8" : "mb-14"}`}>
          <div>
            {eyebrow && (
              <p className="mb-4 text-xs font-bold tracking-[0.2em] text-accent-blue">{eyebrow}</p>
            )}
            <h2 className={`font-sans font-bold text-3xl leading-tight md:text-5xl ${light ? "text-black" : "text-white"}`}>
              {title}
            </h2>
          </div>
          <p
            className={`ml-auto max-w-md text-right ${subtitleMaxW} ${subtitleFontSize} md:leading-[32.46px] ${light ? "text-black/60" : "text-white/60"}`}
            style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 400 }}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={i}
              style={isProducts || variant === "services" ? { borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" } : undefined}
              className={`flex flex-col p-5 ${
                isProducts
                  ? "aspect-[158/219] border border-transparent bg-white/[0.03]"
                  : variant === "solutions"
                  ? "border border-gray-200 bg-white"
                  : "border border-transparent bg-transparent"
              }`}
            >
              {titleOnTop && (
                <h3 className={`font-sans font-bold text-lg md:text-xl ${light ? "text-black" : "text-white"}`}>
                  {c.title}
                </h3>
              )}
              {c.modelUrl ? (
                <ModelViewer
                  src={c.modelUrl}
                  alt={c.title}
                  className={`w-full ${titleOnTop ? "mt-4" : ""} aspect-[4/3] rounded-xl`}
                />
              ) : c.imageUrl ? (
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className={`w-full ${titleOnTop ? "mt-4" : ""} aspect-[4/3] rounded-xl ${light ? "object-contain" : variant === "services" ? "object-contain" : "object-cover"}`}
                />
              ) : (
                <ImagePlaceholder
                  dark={dark}
                  className={`w-full ${titleOnTop ? "mt-4" : ""} aspect-[4/3] rounded-xl`}
                />
              )}
              {!titleOnTop && (
                <h3 className={`mt-5 font-sans font-bold text-lg md:text-xl ${light ? "text-black" : "text-white"}`}>
                  {c.title}
                </h3>
              )}
              <p className={`mt-2 flex-1 text-sm leading-relaxed ${light ? "text-gray-500" : "text-white/55"}`}>
                {c.body}
              </p>
              <Link href="/products" className="mt-6 self-start bg-accent-blue px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark">
                View
              </Link>
            </div>
          ))}
        </div>

        <div className={`flex justify-center ${light ? "mt-8" : "mt-12"}`}>
          {exploreHref ? (
            <Link
              href={exploreHref}
              className="bg-accent-blue px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark"
            >
              Explore all
            </Link>
          ) : (
            <Link href="/products" className="bg-accent-blue px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark">
              Explore all
            </Link>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
