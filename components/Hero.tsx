import { Button } from "./ui/primitives";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pb-8 md:pb-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative mx-auto max-w-[90rem]">
        <img
          src="/white_stone.png"
          alt=""
          className="absolute left-0 top-1/2 z-20 w-[clamp(9rem,32vw,24rem)] -translate-x-[10%] -translate-y-[70%] rotate-[0deg] object-contain"
        />
        <img
          src="/blur_stone.png"
          alt=""
          className="absolute right-0 top-1/2 z-20 w-[clamp(8rem,24vw,18rem)] translate-x-[30%] -translate-y-[90%] rotate-[150deg] -scale-x-100 object-contain"
        />
        <img
          src="/blue_blur.png"
          alt=""
          className="absolute bottom-0 left-0 z-20 w-[clamp(8rem,19vw,14rem)] -translate-x-[35%] object-contain"
        />
        <img
          src="/blue_stone.png"
          alt=""
          style={{ filter: "drop-shadow(0 0 45px rgba(46, 75, 224, 0.85))" }}
          className="absolute bottom-0 right-0 z-20 w-[clamp(10rem,30vw,23rem)] translate-x-[20%] translate-y-[28%] object-contain"
        />
        

        <div className="relative z-10 rounded-b-[2.5rem] bg-white px-6 py-16 text-center md:px-14 md:py-24">
          <h1 className="group relative font-display font-bold leading-[0.95] tracking-[-0.015em] text-black">
            <span className="block text-[clamp(2.75rem,12vw,10rem)] transition-all duration-500 ease-out group-hover:translate-y-1/2 group-hover:opacity-0">
              REFINE
            </span>
            <span className="block text-[clamp(2.75rem,12vw,10rem)] transition-all duration-500 ease-out group-hover:-translate-y-1/2 group-hover:opacity-0">
              NICELY
            </span>
            <span className="pointer-events-none absolute inset-0 flex scale-90 items-center justify-center text-[clamp(2.75rem,12vw,10rem)] opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
              REFNIC
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
            Engineering the technologies that transform industrial waste into
            critical materials powering a cleaner, circular future through
            indigenous innovation.
          </p>

          <div className="mt-10 flex justify-center">
            <Button href="/products">Explore Our Solution</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
