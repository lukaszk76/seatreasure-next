import * as THREE from "three"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass"

import fragmentShader from "./glsl/fragment.glsl"
import vertexShader from "./glsl/vertex.glsl"

let imageRatio = 1024 / 590

async function getTexture() {
  const video = document.getElementById("video")
  return new THREE.VideoTexture(video)
}
function getScene() {
  return new THREE.Scene()
}

function getGeometry() {
  return new THREE.PlaneGeometry(1, 1, 1, 1)
}

async function getMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: await getTexture() },
      resolution: { value: new THREE.Vector4() },
      uMouse: { value: new THREE.Vector4() },
    },
    vertexShader,
    fragmentShader,
  })
}

async function getMesh() {
  return new THREE.Mesh(getGeometry(), await getMaterial())
}

function getCamera() {
  const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5)
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 3

  return camera
}

function getRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth / 2, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  return renderer
}

function getResolution() {
  const width = window.innerWidth / 2
  const height = window.innerHeight

  return { x: width, y: height, z: imageRatio, w: 1 }
}

async function getComposer(renderer, scene, camera) {
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth / 2, window.innerHeight),
    1.5,
    0.4,
    0.85
  )
  bloomPass.threshold = 0.95
  bloomPass.strength = 0.5
  bloomPass.radius = 0.2

  composer.addPass(bloomPass)

  return composer
}

export async function initThreeJS() {
  const canvas = document.querySelector("#webgl")
  const scene = getScene()
  const renderer = getRenderer(canvas)
  const camera = getCamera()
  const composer = await getComposer(renderer, scene, camera)
  // const rgbShiftShader = new ShaderPass(RGBShiftShader)
  // rgbShiftShader.uniforms["amount"].value = 0.0002
  // composer.addPass(rgbShiftShader)

  const videoPlane = await getMesh()

  const clock = new THREE.Clock()

  const mouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    speedX: 0,
    speedY: 0,
  }

  scene.add(videoPlane)
  scene.add(camera)

  function onResize() {
    const resolution = getResolution()

    camera.aspect = resolution.x / resolution.y
    camera.updateProjectionMatrix()

    videoPlane.material.uniforms.resolution.value = resolution
    videoPlane.material.uniforms.needsUpdate = true

    renderer.setSize(resolution.x, resolution.y)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    composer.setSize(resolution.x, resolution.y)
  }

  window.addEventListener("resize", () => {
    onResize()
  })

  onResize()

  function onMouseMove(e) {
    mouse.prevX = mouse.x
    mouse.prevY = mouse.y
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = 1 - (e.clientY + window.scrollY) / window.innerHeight
    const speedX = Math.abs(mouse.x - mouse.prevX)
    const speedY = Math.abs(mouse.y - mouse.prevY)
    if (speedX > mouse.speedX) {
      mouse.speedX = speedX
    }
    if (speedY > mouse.speedY) {
      mouse.speedY = speedY
    }
  }

  window.addEventListener("mousemove", (e) => {
    onMouseMove(e)
  })

  const tick = () => {
    if (!renderer) return

    const elapsedTime = clock.getElapsedTime()
    mouse.speedX *= 0.98
    mouse.speedY *= 0.98

    // rgbShiftShader.uniforms["amount"].value =
    //   Math.sqrt(mouse.speedX * mouse.speedX + mouse.speedY * mouse.speedY) * 0.1
    videoPlane.material.uniforms.uTime.value = elapsedTime * 1.1
    videoPlane.material.uniforms.uMouse.value = new THREE.Vector4(
      mouse.x,
      mouse.y,
      mouse.speedX,
      mouse.speedY
    )
    videoPlane.material.uniforms.needsUpdate = true

    composer.render()
    window.requestAnimationFrame(tick)
  }

  tick()
}
