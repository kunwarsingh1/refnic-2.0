import { getSiteConfig } from "@/lib/content/siteConfig";

export const SUSTAINABILITY_PAGE_KEY = "sustainabilityPage";

export type ImpactCard = { title: string; body: string; ctaLabel: string };

export type SustainabilityPageConfig = {
  heroLabel: string;
  heroHeading: string;
  heroBody: string;
  heroImageUrl?: string;
  heroCtaLabel: string;
  impactCards: ImpactCard[];
  impactSectionHeading: string;
  processSteps: string[];
  approachHeading: string;
  approachBody: string;
  approachCards: ImpactCard[];
  closingHeading: string;
  closingBody: string;
  closingImageUrl?: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

export const DEFAULT_SUSTAINABILITY_PAGE_CONFIG: SustainabilityPageConfig = {
  heroLabel: "Waste to Resource",
  heroHeading: "Sustainability",
  heroBody:
    "We develop refining and recycling technologies that recover valuable metals, reduce resource consumption, and transform industrial waste into useful resources.",
  heroCtaLabel: "Explore Our Impact",
  impactCards: [
    {
      title: "Waste Diverted",
      body: "Complete hydrometallurgical process solutions for extracting, refining, and producing high-purity critical metals from recycled materials.",
      ctaLabel: "View",
    },
    {
      title: "Materials Recovered",
      body: "Recovering valuable metals and materials that can return to productive use instead of being lost as waste.",
      ctaLabel: "View",
    },
    {
      title: "Resources Conserved",
      body: "Reducing the need for virgin extraction by enabling recovery from secondary resources.",
      ctaLabel: "View",
    },
  ],
  impactSectionHeading: "The Impact We Create",
  processSteps: ["Collect", "Refine", "Process", "Recover", "Reuse"],
  approachHeading: "Our Approach",
  approachBody:
    "Refnic's systems are designed around one principle: waste should not be the end of a material's life. Through mechanical processing, material recovery, hydrometallurgy and refining, we help transform complex waste streams into valuable secondary resources.",
  approachCards: [
    {
      title: "Design for Recovery",
      body: "Engineering systems around efficient material separation and recovery.",
      ctaLabel: "Apply",
    },
    {
      title: "Build for Scale",
      body: "Developing solutions that can grow from initial processing capacity to larger industrial operations.",
      ctaLabel: "Apply",
    },
    {
      title: "Measure What Matters",
      body: "Focusing on measurable outcomes across material recovery, resource conservation and waste reduction.",
      ctaLabel: "Apply",
    },
  ],
  closingHeading: "Ready to Turn Waste Into Value?",
  closingBody:
    "Partner with Refnic to recover valuable materials from your waste streams and build a more circular, resource-efficient operation.",
  closingCtaLabel: "Get in Touch",
  closingCtaHref: "/contact",
};

export async function getSustainabilityPageConfig(): Promise<SustainabilityPageConfig> {
  return getSiteConfig<SustainabilityPageConfig>(SUSTAINABILITY_PAGE_KEY, DEFAULT_SUSTAINABILITY_PAGE_CONFIG);
}
