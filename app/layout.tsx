import type { Metadata } from "next";
import "./globals.css";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import InteractiveBackground from "@/components/InteractiveBackground";

export const metadata: Metadata = {
  title: "Reniel Tejones — Builder",
  description:
    "Reniel Tejones — Computer Engineer building digital experiences, systems, and things from ideas.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Reniel Tejones — Builder",
    description:
      "Computer Engineer building digital experiences, systems, and things from ideas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InteractiveBackground />

        <SmoothScroll />
        <Cursor />
        <Nav />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}