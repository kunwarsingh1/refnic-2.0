"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./index.module.css";

const DESIGN_WIDTH = 1764.7;
const DESIGN_HEIGHT = 3013;

function Img(props: Omit<ComponentProps<typeof Image>, "src"> & { src?: string }) {
  if (!props.src) return null;
  const { src, ...rest } = props;
  return <Image {...rest} src={src} />;
}

const Technologies: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState("Industry Reports");

  return (
    <div className={styles.whitePapers}>
      <div className={styles.whitePapersChild} />
      <div className={styles.whitePapersInner} />
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <Img className={styles.groupIcon} width={1764.7} height={2594} sizes="100vw" alt="" />
      <Img className={styles.whitePapersChild2} width={1764.7} height={2594} sizes="100vw" alt="" />
      <div className={styles.stayAheadWith}>
        Stay ahead with engineering breakthroughs, market trends, policy updates,
        case studies, and technology insights delivered by Refnic.
      </div>
      <div className={styles.marketTrendsInvestment}>
        Market trends, investment opportunities, government policies, and global
        recycling developments.
      </div>
      <Img className={styles.whitePapersChild3} width={1765.7} height={5188} sizes="100vw" alt="" />
      <b className={styles.industrialIntelligence}>Industrial Intelligence</b>
      <b className={styles.industryReports}>Industry Reports</b>
      <div className={styles.nav3}>
        <button
          type="button"
          className={`${styles.engineeringInsightsWrapper} ${activeTopic === "Engineering Insights" ? styles.topicActive : ""}`}
          onClick={() => setActiveTopic("Engineering Insights")}
        >
          <b className={styles.engineeringInsights}>Engineering Insights</b>
        </button>
        <button
          type="button"
          className={`${styles.engineeringInsightsWrapper} ${activeTopic === "Industry Reports" ? styles.topicActive : ""}`}
          onClick={() => setActiveTopic("Industry Reports")}
        >
          <b className={styles.industryReports2}>Industry Reports</b>
        </button>
        <button
          type="button"
          className={`${styles.engineeringInsightsWrapper} ${activeTopic === "Technology" ? styles.topicActive : ""}`}
          onClick={() => setActiveTopic("Technology")}
        >
          <b className={styles.engineeringInsights}>Technology</b>
        </button>
        <button
          type="button"
          className={`${styles.engineeringInsightsWrapper} ${activeTopic === "Sustainability" ? styles.topicActive : ""}`}
          onClick={() => setActiveTopic("Sustainability")}
        >
          <b className={styles.engineeringInsights}>Sustainability</b>
        </button>
        <button
          type="button"
          className={`${styles.engineeringInsightsWrapper} ${activeTopic === "Case Studies" ? styles.topicActive : ""}`}
          onClick={() => setActiveTopic("Case Studies")}
        >
          <b className={styles.engineeringInsights}>Case Studies</b>
        </button>
        <button
          type="button"
          className={`${styles.engineeringInsightsWrapper} ${activeTopic === "Company Updates" ? styles.topicActive : ""}`}
          onClick={() => setActiveTopic("Company Updates")}
        >
          <b className={styles.engineeringInsights}>Company Updates</b>
        </button>
      </div>
      <div className={styles.blogDiv}>
        <div className={styles.column1}>
          <div className={styles.image}>
            <div className={styles.imageChild} />
          </div>
          <div className={styles.contents}>
            <div className={styles.texts}>
              <div className={styles.titleDescription}>
                <b className={styles.lifestyle}>lifestyle</b>
                <b className={styles.theLatestNew}>New with Flowspark</b>
                <div className={styles.loremIpsumDolor}>
                  Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet
                  luctus venenatis elit ut aliquam, purus sit amet luctus
                  venenatis
                </div>
              </div>
              <div className={styles.imageName}>
                <div className={styles.imageNameChild} />
                <div className={styles.lailaBaharParent}>
                  <b className={styles.home}>Laila Bahar</b>
                  <div className={styles.sept282020}>Sept 28, 2020 - 6 mins read</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.column2}>
        <div className={styles.image}>
          <div className={styles.imageChild} />
        </div>
        <div className={styles.contents}>
          <div className={styles.texts2}>
            <div className={styles.titleDescription}>
              <b className={styles.lifestyle}>lifestyle</b>
              <b className={styles.theLatestNew}>The latest new with Flowspark</b>
              <div className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet
                luctus venenatis elit ut aliquam, purus sit amet luctus venenatis
              </div>
            </div>
            <div className={styles.imageName}>
              <div className={styles.imageNameChild} />
              <div className={styles.lailaBaharParent}>
                <b className={styles.home}>Laila Bahar</b>
                <div className={styles.sept282020}>Sept 28, 2020 - 6 mins read</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.column3}>
        <div className={styles.image}>
          <div className={styles.imageChild} />
        </div>
        <div className={styles.contents}>
          <div className={styles.texts2}>
            <div className={styles.titleDescription}>
              <b className={styles.lifestyle}>lifestyle</b>
              <b className={styles.theLatestNew}>The latest new with Flowspark</b>
              <div className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet
                luctus venenatis elit ut aliquam, purus sit amet luctus venenatis
              </div>
            </div>
            <div className={styles.imageName}>
              <div className={styles.imageNameChild} />
              <div className={styles.lailaBaharParent}>
                <b className={styles.home}>Laila Bahar</b>
                <div className={styles.sept282020}>Sept 28, 2020 - 6 mins read</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.column4}>
        <div className={styles.image}>
          <div className={styles.imageChild} />
        </div>
        <div className={styles.contents}>
          <div className={styles.texts2}>
            <div className={styles.titleDescription}>
              <b className={styles.lifestyle}>lifestyle</b>
              <b className={styles.theLatestNew}>The latest new with Flowspark</b>
              <div className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet
                luctus venenatis elit ut aliquam, purus sit amet luctus venenatis
              </div>
            </div>
            <div className={styles.imageName}>
              <div className={styles.imageNameChild} />
              <div className={styles.lailaBaharParent}>
                <b className={styles.home}>Laila Bahar</b>
                <div className={styles.sept282020}>Sept 28, 2020 - 6 mins read</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute left-1/2 flex w-[1000px] -translate-x-1/2 flex-row items-center justify-between gap-8 rounded-none border border-white/10 bg-transparent px-12 py-16"
        style={{ top: 2609 }}
      >
        <div className="flex flex-1 flex-col">
          <h2 className="font-sans text-[30px] font-bold leading-tight text-white">
            Stay Ahead of the Industry
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[#a0a0a8]">
            Get engineering insights, market intelligence, and the latest
            innovations in recycling and metal refining.
          </p>
          <form
            className="mt-5 flex items-center gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-72 rounded-lg border border-white/15 bg-[#16171c] px-4 py-3 font-sans text-sm text-white placeholder:text-[#6b6b73] focus:border-[#3b4fe4] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#3b4fe4] px-6 py-3 font-sans text-sm font-bold text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16171c]">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b6b73"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="M21 16l-5-5-4 4-3-3-6 6" />
          </svg>
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
          <Technologies />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
