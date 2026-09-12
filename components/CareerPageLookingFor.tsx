export default function CareerPageLookingFor({
  heading,
  traits,
}: {
  heading: string;
  traits: { title: string; body: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-tight text-[#EBEBEB]">
          {heading}
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {traits.map((t, i) => (
            <div key={i} className="relative flex flex-col items-center px-4">
              <span
                className="pointer-events-none select-none font-display text-[clamp(6rem,16vw,13rem)] font-bold leading-none text-[#EBEBEB] opacity-10"
                aria-hidden
              >
                {i + 1}
              </span>
              {t.title.trim() || t.body.trim() ? (
                <div className="-mt-8">
                  {t.title.trim() && (
                    <p className="font-display text-xl font-bold text-[#EBEBEB]">{t.title}</p>
                  )}
                  {t.body.trim() && <p className="mt-2 text-white/80">{t.body}</p>}
                </div>
              ) : (
                <div className="-mt-8 rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm italic text-white/40">
                  Content needed for trait {i + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
