import { getSiteConfig } from "@/lib/content/siteConfig";

export const CONTACT_PAGE_KEY = "contactPage";

export type ContactPageConfig = {
  heroHeading: string;
  heroSubheading: string;
  contactInfoHeading: string;
  formImageUrl?: string;
  subjects: string[];
  closingHeading: string;
  closingImageUrl?: string;
  closingTagline: string;
  closingBody: string;
  closingCtaLabel: string;
};

export const DEFAULT_CONTACT_PAGE_CONFIG: ContactPageConfig = {
  heroHeading: "Complete Engineering Solutions.",
  heroSubheading:
    "Tell us what you're building, processing, or recovering. Our team will help you identify the right technology, equipment, and engineering approach.",
  contactInfoHeading: "Contact Information",
  subjects: [
    "General Inquiry",
    "Custom Equipment",
    "Project Consultation",
    "Metal Refining",
    "Recycling Plant",
    "Process Engineering",
  ],
  closingHeading: "Have a Complex Problem?",
  closingTagline: "Let's Engineer the Solution.",
  closingBody:
    "From individual equipment to complete recycling and refining plants, Refnic helps turn industrial requirements into working systems.",
  closingCtaLabel: "Talk to an Engineer",
};

export async function getContactPageConfig(): Promise<ContactPageConfig> {
  const stored = await getSiteConfig<Partial<ContactPageConfig>>(CONTACT_PAGE_KEY, DEFAULT_CONTACT_PAGE_CONFIG);
  return { ...DEFAULT_CONTACT_PAGE_CONFIG, ...stored };
}
