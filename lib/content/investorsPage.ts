import { getSiteConfig } from "@/lib/content/siteConfig";

export const INVESTORS_PAGE_KEY = "investorsPage";

export type NumberedSection = { number: string; heading: string; body: string; imageUrl?: string };

export type WhyNowReason = { text: string; imageUrl?: string };

export type InvestorsPageConfig = {
  heroHeading: string;
  heroSubheading: string;
  numberedSections: NumberedSection[];
  whyNowHeading: string;
  whyNowReasons: WhyNowReason[];
  visionLabel: string;
  visionImageUrl?: string;
  visionHeading: string;
  visionBody: string;
  closingHeading: string;
  ctaLabel: string;
};

export const DEFAULT_INVESTORS_PAGE_CONFIG: InvestorsPageConfig = {
  heroHeading: "Why Refnic?",
  heroSubheading:
    "Positioned at the intersection of industrial innovation, critical minerals, and the global circular economy.",
  numberedSections: [
    {
      number: "01",
      heading: "An Expanding Market",
      body: "Global demand for critical minerals, battery recycling, urban mining, and sustainable metal recovery continues to accelerate, driven by electrification and circular economy policies.",
    },
    {
      number: "02",
      heading: "The Turnkey Advantage",
      body: "Most industrial recycling projects rely on a fragmented ecosystem of equipment vendors, process consultants, EPC contractors, and service providers, often leading to higher costs, longer timelines, and increased execution risk. Refnic brings every critical capability together under one integrated platform—from machinery manufacturing and process engineering to turnkey plant execution, commissioning, automation, and long-term operational support.",
    },
    {
      number: "03",
      heading: "Indigenous Technology",
      body: "Our equipment is engineered and manufactured in India, reducing import dependency while delivering globally competitive industrial solutions.",
    },
    {
      number: "04",
      heading: "Multiple Revenue Streams",
      body: "Revenue is generated through turnkey plant projects, equipment sales, engineering services, plant modernization, technical support, spare parts, consumables, and future technology licensing.",
    },
    {
      number: "05",
      heading: "Built for Scale",
      body: "Our modular engineering approach allows technologies to be deployed across battery recycling, e-waste, metal refining, industrial waste processing, and future resource recovery sectors.",
    },
    {
      number: "06",
      heading: "Sustainability by Design",
      body: "Zero Liquid Discharge process design, optimized resource utilization, and higher recovery efficiencies support environmentally responsible industrial growth.",
    },
  ],
  whyNowHeading: "Why Now?",
  whyNowReasons: [
    { text: "Governments are prioritizing critical mineral security." },
    { text: "Manufacturers are investing in circular supply chains." },
    { text: "Industries need integrated engineering partners not fragmented vendors." },
    { text: "Refnic is positioned at the intersection of these long-term trends." },
    { text: "Battery and electronic waste volumes are growing rapidly." },
    { text: "Manufacturers are investing in circular supply chains." },
  ],
  visionLabel: "VISION",
  visionHeading: "Building the World's Most Trusted Engineering Company for Resource Recovery.",
  visionBody:
    "Our ambition extends beyond supplying machinery. We are building the engineering platform that enables industries worldwide to recover valuable materials, reduce waste, and accelerate the transition to a circular economy.",
  closingHeading: "Partner in Building the Future of Industrial Sustainability.",
  ctaLabel: "Contact Us",
};

export async function getInvestorsPageConfig(): Promise<InvestorsPageConfig> {
  return getSiteConfig<InvestorsPageConfig>(INVESTORS_PAGE_KEY, DEFAULT_INVESTORS_PAGE_CONFIG);
}
