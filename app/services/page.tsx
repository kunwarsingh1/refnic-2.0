import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ServicesPageHero from "@/components/ServicesPageHero";
import SolutionsCategorySection, { type SolutionItem } from "@/components/SolutionsCategorySection";
import ServicesPageClosingCta from "@/components/ServicesPageClosingCta";
import { getServiceCatalogItems } from "@/lib/content/servicesCatalog";
import { getServicesPageConfig } from "@/lib/content/servicesPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services — Refine Nicely",
  description: "Integrated technical, operational, and business support for every project phase.",
};

export default async function ServicesPage() {
  const items = await getServiceCatalogItems();
  const c = await getServicesPageConfig();
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
        <ServicesPageHero heading={c.heroHeading} body={c.heroBody} />
        {projectServices.length > 0 && (
          <SolutionsCategorySection
            heading={c.categoryHeading}
            tagline={c.categoryTagline}
            imageUrl={c.categoryImageUrl}
            align="left"
            taglineMaxWidth="600px"
            items={projectServices}
            headingClassName="whitespace-pre-line font-display text-[40px] font-normal leading-tight text-[#EBEBEB]"
            taglineClassName="mt-4 whitespace-pre-line text-[18px] font-light leading-[32.46px] text-white"
          />
        )}
        <ServicesPageClosingCta
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
