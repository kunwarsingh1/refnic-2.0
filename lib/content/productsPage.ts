import { getSiteConfig } from "@/lib/content/siteConfig";

export const PRODUCTS_PAGE_KEY = "productsPage";

export type PlantStep = {
  title: string;
  subheading: string;
  keyEquipment: string;
  description: string;
  imageUrl?: string;
};

export type MaterialCard = {
  title: string;
  description: string;
  imageUrl?: string;
};

export type ProductsPageConfig = {
  heroWatermark: string;
  heroHeading: string;
  heroIntro: string;
  heroImageUrl?: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  crushingBlurb: string;
  crushingImageUrl?: string;
  processHeading: string;
  processIntro: string;
  plantSteps: PlantStep[];
  materialRecoveryHeading: string;
  materialCards: MaterialCard[];
  ctaHeading: string;
  ctaBlurb: string;
  ctaImageUrl?: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

export const DEFAULT_PRODUCTS_PAGE_CONFIG: ProductsPageConfig = {
  heroWatermark: "Products",
  heroHeading: "LITHIUM-ION BATTERY RECYCLING PLANT",
  heroIntro:
    "Recover more. Waste less. Build the battery loop. Refnic designs lithium-ion battery recycling plants for the controlled recovery of valuable materials from end-of-life NMC and LCO batteries.\nFrom battery receiving and inspection to shredding, crushing, separation and black-mass recovery, every stage is engineered as one integrated process.",
  heroCtaLabel: "Design Your Recycling Plant →",
  heroCtaHref: "/#contact",
  crushingBlurb:
    "Refnic crushing systems are engineered to handle demanding industrial feedstocks and prepare materials for efficient separation and recovery. The equipment can be configured around the characteristics of the incoming material and the requirements of the downstream process.",
  processHeading: "Process & Machinery Overview",
  processIntro:
    "From Battery Waste to Recovered Materials — Refnic's lithium-ion battery recycling plant follows a controlled mechanical recovery route designed around the incoming battery chemistry, format, condition and required output quality.",
  plantSteps: [
    {
      title: "RECEIVE & INSPECT",
      subheading: "Battery receiving, identification & segregation",
      keyEquipment: "Key equipment: Receiving station • Inspection area • Sorting system",
      description:
        "Incoming batteries are identified, checked for chemistry and condition, and segregated according to the approved processing route. This ensures only suitable material enters the recycling process.",
    },
    {
      title: "DISCHARGE & DISMANTLE",
      subheading: "Controlled energy removal & battery preparation",
      keyEquipment: "Key equipment: Discharge system • Dismantling station • Material handling system",
      description:
        "Batteries are safely discharged before packs and modules are dismantled into processable components. The material is prepared for controlled mechanical processing.",
    },
    {
      title: "PRIMARY SHREDDING",
      subheading: "Controlled size reduction",
      keyEquipment: "Key equipment: Receiving station • Inspection area • Sorting system",
      description:
        "The prepared battery material enters the primary shredder, where packs, modules and cells are cut and torn into smaller pieces for continuous downstream processing.",
    },
    {
      title: "HAMMER CRUSHING",
      subheading: "Secondary crushing & material breakdown",
      keyEquipment: "Key equipment: Hammer crusher • Enclosed transfer system • Conveyor",
      description:
        "The shredded material passes through impact crushing for further size reduction and improved separation of the different battery components.",
    },
    {
      title: "SCREENING & CLASSIFICATION",
      subheading: "Particle-size separation",
      keyEquipment: "Key equipment: Vibrating screen • Drum screen • Screw conveyor",
      description:
        "Vibrating and drum screening systems classify the processed material by particle size and direct each fraction toward the appropriate downstream separation stage.",
    },
    {
      title: "MAGNETIC SEPARATION",
      subheading: "Ferrous metal recovery",
      keyEquipment: "Key equipment: Magnetic separator • Conveyor system",
      description:
        "Magnetic separation removes ferrous and iron-containing material from the processed battery stream, reducing contamination in the remaining material fractions.",
    },
    {
      title: "FINE GRINDING",
      subheading: "Controlled fine size reduction",
      keyEquipment: "Key equipment: Grinder • Fine screening system",
      description:
        "Selected material is further reduced in size to improve the separation of fine battery material and prepare the stream for subsequent classification and recovery.",
    },
    {
      title: "COPPER & ALUMINIUM SEPARATION",
      subheading: "Non-ferrous metal recovery",
      keyEquipment: "Key equipment: Non-ferrous separator • Air classification system • Conveyors",
      description:
        "The processed stream is separated to recover copper and aluminium fractions while directing the remaining fine battery material toward black-mass collection.",
    },
    {
      title: "PNEUMATIC SEPARATION & DUST COLLECTION",
      subheading: "Fine-particle classification & process control",
      keyEquipment: "Key equipment: Pneumatic separator • Cyclone • Dust collector • Exhaust system",
      description:
        "Controlled airflow separates lightweight and fine fractions, while the integrated dust collection system captures airborne particles generated during mechanical processing.",
    },
    {
      title: "MATERIAL OUTPUT",
      subheading: "Separated material streams for downstream recovery",
      keyEquipment: "Primary outputs: BLACK MASS • COPPER • ALUMINIUM • FERROUS METAL • PLASTIC / LIGHT FRACTIONS",
      description:
        "The completed mechanical line produces separated black mass, copper, aluminium, ferrous metal and lightweight fractions. These streams can then be directed to the appropriate downstream recovery or refining route.",
    },
  ],
  materialRecoveryHeading: "MATERIAL RECOVERY",
  materialCards: [
    {
      title: "Black Mass",
      description:
        "Fine active battery material containing valuable cathode and anode constituents for downstream recovery.",
    },
    {
      title: "Copper",
      description: "Recovered copper-containing fraction separated from the processed battery stream.",
    },
    {
      title: "Aluminium",
      description:
        "Recovered aluminium-containing fraction from battery casings, foils and structural components.",
    },
    {
      title: "Plastics",
      description: "Lightweight materials separated during screening and pneumatic classification.",
    },
    {
      title: "Ferrous Metals",
      description: "Iron and ferrous-containing material removed through magnetic separation.",
    },
  ],
  ctaHeading: "FROM BATTERY WASTE TO RECOVERED MATERIALS",
  ctaBlurb: "Design a lithium-ion battery recycling process around your feed, capacity and recovery requirements.",
  ctaButtonLabel: "Design Your Recycling Plant →",
  ctaButtonHref: "/#contact",
};

export async function getProductsPageConfig(): Promise<ProductsPageConfig> {
  const stored = await getSiteConfig<Partial<ProductsPageConfig>>(PRODUCTS_PAGE_KEY, {});
  return { ...DEFAULT_PRODUCTS_PAGE_CONFIG, ...stored };
}
