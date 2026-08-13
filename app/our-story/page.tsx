"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DESIGN_WIDTH = 1764.7;
const DESIGN_HEIGHT = 9561;

function Img({ alt, ...rest }: ComponentProps<typeof Image> & { src?: string }) {
  if (!rest.src) return null;
  return <Image alt={alt ?? ""} {...rest} />;
}

const OurStory: NextPage = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / DESIGN_WIDTH));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <div className="bg-navy-950">
        <header className="mt-4 md:mt-6">
          <div className="mx-auto max-w-[90rem] bg-white">
            <Navbar />
          </div>
        </header>
      </div>

      <div className="w-full overflow-hidden bg-[#161518]" style={{ height: DESIGN_HEIGHT * scale }}>
        <div
          className="relative h-[9561px] w-[1764.7px] overflow-hidden text-left text-[165.35px] text-white font-sans"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <div className="absolute h-[46.76%] w-[109.32%] top-[-0.34%] right-[-4.43%] bottom-[53.58%] left-[-4.89%] rounded-[6px] bg-[linear-gradient(180deg,#000,rgba(0,0,0,0))] opacity-[0.78] shrink-0" />
          <Img className="absolute top-[-162px] left-2 w-[1764.7px] h-[2594px] shrink-0" src="" width={1764.7} height={2594} sizes="100vw" alt="" />
          <Img className="absolute top-[2432px] left-2 w-[1764.7px] h-[2594px] opacity-20 shrink-0" src="" width={1764.7} height={2594} sizes="100vw" alt="" />
          <div className="absolute top-[3129px] left-[1396px] w-[100px] h-[100px] overflow-hidden shrink-0" />
          <div className="absolute top-[713px] left-[calc(50%_-_129px)] text-[21.64px] leading-[32.46px] text-center inline-block w-[258px] h-16 shrink-0">
            Engineering the Future of Resource Recovery.
          </div>
          <div className="absolute top-[1308px] left-[243px] text-[20px] leading-[32.46px] inline-block w-[438px] h-[227px] shrink-0">
            The recycling industry wasn&apos;t short of equipment it was short of integration. Businesses had to coordinate
            multiple vendors for machinery, process design, engineering, compliance, commissioning, and operations. The
            result was complexity, delays, and unnecessary execution risk.
          </div>
          <div className="absolute top-[3495px] left-[243px] text-[20px] leading-[32.46px] inline-block w-[490px] h-[227px] shrink-0">
            Every Refnic system is developed with a focus on precision, reliability, and long-term industrial
            performance. Our commitment to indigenous manufacturing reduces dependency on imports while delivering
            solutions tailored to modern recycling industries.
          </div>
          <div className="absolute top-[5652px] left-[242px] text-[20px] leading-[32.46px] inline-block w-[484px] h-[194px] shrink-0">
            Every Refnic system is developed with a focus on precision, reliability, and long-term industrial
            performance. Our commitment to indigenous manufacturing reduces dependency on imports while delivering
            solutions tailored to modern recycling industries.
          </div>
          <div className="absolute top-[6799px] left-[1049px] text-[20px] leading-[32.46px] text-right inline-block w-[481px] h-[127px] shrink-0">
            From indigenous engineering to zero-liquid-discharge process design, every project contributes to a more
            resilient manufacturing ecosystem and a cleaner industrial future.
          </div>
          <div className="absolute top-[8246px] left-[400px] text-[21.64px] leading-[32.46px] text-center inline-block w-[938px] h-[67px] shrink-0">
            Our story isn&apos;t measured by the number of machines we&apos;ve built. It&apos;s measured by the industries
            we&apos;ve enabled, the resources we&apos;ve recovered, and the future we&apos;re engineering.
          </div>
          <div className="absolute top-[2432px] left-[1069px] text-[20px] leading-[32.46px] text-right inline-block w-[450px] h-[227px] shrink-0">
            Instead of supplying individual machines, we built an engineering platform. One company. One responsibility.
            From process engineering and indigenous machinery to complete turnkey recycling plants.
          </div>
          <div className="absolute top-[4600px] left-[1052px] text-[20px] leading-[32.46px] text-right inline-block w-[475px] h-[162px] shrink-0">
            Our technologies recover valuable metals from complex waste streams, helping industries transform discarded
            materials into resources that power batteries, electronics, and the next generation of manufacturing.
          </div>
          <Img className="absolute top-[5026px] left-[7px] w-[1765.7px] h-[5188px] shrink-0" src="" width={1765.7} height={5188} sizes="100vw" alt="" />
          <div className="absolute top-[77px] left-[1005px] rounded-[2.5px] bg-[#1b37b0] w-20 h-[5px] shrink-0" />
          <div className="absolute top-[230px] left-[543px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
          <b className="absolute top-[326px] left-[calc(50%_-_221px)] leading-[100%] text-[#f8f8f8] text-center inline-block w-[467px] shrink-0">
            Our<br />Story{" "}
          </b>
          <b className="absolute top-[940px] left-[1348px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">01</b>
          <b className="absolute top-[3097px] left-[1317px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">03</b>
          <b className="absolute top-[2003px] left-[235px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">02</b>
          <b className="absolute top-[4178px] left-[228px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">04</b>
          <b className="absolute top-[5268px] left-[1312px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">05</b>
          <b className="absolute top-[6341px] left-[235px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">06</b>
          <Img className="absolute top-[1704px] left-[1307px] w-[240px] h-[330px] shrink-0" src="" width={240} height={330} sizes="100vw" alt="" />
          <Img className="absolute top-[2755px] left-[126px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <Img className="absolute top-[3899px] left-[1376px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <Img className="absolute top-[7409px] left-[450px] w-[674px] h-[677.2px] shrink-0" src="" width={674} height={677.2} sizes="100vw" alt="" />
          <Img className="absolute top-[4977px] left-[101px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <Img className="absolute top-[5976px] left-[1291px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <Img className="absolute top-[7045px] left-[159px] w-[280px] h-[287px] shrink-0" src="" width={280} height={287} sizes="100vw" alt="" />
          <b className="absolute top-[1177px] left-[1056px] text-[64px] leading-[100%] text-[#ebebeb] text-right inline-block w-[467px] shrink-0">
            It Started With a Problem.
          </b>
          <b className="absolute top-[3277px] left-[1052px] text-[64px] leading-[100%] text-[#ebebeb] text-right inline-block w-[467px] shrink-0">
            Designed. Engineered. Manufactured.
          </b>
          <b className="absolute top-[2236px] left-[243px] text-[64px] leading-[100%] text-[#ebebeb] inline-block w-[467px] shrink-0">
            So We Built the Missing Piece.
          </b>
          <div className="absolute top-[7598px] left-[766px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
          <b className="absolute top-[4358px] left-[235px] text-[64px] leading-[100%] text-[#ebebeb] inline-block w-[467px] shrink-0">
            Turning Waste Into Critical Resources.
          </b>
          <b className="absolute top-[5444px] left-[1053px] text-[64px] leading-[100%] text-[#ebebeb] text-right inline-block w-[467px] shrink-0">
            Engineering Beyond Delivery.
          </b>
          <b className="absolute top-[6516px] left-[236px] text-[64px] leading-[100%] text-[#ebebeb] inline-block w-[467px] shrink-0">
            Building India&apos;s Circular Future.
          </b>
          <div className="absolute top-[3059px] left-[1446px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
          <div className="absolute top-[4090px] left-[-212px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
          <div className="absolute top-[6240px] left-[-320px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
          <div className="absolute top-[1944px] left-[-175px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
          <div className="absolute top-[8369px] left-[766px] rounded-[8px] bg-[#1b37b0] flex items-start shrink-0 text-[18.42px] text-[#f4f4f4]">
            <div className="rounded-[6.91px] bg-[#3152df] flex items-start px-[27.6px] py-[18.4px]">
              <Link href="/#contact" className="relative leading-[20.72px] text-[#f4f4f4]">
                View Case Study
              </Link>
            </div>
          </div>
          <div className="absolute top-[5250px] left-[1423px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OurStory;
