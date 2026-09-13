import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { ProductRecoveredMaterial } from "@/lib/content/productCatalog";

export default function ProductMaterialsSection({
  heading,
  materials,
}: {
  heading: string;
  materials: ProductRecoveredMaterial[];
}) {
  if (materials.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {heading && (
          <h2 className="text-center font-display text-3xl font-bold uppercase leading-tight text-[#EBEBEB] md:text-5xl">
            {heading}
          </h2>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {materials.map((m) => (
            <div key={m.title} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
                aria-hidden
              />
              <div className="relative flex flex-col p-5">
                <h3 className="font-display text-lg font-bold leading-tight text-[#EBEBEB] md:text-xl">{m.title}</h3>
                <CmsImagePlaceholder className="mt-4 aspect-[4/3] w-full rounded-xl" />
                <p className="mt-2 text-[21.64px] leading-[32.46px] text-white">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
