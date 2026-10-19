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
        {/* Screen 1: hero */}
        <Hero />

        {/* Screen 2: featured projects, fitted to the visible height */}
        <section id="work" aria-label="Selected work" className="screen p-4 md:p-10">
          <div className="fit-screen grid grid-cols-12 gap-4 md:gap-5 lg:grid-rows-1">
            <FeaturedProjects />
          </div>
        </section>

        {/* Screen 3: repositories + capabilities */}
        <section id="repos" aria-label="Repositories and capabilities" className="screen p-4 md:p-10">
          <div className="grid grid-cols-12 gap-4 md:gap-5">
            <Suspense fallback={<Skeleton className="col-span-12 h-80 lg:col-span-8" />}>
              <GitHubProjects />
            </Suspense>
            <Capabilities />
          </div>
        </section>

        {/* Screen 4: activity, background, contact */}
        <section aria-label="Activity, background and contact" className="screen p-4 md:p-10">
          <div className="grid grid-cols-12 gap-4 md:gap-5">
            <Suspense fallback={<Skeleton className="col-span-12 h-64" />}>
              <ContributionHeatmap />
            </Suspense>
            <About />
            <Contact />
          </div>
          <p className="label mt-5 text-muted">© {new Date().getFullYear()} Reniel Tejones</p>
        </section>
      </main>
    </>
  );
}