import { CmsImagePlaceholder } from "@/components/ui/primitives";

const SLOT_COUNT = 8;

export default function CaseStudyGallerySection({ imageUrls }: { imageUrls: string[] }) {
  const slots = Array.from({ length: SLOT_COUNT }, (_, i) => imageUrls[i]);

  return (
    <section className="relative overflow-hidden bg-black pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {slots.map((url, i) =>
            url ? (
              <img key={i} src={url} alt="" className="aspect-[510/327] w-full rounded-lg object-cover" />
            ) : (
              <CmsImagePlaceholder key={i} className="aspect-[510/327] w-full rounded-lg" />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
