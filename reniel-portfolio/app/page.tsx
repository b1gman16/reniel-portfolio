import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { ContributionHeatmap } from "@/components/sections/ContributionHeatmap";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { GitHubProjects } from "@/components/sections/GitHubProjects";
import { Hero } from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/Skeleton";
import { SonarGrid } from "@/components/ui/sonar-grid";

export const revalidate = 1800; // refresh GitHub-backed sections every 30 minutes, no redeploy needed

export default function Home() {
  return (
    <>
      {/* Full-page decorative field: fixed behind all content, taps anywhere send a ring.
          No color prop: dots use the theme's ink color, so they flip with dark mode. */}
      <SonarGrid
        fixed
        spacing={28}
        baseOpacity={0.14}
        ringWidth={80}
        amplitude={1.6}
        pingEvery={3}
        pingArea={[0.05, 0.05, 0.95, 0.95]}
      />
      <Sidebar />
      <main className="lg:ml-[264px]">
        <Hero />
        <div id="work" className="grid grid-cols-12 gap-4 p-4 md:gap-5 md:p-10">
          <FeaturedProjects />
          <Suspense fallback={<Skeleton className="col-span-12 h-80 lg:col-span-8" />}>
            <GitHubProjects />
          </Suspense>
          <Capabilities />
          <Suspense fallback={<Skeleton className="col-span-12 h-64" />}>
            <ContributionHeatmap />
          </Suspense>
          <About />
          <Contact />
        </div>
        <footer className="label border-t border-line px-6 py-6 text-muted md:px-10">© {new Date().getFullYear()} Reniel Tejones</footer>
      </main>
    </>
  );
}