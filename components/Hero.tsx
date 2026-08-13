import { Button } from "./ui/primitives";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-8 md:pb-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative mx-auto max-w-[90rem]">
        <img
          src="/white_stone.png"
          alt=""
          className="absolute left-0 top-1/2 z-20 w-80 -translate-x-[10%] -translate-y-[70%] rotate-[0deg] object-contain md:w-96"
        />
        <img
          src="/blur_stone.png"
          alt=""
          className="absolute right-0 top-1/2 z-20 w-56 translate-x-[30%] -translate-y-[90%] rotate-[150deg] -scale-x-100 object-contain md:w-72"
        />
        <img
          src="/blue_blur.png"
          alt=""
          className="absolute bottom-0 left-0 z-20 w-48 -translate-x-[35%] object-contain md:w-56"
        />
        <img
          src="/blue_stone.png"
          alt=""
          className="absolute bottom-0 right-0 z-20 w-56 translate-x-[20%] translate-y-[20%] object-contain md:w-72"
        />
        

        <div className="relative z-10 rounded-b-[2.5rem] bg-white px-6 py-16 text-center md:px-14 md:py-24">
          <h1 className="group font-display font-bold leading-[0.95] tracking-[-0.015em] text-black [font-family:Anton,Archivo_Black,var(--font-display)]">
            <span className="relative block text-[23vw] md:text-[12rem]">
              <span className="block transition-opacity duration-300 ease-out group-hover:opacity-0">REFINE</span>
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">REFNIC</span>
            </span>
            <span className="relative block text-center text-[16vw] md:text-[8rem]">
              <span className="block transition-opacity duration-300 ease-out group-hover:opacity-0">NICELY</span>
              <span className="absolute inset-0 text-center opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:scale-105 group-hover:opacity-100">NC</span>
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
