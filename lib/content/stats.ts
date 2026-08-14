import { getSiteConfig } from "@/lib/content/siteConfig";
import type { StatItem } from "@/components/StatsSection";

export const STATS_KEY = "stats";

export type StatsConfig = {
  stats: StatItem[];
  batteryImageUrl: string;
  plantImageUrl: string;
};

export const DEFAULT_STATS_CONFIG: StatsConfig = {
  stats: [
    { value: "20,000+", label: "Tonnes of Annual Recycling Capacity Enabled" },
    { value: "95%+", label: "Material Recovery Efficiency" },
    { value: "100%", label: "Indigenous Engineering" },
  ],
  batteryImageUrl: "/battery.png",
  plantImageUrl: "/REFNIC PLANT STATS.png",
};

export async function getStatsConfig(): Promise<StatsConfig> {
  return getSiteConfig<StatsConfig>(STATS_KEY, DEFAULT_STATS_CONFIG);
}
