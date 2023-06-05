import React from "react"
import { ExampleSection } from "@/sections/ExampleSection"
import HeroSection from "@/sections/HeroSection"

export default function IndexPage() {
  return (
    <div className="container">
      <HeroSection />
      <ExampleSection />
    </div>
  )
}
