import { getNavbarConfig } from "@/lib/content/navbar";
import { updateNavbarConfigAction } from "@/app/actions/navbar";
import { NavbarConfigForm } from "@/components/admin/NavbarConfigForm";

export default async function AdminNavbarPage() {
  const config = await getNavbarConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Navbar</h1>
      <p className="mt-1 text-sm text-white/50">
        Contact info, and every link in the Products, Technologies and About Us dropdowns. Menus have a fixed
        layout — items can be edited but not added or removed.
      </p>

      <div className="mt-6">
        <NavbarConfigForm config={config} action={updateNavbarConfigAction} />
      </div>
    </div>
  );
}
