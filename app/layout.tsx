import type { Metadata } from "next";
import "./globals.css";

// NOTE: This sandbox has no network access to fonts.googleapis.com, so plain
// CSS font stacks are used here. In an environment with network access,
// swap these back to `next/font/google` for Plus Jakarta Sans / DM Sans / Inter
// (the exact families used in the Figma file), e.g.:
//
//   import { Plus_Jakarta_Sans, DM_Sans, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Refnic",
  description:
    "Engineering the technologies that transform industrial waste into critical materials powering a cleaner, circular future through indigenous innovation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full overflow-x-hidden antialiased">
      <body className="min-h-full flex flex-col font-sans text-black bg-black">
        {children}
      </body>
    </html>
  );
}
