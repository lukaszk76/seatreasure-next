"use client"

import React, { useLayoutEffect } from "react"
import Link from "next/link"
import { ExampleSection } from "@/sections/ExampleSection"
import Lenis from "@studio-freight/lenis"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { MovieCanvas } from "@/components/MovieCanvas/MovieCanvas"
import { PointsLogo } from "@/components/PointsLogo/PointsLogo"

import "./page.css"

export default function IndexPage() {
  useLayoutEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div className="container">
      <section className="grid items-center gap-6 pb-8 pt-6 md:py-10">
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
            Egipskie rafy koralowe to jedne z najpiękniejszych miejsc na
            świecie, które zachwycają swoją niepowtarzalną urodą. Poznaj je w
            towarzystwie doświadczonych instruktorów, którzy zapewnią Ci
            bezpieczeństwo i komfort.
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
      <ExampleSection />
    </div>
  )
}
