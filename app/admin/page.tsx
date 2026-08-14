const SECTIONS = [
  { label: "Products / Solutions / Services", href: "/admin/cards" },
  { label: "Case Studies", href: "/admin/case-studies" },
  { label: "Process Steps", href: "/admin/process-steps" },
  { label: "Stats", href: "/admin/stats" },
  { label: "Intro Cards", href: "/admin/intro-cards" },
  { label: "Pillars", href: "/admin/pillars" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Footer", href: "/admin/footer" },
  { label: "Navbar", href: "/admin/navbar" },
  { label: "Case Study Page", href: "/admin/case-study-page" },
  { label: "Global Market Page", href: "/admin/global-market-page" },
  { label: "Indian Market Page", href: "/admin/indian-market-page" },
  { label: "Investors Page", href: "/admin/investors-page" },
  { label: "Our Story Page", href: "/admin/our-story-page" },
  { label: "Sustainability Page", href: "/admin/sustainability-page" },
  { label: "Technologies Page", href: "/admin/technologies-page" },
  { label: "Products Page", href: "/admin/products-page" },
];

export default function AdminIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">Pick a section to edit its content.</p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/85 transition-colors hover:border-accent-blue/50 hover:bg-white/[0.06]"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
