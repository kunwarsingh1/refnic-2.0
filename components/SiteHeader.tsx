import Navbar from "@/components/Navbar";
import { getNavbarConfig } from "@/lib/content/navbar";

export default async function SiteHeader({
  roundedBottom = true,
  bgClassName = "bg-black",
  showTopGlow = false,
}: {
  roundedBottom?: boolean;
  bgClassName?: string;
  showTopGlow?: boolean;
}) {
  const config = await getNavbarConfig();

  return (
    <div className="sticky top-0 z-50">
      {showTopGlow && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-white opacity-20 blur-[90px]"
          aria-hidden
        />
      )}
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
    </div>
  );
}
