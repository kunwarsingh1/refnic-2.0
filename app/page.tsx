import Navbar from "@/components/Navbar";
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

const products = [
  {
    title: "Li-ion Battery Recycling Plant",
    body: "Complete mechanical plant systems for processing end-of-life lithium-ion batteries.",
  },
  {
    title: "E-Waste Recycling Line",
    body: "Integrated equipment lines for processing e-waste and recovering valuable materials.",
  },
  {
    title: "Battery Assembly Line",
    body: "Industrial assembly systems designed for efficient and scalable battery manufacturing.",
  },
];

const solutions = [
  {
    title: "Metal Refining / Hydrometallurgy",
    body: "Complete hydrometallurgical process solutions for extracting, refining, and producing high-purity critical metals from recycled materials.",
  },
  {
    title: "Solvent Extraction",
    body: "Selective solvent extraction processes designed for efficient purification and separation of valuable metal ions.",
  },
  {
    title: "Lithium-ion Battery Recycling",
    body: "End-to-end recycling plants engineered for the safe processing and recovery of valuable materials from end-of-life lithium-ion batteries.",
  },
];

const allSolutions = [...solutions, ...solutions];

const services = [
  {
    title: "Comprehensive Engineering Services",
    body: "Supporting every stage of your project lifecycle with technical expertise, documentation, training, and strategic guidance.",
  },
  {
    title: "Customized Equipment Design & Manufacturing",
    body: "Engineered exclusively for your process requirements.",
  },
  {
    title: "Process Engineering",
    body: "Optimized process design for maximum efficiency and recovery.",
  },
];

export default function Home() {
  return (
    <>
      <div className="bg-navy-950">
        <header className="mt-4 md:mt-6">
          <div className="mx-auto max-w-[90rem] bg-white">
            <Navbar />
          </div>
        </header>
        <Hero />
      </div>
      <main>
        <IntroSection />
        <PillarsSection />
        <ProcessSection />
        <StatsSection />
        <CaseStudySection />
        <CardGridSection
          title="Products"
          subtitle="Indigenously designed industrial machinery built for high performance, reliability, and long-term operation."
          cards={products}
          variant="products"
        />
        <CardGridSection
          title="Solution"
          subtitle="Integrated mechanical and chemical engineering solutions tailored for industrial-scale resource recovery."
          cards={allSolutions.slice(0, 3)}
          variant="solutions"
          exploreHref="/products"
        />
        <CardGridSection
          title="Services"
          subtitle="From concept development to long-term operational support, Refnic delivers the expertise that powers successful industrial projects."
          cards={services}
          variant="services"
        />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
