import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { logout } from "@/app/actions/admin";

const NAV_SECTIONS: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Approvals",
    items: [{ label: "Pending Changes", href: "/admin/pending-changes" }],
  },
  {
    heading: "Content",
    items: [
      { label: "Products / Solutions / Services", href: "/admin/cards" },
      { label: "Case Studies", href: "/admin/case-studies" },
      { label: "Process Steps", href: "/admin/process-steps" },
      { label: "Stats", href: "/admin/stats" },
      { label: "Intro Cards", href: "/admin/intro-cards" },
      { label: "Pillars", href: "/admin/pillars" },
      { label: "Newsletter", href: "/admin/newsletter" },
      { label: "Newsletter Tabs", href: "/admin/newsletter-tabs" },
      { label: "Product Catalog", href: "/admin/product-catalog" },
      { label: "Product Categories", href: "/admin/product-categories" },
      { label: "Solutions Catalog", href: "/admin/solutions-catalog" },
      { label: "Services Catalog", href: "/admin/services-catalog" },
      { label: "Sustainability Catalog", href: "/admin/sustainability-catalog" },
      { label: "Resources Catalog", href: "/admin/resources-catalog" },
      { label: "Blog Posts", href: "/admin/blog" },
    ],
  },
  {
    heading: "Site Chrome",
    items: [
      { label: "Footer", href: "/admin/footer" },
      { label: "Navbar", href: "/admin/navbar" },
    ],
  },
  {
    heading: "Pages",
    items: [
      { label: "Career", href: "/admin/career-page" },
      { label: "Case Study", href: "/admin/case-study-page" },
      { label: "Contact", href: "/admin/contact-page" },
      { label: "Global Market", href: "/admin/global-market-page" },
      { label: "Indian Market", href: "/admin/indian-market-page" },
      { label: "Investors", href: "/admin/investors-page" },
      { label: "Our Story", href: "/admin/our-story-page" },
      { label: "Sustainability", href: "/admin/sustainability-page" },
      { label: "Technologies", href: "/admin/technologies-page" },
      { label: "Products", href: "/admin/products-page" },
      { label: "Products Directory", href: "/admin/products-directory-page" },
      { label: "Services", href: "/admin/services-page" },
      { label: "Resources", href: "/admin/resources-page" },
      { label: "Digital Tools", href: "/admin/digital-tools-page" },
      { label: "White Papers", href: "/admin/white-papers-page" },
    ],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/login");

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-black">
        <div className="border-b border-white/10 px-5 py-5">
          <a href="/admin" className="font-sans text-lg font-bold text-white">
            Refnic <span className="text-accent-blue">CMS</span>
          </a>
        </div>

        <nav className="flex flex-col gap-6 px-3 py-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading}>
              <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-white/40">
                {section.heading}
              </p>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-2 py-1.5 text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <form action={logout} className="border-t border-white/10 px-5 py-4">
          <button type="submit" className="text-sm font-medium text-white/60 hover:text-white">
            Log out
          </button>
        </form>
      </aside>

      <main className="min-w-0 flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
