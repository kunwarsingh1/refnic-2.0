import { getSiteConfig } from "@/lib/content/siteConfig";
import type { NumberedSection } from "@/lib/content/investorsPage";

export const OUR_STORY_PAGE_KEY = "ourStoryPage";

export type OurStoryPageConfig = {
  heroLabel: string;
  heroSubheading: string;
  numberedSections: NumberedSection[];
  closingTagline: string;
  ctaLabel: string;
};

export const DEFAULT_OUR_STORY_PAGE_CONFIG: OurStoryPageConfig = {
  heroLabel: "Our Story",
  heroSubheading: "Engineering the Future of Resource Recovery.",
  numberedSections: [
    {
      number: "01",
      heading: "It Started With a Problem.",
      body: "The recycling industry wasn't short of equipment — it was short of integration. Businesses had to coordinate multiple vendors for machinery, process design, engineering, compliance, commissioning, and operations. The result was complexity, delays, and unnecessary execution risk.",
    },
    {
      number: "02",
      heading: "So We Built the Missing Piece.",
      body: "Instead of supplying individual machines, we built an engineering platform. One company. One responsibility. From process engineering and indigenous machinery to complete turnkey recycling plants.",
    },
    {
      number: "03",
      heading: "Designed. Engineered. Manufactured.",
      body: "Every Refnic system is developed with a focus on precision, reliability, and long-term industrial performance. Our commitment to indigenous manufacturing reduces dependency on imports while delivering solutions tailored to modern recycling industries.",
    },
    {
      number: "04",
      heading: "Turning Waste Into Critical Resources.",
      body: "Our technologies recover valuable metals from complex waste streams, helping industries transform discarded materials into resources that power batteries, electronics, and the next generation of manufacturing.",
    },
    {
      number: "05",
      heading: "Engineering Beyond Delivery.",
      body: "Every Refnic system is developed with a focus on precision, reliability, and long-term industrial performance. Our commitment to indigenous manufacturing reduces dependency on imports while delivering solutions tailored to modern recycling industries.",
    },
    {
      number: "06",
      heading: "Building India's Circular Future.",
      body: "From indigenous engineering to zero-liquid-discharge process design, every project contributes to a more resilient manufacturing ecosystem and a cleaner industrial future.",
    },
  ],
  closingTagline:
    "Our story isn't measured by the number of machines we've built. It's measured by the industries we've enabled, the resources we've recovered, and the future we're engineering.",
  ctaLabel: "View Case Study",
};

export async function getOurStoryPageConfig(): Promise<OurStoryPageConfig> {
  return getSiteConfig<OurStoryPageConfig>(OUR_STORY_PAGE_KEY, DEFAULT_OUR_STORY_PAGE_CONFIG);
}
