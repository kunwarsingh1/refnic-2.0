import { getSiteConfig } from "@/lib/content/siteConfig";
import type { NarrativeSection } from "@/lib/content/globalMarketPage";

export const INDIAN_MARKET_PAGE_KEY = "indianMarketPage";

export type IndianMarketPageConfig = {
  heroHeading: string;
  heroSubheading: string;
  statHighlights: string[];
  driversHeading: string;
  driverBadges: string[];
  driverParagraphs: string[];
  industriesHeading: string;
  industries: string[];
  narrativeSections: NarrativeSection[];
  closingTagline: string;
  closingHeading: string;
};

export const DEFAULT_INDIAN_MARKET_PAGE_CONFIG: IndianMarketPageConfig = {
  heroHeading: "Every Year India Generates",
  heroSubheading: "Engineering Built in India, For India.",
  statHighlights: [
    "Millions of tonnes of industrial waste",
    "Millions of tonnes of electronic waste",
    "Rapidly growing lithium-ion battery waste",
  ],
  driversHeading: "What's Driving India's Recycling Economy?",
  driverBadges: ["Manufacturing Growth", "Circular Economy", "Government Policy"],
  driverParagraphs: [
    "India's expanding industrial base demands a secure and sustainable supply of critical materials.",
    "Businesses are increasingly recovering valuable resources instead of relying solely on virgin raw materials.",
    "Progressive regulations and sustainability initiatives are accelerating investment in domestic recycling infrastructure.",
  ],
  industriesHeading: "Industries We Serve",
  industries: [
    "Battery Recycling",
    "E-Waste Recycling",
    "Mining",
    "Metal Refining",
    "Smelters",
    "Chemical Processing",
    "Industrial Waste",
    "Critical Minerals",
  ],
  narrativeSections: [
    {
      heading: "The Opportunity",
      body: "India is entering a defining phase of industrial growth. Rapid electrification, expanding manufacturing, increasing consumption, and stronger environmental regulations are driving unprecedented demand for recycling and metal refining infrastructure.\n\nFrom lithium-ion batteries and e-waste to industrial residues and critical metals, the need for efficient resource recovery has never been greater.\n\nRefnic is building the engineering foundation to support this transformation.",
    },
    {
      heading: "Why Indigenous\nTechnology Matters",
      body: "Rather than depending on imported systems, India requires technologies designed around local feedstocks, operating conditions, regulations, and economics.\n\nRefnic develops indigenous engineering solutions that reduce import dependency while improving accessibility, reliability, and long-term technical support for Indian industries.",
    },
    {
      heading: "Building India's Recycling Infrastructure.",
      body: "India's transition to a circular economy requires more than machines — it requires engineering expertise, scalable technology, and trusted execution. Refnic is committed to enabling industries with integrated solutions that transform waste into valuable resources while strengthening India's manufacturing future.",
    },
  ],
  closingTagline:
    "Powering the transition from waste to critical materials through indigenous engineering and advanced recycling infrastructure.",
  closingHeading: "India's Next Industrial Revolution.",
};

export async function getIndianMarketPageConfig(): Promise<IndianMarketPageConfig> {
  return getSiteConfig<IndianMarketPageConfig>(INDIAN_MARKET_PAGE_KEY, DEFAULT_INDIAN_MARKET_PAGE_CONFIG);
}
