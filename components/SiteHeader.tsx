import Navbar from "@/components/Navbar";
import { getNavbarConfig } from "@/lib/content/navbar";

export default async function SiteHeader({ roundedBottom = true }: { roundedBottom?: boolean }) {
  const config = await getNavbarConfig();

  return (
    <header className="mt-4 md:mt-6">
      <div className={`mx-auto max-w-[90rem] bg-white ${roundedBottom ? "rounded-b-2xl" : ""}`}>
        <Navbar
          contactEmail={config.contactEmail}
          contactPhone={config.contactPhone}
          productsMenu={config.productsMenu}
          technologiesMenu={config.technologiesMenu}
          aboutMenu={config.aboutMenu}
          technologiesImageUrl={config.technologiesImageUrl}
          aboutImageUrl={config.aboutImageUrl}
        />
      </div>
    </header>
  );
}
