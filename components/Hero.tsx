import { Button } from "./ui/primitives";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pb-8 md:pb-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative mx-auto max-w-[90rem]">
        {/* top-left dark rock */}
        <img
          src="/white_stone.png"
          alt=""
          className="absolute left-0 top-[10%] z-20 w-[clamp(9rem,38vw,13rem)] -translate-x-[-25%] rotate-[-43deg] object-contain drop-shadow-md origin-[15%_85%] md:left-0 md:top-1/2 md:w-[clamp(9rem,32vw,24rem)] md:origin-center md:-translate-x-0 md:-translate-y-[70%] md:rotate-0 md:drop-shadow-none"
        />
        {/* top-right silver/blue crystal (mobile: sharp white stone, desktop: original blurred crystal) */}
        <img
          src="/white_stone.png"
          alt=""
          className="absolute right-20 top-[25%] z-20 w-[clamp(9rem,38vw,13rem)] translate-x-[-25%] rotate-[150deg] object-contain drop-shadow-md origin-[85%_85%] md:hidden"
        />
        <img
          src="/blur_stone.png"
          alt=""
          className="absolute right-0 top-1/2 z-20 hidden w-[clamp(8rem,24vw,18rem)] origin-center translate-x-[30%] -translate-y-[90%] object-contain md:block"
        />
        {/* bottom-left blue crystal (mobile: sharp blue stone, desktop: original blurred crystal) */}
        <img
          src="/blue_stone.png"
          alt=""
          className="absolute left-0 bottom-[-9%] z-20 w-[clamp(10rem,40vw,14rem)] -translate-x-[15%] rotate-[50deg] object-contain drop-shadow-md origin-[15%_15%] md:hidden"
        />
        <img
          src="/blue_blur.png"
          alt=""
          className="absolute left-0 bottom-0 z-20 hidden w-[clamp(8rem,19vw,14rem)] origin-center -translate-x-[35%] object-contain md:block"
        />
        {/* bottom-right dark rock */}
        <img
  src="/blue_stone.png"
  alt=""
  style={{ filter: "drop-shadow(0 0 45px rgba(46, 75, 224, 0.85))" }}
  className="absolute right-0 bottom-[10%] z-20 w-[clamp(11rem,42vw,15rem)] translate-x-[40%] rotate-[15deg] object-contain origin-[85%_15%] md:right-0 md:bottom-0 md:w-[clamp(10rem,30vw,23rem)] md:translate-x-[20%] md:translate-y-[28%] md:rotate-0"
/>

        <div className="relative z-10 mx-4 rounded-[32px] bg-white px-6 py-16 text-center md:mx-0 md:rounded-t-none md:rounded-b-[2.5rem] md:px-14 md:py-24">
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

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-gray-500 md:text-lg">
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