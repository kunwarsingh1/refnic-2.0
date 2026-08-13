"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./index.module.css";

const DESIGN_WIDTH = 1764.7;
const DESIGN_HEIGHT = 4880;

function Img(props: Omit<ComponentProps<typeof Image>, "src"> & { src?: string }) {
  if (!props.src) return null;
  const { src, ...rest } = props;
  return <Image {...rest} src={src} />;
}

const Impact = () => {
  return (
    <div className={styles.sustainabilityImpact}>
      <div className={styles.sustainabilityImpactChild} />
      <div className={styles.sustainabilityImpactInner} />
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <Img className={styles.groupIcon} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.sustainabilityImpactChild2} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.sustainabilityImpactChild3} width={1765.7} height={5188} sizes="100vw" alt="" />
      <div className={styles.rectangleDiv} />
      <div className={styles.refnicEnablesIndustries}>Refnic enables industries to recover valuable materials from end-of-life batteries, e-waste and other complex waste streams reducing waste, conserving resources and building the infrastructure for a more circular economy.</div>
      <b className={styles.turningWasteInto}>Turning Waste Into Measurable Impact</b>
      <b className={styles.wasteToResource}>Waste to Resource</b>
      <div className={styles.ifYourePassionate}>If you’re passionate about solving industrial challenges and building technologies that matter, we’d love to hear from you.</div>
      <Img className={styles.sustainabilityImpactChild4} width={512} height={517.1} sizes="100vw" alt="" />
      <div className={styles.cta}>
        <div className={styles.buttonLogin}>
          <b className={styles.viewOpenPositions}>View Open Positions</b>
        </div>
      </div>
      <div className={styles.cta2}>
        <div className={styles.buttonLogin}>
          <b className={styles.exploreOurImpact}>Explore Our Impact</b>
        </div>
      </div>
      <div className={styles.sustainabilityImpactChild5} />
      <div className={styles.vectorParent}>
        <Img className={styles.frameChild} width={427} height={720} sizes="100vw" alt="" />
        <b className={styles.wasteDiverted}>Waste Diverted</b>
        <Img className={styles.topIcon} width={221} height={223.2} sizes="100vw" alt="" />
        <div className={styles.completeHydrometallurgicalPr}>Complete hydrometallurgical process solutions for extracting, refining, and producing high-purity critical metals from recycled materials.</div>
        <div className={styles.cta3}>
          <div className={styles.buttonLogin}>
            <b className={styles.exploreOurImpact}>Veiw</b>
          </div>
        </div>
      </div>
      <div className={styles.vectorGroup}>
        <Img className={styles.frameChild} width={427} height={720} sizes="100vw" alt="" />
        <b className={styles.materialsRecovered}>Materials Recovered</b>
        <Img className={styles.topIcon} width={221} height={223.2} sizes="100vw" alt="" />
        <div className={styles.recoveringValuableMetals}>Recovering valuable metals and materials that can return to productive use instead of being lost as waste.</div>
        <div className={styles.cta3}>
          <div className={styles.buttonLogin}>
            <b className={styles.exploreOurImpact}>Veiw</b>
          </div>
        </div>
      </div>
      <div className={styles.vectorContainer}>
        <Img className={styles.frameChild} width={427} height={720} sizes="100vw" alt="" />
        <b className={styles.materialsRecovered}>Resources Conserved</b>
        <Img className={styles.topIcon} width={221} height={223.2} sizes="100vw" alt="" />
        <div className={styles.reducingTheNeed}>Reducing the need for virgin extraction by enabling recovery from secondary resources.</div>
        <div className={styles.cta3}>
          <div className={styles.buttonLogin}>
            <b className={styles.exploreOurImpact}>Veiw</b>
          </div>
        </div>
      </div>
      <b className={styles.theImpactWe}>The Impact We Create</b>
      <b className={styles.collect}>Collect</b>
      <b className={styles.refine}>Refine</b>
      <b className={styles.process}>Process</b>
      <b className={styles.recover}>Recover</b>
      <b className={styles.reuse}>Reuse</b>
      <Img className={styles.sustainabilityImpactChild6} width={213} height={50} sizes="100vw" alt="" />
      <Img className={styles.sustainabilityImpactChild7} width={213} height={50} sizes="100vw" alt="" />
      <Img className={styles.sustainabilityImpactChild8} width={51.6} height={191.2} sizes="100vw" alt="" />
      <Img className={styles.sustainabilityImpactChild9} width={51.6} height={191.2} sizes="100vw" alt="" />
      <div className={styles.refnicsSystemsAre}>Refnic’s systems are designed around one principle: waste should not be the end of a material’s life. Through mechanical processing, material recovery, hydrometallurgy and refining, we help transform complex waste streams into valuable secondary resources.</div>
      <b className={styles.ourApproach}>Our Approach</b>
      <b className={styles.ourApproach2}>Our Approach</b>
      <Img className={styles.rectangleIcon} width={427} height={435} sizes="100vw" alt="" />
      <Img className={styles.sustainabilityImpactChild10} width={427} height={435} sizes="100vw" alt="" />
      <Img className={styles.sustainabilityImpactChild11} width={427} height={435} sizes="100vw" alt="" />
      <b className={styles.designForRecovery}>Design for Recovery</b>
      <b className={styles.buildForScale}>Build for Scale</b>
      <b className={styles.measureWhatMatters}>Measure What Matters</b>
      <div className={styles.engineeringSystemsAround}>Engineering systems around efficient material separation and recovery.</div>
      <div className={styles.developingSolutionsThat}>Developing solutions that can grow from initial processing capacity to larger industrial operations.</div>
      <div className={styles.focusingOnMeasurable}>Focusing on measurable outcomes across material recovery, resource conservation and waste reduction.</div>
      <div className={styles.cta6}>
        <div className={styles.buttonLogin}>
          <b className={styles.exploreOurImpact}>Apply</b>
        </div>
      </div>
      <div className={styles.cta7}>
        <div className={styles.buttonLogin}>
          <b className={styles.exploreOurImpact}>Apply</b>
        </div>
      </div>
      <div className={styles.cta8}>
        <div className={styles.buttonLogin}>
          <b className={styles.exploreOurImpact}>Apply</b>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
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
          <Impact />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
