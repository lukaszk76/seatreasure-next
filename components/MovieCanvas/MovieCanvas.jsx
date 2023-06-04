"use client"

import React, { memo, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "./MovieCanvas.css"
import { initThreeJS } from "./ThreeJSCode.js"

export const MovieCanvas = memo(() => {
  useLayoutEffect(() => {
    initThreeJS()
    gsap.registerPlugin(ScrollTrigger)
    gsap.to("#webgl", {
      scrollTrigger: {
        trigger: "#webgl",
        start: "top 0%",
        end: "bottom 0%",
        scrub: true,
      },
      xPercent: 100,
    })
  }, [])

  return (
    <div id="animated-background-hero">
      <video id="video" autoPlay muted loop>
        <source src="/fishes.mp4" type="video/mp4" />
      </video>
      <canvas id="webgl"></canvas>
    </div>
  )
})

MovieCanvas.displayName = "MovieCanvas"
