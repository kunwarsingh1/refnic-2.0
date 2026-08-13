const stats = [
  { value: "20,000+", label: "Tonnes of Annual Recycling Capacity Enabled" },
  { value: "95%+", label: "Material Recovery Efficiency" },
  { value: "100%", label: "Indigenous Engineering" },
];

export default function StatsSection() {
  return (
    <section className="relative bg-navy-950 pt-12 pb-[150px] md:pt-16 md:pb-[345px]">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-6 overflow-visible">
        <div className="relative overflow-visible">
          {/* Changed from top-0 bottom-0 (strictly bound to this div)
              to an explicit height taller than the container, so it
              pokes past this div's own bottom edge and overflows into
              the connector/image section below. Increase the h-[...]
              value until it visually reaches the image. */}
          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-white/10"
            style={{ height: "calc(100% + 96px)" }}
            aria-hidden
          />

          <div className="absolute left-1/2 top-0 -translate-x-[60%] -translate-y-[55%]">
            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152df] opacity-40 blur-[100px]" aria-hidden />
              <img src="/battery.png" alt="" className="relative z-10 h-40 w-auto md:h-60" />
            </div>
          </div>

          {stats.map((s) => (
            <div
              key={s.label}
              className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-10 md:gap-10 md:py-12"
            >
              <p className="text-right font-display font-black text-4xl text-white md:text-6xl">{s.value}</p>
              <span className="size-3" aria-hidden />
              <p className="text-sm leading-relaxed text-white/60 md:text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto h-6 w-px bg-white/10 md:h-5" aria-hidden />

      {/* Positioned out of normal flow, starting exactly at the section's
          own bottom edge (top-full) and pulled back up by a fixed amount,
          so it straddles the boundary with the white section below without
          affecting this section's height or overlapping the stats above. */}
      <div className="absolute inset-x-0 top-full z-20 -translate-y-[130px] md:-translate-y-[308px]">
        <div className="relative mx-auto max-w-[960px] -translate-x-10 px-6 md:-translate-x-3">
          <div className="relative">
            <img
  src="/REFNIC PLANT STATS.png"
  alt="Refnic plant"
  className="relative aspect-[1200/600] w-full rounded-2xl object-cover"
  style={{ filter: "drop-shadow(0 0 50px black)" }}
/>
          </div>
        </div>
      </div>
    </section>
  );
}
