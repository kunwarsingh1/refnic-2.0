"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DESIGN_WIDTH = 1764.7;
const DESIGN_HEIGHT = 10380;

function Img({ alt, ...rest }: ComponentProps<typeof Image> & { src?: string }) {
  if (!rest.src) return null;
  return <Image alt={alt ?? ""} {...rest} />;
}

const Investors: NextPage = () => {
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

      <div className="w-screen overflow-hidden bg-[#161518]" style={{ height: DESIGN_HEIGHT * scale }}>
        <div
          className="relative h-[10380px] w-[1764.7px] overflow-hidden text-left text-[21.64px] text-[#ebebeb] font-sans"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <div className="absolute h-[33.31%] w-[109.32%] top-[-0.24%] right-[-4.43%] bottom-[66.93%] left-[-4.89%] rounded-[6px] bg-[linear-gradient(180deg,#000,rgba(0,0,0,0))] opacity-[0.78] shrink-0" />
          <div className="absolute top-[181px] left-[544px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[626px] h-[632px] opacity-30 shrink-0" />
          <Img className="absolute top-[-162px] left-2 w-[1764.7px] h-[2594px] shrink-0" src="" width={1764.7} height={2594} sizes="100vw" alt="" />
          <Img className="absolute top-[2432px] left-2 w-[1764.7px] h-[2594px] opacity-20 shrink-0" src="" width={1764.7} height={2594} sizes="100vw" alt="" />
          <div className="absolute top-[667px] left-[calc(50%_-_308px)] leading-[32.46px] text-white text-center inline-block w-[592px] h-16 shrink-0">
            Positioned at the intersection of industrial innovation, critical minerals, and the global circular economy.
          </div>
          <Img className="absolute top-[5026px] left-[7px] w-[1765.7px] h-[5188px] shrink-0" src="" width={1765.7} height={5188} sizes="100vw" alt="" />
          <b className="absolute top-[295px] left-[calc(50%_-_338px)] text-[165.35px] leading-[100%] inline-block text-[#f8f8f8] text-center w-[676px] shrink-0">
            Why Refnic?
          </b>
          <b className="absolute top-[1159px] left-[1060px] text-[64px] leading-[100%] inline-block text-right w-[467px] shrink-0">
            An Expanding Market
          </b>
          <div className="absolute top-[1575px] left-[1093px] leading-[32.46px] text-white text-right inline-block w-[438px] h-[183px] shrink-0">
            Global demand for critical minerals, battery recycling, urban mining, and sustainable metal recovery
            continues to accelerate, driven by electrification and circular economy policies.
          </div>
          <div className="absolute top-[2672px] left-[241px] leading-[32.46px] text-white inline-block w-[658px] h-[357px] shrink-0">
            Most industrial recycling projects rely on a fragmented ecosystem of equipment vendors, process consultants,
            EPC contractors, and service providers, often leading to higher costs, longer timelines, and increased
            execution risk. Refnic brings every critical capability together under one integrated platform—from
            machinery manufacturing and process engineering to turnkey plant execution, commissioning, automation, and
            long-term operational support. This unified approach simplifies project delivery, improves accountability,
            accelerates commercialization, and creates lasting value for customers while establishing a scalable and
            differentiated business model.
          </div>
          <div className="absolute top-[4009px] left-[1036px] text-[20px] leading-[32.46px] text-white text-right inline-block w-[495px] h-[124px] shrink-0">
            Our equipment is engineered and manufactured in India, reducing import dependency while delivering globally
            competitive industrial solutions.
          </div>
          <Img className="absolute top-[1245px] left-[209px] w-[285px] h-[330px] shrink-0" src="" width={285} height={330} sizes="100vw" alt="" />
          <b className="absolute top-[2240px] left-[239px] text-[64px] leading-[100%] inline-block w-[467px] shrink-0">
            The Turnkey Advantage
          </b>
          <b className="absolute top-[4567px] left-[235px] text-[64px] leading-[100%] inline-block w-[467px] shrink-0">
            Multiple Revenue Streams
          </b>
          <b className="absolute top-[3540px] left-[1094px] text-[64px] leading-[100%] inline-block text-right w-[438px] h-[144px] shrink-0">
            Indigenous Technology
          </b>
          <Img className="absolute top-[4713px] left-[1261px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <Img className="absolute top-[3634px] left-[305px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <Img className="absolute top-[6926px] left-[1248px] w-[283px] h-[277px] shrink-0" src="" width={283} height={277} sizes="100vw" alt="" />
          <Img className="absolute top-[9455px] left-[741px] w-[283px] h-[277px] shrink-0" src="" width={283} height={277} sizes="100vw" alt="" />
          <Img className="absolute top-[5734px] left-[267px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <Img className="absolute top-[2488px] left-[1235px] w-[240px] h-[241.1px] shrink-0" src="" width={240} height={241.1} sizes="100vw" alt="" />
          <div className="absolute top-[6116px] left-[1079px] leading-[32.46px] text-white text-right inline-block w-[441px] h-[162px] shrink-0">
            Our modular engineering approach allows technologies to be deployed across battery recycling, e-waste, metal
            refining, industrial waste processing, and future resource recovery sectors.
          </div>
          <b className="absolute top-[6801px] left-[235px] text-[64px] leading-[100%] inline-block w-[438px] h-[144px] shrink-0">
            Sustainability by Design
          </b>
          <b className="absolute top-[932px] left-[1347px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">01</b>
          <b className="absolute top-[2007px] left-[244px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">02</b>
          <b className="absolute top-[3307px] left-[1316px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">03</b>
          <b className="absolute top-[4393px] left-[230px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">04</b>
          <div className="absolute top-[3218px] left-[1367px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[936px] h-[945px] opacity-30 shrink-0" />
          <b className="absolute top-[5483px] left-[1312px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">05</b>
          <b className="absolute top-[6553px] left-[235px] text-[165.35px] leading-[100%] text-[#f8f8f8] text-center opacity-20 shrink-0">06</b>
          <div className="absolute top-[5074px] left-[239px] leading-[32.46px] text-white inline-block w-[536px] h-[129px] shrink-0">
            Revenue is generated through turnkey plant projects, equipment sales, engineering services, plant
            modernization, technical support, spare parts, consumables, and future technology licensing.
          </div>
          <b className="absolute top-[5720px] left-[1184px] text-[64px] leading-[100%] inline-block text-right w-[340px] shrink-0">
            Built for Scale
          </b>
          <div className="absolute top-[7220px] left-[235px] leading-[32.46px] text-white inline-block w-[485px] h-[140px] shrink-0">
            Zero Liquid Discharge process design, optimized resource utilization, and higher recovery efficiencies
            support environmentally responsible industrial growth.
          </div>
          <b className="absolute top-[7653px] left-[calc(50%_-_177px)] text-[64px] leading-[100%] inline-block w-[354px] h-[58px] shrink-0">
            Why Now?
          </b>
          <Img className="absolute top-[7839px] left-[188px] w-[427px] h-[435px] opacity-[0.61] shrink-0" src="" width={427} height={435} sizes="100vw" alt="" />
          <Img className="absolute top-[7839px] left-[669px] w-[427px] h-[435px] opacity-[0.61] shrink-0" src="" width={427} height={435} sizes="100vw" alt="" />
          <Img className="absolute top-[8308px] left-[188px] w-[427px] h-[435px] opacity-[0.61] shrink-0" src="" width={427} height={435} sizes="100vw" alt="" />
          <Img className="absolute top-[8308px] left-[669px] w-[427px] h-[435px] opacity-[0.61] shrink-0" src="" width={427} height={435} sizes="100vw" alt="" />
          <Img className="absolute top-[8308px] left-[1150px] w-[427px] h-[435px] opacity-[0.61] shrink-0" src="" width={427} height={435} sizes="100vw" alt="" />
          <Img className="absolute top-[7839px] left-[1150px] w-[427px] h-[435px] opacity-[0.61] shrink-0" src="" width={427} height={435} sizes="100vw" alt="" />
          <div className="absolute top-[8171px] left-[229px] text-[26px] leading-[100%] inline-block w-[354px] h-[70px] shrink-0">
            Governments are prioritizing critical mineral security.
          </div>
          <div className="absolute top-[8171px] left-[716px] text-[26px] leading-[100%] inline-block w-[340px] h-14 shrink-0">
            Manufacturers are investing in circular supply chains.
          </div>
          <div className="absolute top-[8620px] left-[234px] text-[26px] leading-[100%] inline-block w-[340px] h-[81px] shrink-0">
            Industries need integrated engineering partners not fragmented vendors.
          </div>
          <div className="absolute top-[8623px] left-[716px] text-[26px] leading-[100%] inline-block w-[340px] h-[78px] shrink-0">
            Refnic is positioned at the intersection of these long-term trends.
          </div>
          <div className="absolute top-[8640px] left-[1197px] text-[26px] leading-[100%] inline-block w-[340px] h-14 shrink-0">
            Manufacturers are investing in circular supply chains.
          </div>
          <div className="absolute top-[8170px] left-[1190px] text-[26px] leading-[100%] inline-block w-[362px] shrink-0">
            Battery and electronic waste volumes are growing rapidly.
          </div>
          <Img className="absolute top-[10214px] left-[7px] w-[1764.7px] h-[2594px] opacity-20 shrink-0" src="" width={1764.7} height={2594} sizes="100vw" alt="" />
          <div className="absolute top-[9471px] left-[1254px] leading-[32.46px] text-white text-right inline-block w-[315px] h-[97px] shrink-0">
            Building the World&apos;s Most Trusted Engineering Company for Resource Recovery.
          </div>
          <div className="absolute top-[9720px] left-[239px] leading-[32.46px] text-white inline-block w-[508px] h-[160px] shrink-0">
            Our ambition extends beyond supplying machinery. We are building the engineering platform that enables
            industries worldwide to recover valuable materials, reduce waste, and accelerate the transition to a
            circular economy.
          </div>
          <b className="absolute top-[9094px] left-[calc(50%_-_371px)] text-[206.86px] leading-[100%] inline-block bg-[linear-gradient(0deg,#232323,#919191_54.33%,#fffefe)] bg-clip-text text-transparent w-[743px] h-[181px] shrink-0">
            VISION
          </b>
          <div className="absolute top-[1633px] left-[-556px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[908px] h-[917px] opacity-30 shrink-0" />
          <div className="absolute top-[4473px] left-[-634px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[936px] h-[945px] opacity-30 shrink-0" />
          <div className="absolute top-[5648px] left-[1395px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[936px] h-[945px] opacity-30 shrink-0" />
          <div className="absolute top-[6669px] left-[-549px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[936px] h-[945px] opacity-30 shrink-0" />
          <div className="absolute top-[9260px] left-[555px] blur-[360px] rounded-full bg-[#3152df] border border-black box-border w-[595px] h-[601px] opacity-30 shrink-0" />
          <b className="absolute top-[10181px] left-[calc(50%_-_263px)] text-[36px] leading-[100%] inline-block text-center w-[526px] h-[97px] shrink-0">
            Partner in Building the Future of Industrial Sustainability.
          </b>
          <Link
            href="/#contact"
            className="absolute top-[10317px] left-[calc(50%_-_78px)] rounded-[8px] bg-[#1b37b0] flex items-start shrink-0 text-[18.42px] text-[#f4f4f4]"
          >
            <div className="rounded-[6.91px] bg-[#3152df] flex items-start px-[27.6px] py-[18.4px]">
              <b className="relative leading-[20.72px]">Contact Us</b>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Investors;
