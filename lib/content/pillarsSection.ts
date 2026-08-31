import { getSiteConfig } from "@/lib/content/siteConfig";

export const PILLARS_SECTION_KEY = "pillarsSection";

export type PillarsSectionConfig = {
  desktopVideoUrl: string;
  mobileVideoUrl?: string;
};

const DEFAULT_PILLARS_SECTION_CONFIG: PillarsSectionConfig = {
  desktopVideoUrl: "/Sequence%20011_1.mp4",
  mobileVideoUrl: "",
};

export async function getPillarsSectionConfig(): Promise<PillarsSectionConfig> {
  const stored = await getSiteConfig<Partial<PillarsSectionConfig>>(PILLARS_SECTION_KEY, {});
  return { ...DEFAULT_PILLARS_SECTION_CONFIG, ...stored };
}
