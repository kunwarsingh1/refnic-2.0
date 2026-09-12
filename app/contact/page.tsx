import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ContactPageHero from "@/components/ContactPageHero";
import ContactPageForm from "@/components/ContactPageForm";
import ContactPageClosingCta from "@/components/ContactPageClosingCta";
import { getFooterConfig } from "@/lib/content/footer";
import { getContactPageConfig } from "@/lib/content/contactPage";

export const metadata: Metadata = {
  title: "Contact Us — Refine Nicely",
  description: "Get in touch with Refnic — talk to our team about your project.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const [footer, c] = await Promise.all([getFooterConfig(), getContactPageConfig()]);

  return (
    <>
      <SiteHeader bgClassName="bg-[#161518]" />

      <main className="bg-[#161518]">
        <ContactPageHero heading={c.heroHeading} subheading={c.heroSubheading} />
        <ContactPageForm
          email={footer.contactEmail}
          phone={footer.contactPhone}
          address={footer.contactAddress}
          contactInfoHeading={c.contactInfoHeading}
          subjects={c.subjects}
        />
        <ContactPageClosingCta
          heading={c.closingHeading}
          imageUrl={c.closingImageUrl}
          tagline={c.closingTagline}
          body={c.closingBody}
          ctaLabel={c.closingCtaLabel}
        />
      </main>

      <Footer />
    </>
  );
}
