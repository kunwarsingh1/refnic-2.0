import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import PillarsSection from "@/components/PillarsSection";
import ProcessSection from "@/components/ProcessSection";
import StatsSection from "@/components/StatsSection";
import CaseStudySection from "@/components/CaseStudySection";
import CardGridSection from "@/components/CardGridSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getCards } from "@/lib/content/cards";
import { getCaseStudies } from "@/lib/content/caseStudies";
import { getProcessSteps } from "@/lib/content/processSteps";
import { getStatsConfig } from "@/lib/content/stats";
import { getIntroCards } from "@/lib/content/introCards";
import { getPillars } from "@/lib/content/pillars";
import { getNewsletterPosts } from "@/lib/content/newsletter";

export const revalidate = 60;

export default async function Home() {
  const [products, solutions, services, caseStudies, processSteps, statsConfig, introCards, pillars, newsletterPosts] =
    await Promise.all([
      getCards("products"),
      getCards("solutions"),
      getCards("services"),
      getCaseStudies(),
      getProcessSteps(),
      getStatsConfig(),
      getIntroCards(),
      getPillars(),
      getNewsletterPosts(),
    ]);
  const allSolutions = [...solutions, ...solutions];

  return (
    <div className="home">
      <div className="bg-black">
        <SiteHeader />
        <Hero />
      </div>
      <main className="relative bg-black bg-grid-dark">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute left-[26%] top-[9%] h-[900px] w-[896px] rounded-full bg-[#3152df] opacity-30 blur-[430px]" />
          <div className="absolute left-[-22%] top-[15%] h-[700px] w-[694px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" />
          <div className="absolute left-[87%] top-[15%] h-[700px] w-[694px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" />
          <div className="absolute left-[34%] top-[22%] h-[640px] w-[633px] rounded-full bg-[#3152df] opacity-20 blur-[330px]" />
          <div className="absolute left-[35%] top-[32%] h-[700px] w-[694px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" />
          <div className="absolute left-[26%] top-[39%] h-[980px] w-[972px] rounded-full bg-[#3152df] opacity-20 blur-[380px]" />
          <div className="absolute left-[24%] top-[87%] h-[980px] w-[972px] rounded-full bg-[#3152df] opacity-20 blur-[380px]" />
        </div>
        <section className="flex flex-col justify-center md:min-h-screen">
          <IntroSection cards={introCards} />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <PillarsSection pillars={pillars} />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <ProcessSection steps={processSteps} />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <StatsSection {...statsConfig} />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <CaseStudySection caseStudies={caseStudies} />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <CardGridSection
            title="Products"
            subtitle="Indigenously designed industrial machinery built for high performance, reliability, and long-term operation."
            cards={products}
            variant="products"
          />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <CardGridSection
            title="Solution"
            subtitle="Integrated mechanical and chemical engineering solutions tailored for industrial-scale resource recovery."
            cards={allSolutions.slice(0, 3)}
            variant="solutions"
            exploreHref="/products"
          />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <CardGridSection
            title="Services"
            subtitle="From concept development to long-term operational support, Refnic delivers the expertise that powers successful industrial projects."
            cards={services}
            variant="services"
          />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <NewsletterSection posts={newsletterPosts} />
        </section>
        <section className="flex flex-col justify-center md:min-h-screen">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
