"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./index.module.css";

const DESIGN_WIDTH = 1764.7;
const DESIGN_HEIGHT = 9050;

function Img(props: Omit<ComponentProps<typeof Image>, "src"> & { src?: string }) {
  if (!props.src) return null;
  const { src, ...rest } = props;
  return <Image {...rest} src={src} />;
}

const GlobalMarket: React.FC = () => {
  return (
    <div className={styles.globalMarket}>
      <div className={styles.globalMarketChild} />
      <div className={styles.globalMarketInner} />
      <Img className={styles.groupIcon} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.globalMarketChild2} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.rectangleIcon} width={427} height={435} sizes="100vw" alt="" />
      <Img className={styles.globalMarketChild3} width={427} height={435} sizes="100vw" alt="" />
      <Img className={styles.globalMarketChild4} width={427} height={435} sizes="100vw" alt="" />
      <b className={styles.electrification}>Electrification</b>
      <b className={styles.criticalMineralSecurity}>Critical Mineral Security</b>
      <b className={styles.circularManufacturing}>Circular Manufacturing</b>
      <div className={styles.theFutureWill}>The Future Will Be Built on Recovered Materials</div>
      <div className={styles.theRapidAdoption}>The rapid adoption of electric vehicles and energy storage systems is increasing the need for battery recycling and critical material recovery.</div>
      <div className={styles.businessesAreIncreasingly}>Businesses are increasingly recovering valuable resources instead of relying solely on virgin raw materials.</div>
      <div className={styles.manufacturersAreShifting}>Manufacturers are shifting from linear production models toward circular supply chains where materials are recovered and reused.</div>
      <Img className={styles.globalMarketChild5} width={1765.7} height={5188} sizes="100vw" alt="" />
      <div className={styles.rectangleDiv} />
      <div className={styles.asDemandFor}>As demand for critical materials accelerates worldwide, advanced recycling and metal refining are becoming the backbone of sustainable industrial growth.</div>
      <b className={styles.transformingWasteInto}>Transforming Waste Into Global Value</b>
      <b className={styles.aGlobalShift}>A Global Shift Is Underway</b>
      <b className={styles.builtInIndia}>Built in India. Designed for Global Industry.</b>
      <b className={styles.ourCompetitiveAdvantage}>Our Competitive Advantage</b>
      <b className={styles.globalMarketDrivers}>Global Market Drivers</b>
      <b className={styles.marketsWeEnable}>Markets We Enable</b>
      <b className={styles.whyItMatters}>Why It Matters</b>
      <div className={styles.theGlobalTransition}>The global transition to electric mobility, renewable energy, advanced electronics, and sustainable manufacturing is driving unprecedented demand for critical minerals. As natural resources become increasingly constrained, recycling and metal refining have emerged as essential industries for securing future material supply.<br /><br />Refnic is building the engineering capabilities that enable industries to recover, refine, and reuse valuable materials through world-class process engineering and indigenous manufacturing.</div>
      <div className={styles.theNextGeneration}>The next generation of manufacturing will rely not only on mining new resources but also on recovering valuable materials already in circulation. Efficient recycling infrastructure is becoming a strategic necessity for industries and nations alike.</div>
      <div className={styles.refnicDevelopsEngineering}>Refnic develops engineering solutions that combine indigenous manufacturing, advanced process design, and turnkey execution. Our technologies are designed to meet international industrial standards while remaining adaptable to diverse feedstocks, operating conditions, and project requirements.</div>
      <div className={styles.asIndustriesAround}>As industries around the world accelerate their transition toward sustainable manufacturing, Refnic aims to become a trusted engineering partner for advanced recycling and metal refining projects across global markets.</div>
      <div className={styles.whetherEnablingNew}>Whether enabling new recycling ventures or modernizing existing facilities, Refnic delivers the technology, engineering, and execution required to build the next generation of resource recovery infrastructure.</div>
      <Img className={styles.globalMarketChild6} width={501} height={505.9} sizes="100vw" alt="" />
      <Img className={styles.globalMarketChild7} width={512} height={423.4} sizes="100vw" alt="" />
      <Img className={styles.globalMarketChild8} width={512} height={423.4} sizes="100vw" alt="" />
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <b className={styles.batteryRecycling}>Battery Recycling</b>
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.frameChild} />
        <b className={styles.eWasteRecycling}>E-Waste Recycling</b>
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.frameChild} />
        <b className={styles.eWasteRecycling}>{`Mining & Secondary Resources`}</b>
      </div>
      <div className={styles.frameDiv}>
        <div className={styles.frameChild} />
        <b className={styles.eWasteRecycling}>Critical Minerals Processing</b>
      </div>
      <div className={styles.rectangleParent2}>
        <div className={styles.frameChild} />
        <b className={styles.eWasteRecycling}>Industrial Waste Recovery</b>
      </div>
      <div className={styles.rectangleParent3}>
        <div className={styles.frameChild} />
        <b className={styles.metalRefining}>Metal Refining</b>
      </div>
      <div className={styles.rectangleParent4}>
        <Img className={styles.frameChild5} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.integratedTurnkeyExecution}>Integrated Turnkey Execution</b>
        <div className={styles.fromFeasibilityStudies}>From feasibility studies and plant design to equipment manufacturing, commissioning, and long-term technical support.</div>
        <Img className={styles.frameChild6} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.rectangleParent5}>
        <Img className={styles.frameChild5} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.integratedTurnkeyExecution}>Indigenous Engineering</b>
        <div className={styles.purposeBuiltEquipmentDesign}>Purpose-built equipment designed and manufactured in India, reducing dependency on imported technologies.</div>
        <Img className={styles.frameChild6} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.rectangleParent6}>
        <Img className={styles.frameChild5} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.scalableSolutions}>Scalable Solutions</b>
        <div className={styles.modularSystemsEngineered}>Modular systems engineered for pilot plants, commercial facilities, and future capacity expansion.</div>
        <Img className={styles.frameChild6} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.rectangleParent7}>
        <Img className={styles.frameChild5} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.scalableSolutions}>Long-Term Partnership</b>
        <div className={styles.beyondPlantInstallation}>Beyond plant installation, we provide process optimization, operational support, upgrades, and continuous engineering assistance.</div>
        <Img className={styles.frameChild6} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <Img className={styles.globalMarketChild9} width={512} height={517.1} sizes="100vw" alt="" />
      <b className={styles.globalVision}>Global Vision</b>
      <b className={styles.engineeringTomorrowsResourc}>Engineering Tomorrow&apos;s Resource Recovery</b>
      <div className={styles.cta}>
        <div className={styles.buttonLogin}>
          <b className={styles.exploreOurTechnologies}>Explore Our Technologies →</b>
        </div>
      </div>
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
          <GlobalMarket />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
