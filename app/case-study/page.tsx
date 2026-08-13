"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./index.module.css";

const DESIGN_WIDTH = 1764.7;
const DESIGN_HEIGHT = 6000;

function Img(props: Omit<ComponentProps<typeof Image>, "src"> & { src?: string }) {
  if (!props.src) return null;
  const { src, ...rest } = props;
  return <Image {...rest} src={src} />;
}

const CaseStudy: React.FC = () => {
  return (
    <div className={styles.caseStudy}>
      <div className={styles.caseStudyChild} />
      <div className={styles.caseStudyItem} />
      <div className={styles.caseStudyInner} />
      <div className={styles.ellipseDiv} />
      <Img className={styles.groupIcon} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.caseStudyChild2} width={1764.7} height={2594} sizes="100vw" alt="" />
      <div className={styles.everyPlantIs}>Every plant is more than an installation it&apos;s a case study in engineering, execution, and sustainable resource recovery.</div>
      <Img className={styles.caseStudyChild3} width={1765.7} height={5188} sizes="100vw" alt="" />
      <b className={styles.caseStudies}>{`Case `}<br />Studies </b>
      <div className={styles.rectangleParent}>
        <Img className={styles.frameChild} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.mumbai}>MUMBAI</b>
        <div className={styles.batteryRecyclingPlant}>Battery Recycling Plant</div>
        <div className={styles.turnkeyPlant}>Turnkey Plant</div>
        <div className={styles.cta}>
          <div className={styles.buttonLogin}>
            <b className={styles.viewCaseStudy}>View Case Study</b>
          </div>
        </div>
        <div className={styles.operationalParent}>
          <div className={styles.operational}>{`Operational `}</div>
          <div className={styles.groupChild} />
        </div>
        <Img className={styles.frameItem} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.rectangleGroup}>
        <Img className={styles.frameChild} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.mumbai}>MUMBAI</b>
        <div className={styles.batteryRecycling}>Battery Recycling</div>
        <div className={styles.turnkeyPlant}>Turnkey Plant</div>
        <div className={styles.cta}>
          <div className={styles.buttonLogin}>
            <b className={styles.viewCaseStudy}>View Case Study</b>
          </div>
        </div>
        <div className={styles.operationalParent}>
          <div className={styles.operational}>{`Operational `}</div>
          <div className={styles.groupChild} />
        </div>
        <Img className={styles.frameChild2} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.caseStudyChild5} />
      <div className={styles.rectangleContainer}>
        <Img className={styles.frameChild} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.mumbai}>MUMBAI</b>
        <div className={styles.batteryRecycling}>Battery Recycling</div>
        <div className={styles.turnkeyPlant}>Turnkey Plant</div>
        <div className={styles.cta}>
          <div className={styles.buttonLogin}>
            <b className={styles.viewCaseStudy}>View Case Study</b>
          </div>
        </div>
        <div className={styles.operationalParent}>
          <div className={styles.operational}>{`Operational `}</div>
          <div className={styles.groupChild} />
        </div>
        <Img className={styles.frameChild2} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <b className={styles.results}>RESULTS</b>
      <div className={styles.frameDiv}>
        <Img className={styles.frameChild} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.mumbai}>MUMBAI</b>
        <div className={styles.batteryRecycling}>Battery Recycling</div>
        <div className={styles.turnkeyPlant}>Turnkey Plant</div>
        <div className={styles.cta}>
          <div className={styles.buttonLogin}>
            <b className={styles.viewCaseStudy}>View Case Study</b>
          </div>
        </div>
        <div className={styles.operationalParent}>
          <div className={styles.operational}>{`Operational `}</div>
          <div className={styles.groupChild} />
        </div>
        <Img className={styles.frameChild2} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.caseStudyChild6} />
      <div className={styles.rectangleParent2}>
        <Img className={styles.frameChild} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.mumbai}>MUMBAI</b>
        <div className={styles.batteryRecycling}>Battery Recycling</div>
        <div className={styles.turnkeyPlant}>Turnkey Plant</div>
        <div className={styles.cta}>
          <div className={styles.buttonLogin}>
            <b className={styles.viewCaseStudy}>View Case Study</b>
          </div>
        </div>
        <div className={styles.operationalParent}>
          <div className={styles.operational}>{`Operational `}</div>
          <div className={styles.groupChild} />
        </div>
        <Img className={styles.frameChild2} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.rectangleParent3}>
        <Img className={styles.frameChild} width={1350} height={414} sizes="100vw" alt="" />
        <b className={styles.mumbai}>MUMBAI</b>
        <div className={styles.batteryRecycling}>Battery Recycling</div>
        <div className={styles.turnkeyPlant}>Turnkey Plant</div>
        <div className={styles.cta}>
          <div className={styles.buttonLogin}>
            <b className={styles.viewCaseStudy}>View Case Study</b>
          </div>
        </div>
        <div className={styles.operationalParent}>
          <div className={styles.operational}>{`Operational `}</div>
          <div className={styles.groupChild} />
        </div>
        <Img className={styles.frameChild2} width={304} height={307} sizes="100vw" alt="" />
      </div>
      <div className={styles.rectangleParent4}>
        <div className={styles.frameChild10} />
        <b className={styles.optimizedMaterialFlow}>Optimized Material Flow</b>
      </div>
      <div className={styles.rectangleParent5}>
        <div className={styles.frameChild10} />
        <b className={styles.reducedOperationalComplexity}>Reduced Operational Complexity</b>
      </div>
      <div className={styles.rectangleParent6}>
        <div className={styles.frameChild10} />
        <b className={styles.engineeredForHigh}>Engineered for High Recovery<br /></b>
      </div>
      <div className={styles.rectangleParent7}>
        <div className={styles.frameChild10} />
        <b className={styles.designedForFuture}>Designed for Future Expansion</b>
      </div>
      <b className={styles.refineNicely}>Refine <br />Nicely.</b>
      <div className={styles.rectangleParent8}>
        <div className={styles.frameChild10} />
        <b className={styles.designedForFuture}>Scalable Plant Architecture</b>
      </div>
      <div className={styles.rectangleParent9}>
        <div className={styles.frameChild10} />
        <b className={styles.commerciallyOperational}>Commercially Operational</b>
      </div>
      <Img className={styles.unsplashxtud5six464Icon} width={300} height={200} sizes="100vw" alt="" />
      <Img className={styles.unsplashcbh4d3l0ewmIcon} width={300} height={200} sizes="100vw" alt="" />
      <Img className={styles.unsplashd2zvqp3fproIcon} width={300} height={200} sizes="100vw" alt="" />
      <Img className={styles.unsplashpxozstdazeuIcon} width={300} height={200} sizes="100vw" alt="" />
      <Img className={styles.unsplash9z1krifpbtmIcon} width={300} height={200} sizes="100vw" alt="" />
      <Img className={styles.unsplash9ickpsq9g5qIcon} width={300} height={200} sizes="100vw" alt="" />
      <Img className={styles.unsplashx2tmfd1SgaIcon} width={300} height={200} sizes="100vw" alt="" />
      <Img className={styles.unsplashviem9bdzkfoIcon} width={300} height={200} sizes="100vw" alt="" />
      <div className={styles.cta7}>
        <div className={styles.buttonLogin}>
          <b className={styles.viewCaseStudy}>{`Get Quote `}</b>
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
          <CaseStudy />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
