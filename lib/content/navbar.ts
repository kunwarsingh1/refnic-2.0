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
};

const DEFAULT_PRODUCTS_MENU: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Solution", href: "/products" },
  { label: "Services", href: "/products" },
  { label: "Mechanical", href: "/products" },
  { label: "Mechanical", href: "/products" },
  { label: "Li-ion Battery Recycling Plant", href: "/products" },
  { label: "hydrometallurgical  metal extraction plant", href: "/products" },
  { label: "E-Waste Recycling Line", href: "/products" },
  { label: "Leaching Systems", href: "/products" },
  { label: "Battery Assembly Line", href: "/products" },
  { label: "Storage Tanks", href: "/products" },
  { label: "Lithium-ion Battery Recycling", href: "/products" },
  { label: "Metal Refining / Hydrometallurgy", href: "/products" },
  { label: "Comprehensive Engineering", href: "/products" },
  { label: "Process Engineering", href: "/products" },
  { label: "Maintenance & Repair", href: "/products" },
  { label: "Licensing & Documentation ", href: "/products" },
  { label: "Recycling Equipment", href: "/products" },
  { label: "Filtration Units", href: "/products" },
  { label: "E-Waste Recycling", href: "/products" },
  { label: "Filtration Units", href: "/products" },
  { label: "Customized Equipment Design & Manufacturing", href: "/products" },
  { label: "Spares & Consumables", href: "/products" },
  { label: "SOP Training", href: "/products" },
  { label: "Project Reports", href: "/products" },
  { label: "Financial Modeling", href: "/products" },
  { label: "Financial Channel Support", href: "/products" },
  { label: "Seperators", href: "/products" },
  { label: "Neutralization Systems", href: "/products" },
  { label: "Shredding", href: "/products" },
  { label: "Neutralization Systems", href: "/products" },
  { label: "Material Handling", href: "/products" },
  { label: "Reactors", href: "/products" },
  { label: "Crushing", href: "/products" },
  { label: "Reactors", href: "/products" },
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
  { label: "Resources ", href: "/technologies" },
  { label: "Digital Tools", href: "/technologies" },
  { label: "Impact", href: "/technologies" },
  { label: "Hand Manual ", href: "/technologies" },
  { label: "Black Mass calculator", href: "/technologies" },
  { label: "Climate", href: "/technologies" },
  { label: "Refnic Products & Solution Book ", href: "/technologies" },
  { label: "Process Design", href: "/technologies" },
  { label: "Water", href: "/technologies" },
  { label: "Magazine", href: "/technologies" },
  { label: "Resources", href: "/technologies" },
  { label: "Articles", href: "/technologies" },
  { label: "Circular Economy", href: "/technologies" },
  { label: "Green Tech", href: "/technologies" },
  { label: "White papers", href: "/technologies" },
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
};

export async function getNavbarConfig(): Promise<NavbarConfig> {
  const stored = await getSiteConfig<Partial<NavbarConfig>>(NAVBAR_KEY, DEFAULT_NAVBAR_CONFIG);
  return { ...DEFAULT_NAVBAR_CONFIG, ...stored };
}
