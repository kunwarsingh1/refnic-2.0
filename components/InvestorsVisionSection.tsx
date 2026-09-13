export default function InvestorsVisionSection({
  label,
  heading,
  body,
}: {
  label: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <p
          aria-hidden
          className="pointer-events-none select-none bg-clip-text text-center font-display text-[80px] font-bold leading-none text-transparent md:text-[206.86px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #F8F8F8 0%, #d8d8d8 35%, #bdbdbd 50%, #d8d8d8 65%, #F8F8F8 100%)",
          }}
        >
          {label}
        </p>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-md text-[21.64px] leading-[32.46px] text-white">{body}</p>
          <p className="max-w-sm text-right text-[21.64px] leading-[32.46px] text-white md:ml-auto">{heading}</p>
        </div>
      </div>
    </section>
  );
}
