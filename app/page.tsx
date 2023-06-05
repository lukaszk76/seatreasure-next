import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { MovieCanvas } from "@/components/MovieCanvas/MovieCanvas"
import { PointsLogo } from "@/components/PointsLogo/PointsLogo"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <MovieCanvas />
        <PointsLogo />
        <h1
          id="points-logo-button"
          className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl"
        >
          Sea Treasure
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Egipskie rafy koralowe to jedne z najpiękniejszych miejsc na świecie,
          które zachwycają swoją niepowtarzalną urodą. Poznaj je w towarzystwie
          doświadczonych instruktorów, którzy zapewnią Ci bezpieczeństwo i
          komfort.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.facebook}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Dowiedz się więcej
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.facebook}
          className={buttonVariants({ variant: "outline" })}
        >
          Skontaktuj się
        </Link>
      </div>
    </section>
  )
}
