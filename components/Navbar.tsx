"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CaretDown } from "./ui/primitives";
import { BookOpen, Globe, BarChart3, TrendingUp, MapPin, ArrowUpRight, Boxes, Lightbulb, Settings, Leaf, Library, Wrench, FileText, Menu, X, Mail, Shield, ChevronRight } from "lucide-react";
import styles from "./aboutDropdown.module.css";
import productStyles from "./products.module.css";
import techStyles from "./technologies.module.css";
import type { NavLink, AboutMenuItem } from "@/lib/content/navbar";

function useHoverDropdown(delay = 180) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openNow = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const closeLater = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), delay);
  };
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return { open, openNow, closeLater };
}

const leftLinks = [
  { label: "Home", caret: false },
  { label: "Products", caret: true },
  { label: "Technologies", caret: true },
];

const rightLinks = [
  { label: "About Us", caret: true },
  { label: "Newsletters", caret: false },
  { label: "Contact", caret: true },
];

const contactMenu: { label: string; subtitle: string; href: string; icon: typeof Mail }[] = [
  { label: "Contact Us", subtitle: "Get in touch with our team.", href: "/contact", icon: Mail },
  { label: "Career", subtitle: "Explore opportunities with us.", href: "/career", icon: Shield },
];

const PANEL_W = 1515;
const PRODUCTS_W = 1515;
const PRODUCTS_H = 470;
const TECH_W = 1515;
const TECH_H = 318;
const MAX_DROPDOWN_SCALE = 0.8;

export default function Navbar({
  contactEmail = "something@gmail.com",
  contactPhone = "+91 9999999999",
  productsMenu,
  technologiesMenu,
  aboutMenu,
  technologiesImageUrl = "/refnicOverview2.png",
  aboutImageUrl = "/refnicOverview2.png",
}: {
  contactEmail?: string;
  contactPhone?: string;
  productsMenu: NavLink[];
  technologiesMenu: NavLink[];
  aboutMenu: AboutMenuItem[];
  technologiesImageUrl?: string;
  aboutImageUrl?: string;
}) {
  const about = useHoverDropdown();
  const products = useHoverDropdown();
  const tech = useHoverDropdown();
  const contact = useHoverDropdown();
  const pathname = usePathname();
  const [navScale, setNavScale] = useState(1);
  const [productsScale, setProductsScale] = useState(1);
  const [techScale, setTechScale] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setMobileSubExpanded(null);
  }, [pathname]);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setNavScale(Math.min(MAX_DROPDOWN_SCALE, (w - 32) / PANEL_W));
      setProductsScale(Math.min(MAX_DROPDOWN_SCALE, (w - 32) / PRODUCTS_W));
      setTechScale(Math.min(MAX_DROPDOWN_SCALE, (w - 32) / TECH_W));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <>
    <div className="relative flex items-center gap-4 py-0.5 pl-6 pr-1 text-sm md:py-3 md:px-6">
      <div className="flex flex-1 items-center justify-between gap-4">
        <a href={`mailto:${contactEmail}`} className="hidden lg:block hover:underline">
          {contactEmail}
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {leftLinks.map((l) =>
            l.label === "Products" ? (
              <div
                key={l.label}
                onMouseEnter={products.openNow}
                onMouseLeave={products.closeLater}
              >
                <Link href="/products" className="flex items-center gap-1.5 hover:text-gray-500 transition-colors">
                  {l.label}
                  <CaretDown />
                </Link>
                {products.open && (
                  <div
                    onMouseEnter={products.openNow}
                    onMouseLeave={products.closeLater}
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                    style={{ width: PRODUCTS_W * productsScale, height: PRODUCTS_H * productsScale }}
                  >
                    <div style={{ transform: `scale(${productsScale})`, transformOrigin: "top left" }}>
                      <div className={productStyles.products} style={{ width: PRODUCTS_W, height: PRODUCTS_H }}>
                         <Link href={productsMenu[0].href} className={productStyles.navContentList}>
                           <Boxes className={productStyles.chartpolarIcon} />
                          <div className={productStyles.budgetingParent}>
                            <b className={productStyles.budgeting}>{productsMenu[0].label}</b>
                            <div className={productStyles.keepYourSpending} />
                          </div>
                        </Link>
                         <Link href={productsMenu[1].href} className={productStyles.navContentList2}>
                           <Lightbulb className={productStyles.chartpolarIcon} />
                          <div className={productStyles.budgetingParent}>
                            <div className={productStyles.budgeting2}>{productsMenu[1].label}</div>
                            <div className={productStyles.keepYourSpending} />
                          </div>
                        </Link>
                         <Link href={productsMenu[2].href} className={productStyles.navContentList3}>
                           <Settings className={productStyles.chartpolarIcon} />
                          <div className={productStyles.budgetingParent}>
                            <div className={productStyles.budgeting2}>{productsMenu[2].label}</div>
                            <div className={productStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href={productsMenu[3].href} className={productStyles.mechanicalWrapper}>
                          <b className={productStyles.mechanical}>{productsMenu[3].label}</b>
                        </Link>
                        <Link href={productsMenu[4].href} className={productStyles.mechanicalContainer}>
                          <b className={productStyles.mechanical}>{productsMenu[4].label}</b>
                        </Link>
                        <Link href={productsMenu[5].href} className={productStyles.liIonBatteryRecyclingPlantWrapper}>
                          <div className={productStyles.liIonBatteryRecycling}>{productsMenu[5].label}</div>
                        </Link>
                        <Link href={productsMenu[6].href} className={productStyles.hydrometallurgicalMetalExtraWrapper}>
                          <div className={productStyles.hydrometallurgicalMetalExtra}>{productsMenu[6].label}</div>
                        </Link>
                        <Link href={productsMenu[7].href} className={productStyles.eWasteRecyclingLineWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[7].label}</div>
                        </Link>
                        <Link href={productsMenu[8].href} className={productStyles.leachingSystemsWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[8].label}</div>
                        </Link>
                        <Link href={productsMenu[9].href} className={productStyles.batteryAssemblyLineWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[9].label}</div>
                        </Link>
                        <Link href={productsMenu[10].href} className={productStyles.storageTanksWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[10].label}</div>
                        </Link>
                        <Link href={productsMenu[11].href} className={productStyles.lithiumIonBatteryRecyclingWrapper}>
                          <div className={productStyles.lithiumIonBatteryRecycling}>{productsMenu[11].label}</div>
                        </Link>
                        <Link href={productsMenu[12].href} className={productStyles.metalRefiningHydrometallurWrapper}>
                          <div className={productStyles.metalRefining}>{productsMenu[12].label}</div>
                        </Link>
                        <Link href={productsMenu[13].href} className={productStyles.comprehensiveEngineeringWrapper}>
                          <div className={productStyles.comprehensiveEngineering}>{productsMenu[13].label}</div>
                        </Link>
                        <Link href={productsMenu[14].href} className={productStyles.processEngineeringWrapper}>
                          <div className={productStyles.comprehensiveEngineering}>{productsMenu[14].label}</div>
                        </Link>
                        <Link href={productsMenu[15].href} className={productStyles.maintenanceRepairWrapper}>
                          <div className={productStyles.maintenanceRepair}>{productsMenu[15].label}</div>
                        </Link>
                        <Link href={productsMenu[16].href} className={productStyles.licensingDocumentationWrapper}>
                          <div className={productStyles.licensingDocumentation}>{productsMenu[16].label}</div>
                        </Link>
                        <Link href={productsMenu[17].href} className={productStyles.recyclingEquipmentWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[17].label}</div>
                        </Link>
                        <Link href={productsMenu[18].href} className={productStyles.filtrationUnitsWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[18].label}</div>
                        </Link>
                        <Link href={productsMenu[19].href} className={productStyles.eWasteRecyclingWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[19].label}</div>
                        </Link>
                        <Link href={productsMenu[20].href} className={productStyles.filtrationUnitsContainer}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[20].label}</div>
                        </Link>
                        <Link href={productsMenu[21].href} className={productStyles.customizedEquipmentDesignWrapper}>
                          <div className={productStyles.customizedEquipmentDesign}>{productsMenu[21].label}</div>
                        </Link>
                        <Link href={productsMenu[22].href} className={productStyles.sparesConsumablesWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[22].label}</div>
                        </Link>
                        <Link href={productsMenu[23].href} className={productStyles.sopTrainingWrapper}>
                          <div className={productStyles.sopTraining}>{productsMenu[23].label}</div>
                        </Link>
                        <Link href={productsMenu[24].href} className={productStyles.projectReportsWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[24].label}</div>
                        </Link>
                        <Link href={productsMenu[25].href} className={productStyles.financialModelingWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{productsMenu[25].label}</div>
                        </Link>
                        <Link href={productsMenu[26].href} className={productStyles.financialChannelSupportWrapper}>
                          <div className={productStyles.financialChannelSupport}>{productsMenu[26].label}</div>
                        </Link>
                        <Link href={productsMenu[27].href} className={productStyles.seperatorsWrapper}>
                          <div className={productStyles.seperators}>{productsMenu[27].label}</div>
                        </Link>
                        <Link href={productsMenu[28].href} className={productStyles.neutralizationSystemsWrapper}>
                          <div className={productStyles.neutralizationSystems}>{productsMenu[28].label}</div>
                        </Link>
                        <Link href={productsMenu[29].href} className={productStyles.shreddingWrapper}>
                          <div className={productStyles.neutralizationSystems}>{productsMenu[29].label}</div>
                        </Link>
                        <Link href={productsMenu[30].href} className={productStyles.neutralizationSystemsContainer}>
                          <div className={productStyles.neutralizationSystems}>{productsMenu[30].label}</div>
                        </Link>
                        <Link href={productsMenu[31].href} className={productStyles.materialHandlingWrapper}>
                          <div className={productStyles.materialHandling}>{productsMenu[31].label}</div>
                        </Link>
                        <Link href={productsMenu[32].href} className={productStyles.reactorsWrapper}>
                          <div className={productStyles.materialHandling}>{productsMenu[32].label}</div>
                        </Link>
                        <Link href={productsMenu[33].href} className={productStyles.crushingWrapper}>
                          <div className={productStyles.materialHandling}>{productsMenu[33].label}</div>
                        </Link>
                        <Link href={productsMenu[34].href} className={productStyles.reactorsContainer}>
                          <div className={productStyles.materialHandling}>{productsMenu[34].label}</div>
                        </Link>
                        <Link href={productsMenu[35].href} className={productStyles.pollutionControlWrapper}>
                          <div className={productStyles.materialHandling}>{productsMenu[35].label}</div>
                        </Link>
                        <Link href={productsMenu[36].href} className={productStyles.separationEquipmentWrapper}>
                          <div className={productStyles.separationEquipment}>{productsMenu[36].label}</div>
                        </Link>
                        <Link href={productsMenu[37].href} className={productStyles.separationWrapper}>
                          <div className={productStyles.separation}>{productsMenu[37].label}</div>
                        </Link>
                        <Link href={productsMenu[38].href} className={productStyles.separationEquipmentContainer}>
                          <div className={productStyles.separationEquipment}>{productsMenu[38].label}</div>
                        </Link>
                        <Link href={productsMenu[39].href} className={productStyles.processUtilitiesWrapper}>
                          <div className={productStyles.processUtilities}>{productsMenu[39].label}</div>
                        </Link>
                        <Link href={productsMenu[40].href} className={productStyles.pollutionControlContainer}>
                          <div className={productStyles.pollutionControl2}>{productsMenu[40].label}</div>
                        </Link>
                        <Link href={productsMenu[41].href} className={productStyles.processUtilitiesContainer}>
                          <div className={productStyles.processUtilities}>{productsMenu[41].label}</div>
                        </Link>
                        <Link href={productsMenu[42].href} className={productStyles.chemicalWrapper}>
                          <b className={productStyles.chemical}>{productsMenu[42].label}</b>
                        </Link>
                        <Link href={productsMenu[43].href} className={productStyles.chemicalContainer}>
                          <b className={productStyles.chemical}>{productsMenu[43].label}</b>
                        </Link>
                        <div className={productStyles.productsChild} />
                        <div className={productStyles.productsItem} />
                        <ChevronRight className={`${productStyles.productsInner} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.ellipseDiv} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild2} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild3} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild4} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild5} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild6} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild7} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild8} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild9} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild10} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild11} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild12} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild13} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild14} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild15} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild16} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild17} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild18} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild19} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild20} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild21} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild22} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild23} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild24} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild25} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild26} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild27} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild28} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild29} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild30} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild31} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild32} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild33} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild34} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild35} ${productStyles.bulletChevron}`} />
                        <ChevronRight className={`${productStyles.productsChild36} ${productStyles.bulletChevron}`} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : l.label === "Technologies" ? (
              <div
                key={l.label}
                onMouseEnter={tech.openNow}
                onMouseLeave={tech.closeLater}
              >
                <Link href="/technologies" className="flex items-center gap-1.5 hover:text-gray-500 transition-colors">
                  {l.label}
                  <CaretDown />
                </Link>
                {tech.open && (
                  <div
                    onMouseEnter={tech.openNow}
                    onMouseLeave={tech.closeLater}
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                    style={{ width: TECH_W * techScale, height: TECH_H * techScale }}
                  >
                    <div style={{ transform: `scale(${techScale})`, transformOrigin: "top left" }}>
                      <div className={techStyles.trchnologies} style={{ width: TECH_W, height: TECH_H }}>
                         <Link href={technologiesMenu[0].href} className={techStyles.navContentList}>
                           <Leaf className={techStyles.chartpolarIcon} />
                          <div className={techStyles.budgetingParent}>
                            <div className={techStyles.budgeting}>{technologiesMenu[0].label}</div>
                            <div className={techStyles.keepYourSpending} />
                          </div>
                        </Link>
                         <Link href={technologiesMenu[1].href} className={techStyles.navContentList2}>
                           <Library className={techStyles.chartpolarIcon} />
                          <div className={techStyles.budgetingParent}>
                            <div className={techStyles.budgeting}>{technologiesMenu[1].label}</div>
                            <div className={techStyles.keepYourSpending} />
                          </div>
                        </Link>
                         <Link href={technologiesMenu[2].href} className={techStyles.navContentList3}>
                           <Wrench className={techStyles.chartpolarIcon} />
                          <div className={techStyles.budgetingParent}>
                            <div className={techStyles.budgeting}>{technologiesMenu[2].label}</div>
                            <div className={techStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href={technologiesMenu[3].href} className={techStyles.impactWrapper}>
                          <div className={techStyles.impact}>{technologiesMenu[3].label}</div>
                        </Link>
                        <Link href={technologiesMenu[4].href} className={techStyles.handManualWrapper}>
                          <div className={techStyles.handManual}>{technologiesMenu[4].label}</div>
                        </Link>
                        <Link href={technologiesMenu[5].href} className={techStyles.blackMassCalculatorWrapper}>
                          <div className={techStyles.blackMassCalculator}>{technologiesMenu[5].label}</div>
                        </Link>
                        <Link href={technologiesMenu[6].href} className={techStyles.climateWrapper}>
                          <div className={techStyles.climate}>{technologiesMenu[6].label}</div>
                        </Link>
                        <Link href={technologiesMenu[7].href} className={techStyles.refnicProductsSolutionBooWrapper}>
                          <div className={techStyles.refnicProducts}>{technologiesMenu[7].label}</div>
                        </Link>
                        <Link href={technologiesMenu[8].href} className={techStyles.processDesignWrapper}>
                          <div className={techStyles.processDesign}>{technologiesMenu[8].label}</div>
                        </Link>
                        <Link href={technologiesMenu[9].href} className={techStyles.waterWrapper}>
                          <div className={techStyles.water}>{technologiesMenu[9].label}</div>
                        </Link>
                        <Link href={technologiesMenu[10].href} className={techStyles.magazineWrapper}>
                          <div className={techStyles.water}>{technologiesMenu[10].label}</div>
                        </Link>
                        <Link href={technologiesMenu[11].href} className={techStyles.resourcesWrapper}>
                          <div className={techStyles.resources}>{technologiesMenu[11].label}</div>
                        </Link>
                        <Link href={technologiesMenu[12].href} className={techStyles.articlesWrapper}>
                          <div className={techStyles.resources}>{technologiesMenu[12].label}</div>
                        </Link>
                        <Link href={technologiesMenu[13].href} className={techStyles.circularEconomyWrapper}>
                          <div className={techStyles.circularEconomy}>{technologiesMenu[13].label}</div>
                        </Link>
                        <Link href={technologiesMenu[14].href} className={techStyles.greenTechWrapper}>
                          <div className={techStyles.greenTech}>{technologiesMenu[14].label}</div>
                        </Link>
                        <div className={techStyles.trchnologiesChild} />
                        <div className={techStyles.trchnologiesItem} />
                        <ChevronRight className={`${techStyles.trchnologiesInner} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.ellipseDiv} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild2} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild3} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild4} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild5} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild6} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild7} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild8} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild9} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild10} ${techStyles.bulletChevron}`} />
                        <ChevronRight className={`${techStyles.trchnologiesChild11} ${techStyles.bulletChevron}`} />
                        <Link href={technologiesMenu[15].href} className={techStyles.navContentList4}>
                           <FileText className={techStyles.chartpolarIcon4} />
                          <div className={techStyles.frameDiv}>
                            <div className={techStyles.budgeting4}>{technologiesMenu[15].label}</div>
                            <div className={techStyles.keepYourSpending4} />
                          </div>
                        </Link>
                        <div className={techStyles.lineDiv} />
                         <img className={techStyles.refnicOverview2} src={technologiesImageUrl} alt="" />
                        <div className={techStyles.exploreOurResearch}>Explore our research, engineering insights, and perspectives</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.label}
                href="/"
                className="flex items-center gap-1.5 hover:text-gray-500 transition-colors"
              >
                {l.label}
                {l.caret && <CaretDown />}
              </Link>
            )
          )}
        </nav>
      </div>

        <Link
          href="/"
          className="shrink-0 font-display font-bold text-2xl tracking-tight text-black"
          aria-label="Refnic"
        >
          <img src="/logo_blue.png" alt="Refnic Logo" className="h-10 w-auto md:h-18" />
        </Link>

      <div className="flex flex-1 items-center justify-end gap-4 lg:justify-between">
        <nav className="hidden lg:flex items-center gap-6">
          {rightLinks.map((l) =>
            l.label === "About Us" ? (
              <div
                key={l.label}
                onMouseEnter={about.openNow}
                onMouseLeave={about.closeLater}
              >
                <a href="#" className="flex items-center gap-1.5 hover:text-gray-500 transition-colors">
                  {l.label}
                  <CaretDown />
                </a>
                {about.open && (
                  <div
                    onMouseEnter={about.openNow}
                    onMouseLeave={about.closeLater}
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                    style={{ width: PANEL_W * navScale, height: 320 * navScale }}
                  >
                    <div style={{ transform: `scale(${navScale})`, transformOrigin: "top left" }}>
                    <div className={styles.openNavParent}>
                      <div className={styles.openNav}>
                       <a className={styles.navContentList} href={aboutMenu[0].href}>
                         <BookOpen className={styles.chartpolarIcon} />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>{aboutMenu[0].title}</div>
                            <div className={styles.keepYourSpending}>{aboutMenu[0].subtitle}</div>
                          </div>
                        </a>
                       <a className={styles.navContentList2} href={aboutMenu[1].href}>
                         <Globe className={styles.chartpolarIcon} />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting2}>{aboutMenu[1].title}</div>
                            <div className={styles.keepYourSpending2}>{aboutMenu[1].subtitle}</div>
                          </div>
                        </a>
                       <a className={styles.navContentList3} href={aboutMenu[2].href}>
                         <BarChart3 className={styles.chartpolarIcon} />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>{aboutMenu[2].title}</div>
                            <div className={styles.keepYourSpending}>{aboutMenu[2].subtitle}</div>
                          </div>
                        </a>
                       <ArrowUpRight className={styles.vectorIcon} />
                       <a className={styles.navContentList4} href={aboutMenu[3].href}>
                         <TrendingUp className={styles.chartpolarIcon} />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>{aboutMenu[3].title}</div>
                            <div className={styles.keepYourSpending}>{aboutMenu[3].subtitle}</div>
                          </div>
                        </a>
                       <a className={styles.navContentList5} href={aboutMenu[4].href}>
                         <MapPin className={styles.chartpolarIcon} />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>{aboutMenu[4].title}</div>
                            <div className={styles.keepYourSpending}>{aboutMenu[4].subtitle}</div>
                          </div>
                         </a>
                       </div>
                       <div className={styles.groupChild} />
                       <img className={styles.refnicOverview2} src={aboutImageUrl} alt="" />
                     </div>
                  </div>
                </div>
                )}
              </div>
            ) : l.label === "Contact" ? (
              <div key={l.label} onMouseEnter={contact.openNow} onMouseLeave={contact.closeLater}>
                <a href="#" className="flex items-center gap-1.5 hover:text-gray-500 transition-colors">
                  {l.label}
                  <CaretDown />
                </a>
                {contact.open && (
                  <div
                    onMouseEnter={contact.openNow}
                    onMouseLeave={contact.closeLater}
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                    style={{ width: PANEL_W * navScale, height: 313 * navScale }}
                  >
                    <div style={{ transform: `scale(${navScale})`, transformOrigin: "top left" }}>
                    <div
                      className="flex flex-wrap content-start items-start justify-start gap-3 rounded-lg bg-white p-8 text-left shadow-[0px_55px_78px_rgba(0,0,0,0.25)]"
                      style={{ outline: "1px solid #1B37B0", outlineOffset: "-1px", width: PANEL_W, height: 313, boxSizing: "border-box" }}
                    >
                      {contactMenu.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            data-property-1="Default"
                            className="flex items-start gap-[6px] rounded bg-white p-3 transition-colors hover:text-accent-blue"
                            style={{ width: 370 }}
                          >
                            <Icon className="h-6 w-6 shrink-0" style={{ color: "#232F1A" }} />
                            <div className="flex flex-1 flex-col items-start gap-1">
                              <div
                                className="font-medium"
                                style={{ color: "#232F1A", fontSize: 16, lineHeight: "22.4px" }}
                              >
                                {item.label}
                              </div>
                              <div style={{ width: 316, color: "#515251", fontSize: 14, lineHeight: "19.6px" }}>
                                {item.subtitle}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={l.label}
                href={l.label === "Newsletters" ? "/newsletter" : "#"}
                className="flex items-center gap-1.5 hover:text-gray-500 transition-colors"
              >
                {l.label}
                {l.caret && <CaretDown />}
              </a>
            )
          )}
        </nav>

        <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="hidden lg:block hover:underline">
          {contactPhone}
        </a>

        <button
          type="button"
          onClick={() =>
            setMobileOpen((v) => {
              const next = !v;
              if (!next) setMobileExpanded(null);
              return next;
            })
          }
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex items-center justify-center p-1 text-black lg:hidden"
        >
          {mobileOpen ? <X className="size-[22px]" /> : <Menu className="size-[22px]" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-100 bg-white px-6 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1 text-sm">
            <Link href="/" className="rounded-md px-2 py-2.5 font-semibold hover:bg-gray-50">
              Home
            </Link>

            <div>
              <div className="flex items-center justify-between rounded-md hover:bg-gray-50">
                <Link href="/products" className="flex-1 px-2 py-2.5 font-semibold">
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileExpanded((v) => (v === "products" ? null : "products"))}
                  aria-label={mobileExpanded === "products" ? "Collapse Products menu" : "Expand Products menu"}
                  aria-expanded={mobileExpanded === "products"}
                  className="px-3 py-2.5"
                >
                  <CaretDown className={`transition-transform ${mobileExpanded === "products" ? "rotate-180" : ""}`} />
                </button>
              </div>
              {mobileExpanded === "products" && (
                <div className="ml-2 flex flex-col gap-4 border-l border-gray-100 pl-3">
                  {[
                    {
                      key: "products",
                      headerIndex: 0,
                      mechanicalHeaderIndex: 3,
                      mechanicalIndexes: [5, 7, 9, 17, 27, 31, 35],
                      chemicalHeaderIndex: 42,
                      chemicalIndexes: [6, 8, 10, 18, 28, 32, 36, 39],
                    },
                    {
                      key: "solution",
                      headerIndex: 1,
                      mechanicalHeaderIndex: 4,
                      mechanicalIndexes: [11, 19, 29, 33, 37, 40],
                      chemicalHeaderIndex: 43,
                      chemicalIndexes: [12, 20, 30, 34, 38, 41],
                    },
                  ].map(({ key, headerIndex, mechanicalHeaderIndex, mechanicalIndexes, chemicalHeaderIndex, chemicalIndexes }) =>
                    productsMenu[headerIndex] ? (
                      <div key={key}>
                        <p className="px-2 text-xs font-bold uppercase tracking-wide text-black">
                          {productsMenu[headerIndex].label}
                        </p>
                        <div className="mt-1 flex flex-col gap-1">
                          {[
                            { subKey: `${key}-mechanical`, subHeaderIndex: mechanicalHeaderIndex, indexes: mechanicalIndexes },
                            { subKey: `${key}-chemical`, subHeaderIndex: chemicalHeaderIndex, indexes: chemicalIndexes },
                          ].map(({ subKey, subHeaderIndex, indexes }) =>
                            productsMenu[subHeaderIndex] ? (
                              <div key={subKey}>
                                <button
                                  type="button"
                                  onClick={() => setMobileSubExpanded((v) => (v === subKey ? null : subKey))}
                                  aria-expanded={mobileSubExpanded === subKey}
                                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-black hover:bg-gray-50"
                                >
                                  {productsMenu[subHeaderIndex].label}
                                  <CaretDown
                                    className={`size-3 transition-transform ${mobileSubExpanded === subKey ? "rotate-180" : ""}`}
                                  />
                                </button>
                                {mobileSubExpanded === subKey && (
                                  <div className="ml-2 mt-0.5 flex flex-col gap-0.5 border-l border-gray-100 pl-2">
                                    {indexes.map((i) =>
                                      productsMenu[i] ? (
                                        <Link
                                          key={i}
                                          href={productsMenu[i].href}
                                          className="rounded-md px-2 py-2 text-black hover:bg-gray-50"
                                        >
                                          {productsMenu[i].label}
                                        </Link>
                                      ) : null
                                    )}
                                  </div>
                                )}
                              </div>
                            ) : null
                          )}
                        </div>
                      </div>
                    ) : null
                  )}
                  {productsMenu[2] && (
                    <div>
                      <button
                        type="button"
                        onClick={() => setMobileSubExpanded((v) => (v === "services" ? null : "services"))}
                        aria-expanded={mobileSubExpanded === "services"}
                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-black hover:bg-gray-50"
                      >
                        {productsMenu[2].label}
                        <CaretDown
                          className={`size-3 transition-transform ${mobileSubExpanded === "services" ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileSubExpanded === "services" && (
                        <div className="mt-1 flex flex-col gap-0.5">
                          {[13, 21, 14, 22, 15, 23, 16, 24, 25, 26].map((i) =>
                            productsMenu[i] ? (
                              <Link
                                key={i}
                                href={productsMenu[i].href}
                                className="rounded-md px-2 py-2 text-black hover:bg-gray-50"
                              >
                                {productsMenu[i].label}
                              </Link>
                            ) : null
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between rounded-md hover:bg-gray-50">
                <Link href="/technologies" className="flex-1 px-2 py-2.5 font-semibold">
                  Technologies
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileExpanded((v) => (v === "technologies" ? null : "technologies"))}
                  aria-label={mobileExpanded === "technologies" ? "Collapse Technologies menu" : "Expand Technologies menu"}
                  aria-expanded={mobileExpanded === "technologies"}
                  className="px-3 py-2.5"
                >
                  <CaretDown className={`transition-transform ${mobileExpanded === "technologies" ? "rotate-180" : ""}`} />
                </button>
              </div>
              {mobileExpanded === "technologies" && (
                <div className="ml-2 flex flex-col gap-3 border-l border-gray-100 pl-3">
                  {[
                    { subKey: "tech-sustainability", headerIndex: 0, itemIndexes: [3, 6, 9, 11, 13, 14] },
                    { subKey: "tech-resources", headerIndex: 1, itemIndexes: [4, 7, 10, 12] },
                    { subKey: "tech-digitaltools", headerIndex: 2, itemIndexes: [5, 8] },
                  ].map(({ subKey, headerIndex, itemIndexes }) =>
                    technologiesMenu[headerIndex] ? (
                      <div key={subKey}>
                        <button
                          type="button"
                          onClick={() => setMobileSubExpanded((v) => (v === subKey ? null : subKey))}
                          aria-expanded={mobileSubExpanded === subKey}
                          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-black hover:bg-gray-50"
                        >
                          {technologiesMenu[headerIndex].label}
                          <CaretDown
                            className={`size-3 transition-transform ${mobileSubExpanded === subKey ? "rotate-180" : ""}`}
                          />
                        </button>
                        {mobileSubExpanded === subKey && (
                          <div className="mt-1 flex flex-col gap-0.5">
                            {itemIndexes.map((i) =>
                              technologiesMenu[i] ? (
                                <Link
                                  key={i}
                                  href={technologiesMenu[i].href}
                                  className="rounded-md px-2 py-2 text-black hover:bg-gray-50"
                                >
                                  {technologiesMenu[i].label}
                                </Link>
                              ) : null
                            )}
                          </div>
                        )}
                      </div>
                    ) : null
                  )}
                  {technologiesMenu[15] && (
                    <Link
                      href={technologiesMenu[15].href}
                      className="rounded-md px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-black hover:bg-gray-50"
                    >
                      {technologiesMenu[15].label}
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="mt-2">
              <button
                type="button"
                onClick={() => setMobileExpanded((v) => (v === "about" ? null : "about"))}
                aria-expanded={mobileExpanded === "about"}
                className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-sm font-semibold text-black hover:bg-gray-50"
              >
                About Us
                <CaretDown className={`transition-transform ${mobileExpanded === "about" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "about" && (
                <div className="flex flex-col gap-0.5">
                  {aboutMenu.map((item, i) => (
                    <a key={i} href={item.href} className="rounded-md px-2 py-2.5 hover:bg-gray-50">
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 border-t border-gray-100 pt-2">
              <a href="/newsletter" className="block rounded-md px-2 py-2.5 font-semibold hover:bg-gray-50">
                Newsletters
              </a>
              <div className="flex items-center justify-between rounded-md hover:bg-gray-50">
                <span className="flex-1 px-2 py-2.5 font-semibold">Contact</span>
                <button
                  type="button"
                  onClick={() => setMobileExpanded((v) => (v === "contact" ? null : "contact"))}
                  aria-label={mobileExpanded === "contact" ? "Collapse Contact menu" : "Expand Contact menu"}
                  aria-expanded={mobileExpanded === "contact"}
                  className="px-3 py-2.5"
                >
                  <CaretDown className={`transition-transform ${mobileExpanded === "contact" ? "rotate-180" : ""}`} />
                </button>
              </div>
              {mobileExpanded === "contact" && (
                <div className="ml-2 flex flex-col gap-0.5 border-l border-gray-100 pl-3">
                  {contactMenu.map((item) => (
                    <Link key={item.label} href={item.href} className="rounded-md px-2 py-2 text-black hover:bg-gray-50">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-col gap-1 border-t border-gray-100 pt-3 text-sm text-black">
              <a href={`mailto:${contactEmail}`} className="px-2 py-1 hover:underline">
                {contactEmail}
              </a>
              <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="px-2 py-1 hover:underline">
                {contactPhone}
              </a>
            </div>
          </nav>
        </div>
      )}
      </div>
    </>
  );
}
