export default function GlobalMarketVisionSection({ label, body }: { label: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-20 blur-[180px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="whitespace-pre-line font-display text-[40px] font-normal leading-tight text-[#EBEBEB]">
          {label}
        </h2>
        <p className="mx-auto mt-8 max-w-xl whitespace-pre-line text-[18px] font-light leading-relaxed text-white">{body}</p>
      </div>
    </section>
  );
}
