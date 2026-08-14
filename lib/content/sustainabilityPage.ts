import { getSiteConfig } from "@/lib/content/siteConfig";

export const SUSTAINABILITY_PAGE_KEY = "sustainabilityPage";

export type ImpactCard = { title: string; body: string; ctaLabel: string };

export type SustainabilityPageConfig = {
  heroLabel: string;
  heroHeading: string;
  heroBody: string;
  heroCtaLabel: string;
  impactCards: ImpactCard[];
  impactSectionHeading: string;
  processSteps: string[];
  approachHeading: string;
  approachBody: string;
  approachCards: ImpactCard[];
  closingBody: string;
  closingCtaLabel: string;
};

export const DEFAULT_SUSTAINABILITY_PAGE_CONFIG: SustainabilityPageConfig = {
  heroLabel: "Waste to Resource",
  heroHeading: "Turning Waste Into Measurable Impact",
  heroBody:
    "Refnic enables industries to recover valuable materials from end-of-life batteries, e-waste and other complex waste streams — reducing waste, conserving resources and building the infrastructure for a more circular economy.",
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
  closingBody:
    "If you're passionate about solving industrial challenges and building technologies that matter, we'd love to hear from you.",
  closingCtaLabel: "View Open Positions",
};

export async function getSustainabilityPageConfig(): Promise<SustainabilityPageConfig> {
  return getSiteConfig<SustainabilityPageConfig>(SUSTAINABILITY_PAGE_KEY, DEFAULT_SUSTAINABILITY_PAGE_CONFIG);
}
