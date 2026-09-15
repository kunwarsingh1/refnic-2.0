import { CmsImagePlaceholder } from "@/components/ui/primitives";
import { PdfDownloadGate } from "@/components/PdfDownloadGate";
import { PdfEmbed } from "@/components/admin/PdfEmbed";

export type ShowcaseContentType = "pdf" | "image" | "text";

export default function ContentShowcase({
  slug,
  contentType,
  pdfUrl,
  imageUrl,
  text,
  caption,
  sectionBg = "#000000",
}: {
  slug?: string;
  contentType?: ShowcaseContentType;
  pdfUrl?: string;
  imageUrl?: string;
  text?: string;
  caption?: string;
  sectionBg?: string;
}) {
  const type: ShowcaseContentType = contentType ?? (imageUrl ? "image" : text ? "text" : "pdf");
  const hasContent = Boolean(pdfUrl || imageUrl || text || caption);
  if (!hasContent) return null;

  return (
    <section className="relative overflow-hidden pb-16 md:pb-24" style={{ backgroundColor: sectionBg }}>
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="relative overflow-hidden rounded-xl bg-[#F8F8F8] p-8 md:p-16">
          {caption && (
            <p className="mx-auto mb-6 max-w-2xl text-center text-[21.64px] leading-[32.46px] text-[#151417]">
              {caption}
            </p>
          )}

          {type === "pdf" &&
            (pdfUrl ? (
              <PdfEmbed url={pdfUrl} light />
            ) : (
              <div className="flex h-[50vh] w-full items-center justify-center rounded-lg bg-[#D9D9D9]">
                <span className="font-display text-6xl font-bold text-[#060606]">PDF</span>
              </div>
            ))}

          {type === "image" &&
            (imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="max-h-[85vh] w-full rounded-lg object-contain" />
            ) : (
              <CmsImagePlaceholder className="h-[50vh] w-full rounded-lg" />
            ))}

          {type === "text" && text && (
            <p className="whitespace-pre-line text-[21.64px] leading-[32.46px] text-[#151417]">{text}</p>
          )}

          {type !== "text" && text && (
            <p className="mt-6 whitespace-pre-line text-[21.64px] leading-[32.46px] text-[#151417]">{text}</p>
          )}

          {type === "pdf" && pdfUrl && (
            <div className="mt-6 flex justify-center">
              <PdfDownloadGate postSlug={slug ?? pdfUrl} url={pdfUrl} variant="showcase" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
