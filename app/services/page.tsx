import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ServicesPageHero from "@/components/ServicesPageHero";
import SolutionsCategorySection, { type SolutionItem } from "@/components/SolutionsCategorySection";
import ServicesPageClosingCta from "@/components/ServicesPageClosingCta";
import { getServiceCatalogItems } from "@/lib/content/servicesCatalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services — Refine Nicely",
  description: "Integrated technical, operational, and business support for every project phase.",
};

export default async function ServicesPage() {
  const items = await getServiceCatalogItems();
  const projectServices: SolutionItem[] = items.map((s) => ({
    title: s.title,
    description: s.excerpt,
    href: `/services/${s.slug}`,
    imageUrl: s.cardImageUrl,
  }));

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <ServicesPageHero />
        {projectServices.length > 0 && (
          <SolutionsCategorySection
            heading={"Project\nServices"}
            tagline={"Integrated technical, operational, and business\nsupport for every project\nphase."}
            align="left"
            taglineMaxWidth="600px"
            items={projectServices}
          />
        )}
        <ServicesPageClosingCta />
      </main>

      <Footer />
    </>
  );
}
