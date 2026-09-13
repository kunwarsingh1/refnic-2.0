import { Button } from "./ui/primitives";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black pb-8 md:min-h-0 md:block md:pb-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      {/* mobile: full-height left/right stone strips */}
      <img
        src="/Groupleft.png"
        alt=""
        className="absolute left-0 top-0 z-20 h-full w-auto -translate-x-[6%] object-contain object-left md:hidden"
      />
      <img
        src="/Groupright.png"
        alt=""
        className="absolute right-0 top-0 z-20 h-full w-auto object-contain object-right md:hidden"
      />

      {/* top-left dark rock — desktop only, direct child of the full-width section so it touches the true screen edge, not the inner max-w-[90rem] wrapper */}
      <img
        src="/white_stone.png"
        alt=""
        className="absolute left-0 top-1/2 z-20 hidden w-[clamp(9rem,32vw,24rem)] origin-center -translate-y-[70%] object-contain md:block"
      />

      <div className="relative mx-auto flex w-full flex-1 flex-col md:block md:max-w-[90rem]">
        {/* top-right silver/blue crystal — desktop only */}
        <img
          src="/blur_stone.png"
          alt=""
          className="absolute right-0 top-1/2 z-20 hidden w-[clamp(8rem,24vw,18rem)] origin-center translate-x-[30%] -translate-y-[90%] object-contain md:block"
        />
        {/* bottom-left blue crystal — desktop only */}
        <img
          src="/blue_blur.png"
          alt=""
          className="absolute left-0 bottom-0 z-20 hidden w-[clamp(8rem,19vw,14rem)] origin-center -translate-x-[35%] object-contain md:block"
        />
        {/* bottom-right dark rock — desktop only */}
        <img
  src="/blue_stone.png"
  alt=""
  style={{ filter: "drop-shadow(0 0 45px rgba(46, 75, 224, 0.85))" }}
  className="absolute right-0 bottom-0 z-20 hidden w-[clamp(10rem,30vw,23rem)] translate-x-[20%] translate-y-[28%] object-contain md:block"
/>

        <div className="relative z-10 mx-4 flex flex-1 flex-col items-center justify-center rounded-b-[32px] bg-white px-6 py-24 text-center md:mx-0 md:block md:rounded-b-[2.5rem] md:px-14 md:py-24">
          <h1 className="group relative font-display font-bold leading-[0.95] tracking-[-0.015em] text-black">
            <span className="block text-[clamp(2.75rem,20vw,10rem)] transition-all duration-500 ease-out group-hover:translate-y-1/2 group-hover:opacity-0 md:text-[clamp(2.75rem,12vw,10rem)]">
              REFINE
            </span>
            <span className="block text-[clamp(2.75rem,20vw,10rem)] transition-all duration-500 ease-out group-hover:-translate-y-1/2 group-hover:opacity-0 md:text-[clamp(2.75rem,12vw,10rem)]">
              NICELY
            </span>
            <span className="pointer-events-none absolute inset-0 flex scale-90 items-center justify-center text-[clamp(2.75rem,20vw,10rem)] opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 md:text-[clamp(2.75rem,12vw,10rem)]">
              REFNIC
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-[220px] text-sm font-normal leading-[18px] text-gray-500 md:mt-8 md:max-w-xl md:text-lg md:leading-relaxed">
            Engineering the technologies that transform industrial waste into
            critical materials powering a cleaner, circular future through
            indigenous innovation.
          </p>

          <div className="mt-14 flex justify-center md:mt-10">
            <Button href="/products">Explore Our Solution</Button>
          </div>
        </div>
      </div>
    </section>
  );
}