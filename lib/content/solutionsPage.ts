import { getSiteConfig } from "@/lib/content/siteConfig";

export const SOLUTIONS_PAGE_KEY = "solutionsPage";

export type NarrativeLayout = "banner" | "side-right" | "plain";

export type NarrativeSection = {
  heading: string;
  body: string;
  layout: NarrativeLayout;
  imageUrl?: string;
};

export type SolutionsPageConfig = {
  heroWatermark: string;
  heroHeading: string;
  heroBody: string;
  heroImageUrl?: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  narrativeSections: NarrativeSection[];
  mechanicalHeading: string;
  mechanicalTagline: string;
  mechanicalImageUrl?: string;
  chemicalHeading: string;
  chemicalTagline: string;
  chemicalImageUrl?: string;
  closingHeading: string;
  closingBody: string;
  closingImageUrl?: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

export const DEFAULT_SOLUTIONS_PAGE_CONFIG: SolutionsPageConfig = {
  heroWatermark: "Solution",
  heroHeading: "Complete Engineering\nFrom Design to\nCommissioning.",
  heroBody:
    "Integrated mechanical and chemical engineering solutions tailored for industrial-scale resource recovery.",
  heroCtaLabel: "Explore Battery Recycling →",
  heroCtaHref: "/#contact",
  narrativeSections: [
    {
      heading: "The Problem",
      layout: "banner",
      body:
        "Lithium-ion batteries have become essential across electric vehicles, energy storage systems, consumer electronics and industrial applications. As these batteries reach the end of their useful life, however, they create a growing stream of complex material that cannot simply be treated as conventional waste. Each battery contains a combination of valuable and potentially hazardous materials, including lithium, nickel, cobalt, copper, aluminium, graphite, plastics and other components that are tightly integrated within the battery structure.\nThe challenge begins with the complexity and variability of the incoming battery stream. Batteries can differ significantly in chemistry, size, format, construction, condition and state of degradation. A recycling process therefore has to deal with batteries that may arrive as complete packs, modules, cells or manufacturing scrap, with each feed type presenting different processing requirements. Damaged, swollen, leaking or otherwise abnormal batteries introduce additional handling and process-control challenges that must be addressed before material can enter the recycling route.\n\nOnce batteries are accepted for processing, another major challenge is material separation. Valuable materials are not present as clean, individual streams. They are embedded within a combination of electrodes, current collectors, casings, plastics, separators and other battery components. Simply reducing the battery size does not produce a usable recovered product. The material must be progressively processed and separated so that different fractions can be directed toward appropriate recovery pathways.\n\nThere is also a significant challenge in achieving consistent material quality. Variations in battery chemistry and feed composition can affect the characteristics of the recovered material. For downstream processors, inconsistent particle size, contamination and mixed material fractions can reduce the value and usability of recovered outputs. A recycling process therefore needs controlled size reduction, classification and separation rather than relying on a single processing step.\n\nThe growing volume of end-of-life batteries makes this challenge increasingly important. Without effective recycling, valuable metals and battery materials are lost from the resource cycle, while the quantity of battery waste requiring controlled management continues to increase. At the same time, manufacturers and recyclers need reliable sources of recovered materials to support a more circular battery supply chain.\n\nThe real problem is therefore not simply that batteries become waste. It is that a complex, mixed and variable product must be transformed into controlled, identifiable and recoverable material streams. Effective lithium-ion battery recycling requires a process capable of managing this complexity while recovering maximum material value and preparing the outputs for further treatment, refining or reuse.",
    },
    {
      heading: "The Solution",
      layout: "side-right",
      body:
        "A Controlled Pathway for Battery Material Recovery\n\nLithium-ion battery recycling provides a structured way to convert end-of-life batteries into recoverable material streams. Through controlled preparation, mechanical processing, size reduction, screening and separation, complex battery waste can be transformed into concentrated black mass along with recoverable copper, aluminium, ferrous metals and other fractions.\n\nThe process is designed around the incoming battery chemistry, format and condition, allowing different material streams to be progressively separated and directed toward appropriate downstream recovery. This improves material quality, reduces waste and creates a more controlled route for recovering valuable battery resources.",
    },
    {
      heading: "What Recycling Solves",
      layout: "banner",
      body:
        "From Waste Problem to Resource Opportunity\nLithium-ion battery recycling addresses the growing challenge of managing batteries after their useful life while creating an opportunity to recover materials that would otherwise leave the resource cycle. By processing end-of-life batteries through controlled recovery pathways, valuable materials can be collected and directed toward further refining rather than being treated solely as waste. Recycling also helps create an additional source of materials for the wider battery and industrial supply chain. Instead of relying exclusively on newly extracted resources, recovered materials can contribute to a more circular flow of raw materials and reduce the loss of valuable elements contained within discarded batteries. At a broader level, lithium-ion battery recycling connects waste management, resource recovery and material supply. It provides a pathway for materials already present in batteries to remain useful beyond the first life of the product.",
    },
    {
      heading: "The Refnic Approach",
      layout: "plain",
      body:
        "From End-of-Life to New Material Value\n\nRefnic approaches lithium-ion battery recycling as a material-recovery challenge rather than simply a waste-disposal process. The objective is to create a controlled pathway in which end-of-life batteries are assessed, processed and separated so that valuable material streams can be recovered for appropriate downstream applications. The approach focuses on creating a connection between the end-of-life battery and the next stage of the material lifecycle. By combining controlled processing with material separation and recovery, Refnic aims to transform a complex battery waste stream into identifiable and recoverable resources.\n\nBATTERY → PROCESSING → SEPARATION → RECOVERY → NEW MATERIAL VALUE",
    },
    {
      heading: "The Outcome",
      layout: "side-right",
      body:
        "Waste Becomes a Resource\n\nThe outcome of lithium-ion battery recycling is the recovery of material value from products that have completed their useful life. Depending on the battery chemistry and recycling route, recovered streams can contain valuable materials such as lithium, nickel, cobalt, manganese, copper and aluminium. These recovered materials can then move into appropriate downstream refining, processing or material-production pathways. This creates a connection between end-of-life batteries and future material demand, helping keep valuable resources within the wider industrial cycle. The ultimate objective is to move from discarded battery → recovered material → future resource, creating a more circular approach to the materials used in lithium-ion batteries.",
    },
  ],
  mechanicalHeading: "Mechanical Solutions",
  mechanicalTagline: "These are complete engineering systems.",
  chemicalHeading: "Chemical Solution",
  chemicalTagline: "These are complete process solutions.",
  closingHeading: "Ready to Build Your Next Plant?",
  closingBody:
    "From concept to commissioning, Refnic delivers complete engineering solutions tailored to your process, capacity, and business goals.",
  closingCtaLabel: "Start Your Project",
  closingCtaHref: "/contact",
};

export async function getSolutionsPageConfig(): Promise<SolutionsPageConfig> {
  const stored = await getSiteConfig<Partial<SolutionsPageConfig>>(SOLUTIONS_PAGE_KEY, {});
  return { ...DEFAULT_SOLUTIONS_PAGE_CONFIG, ...stored };
}
