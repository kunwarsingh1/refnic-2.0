"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CaretDown, AboutMenuIcon } from "./ui/primitives";
import styles from "./aboutDropdown.module.css";
import productStyles from "./products.module.css";
import techStyles from "./technologies.module.css";

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

const aboutHref = (title: string) =>
  title === "Investors"
    ? "/investors"
    : title === "Our Story"
      ? "/our-story"
      : title === "Case Study"
        ? "/case-study"
        : title === "Indian Market"
          ? "/indian-market"
          : title === "Global Market"
            ? "/global-market"
            : "#";

const leftLinks = [
  { label: "Home", caret: false },
  { label: "Products", caret: true },
  { label: "Technologies", caret: true },
];

const rightLinks = [
  { label: "About Us", caret: true },
  { label: "Newsletters", caret: false },
  { label: "Contact", caret: false },
];

const aboutItems = [
  { icon: "story", title: "Our Story", subtitle: "How we started and where we're headed" },
  { icon: "globe", title: "Global Market", subtitle: "Perspectives from markets worldwide" },
  { icon: "case", title: "Case Study", subtitle: "Real results from real businesses" },
  { icon: "invest", title: "Investors", subtitle: "Building value for the future" },
  { icon: "flag", title: "Indian Market", subtitle: "Insights shaping India's growth" },
];

const PANEL_W = 1198;
const PRODUCTS_W = 1515;
const PRODUCTS_H = 470;
const TECH_W = 1515;
const TECH_H = 318;

export default function Navbar() {
  const about = useHoverDropdown();
  const products = useHoverDropdown();
  const tech = useHoverDropdown();
  const pathname = usePathname();
  const [navScale, setNavScale] = useState(1);
  const [productsScale, setProductsScale] = useState(1);
  const [techScale, setTechScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setNavScale(Math.min(1, (w - 32) / PANEL_W));
      setProductsScale(Math.min(1, (w - 32) / PRODUCTS_W));
      setTechScale(Math.min(1, (w - 32) / TECH_W));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div className="relative flex items-center justify-between gap-4 px-6 py-3 text-sm">
        <a href="mailto:something@gmail.com" className="hidden lg:block hover:underline">
          something@gmail.com
        </a>

        <nav className="hidden md:flex items-center gap-10">
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
                        <Link href="/products" className={productStyles.navContentList}>
                          <AboutMenuIcon type="case" className="size-6 shrink-0 text-black" />
                          <div className={productStyles.budgetingParent}>
                            <b className={productStyles.budgeting}>Products</b>
                            <div className={productStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href="/products" className={productStyles.navContentList2}>
                          <AboutMenuIcon type="globe" className="size-6 shrink-0 text-black" />
                          <div className={productStyles.budgetingParent}>
                            <div className={productStyles.budgeting2}>Solution</div>
                            <div className={productStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href="/products" className={productStyles.navContentList3}>
                          <AboutMenuIcon type="invest" className="size-6 shrink-0 text-black" />
                          <div className={productStyles.budgetingParent}>
                            <div className={productStyles.budgeting2}>Services</div>
                            <div className={productStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href="/products" className={productStyles.mechanicalWrapper}>
                          <b className={productStyles.mechanical}>Mechanical</b>
                        </Link>
                        <Link href="/products" className={productStyles.mechanicalContainer}>
                          <b className={productStyles.mechanical}>Mechanical</b>
                        </Link>
                        <Link href="/products" className={productStyles.liIonBatteryRecyclingPlantWrapper}>
                          <div className={productStyles.liIonBatteryRecycling}>Li-ion Battery Recycling Plant</div>
                        </Link>
                        <Link href="/products" className={productStyles.hydrometallurgicalMetalExtraWrapper}>
                          <div className={productStyles.hydrometallurgicalMetalExtra}>hydrometallurgical  metal extraction plant</div>
                        </Link>
                        <Link href="/products" className={productStyles.eWasteRecyclingLineWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>E-Waste Recycling Line</div>
                        </Link>
                        <Link href="/products" className={productStyles.leachingSystemsWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>Leaching Systems</div>
                        </Link>
                        <Link href="/products" className={productStyles.batteryAssemblyLineWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>Battery Assembly Line</div>
                        </Link>
                        <Link href="/products" className={productStyles.storageTanksWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>Storage Tanks</div>
                        </Link>
                        <Link href="/products" className={productStyles.lithiumIonBatteryRecyclingWrapper}>
                          <div className={productStyles.lithiumIonBatteryRecycling}>Lithium-ion Battery Recycling</div>
                        </Link>
                        <Link href="/products" className={productStyles.metalRefiningHydrometallurWrapper}>
                          <div className={productStyles.metalRefining}>Metal Refining / Hydrometallurgy</div>
                        </Link>
                        <Link href="/products" className={productStyles.comprehensiveEngineeringWrapper}>
                          <div className={productStyles.comprehensiveEngineering}>Comprehensive Engineering</div>
                        </Link>
                        <Link href="/products" className={productStyles.processEngineeringWrapper}>
                          <div className={productStyles.comprehensiveEngineering}>Process Engineering</div>
                        </Link>
                        <Link href="/products" className={productStyles.maintenanceRepairWrapper}>
                          <div className={productStyles.maintenanceRepair}>{`Maintenance & Repair`}</div>
                        </Link>
                        <Link href="/products" className={productStyles.licensingDocumentationWrapper}>
                          <div className={productStyles.licensingDocumentation}>{`Licensing & Documentation `}</div>
                        </Link>
                        <Link href="/products" className={productStyles.recyclingEquipmentWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>Recycling Equipment</div>
                        </Link>
                        <Link href="/products" className={productStyles.filtrationUnitsWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>Filtration Units</div>
                        </Link>
                        <Link href="/products" className={productStyles.eWasteRecyclingWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>E-Waste Recycling</div>
                        </Link>
                        <Link href="/products" className={productStyles.filtrationUnitsContainer}>
                          <div className={productStyles.eWasteRecyclingLine}>Filtration Units</div>
                        </Link>
                        <Link href="/products" className={productStyles.customizedEquipmentDesignWrapper}>
                          <div className={productStyles.customizedEquipmentDesign}>{`Customized Equipment Design & Manufacturing`}</div>
                        </Link>
                        <Link href="/products" className={productStyles.sparesConsumablesWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>{`Spares & Consumables`}</div>
                        </Link>
                        <Link href="/products" className={productStyles.sopTrainingWrapper}>
                          <div className={productStyles.sopTraining}>SOP Training</div>
                        </Link>
                        <Link href="/products" className={productStyles.projectReportsWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>Project Reports</div>
                        </Link>
                        <Link href="/products" className={productStyles.financialModelingWrapper}>
                          <div className={productStyles.eWasteRecyclingLine}>Financial Modeling</div>
                        </Link>
                        <Link href="/products" className={productStyles.financialChannelSupportWrapper}>
                          <div className={productStyles.financialChannelSupport}>Financial Channel Support</div>
                        </Link>
                        <Link href="/products" className={productStyles.seperatorsWrapper}>
                          <div className={productStyles.seperators}>Seperators</div>
                        </Link>
                        <Link href="/products" className={productStyles.neutralizationSystemsWrapper}>
                          <div className={productStyles.neutralizationSystems}>Neutralization Systems</div>
                        </Link>
                        <Link href="/products" className={productStyles.shreddingWrapper}>
                          <div className={productStyles.neutralizationSystems}>Shredding</div>
                        </Link>
                        <Link href="/products" className={productStyles.neutralizationSystemsContainer}>
                          <div className={productStyles.neutralizationSystems}>Neutralization Systems</div>
                        </Link>
                        <Link href="/products" className={productStyles.materialHandlingWrapper}>
                          <div className={productStyles.materialHandling}>Material Handling</div>
                        </Link>
                        <Link href="/products" className={productStyles.reactorsWrapper}>
                          <div className={productStyles.materialHandling}>Reactors</div>
                        </Link>
                        <Link href="/products" className={productStyles.crushingWrapper}>
                          <div className={productStyles.materialHandling}>Crushing</div>
                        </Link>
                        <Link href="/products" className={productStyles.reactorsContainer}>
                          <div className={productStyles.materialHandling}>Reactors</div>
                        </Link>
                        <Link href="/products" className={productStyles.pollutionControlWrapper}>
                          <div className={productStyles.materialHandling}>Pollution Control</div>
                        </Link>
                        <Link href="/products" className={productStyles.separationEquipmentWrapper}>
                          <div className={productStyles.separationEquipment}>Separation Equipment</div>
                        </Link>
                        <Link href="/products" className={productStyles.separationWrapper}>
                          <div className={productStyles.separation}>Separation</div>
                        </Link>
                        <Link href="/products" className={productStyles.separationEquipmentContainer}>
                          <div className={productStyles.separationEquipment}>Separation Equipment</div>
                        </Link>
                        <Link href="/products" className={productStyles.processUtilitiesWrapper}>
                          <div className={productStyles.processUtilities}>Process Utilities</div>
                        </Link>
                        <Link href="/products" className={productStyles.pollutionControlContainer}>
                          <div className={productStyles.pollutionControl2}>Pollution Control</div>
                        </Link>
                        <Link href="/products" className={productStyles.processUtilitiesContainer}>
                          <div className={productStyles.processUtilities}>Process Utilities</div>
                        </Link>
                        <Link href="/products" className={productStyles.chemicalWrapper}>
                          <b className={productStyles.chemical}>{`Chemical `}</b>
                        </Link>
                        <Link href="/products" className={productStyles.chemicalContainer}>
                          <b className={productStyles.chemical}>{`Chemical `}</b>
                        </Link>
                        <div className={productStyles.productsChild} />
                        <div className={productStyles.productsItem} />
                        <div className={productStyles.productsInner} />
                        <div className={productStyles.ellipseDiv} />
                        <div className={productStyles.productsChild2} />
                        <div className={productStyles.productsChild3} />
                        <div className={productStyles.productsChild4} />
                        <div className={productStyles.productsChild5} />
                        <div className={productStyles.productsChild6} />
                        <div className={productStyles.productsChild7} />
                        <div className={productStyles.productsChild8} />
                        <div className={productStyles.productsChild9} />
                        <div className={productStyles.productsChild10} />
                        <div className={productStyles.productsChild11} />
                        <div className={productStyles.productsChild12} />
                        <div className={productStyles.productsChild13} />
                        <div className={productStyles.productsChild14} />
                        <div className={productStyles.productsChild15} />
                        <div className={productStyles.productsChild16} />
                        <div className={productStyles.productsChild17} />
                        <div className={productStyles.productsChild18} />
                        <div className={productStyles.productsChild19} />
                        <div className={productStyles.productsChild20} />
                        <div className={productStyles.productsChild21} />
                        <div className={productStyles.productsChild22} />
                        <div className={productStyles.productsChild23} />
                        <div className={productStyles.productsChild24} />
                        <div className={productStyles.productsChild25} />
                        <div className={productStyles.productsChild26} />
                        <div className={productStyles.productsChild27} />
                        <div className={productStyles.productsChild28} />
                        <div className={productStyles.productsChild29} />
                        <div className={productStyles.productsChild30} />
                        <div className={productStyles.productsChild31} />
                        <div className={productStyles.productsChild32} />
                        <div className={productStyles.productsChild33} />
                        <div className={productStyles.productsChild34} />
                        <div className={productStyles.productsChild35} />
                        <div className={productStyles.productsChild36} />
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
                        <Link href="/sustainability" className={techStyles.navContentList}>
                          <div className={`${techStyles.chartpolarIcon} bg-gray-image`} />
                          <div className={techStyles.budgetingParent}>
                            <div className={techStyles.budgeting}>Sustainability</div>
                            <div className={techStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href="/technologies" className={techStyles.navContentList2}>
                          <div className={`${techStyles.chartpolarIcon} bg-gray-image`} />
                          <div className={techStyles.budgetingParent}>
                            <div className={techStyles.budgeting}>{`Resources `}</div>
                            <div className={techStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href="/technologies" className={techStyles.navContentList3}>
                          <div className={`${techStyles.chartpolarIcon} bg-gray-image`} />
                          <div className={techStyles.budgetingParent}>
                            <div className={techStyles.budgeting}>Digital Tools</div>
                            <div className={techStyles.keepYourSpending} />
                          </div>
                        </Link>
                        <Link href="/technologies" className={techStyles.impactWrapper}>
                          <div className={techStyles.impact}>Impact</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.handManualWrapper}>
                          <div className={techStyles.handManual}>{`Hand Manual `}</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.blackMassCalculatorWrapper}>
                          <div className={techStyles.blackMassCalculator}>Black Mass calculator</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.climateWrapper}>
                          <div className={techStyles.climate}>Climate</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.refnicProductsSolutionBooWrapper}>
                          <div className={techStyles.refnicProducts}>{`Refnic Products & Solution Book `}</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.processDesignWrapper}>
                          <div className={techStyles.processDesign}>Process Design</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.waterWrapper}>
                          <div className={techStyles.water}>Water</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.magazineWrapper}>
                          <div className={techStyles.water}>Magazine</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.resourcesWrapper}>
                          <div className={techStyles.resources}>Resources</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.articlesWrapper}>
                          <div className={techStyles.resources}>Articles</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.circularEconomyWrapper}>
                          <div className={techStyles.circularEconomy}>Circular Economy</div>
                        </Link>
                        <Link href="/technologies" className={techStyles.greenTechWrapper}>
                          <div className={techStyles.greenTech}>Green Tech</div>
                        </Link>
                        <div className={techStyles.trchnologiesChild} />
                        <div className={techStyles.trchnologiesItem} />
                        <div className={techStyles.trchnologiesInner} />
                        <div className={techStyles.ellipseDiv} />
                        <div className={techStyles.trchnologiesChild2} />
                        <div className={techStyles.trchnologiesChild3} />
                        <div className={techStyles.trchnologiesChild4} />
                        <div className={techStyles.trchnologiesChild5} />
                        <div className={techStyles.trchnologiesChild6} />
                        <div className={techStyles.trchnologiesChild7} />
                        <div className={techStyles.trchnologiesChild8} />
                        <div className={techStyles.trchnologiesChild9} />
                        <div className={techStyles.trchnologiesChild10} />
                        <div className={techStyles.trchnologiesChild11} />
                        <Link href="/technologies" className={techStyles.navContentList4}>
                          <div className={`${techStyles.chartpolarIcon4} bg-gray-image`} />
                          <div className={techStyles.frameDiv}>
                            <div className={techStyles.budgeting4}>White papers</div>
                            <div className={techStyles.keepYourSpending4} />
                          </div>
                        </Link>
                        <div className={techStyles.lineDiv} />
                        <div className={`${techStyles.refnicOverview2} bg-gray-image`} />
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

        <Link
          href="/"
          className="font-display font-bold text-2xl tracking-tight text-black"
          aria-label="Refnic"
        >
          <img src="/logo_blue.png" alt="Refnic Logo" className="h-15 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
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
                        <a className={styles.navContentList} href="/our-story">
                          <AboutMenuIcon type="story" className="size-6 shrink-0 text-black" />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>Our Story</div>
                            <div className={styles.keepYourSpending}>How we started and where we’re headed.</div>
                          </div>
                        </a>
                        <a className={styles.navContentList2} href="/global-market">
                          <AboutMenuIcon type="globe" className="size-6 shrink-0 text-black" />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting2}>Global Market</div>
                            <div className={styles.keepYourSpending2}>Perspectives from markets worldwide.</div>
                          </div>
                        </a>
                        <a className={styles.navContentList3} href="/case-study">
                          <AboutMenuIcon type="case" className="size-6 shrink-0 text-black" />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>Case Study</div>
                            <div className={styles.keepYourSpending}>Real results from real businesses.</div>
                          </div>
                        </a>
                        <a className={styles.navContentList4} href="/investors">
                          <AboutMenuIcon type="invest" className="size-6 shrink-0 text-black" />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>Investors</div>
                            <div className={styles.keepYourSpending}>Building value for the future.</div>
                          </div>
                        </a>
                        <a className={styles.navContentList5} href="/indian-market">
                          <AboutMenuIcon type="flag" className="size-6 shrink-0 text-black" />
                          <div className={styles.budgetingParent}>
                            <div className={styles.budgeting}>Indian Market</div>
                            <div className={styles.keepYourSpending}>Insights shaping India’s growth.</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            ) : (
              <a
                key={l.label}
                href={l.label === "Contact" ? "#contact" : l.label === "Newsletters" ? "/newsletter" : "#"}
                className="flex items-center gap-1.5 hover:text-gray-500 transition-colors"
              >
                {l.label}
                {l.caret && <CaretDown />}
              </a>
            )
          )}
        </nav>

        <a href="tel:+919999999999" className="hidden lg:block hover:underline">
          +91 9999999999
        </a>
      </div>
  );
}
