import { FooterConfigForm } from "@/components/admin/FooterConfigForm";
import { getFooterConfig } from "@/lib/content/footer";
import { updateFooterConfigAction } from "@/app/actions/footer";

export default async function AdminFooterPage() {
  const config = await getFooterConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Footer</h1>
      <p className="mt-1 text-sm text-white/50">Shown on every page.</p>
      <div className="mt-6">
        <FooterConfigForm config={config} action={updateFooterConfigAction} />
      </div>
    </div>
  );
}
