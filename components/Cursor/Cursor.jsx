"use client"

import React, { useLayoutEffect } from "react"

import "@lottiefiles/lottie-player"
import "./Cursor.css"

const updateProperties = (elem, state) => {
  elem.style.setProperty("--x", `${state.x}px`)
  elem.style.setProperty("--y", `${state.y}px`)
  elem.style.setProperty("--width", `${state.width}px`)
  elem.style.setProperty("--height", `${state.height}px`)
  elem.style.setProperty("--radius", state.radius)
  elem.style.setProperty("--scale", state.scale)
  elem.style.setProperty("--rotate", state.rotate)
  elem.style.opacity = state.opacity
}

function twisterMath(x, y, xShapeCenter, yShapeCenter) {
  return Math.atan2(x - xShapeCenter, -(y - yShapeCenter)) * (180 / Math.PI)
}

const addCursorPointer = () => {
  const cursorPointer = document.querySelector(".cursor-pointer")
  let timeout
  let onElement
  document.querySelectorAll("a, button, .selectable").forEach((elem) => {
    elem.addEventListener("mouseenter", () => (onElement = elem))
    elem.addEventListener("mouseleave", () => (onElement = null))
  })

  document.addEventListener("mousemove", (e) => {
    let x = e.clientX
    let y = e.clientY
    let border = "solid 3px grey"
    if (onElement) {
      border = "solid 3px yellow"
    }
    cursorPointer.style.border = border
    cursorPointer.style.top = y - 12 + "px"
    cursorPointer.style.left = x - 12 + "px"

    cursorPointer.style.opacity = "1"
    cursorPointer.style.setProperty("transform", "scale(1)")

    function mouseStopped() {
      cursorPointer.style.opacity = "0"
      cursorPointer.style.setProperty("transform", "scale(0)")
    }

    clearTimeout(timeout)
    timeout = setTimeout(mouseStopped, 7000)
  })

  document.querySelectorAll("a, button, .selectable").forEach((elem) => {
    elem.style.cursor = "none"
  })
}

const addOctopus = () => {
  document.querySelectorAll(".cursor").forEach((cursor) => {
    const createState = (e) => {
      const rect = cursor.getBoundingClientRect()
      const xShapeCenter = rect.left + rect.width / 2
      const yShapeCenter = rect.top + rect.height / 2
      const rotate = twisterMath(
        xShapeCenter,
        yShapeCenter,
        e.clientX,
        e.clientY
      )

      return {
        x: e.clientX,
        y: e.clientY,
        width: 200,
        height: 200,
        radius: "0",
        rotate: rotate + "deg",
        opacity: "0.1",
      }
    }

    let timeout
    document.addEventListener("mousemove", (e) => {
      const state = createState(e)
      updateProperties(cursor, state)

      function mouseStopped() {
        cursor.style.opacity = "0"
      }

      clearTimeout(timeout)
      timeout = setTimeout(mouseStopped, 3000)
    })
  })
}

const Cursor = () => {
  useLayoutEffect(() => {
    addCursorPointer()
    addOctopus()
  }, [])

  return (
    <>
      <div className="cursor-pointer" />
      <div className="cursor">
        <div className="cursor-rotate">
          <lottie-player
            autoplay={true}
            loop={true}
            speed={1}
            intermission={0}
            mode="normal"
            src="https://assets4.lottiefiles.com/packages/lf20_diujpwbq.json"
          />
        </div>
      </div>
    </>
  )
}

export default Cursor
