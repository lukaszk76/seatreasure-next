"use client"

import React, { memo, useLayoutEffect } from "react"

import Sketch from "./Sketch.js"
import "./PointsLogo.css"

export const PointsLogo = memo(() => {
  useLayoutEffect(() => {
    const sketch = new Sketch({
      dom: document.getElementById("points-logo"),
    })
    sketch.startAnimation()
  }, [])
  return <div id="points-logo"></div>
})

PointsLogo.displayName = "PointsLogo"
