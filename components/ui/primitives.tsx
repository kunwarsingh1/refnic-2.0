import { ReactNode } from "react";
import Link from "next/link";

export function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  href,
}: {
  children: ReactNode;
  variant?: "primary" | "outline";
  icon?: ReactNode;
  className?: string;
  href?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-none px-7 py-[16px] text-[16px] font-bold leading-none whitespace-nowrap transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent-blue text-white hover:bg-accent-blue-dark"
      : "bg-white text-black border border-gray-300 hover:bg-gray-50";
  const cls = `${base} ${styles} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {icon}
        {children}
      </Link>
    );
  }
  return (
    <button className={cls}>
      {icon}
      {children}
    </button>
  );
}

/** Grayscale render/photo placeholder (no real image assets in the file). */
export function ImagePlaceholder({
  className = "",
  dark = false,
  tone,
}: {
  className?: string;
  dark?: boolean;
  tone?: number;
}) {
  const tones = [
    "rgba(255,255,255,0.08)",
    "rgba(46,75,224,0.40)",
    "rgba(138,155,255,0.35)",
    "rgba(110,200,160,0.35)",
  ];
  const t =
    tone !== undefined
      ? tones[tone % tones.length]
      : dark
        ? "rgba(255,255,255,0.08)"
        : "#eceef2";
  return (
    <div
      className={`relative overflow-hidden ${dark ? "bg-navy-800" : "bg-gray-image"} ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, ${t} 0px, ${t} 1px, transparent 1px, transparent 12px)`,
      }}
    />
  );
}

export function CaretDown({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 7.5L14.5 11L9 14.5V7.5Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M19 12H5m0 0l6-6m-6 6l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Simple line icon used for the About Us mega-menu items. */
function MenuIcon({ type }: { type: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "story":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
          <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
          <path d="M9 8h7M9 11h4" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
        </svg>
      );
    case "case":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M3 6h18v13H3z" />
          <path d="M8 6V4h8v2" />
          <path d="M3 11h18" />
          <path d="M7 14l2.5 2.5 2-2.5 2 2.5 3-4" />
        </svg>
      );
    case "invest":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M12 3v18M16 7c0-1.6-1.8-3-4-3S8 5.4 8 7s1.8 3 4 3 4 1.4 4 3-1.8 3-4 3-4-1.4-4-3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M5 3h14v18l-7-4-7 4V3Z" />
        </svg>
      );
  }
}

export function AboutMenuIcon({ type, className = "" }: { type: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-lg ${className}`}>
      <MenuIcon type={type} />
    </div>
  );
}

/** Process step icons (flask, CAD monitor, hopper, shredder, crane, plant). */
export function ProcessIcon({ type, className = "" }: { type: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const svgProps = { ...common, className, "aria-hidden": true };
  switch (type) {
    case "flask":
      return (
        <svg viewBox="0 0 24 24" {...svgProps}>
          <path d="M9 3h6M10 3v4.5L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 7.5V3" />
          <path d="M7.5 14.5h9" />
        </svg>
      );
    case "monitor":
      return (
        <svg viewBox="0 0 24 24" {...svgProps}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
          <path d="M6.5 13l2-2.5 2 1.5 2.5-4 2.5 3 1.5-1.5" />
        </svg>
      );
    case "hopper":
      return (
        <svg viewBox="0 0 24 24" {...svgProps}>
          <path d="M8 3h8l3 4.5H5L8 3Z" />
          <path d="M5 7.5h14v2H5z" />
          <path d="M6.5 9.5h11l-1.5 9a2 2 0 0 1-2 1.5H10a2 2 0 0 1-2-1.5l-1.5-9Z" />
        </svg>
      );
    case "shredder":
      return (
        <svg viewBox="0 0 24 24" {...svgProps}>
          <path d="M8 5h8l2.5 4.5h-13L8 5Z" />
          <path d="M5.5 9.5h13" />
          <path d="M6.5 9.5v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7" />
          <path d="M4 20h16" />
        </svg>
      );
    case "crane":
      return (
        <svg viewBox="0 0 24 24" {...svgProps}>
          <path d="M4 20h16M5.5 20V9h6" />
          <path d="M7 5h10v4H7z" />
          <path d="M13.5 9v8.5h6V9" />
          <path d="M19.5 9L15 14.5" />
          <path d="M15 14.5a1.5 1.5 0 1 0 1.5 1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...svgProps}>
          <path d="M3 20h18" />
          <path d="M5 20V12.5h4V20M10 20V9.5h4V20M15 20V11h4v9" />
          <path d="M7 14v-2M12 11.5v-2M17 13v-2" />
        </svg>
      );
  }
}

/** Decorative mineral/rock crystal graphic. */
export function Crystal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="refnic-crystal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e4be0" />
          <stop offset="55%" stopColor="#8a9bff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e9edff" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <path
        d="M100 8L168 62L140 180L100 196L60 180L32 62L100 8Z"
        fill="url(#refnic-crystal)"
        stroke="#dfe4ff"
        strokeWidth="1"
      />
      <path d="M100 8L100 196" stroke="#dfe4ff" strokeWidth="1" opacity="0.6" />
      <path d="M100 8L60 180M100 8L140 180M32 62L100 8L168 62" stroke="#dfe4ff" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/** Large raw mineral crystal cluster (amethyst/geode style) used on hero corners. */
export function CrystalCluster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 330" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="refnic-cluster-body" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#05080f" />
          <stop offset="55%" stopColor="#0e1740" />
          <stop offset="100%" stopColor="#1d2f6e" />
        </linearGradient>
        <linearGradient id="refnic-cluster-facet" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#070b18" />
          <stop offset="100%" stopColor="#2e4be0" />
        </linearGradient>
      </defs>

      <ellipse cx="200" cy="326" rx="235" ry="44" fill="#04060d" />

      <g fill="url(#refnic-cluster-body)">
        <path d="M150 320 L176 150 L186 60 L196 20 L214 80 L224 170 L250 320 Z" fillOpacity="0.95" />
        <path d="M40 320 L70 200 L82 120 L90 60 L108 110 L118 210 L150 320 Z" fillOpacity="0.9" />
        <path d="M255 320 L282 180 L296 90 L308 40 L322 100 L330 190 L355 320 Z" fillOpacity="0.92" />
        <path d="M-10 320 L15 230 L30 150 L52 90 L70 170 L84 260 L118 320 Z" fillOpacity="0.84" />
        <path d="M300 320 L322 250 L336 170 L352 80 L368 160 L376 250 L410 320 Z" fillOpacity="0.86" />
        <path d="M-30 320 L0 260 L12 210 L24 160 L34 230 L46 300 L60 320 Z" fillOpacity="0.78" />
        <path d="M352 320 L366 270 L378 220 L392 150 L400 220 L406 282 L432 320 Z" fillOpacity="0.8" />
        <path d="M96 296 L108 260 L120 296 Z" fillOpacity="0.7" />
        <path d="M252 302 L262 268 L272 302 Z" fillOpacity="0.7" />
        <path d="M316 306 L326 282 L336 306 Z" fillOpacity="0.7" />
      </g>

      <g fill="url(#refnic-cluster-facet)" fillOpacity="0.14">
        <path d="M196 20 L182 210 L200 320 L218 210 Z" />
        <path d="M90 60 L76 215 L92 320 L108 215 Z" />
        <path d="M308 40 L294 200 L310 320 L326 200 Z" />
        <path d="M52 90 L38 240 L54 320 L70 240 Z" />
        <path d="M352 80 L338 230 L354 320 L370 230 Z" />
        <path d="M24 160 L10 250 L26 320 L42 250 Z" />
      </g>

      <g stroke="#5b74ff" strokeOpacity="0.4" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M196 20 L200 320" />
        <path d="M196 20 L172 320 M196 20 L226 320" />
        <path d="M90 60 L95 320" />
        <path d="M90 60 L68 320 M90 60 L118 320" />
        <path d="M308 40 L306 320" />
        <path d="M308 40 L286 320 M308 40 L334 320" />
        <path d="M52 90 L52 320" />
        <path d="M52 90 L32 320 M52 90 L80 320" />
        <path d="M352 80 L354 320" />
        <path d="M352 80 L332 320 M352 80 L382 320" />
        <path d="M24 160 L15 320" />
        <path d="M24 160 L8 320 M24 160 L40 320" />
        <path d="M392 150 L392 320" />
        <path d="M392 150 L374 320 M392 150 L412 320" />
      </g>

      <g stroke="#8aa0ff" strokeOpacity="0.22" strokeWidth="0.75" strokeLinecap="round">
        <path d="M150 320 L186 60" />
        <path d="M250 320 L214 80" />
        <path d="M40 320 L82 120" />
        <path d="M150 320 L108 110" />
        <path d="M255 320 L296 90" />
        <path d="M355 320 L322 100" />
        <path d="M-10 320 L30 150" />
        <path d="M118 320 L70 170" />
        <path d="M300 320 L336 170" />
        <path d="M410 320 L368 160" />
        <path d="M-30 320 L12 210" />
        <path d="M60 320 L34 230" />
        <path d="M352 320 L378 220" />
        <path d="M432 320 L400 220" />
      </g>
    </svg>
  );
}

/** Rock graphic dripping into the stats timeline. */
export function RockDrip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 200" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="refnic-rock" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a57ea" />
          <stop offset="100%" stopColor="#0d1533" />
        </linearGradient>
      </defs>
      <path d="M30 4c7 8 11 15 11 24 0 9-5 13-11 13s-11-4-11-13c0-9 4-16 11-24Z" fill="url(#refnic-rock)" />
      <path d="M30 48c-4 4-5.5 8.5-5.5 13 0 6 2.5 9 5.5 9s5.5-3 5.5-9c0-4.5-1.5-9-5.5-13Z" fill="#2e4be0" />
      <path d="M30 100c-3 3-4 6-4 9.5 0 4.5 1.8 6.5 4 6.5s4-2 4-6.5c0-3.5-1-6.5-4-9.5Z" fill="#243bc0" opacity="0.85" />
    </svg>
  );
}
