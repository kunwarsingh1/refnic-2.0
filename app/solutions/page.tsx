import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SolutionsPageHero from "@/components/SolutionsPageHero";
import SolutionsCategorySection from "@/components/SolutionsCategorySection";
import SolutionsPageClosingCta from "@/components/SolutionsPageClosingCta";
import { getSolutionCatalogItems } from "@/lib/content/solutionsCatalog";
import { getSolutionsPageConfig } from "@/lib/content/solutionsPage";

export const metadata: Metadata = {
  title: "Solution — Refine Nicely",
  description: "Integrated mechanical and chemical engineering solutions tailored for industrial-scale resource recovery.",
};

export const revalidate = 60;

export default async function SolutionsPage() {
  const items = await getSolutionCatalogItems();
  const c = await getSolutionsPageConfig();
  const toCard = (item: (typeof items)[number]) => ({
    title: item.title,
    description: item.excerpt,
    href: `/solutions/${item.slug}`,
    imageUrl: item.cardImageUrl,
  });
  const mechanicalItems = items.filter((i) => i.category === "Mechanical Solutions").map(toCard);
  const chemicalItems = items.filter((i) => i.category === "Chemical Solution").map(toCard);

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <SolutionsPageHero heading={c.heroHeading} body={c.heroBody} />
        {mechanicalItems.length > 0 && (
          <SolutionsCategorySection
            heading="Mechanical Solutions"
            tagline="These are complete engineering systems."
            align="left"
            items={mechanicalItems}
          />
        )}
        {chemicalItems.length > 0 && (
          <SolutionsCategorySection
            heading="Chemical Solution"
            tagline="These are complete process solutions."
            align="right"
            items={chemicalItems}
          />
        )}
        <SolutionsPageClosingCta
          heading={c.closingHeading}
          body={c.closingBody}
          imageUrl={c.closingImageUrl}
          ctaLabel={c.closingCtaLabel}
          ctaHref={c.closingCtaHref}
        />
      </main>

      <Footer />
    </>
  );
}
