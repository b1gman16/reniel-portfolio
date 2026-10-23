import type { Metadata, Viewport } from "next";
// Fonts are self-hosted from npm packages, so they never depend on a network download.
import "@fontsource-variable/inter"; // body copy
import "@fontsource-variable/geist-mono"; // headings
import "@fontsource-variable/jetbrains-mono"; // system accents
import "./globals.css";

/* Splash screen: true = once per browser session, false = on every page load (handy while tweaking) */
const SHOW_SPLASH_ONCE_PER_SESSION = true;

const description =
  "Reniel Tejones is a Computer Engineer in Cebu, Philippines, building websites, business systems, and intelligent tools.";

export const metadata: Metadata = {
  title: "Reniel Tejones — Computer Engineer / Digital Builder",
  description,
  openGraph: { title: "Reniel Tejones", description, type: "website", locale: "en_PH" },
  twitter: { card: "summary", title: "Reniel Tejones", description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

// Runs before first paint, so there is no theme flash and no flash of the page before the splash.
// 1) theme: saved choice, else the system preference
// 2) splash: mark <html data-splash="on"> unless it was already seen this session or motion is reduced
const bootScript = `
try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}
try{var once=${SHOW_SPLASH_ONCE_PER_SESSION};var seen=once&&sessionStorage.getItem("splash-seen");if(!seen&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.splash="on";document.documentElement.style.overflow="hidden"}}catch(e){}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}