import { getSiteConfig } from "@/lib/content/siteConfig";

export const GLOBAL_MARKET_PAGE_KEY = "globalMarketPage";

export type NarrativeSection = { heading: string; body: string; imageUrl?: string };
export type FeatureCard = { title: string; body: string; imageUrl?: string };

export type GlobalMarketPageConfig = {
  heroBadges: string[];
  heroHeading: string;
  heroParagraphs: string[];
  narrativeSections: NarrativeSection[];
  marketCards: string[];
  advantageCards: FeatureCard[];
  closingLabel: string;
  closingHeading: string;
  closingBody: string;
  ctaLabel: string;
};

export const DEFAULT_GLOBAL_MARKET_PAGE_CONFIG: GlobalMarketPageConfig = {
  heroBadges: ["Electrification", "Critical Mineral Security", "Circular Manufacturing"],
  heroHeading: "The Future Will Be Built on Recovered Materials",
  heroParagraphs: [
    "The rapid adoption of electric vehicles and energy storage systems is increasing the need for battery recycling and critical material recovery.",
    "Businesses are increasingly recovering valuable resources instead of relying solely on virgin raw materials.",
    "Manufacturers are shifting from linear production models toward circular supply chains where materials are recovered and reused.",
  ],
  narrativeSections: [
    {
      heading: "A Global Shift Is Underway",
      body: "The global transition to electric mobility, renewable energy, advanced electronics, and sustainable manufacturing is driving unprecedented demand for critical minerals. As natural resources become increasingly constrained, recycling and metal refining have emerged as essential industries for securing future material supply.\n\nRefnic is building the engineering capabilities that enable industries to recover, refine, and reuse valuable materials through world-class process engineering and indigenous manufacturing.",
    },
    {
      heading: "Why It Matters",
      body: "As demand for critical materials accelerates worldwide, advanced recycling and metal refining are becoming the backbone of sustainable industrial growth.",
    },
    {
      heading: "Built in India. Designed for Global Industry.",
      body: "Refnic develops engineering solutions that combine indigenous manufacturing, advanced process design, and turnkey execution. Our technologies are designed to meet international industrial standards while remaining adaptable to diverse feedstocks, operating conditions, and project requirements.",
    },
    {
      heading: "Transforming Waste Into Global Value",
      body: "The next generation of manufacturing will rely not only on mining new resources but also on recovering valuable materials already in circulation. Efficient recycling infrastructure is becoming a strategic necessity for industries and nations alike. As industries around the world accelerate their transition toward sustainable manufacturing, Refnic aims to become a trusted engineering partner for advanced recycling and metal refining projects across global markets.",
    },
  ],
  marketCards: [
    "Battery Recycling",
    "E-Waste Recycling",
    "Mining & Secondary Resources",
    "Critical Minerals Processing",
    "Industrial Waste Recovery",
    "Metal Refining",
  ],
  advantageCards: [
    {
      title: "Integrated Turnkey Execution",
      body: "From feasibility studies and plant design to equipment manufacturing, commissioning, and long-term technical support.",
    },
    {
      title: "Indigenous Engineering",
      body: "Purpose-built equipment designed and manufactured in India, reducing dependency on imported technologies.",
    },
    {
      title: "Scalable Solutions",
      body: "Modular systems engineered for pilot plants, commercial facilities, and future capacity expansion.",
    },
    {
      title: "Long-Term Partnership",
      body: "Beyond plant installation, we provide process optimization, operational support, upgrades, and continuous engineering assistance.",
    },
  ],
  closingLabel: "Global Vision",
  closingHeading: "Engineering Tomorrow's Resource Recovery",
  closingBody:
    "Whether enabling new recycling ventures or modernizing existing facilities, Refnic delivers the technology, engineering, and execution required to build the next generation of resource recovery infrastructure.",
  ctaLabel: "Explore Our Technologies →",
};

export async function getGlobalMarketPageConfig(): Promise<GlobalMarketPageConfig> {
  return getSiteConfig<GlobalMarketPageConfig>(GLOBAL_MARKET_PAGE_KEY, DEFAULT_GLOBAL_MARKET_PAGE_CONFIG);
}
