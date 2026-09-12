import { getSiteConfig } from "@/lib/content/siteConfig";

export const NAVBAR_KEY = "navbar";

export type NavLink = { label: string; href: string };
export type AboutMenuItem = { title: string; subtitle: string; href: string };

export type NavbarConfig = {
  contactEmail: string;
  contactPhone: string;
  productsMenu: NavLink[];
  technologiesMenu: NavLink[];
  aboutMenu: AboutMenuItem[];
  technologiesImageUrl: string;
  aboutImageUrl: string;
};

const DEFAULT_PRODUCTS_MENU: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Solution", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Mechanical", href: "/products" },
  { label: "Mechanical", href: "/products" },
  { label: "Li-ion Battery Recycling Plant", href: "/products/li-ion-battery-recycling-plant" },
  { label: "hydrometallurgical  metal extraction plant", href: "/products/hydrometallurgical-metal-extraction-plant" },
  { label: "E-Waste Recycling Line", href: "/products/e-waste-recycling-line" },
  { label: "Leaching Systems", href: "/products/leaching-systems" },
  { label: "Battery Assembly Line", href: "/products/battery-assembly-line" },
  { label: "Storage Tanks", href: "/products/storage-tanks" },
  { label: "Lithium-ion Battery Recycling", href: "/solutions/lithium-ion-battery-recycling" },
  { label: "Metal Refining / Hydrometallurgy", href: "/products/metal-refining-hydrometallurgy" },
  { label: "Comprehensive Engineering", href: "/products/comprehensive-engineering" },
  { label: "Process Engineering", href: "/products/process-engineering" },
  { label: "Maintenance & Repair", href: "/products/maintenance-repair" },
  { label: "Licensing & Documentation ", href: "/products/licensing-documentation" },
  { label: "Recycling Equipment", href: "/products" },
  { label: "Filtration Units", href: "/products/filtration-units" },
  { label: "E-Waste Recycling", href: "/products" },
  { label: "Filtration Units", href: "/products/filtration-units" },
  { label: "Customized Equipment Design & Manufacturing", href: "/products/customized-equipment-design-manufacturing" },
  { label: "Spares & Consumables", href: "/products/spares-consumables" },
  { label: "SOP Training", href: "/products/sop-training" },
  { label: "Project Reports", href: "/products/project-reports" },
  { label: "Financial Modeling", href: "/products/financial-modeling" },
  { label: "Financial Channel Support", href: "/products/financial-channel-support" },
  { label: "Seperators", href: "/products" },
  { label: "Neutralization Systems", href: "/products/neutralization-systems" },
  { label: "Shredding", href: "/products" },
  { label: "Neutralization Systems", href: "/products/neutralization-systems" },
  { label: "Material Handling", href: "/products" },
  { label: "Reactors", href: "/products/reactors" },
  { label: "Crushing", href: "/products" },
  { label: "Reactors", href: "/products/reactors" },
  { label: "Pollution Control", href: "/products" },
  { label: "Separation Equipment", href: "/products" },
  { label: "Separation", href: "/products" },
  { label: "Separation Equipment", href: "/products" },
  { label: "Process Utilities", href: "/products" },
  { label: "Pollution Control", href: "/products" },
  { label: "Process Utilities", href: "/products" },
  { label: "Chemical ", href: "/products" },
  { label: "Chemical ", href: "/products" },
];

const DEFAULT_TECHNOLOGIES_MENU: NavLink[] = [
  { label: "Sustainability", href: "/sustainability" },
  { label: "Resources ", href: "/resources" },
  { label: "Digital Tools", href: "/digital-tools" },
  { label: "Impact", href: "/sustainability/impact" },
  { label: "Hand Manual ", href: "/resources/hand-manual" },
  { label: "Black Mass calculator", href: "/digital-tools" },
  { label: "Climate", href: "/sustainability/climate" },
  { label: "Refnic Products & Solution Book ", href: "/resources/refnic-products-solutions" },
  { label: "Process Design", href: "/digital-tools" },
  { label: "Water", href: "/sustainability/water" },
  { label: "Magazine", href: "/resources/magazine" },
  { label: "Resources", href: "/resources" },
  { label: "Articles", href: "/resources/articles" },
  { label: "Circular Economy", href: "/sustainability/circular-economy" },
  { label: "Green Tech", href: "/sustainability/green-tech" },
  { label: "White papers", href: "/white-papers" },
];

const DEFAULT_ABOUT_MENU: AboutMenuItem[] = [
  { title: "Our Story", subtitle: "How we started and where we’re headed.", href: "/our-story" },
  { title: "Global Market", subtitle: "Perspectives from markets worldwide.", href: "/global-market" },
  { title: "Case Study", subtitle: "Real results from real businesses.", href: "/case-study" },
  { title: "Investors", subtitle: "Building value for the future.", href: "/investors" },
  { title: "Indian Market", subtitle: "Insights shaping India’s growth.", href: "/indian-market" },
];

export const DEFAULT_NAVBAR_CONFIG: NavbarConfig = {
  contactEmail: "something@gmail.com",
  contactPhone: "+91 9999999999",
  productsMenu: DEFAULT_PRODUCTS_MENU,
  technologiesMenu: DEFAULT_TECHNOLOGIES_MENU,
  aboutMenu: DEFAULT_ABOUT_MENU,
  technologiesImageUrl: "/refnicOverview2.png",
  aboutImageUrl: "/refnicOverview2.png",
};

export async function getNavbarConfig(): Promise<NavbarConfig> {
  const stored = await getSiteConfig<Partial<NavbarConfig>>(NAVBAR_KEY, DEFAULT_NAVBAR_CONFIG);
  return { ...DEFAULT_NAVBAR_CONFIG, ...stored };
}
