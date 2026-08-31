import Link from "next/link";
import { getPillars } from "@/lib/content/pillars";
import { getPillarsSectionConfig } from "@/lib/content/pillarsSection";
import { deletePillarAction, reorderPillarAction } from "@/app/actions/pillars";
import { updatePillarsSectionConfigAction } from "@/app/actions/pillars-section";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { VideoUploadField } from "@/components/admin/VideoUploadField";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminPillarsPage() {
  const items = await getPillars();
  const sectionConfig = await getPillarsSectionConfig();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pillars</h1>
          <p className="mt-1 text-sm text-white/50">
            The full-screen looping video and the 3 cards below it on the homepage.
          </p>
        </div>
        <Link href="/admin/pillars/new" className={buttonClass}>
          Add pillar
        </Link>
      </div>

      <form action={updatePillarsSectionConfigAction} className="mt-8 max-w-md space-y-4 border-b border-white/10 pb-8">
        <p className="text-xs font-bold uppercase tracking-wide text-white/40">Section video</p>
        <VideoUploadField
          name="desktopVideoUrl"
          label="Background video — laptop/desktop (muted, looping, full screen)"
          defaultValue={sectionConfig.desktopVideoUrl}
        />
        <VideoUploadField
          name="mobileVideoUrl"
          label="Background video — mobile (leave empty to show no video on phones)"
          defaultValue={sectionConfig.mobileVideoUrl}
        />
        <button type="submit" className={buttonClass}>
          Save video
        </button>
      </form>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No pillars yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {p.title[0]} {p.title[1]}
                  </p>
                  <p className="truncate text-xs text-white/40">{p.body}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderPillarAction.bind(null, p.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderPillarAction.bind(null, p.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link href={`/admin/pillars/${p.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                    Edit
                  </Link>
                  <DeleteButton action={deletePillarAction.bind(null, p.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
