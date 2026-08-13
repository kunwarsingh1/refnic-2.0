"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Page: React.FC = () => {
  return (
    <>
      <div className="bg-navy-950">
        <header className="mt-4 md:mt-6">
          <div className="mx-auto max-w-[90rem] bg-white">
            <Navbar />
          </div>
        </header>
      </div>

      <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-[#161518]">
        <h1 className="pointer-events-none absolute z-0 select-none text-[20vw] font-bold uppercase leading-none text-white/10">
          Products
        </h1>
        <div className="relative z-10 h-72 w-[80%] max-w-4xl rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm" />
      </section>

      <Footer />
    </>
  );
};

export default Page;
