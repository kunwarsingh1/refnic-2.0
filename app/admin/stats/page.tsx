import { StatsConfigForm } from "@/components/admin/StatsConfigForm";
import { getStatsConfig } from "@/lib/content/stats";
import { updateStatsConfigAction } from "@/app/actions/stats";

export default async function AdminStatsPage() {
  const config = await getStatsConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Stats</h1>
      <p className="mt-1 text-sm text-white/50">The stat counters and their two hero images.</p>
      <div className="mt-6">
        <StatsConfigForm config={config} action={updateStatsConfigAction} />
      </div>
    </div>
  );
}
