import { ImagePlaceholder } from "@/components/ui/primitives";
import type { NumberedSection } from "@/lib/content/investorsPage";

export function ZigzagFeatureSections({ sections }: { sections: NumberedSection[] }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {sections.map((s, i) => {
        const imageFirst = i % 2 === 0;

        return (
          <div key={s.number} className="grid gap-8 md:grid-cols-2 md:items-start">
            <div
              className={`flex flex-col ${
                imageFirst ? "md:order-2 md:ml-auto md:items-end md:text-right" : "md:order-1 md:items-start md:text-left"
              }`}
            >
              <p className="font-display text-5xl font-black text-white/10 md:text-6xl">{s.number}</p>
              <p className="mt-2 font-display text-2xl font-black text-white md:text-3xl">{s.heading}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{s.body}</p>
            </div>

            <div
              className={`flex ${
                imageFirst ? "md:order-1 md:justify-start" : "md:order-2 md:ml-auto md:justify-end"
              } md:mt-16`}
            >
              <div className="aspect-[4/3] w-36 overflow-hidden rounded-xl md:w-52">
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.heading} className="h-full w-full object-cover" />
                ) : (
                  <ImagePlaceholder dark tone={i} className="h-full w-full" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
