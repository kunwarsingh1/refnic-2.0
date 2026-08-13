"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./index.module.css";

const DESIGN_WIDTH = 1764.7;
const DESIGN_HEIGHT = 6300;

function Img(props: Omit<ComponentProps<typeof Image>, "src"> & { src?: string }) {
  if (!props.src) return null;
  const { src, ...rest } = props;
  return <Image {...rest} src={src} />;
}

const IndianMarket: React.FC = () => {
  return (
    <div className={styles.indianMarket}>
      <div className={styles.indianMarketChild} />
      <div className={styles.indianMarketInner} />
      <Img className={styles.groupIcon} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.indianMarketChild2} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.rectangleIcon} width={427} height={435} sizes="100vw" alt="" />
      <Img className={styles.indianMarketChild3} width={427} height={435} sizes="100vw" alt="" />
      <Img className={styles.indianMarketChild4} width={427} height={435} sizes="100vw" alt="" />
      <b className={styles.manufacturingGrowth}>Manufacturing Growth</b>
      <b className={styles.circularEconomy}>Circular Economy</b>
      <b className={styles.governmentPolicy}>Government Policy</b>
      <div className={styles.everyYearIndia}>Every Year India Generates</div>
      <div className={styles.engineeringBuiltIn}>Engineering Built in India, For India.</div>
      <div className={styles.batteryRecycling}>Battery Recycling</div>
      <div className={styles.eWasteRecycling}>E-Waste Recycling</div>
      <div className={styles.mining}>Mining</div>
      <div className={styles.metalRefining}>Metal Refining</div>
      <div className={styles.smelters}>Smelters</div>
      <div className={styles.chemicalProcessing}>Chemical Processing</div>
      <div className={styles.industrialWaste}>Industrial Waste</div>
      <div className={styles.criticalMinerals}>Critical Minerals</div>
      <div className={styles.indiasExpandingIndustrial}>India&apos;s expanding industrial base demands a secure and sustainable supply of critical materials.</div>
      <div className={styles.businessesAreIncreasingly}>Businesses are increasingly recovering valuable resources instead of relying solely on virgin raw materials.</div>
      <div className={styles.progressiveRegulationsAnd}>Progressive regulations and sustainability initiatives are accelerating investment in domestic recycling infrastructure.</div>
      <Img className={styles.indianMarketChild5} width={1765.7} height={5188} sizes="100vw" alt="" />
      <div className={styles.rectangleDiv} />
      <div className={styles.poweringTheTransition}>Powering the transition from waste to critical materials through indigenous engineering and advanced recycling infrastructure.</div>
      <b className={styles.indiasNextIndustrial}>India&apos;s Next Industrial Revolution.</b>
      <b className={styles.theOpportunity}>The Opportunity</b>
      <b className={styles.industriesWeServe}>Industries We Serve</b>
      <b className={styles.buildingIndiasRecycling}>Building India&apos;s Recycling Infrastructure.</b>
      <b className={styles.whatsDrivingIndias}>What&apos;s Driving India&apos;s Recycling Economy?</b>
      <b className={styles.indiasResourceChallenge}>India&apos;s Resource Challenge</b>
      <b className={styles.whyIndigenousTechnology}>Why Indigenous Technology Matters</b>
      <div className={styles.indiaIsEntering}>India is entering a defining phase of industrial growth. Rapid electrification, expanding manufacturing, increasing consumption, and stronger environmental regulations are driving unprecedented demand for recycling and metal refining infrastructure.<br />From lithium-ion batteries and e-waste to industrial residues and critical metals, the need for efficient resource recovery has never been greater.<br />Refnic is building the engineering foundation to support this transformation.</div>
      <div className={styles.ratherThanDepending}>Rather than depending on imported systems, India requires technologies designed around local feedstocks, operating conditions, regulations, and economics.<br />Refnic develops indigenous engineering solutions that reduce import dependency while improving accessibility, reliability, and long-term technical support for Indian industries.</div>
      <div className={styles.indiasTransitionTo}>India&apos;s transition to a circular economy requires more than machines it requires engineering expertise, scalable technology, and trusted execution. Refnic is committed to enabling industries with integrated solutions that transform waste into valuable resources while strengthening India&apos;s manufacturing future.</div>
      <Img className={styles.indianMarketChild6} width={501} height={505.9} sizes="100vw" alt="" />
      <Img className={styles.indianMarketChild7} width={512} height={423.4} sizes="100vw" alt="" />
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <b className={styles.millionsOfTonnes}>Millions of tonnes of industrial waste</b>
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.frameChild} />
        <b className={styles.millionsOfTonnes}>Millions of tonnes of electronic waste</b>
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.frameChild} />
        <b className={styles.rapidlyGrowingLithiumIon}>Rapidly growing lithium-ion battery waste</b>
      </div>
      <div className={styles.lineDiv} />
      <div className={styles.indianMarketChild8} />
    </div>
  );
};

const Page: React.FC = () => {
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
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <IndianMarket />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
