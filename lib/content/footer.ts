import { getSiteConfig } from "@/lib/content/siteConfig";

export const FOOTER_KEY = "footer";

export type FooterLink = { label: string; href: string };
export type FooterLinkColumn = { title: string; links: FooterLink[] };

export type FooterConfig = {
  brandName: string;
  watermarkText: string;
  tagline: string;
  linkColumns: FooterLinkColumn[];
  social: { linkedin: string; youtube: string; email: string };
  contactHeading: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  copyrightName: string;
  bottomLinks: FooterLink[];
};

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  brandName: "Refnic",
  watermarkText: "REFINE NICELY",
  tagline:
    "End-to-end solutions for Lithium-ion battery and e-waste recycling. We deliver advanced technology, engineering excellence, and sustainable value for a cleaner tomorrow.",
  linkColumns: [
    {
      title: "Solutions",
      links: ["Recycling Plants", "Metal Recovery", "Turnkey Projects", "Equipment Supply", "Process Engineering"].map(
        (label) => ({ label, href: "#" }),
      ),
    },
    {
      title: "Services",
      links: [
        "Feasibility Study",
        "Engineering & Design",
        "Plant Commissioning",
        "SOP & Training",
        "After-Sales Support",
      ].map((label) => ({ label, href: "#" })),
    },
    {
      title: "Industries",
      links: ["Battery Recycling", "E-Waste Recycling", "Metal & Mining", "Chemical Industry", "Circular Economy"].map(
        (label) => ({ label, href: "#" }),
      ),
    },
    {
      title: "Company",
      links: ["About Us", "Our Technology", "Projects", "Careers", "News & Insights"].map((label) => ({
        label,
        href: "#",
      })),
    },
  ],
  social: { linkedin: "#", youtube: "#", email: "mailto:info@refnic.com" },
  contactHeading: "Contact Us",
  contactEmail: "info@refnic.com",
  contactPhone: "+91 9999999999",
  contactAddress: "08 Triveni Tower, 3rd Floor, Central Avenue, Girdha-Pura, Bawana, Nagpur 440020, India.",
  copyrightName: "Refnic",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
};

export async function getFooterConfig(): Promise<FooterConfig> {
  const stored = await getSiteConfig<Partial<FooterConfig>>(FOOTER_KEY, DEFAULT_FOOTER_CONFIG);
  return { ...DEFAULT_FOOTER_CONFIG, ...stored };
}
