import { getSiteConfig } from "@/lib/content/siteConfig";

export const CAREER_PAGE_KEY = "careerPage";

export type CareerTrait = { title: string; body: string };
export type CareerPosition = { title: string; body: string; imageUrl?: string };
export type CareerPhoto = { caption: string; imageUrl?: string };

export type CareerPageConfig = {
  heroHeading: string;
  heroSubheading: string;
  heroCtaLabel: string;
  missionHeading: string;
  missionImageUrl?: string;
  missionBody: string;
  lookingForHeading: string;
  traits: CareerTrait[];
  openPositionsHeading: string;
  positions: CareerPosition[];
  applyButtonLabel: string;
  lifeHeading: string;
  photos: CareerPhoto[];
  closingHeading: string;
  closingBody: string;
  closingCtaLabel: string;
};

export const DEFAULT_CAREER_PAGE_CONFIG: CareerPageConfig = {
  heroHeading: "Build What the World Will Need Next.",
  heroSubheading:
    "Join a team engineering the future of metal refining, recycling, and critical material recovery through world-class technology and indigenous innovation.",
  heroCtaLabel: "View Open Positions",
  missionHeading: "More Than a Job. A Mission.",
  missionBody:
    "At Refnic, we don't simply manufacture machines—we engineer technologies that power the circular economy. Every system we design, every plant we commission, and every innovation we develop contributes to a cleaner, more resource-efficient future.",
  lookingForHeading: "Who We're Looking For",
  traits: [
    { title: "", body: "" },
    { title: "", body: "" },
    { title: "", body: "" },
  ],
  openPositionsHeading: "Open Positions",
  positions: [
    { title: "Mechanical Engineers", body: "Design the next generation of industrial equipment." },
    { title: "Chemical Engineers", body: "Develop efficient refining and recovery processes." },
    { title: "R&D Engineers", body: "Research and develop future technologies for resource recovery." },
  ],
  applyButtonLabel: "Apply",
  lifeHeading: "Life at Refnic",
  photos: [
    { caption: "Work on real industrial plants" },
    { caption: "Build technologies from concept to commissioning" },
    { caption: "Turn research into real-world applications" },
    { caption: "Own Projects End-to-End" },
    { caption: "Work on Cutting-Edge Technologies" },
    { caption: "Solve complex industrial challenges" },
    { caption: "Contribute to sustainable innovation" },
    { caption: "Collaborate across engineering disciplines" },
  ],
  closingHeading: "Ready to Engineer the Future?",
  closingBody:
    "If you're passionate about solving industrial challenges and building technologies that matter, we'd love to hear from you.",
  closingCtaLabel: "Contact Us",
};

export async function getCareerPageConfig(): Promise<CareerPageConfig> {
  const stored = await getSiteConfig<Partial<CareerPageConfig>>(CAREER_PAGE_KEY, DEFAULT_CAREER_PAGE_CONFIG);
  return { ...DEFAULT_CAREER_PAGE_CONFIG, ...stored };
}
