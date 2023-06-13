import { gsap } from "gsap"
import fit from "math-fit"
import { Application, Container, Sprite, Texture } from "pixi.js"
import * as PIXI from "pixi.js"

function loadImages(paths, whenLoaded) {
  const imgs = []
  paths.forEach((path) => {
    const img = new Image()
    img.onload = function () {
      imgs.push(img)
      if (imgs.length === paths.length) whenLoaded(imgs)
    }
    img.src = path
  })
}

export class Sketch {
  constructor() {
    this.app = new Application({ resizeTo: window, backgroundAlpha: 0 })
    document.getElementById("render-point").appendChild(this.app.view)
    this.stage = new Container()
    this.app.stage.addChild(this.stage)

    const textures = [
      "/sea1.jpeg",
      "/fishes.png",
      "/sea2.jpeg",
      "/fishes4.png",
      "/fishes6.png",
      "/octopus1.png",
      "/sea3.jpeg",
      "/fishes5.png",
      "/sea4.jpeg",
      "/sea5.jpeg",
      "/sea6.jpeg",
      "/sea7.jpeg",
    ]

    this.margin = 50
    this.width = (window.innerWidth - this.margin * 2) / 3
    this.height = window.innerHeight * 0.8
    this.scroll = 0
    this.prevScroll = 0
    this.thumbs = []

    loadImages(textures, (images) => {
      this.WHOLE_WIDTH = images.length * (this.margin + this.width)
      this.loadedImages = images
      this.add()
      this.addDisplacementFilter()
      this.addScroll()
      this.render()
    })
  }

  addDisplacementFilter() {
    this.displacementSprite = Sprite.from("/displacement.jpg")
    const maskSize = { w: 512, h: 512 }
    const targetSize = { w: window.innerWidth, h: this.height }
    const cover = fit(maskSize, targetSize)
    this.displacementSprite.scale.set(cover.scale, cover.scale)
    this.displacementSprite.position.set(cover.left, cover.top)
    // this.displacementSprite.texture.baseTexture.wrapMode = 1
    // this.displacementSprite.texture.baseTexture.scaleMode = 1

    this.app.stage.addChild(this.displacementSprite)

    this.displacementFilter = new PIXI.filters.DisplacementFilter(
      this.displacementSprite
    )

    this.displacementFilter.scale.y = 0
    this.displacementFilter.scale.x = 1

    this.stage.filters = [this.displacementFilter]
  }
  addScroll() {
    const element = document.getElementById("render-point")
    const scrollWidth = this.thumbs.length * (this.margin + this.width)
    gsap.to(this, {
      scrollTrigger: {
        trigger: element,
        start: `top ${this.margin}`,
        end: `+=${this.height}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
      },
      scroll: scrollWidth,
      ease: "none",
    })
  }

  addImage(img, index) {
    const sprite = new Sprite(Texture.from(img))

    sprite.anchor.set(0.5)
    sprite.position.set(
      sprite.texture.orig.width / 2,
      sprite.texture.orig.height / 2
    )

    const mask = new Sprite(Texture.WHITE)
    mask.width = this.width
    mask.height = this.height

    const image = {
      w: sprite.texture.orig.width,
      h: sprite.texture.orig.height,
    }

    const cover = fit(image, this.parent)

    const container = new Container()

    container.x = index * (this.margin + this.width)
    container.y = this.margin

    const spriteContainer = new Container()

    spriteContainer.position.set(cover.left, cover.top)
    spriteContainer.scale.set(cover.scale)

    container.addChild(mask)
    sprite.mask = mask
    spriteContainer.addChild(sprite)
    container.addChild(spriteContainer)
    this.stage.addChild(container)
    this.thumbs.push(container)

    container.eventMode = "dynamic"
    container.buttonMode = true
    container.on("mouseover", this.onMouseOver)
    container.on("mouseout", this.onMouseOut)
  }

  onMouseOver(e) {
    const element = e.currentTarget.children[1].children[0]
    gsap.to(element.scale, {
      x: 1.1,
      y: 1.1,
      duration: 0.5,
      ease: "sine.out",
    })
  }

  onMouseOut(e) {
    const element = e.currentTarget.children[1].children[0]
    gsap.to(element.scale, {
      x: 1,
      y: 1,
      duration: 0.5,
      ease: "sine.out",
    })
  }

  calcPosition(scroll, position) {
    return (
      ((position + scroll + this.WHOLE_WIDTH + this.width + this.margin) %
        this.WHOLE_WIDTH) -
      this.margin -
      this.width
    )
  }

  render() {
    this.app.ticker.add(() => {
      const delta = this.scroll - this.prevScroll
      this.prevScroll = this.scroll

      this.displacementFilter.scale.x = -1.5 * delta

      this.thumbs.forEach((thumb) => {
        thumb.x = this.calcPosition(delta, thumb.x)
      })

      this.app.renderer.render(this.stage)
    })
  }

  add() {
    this.parent = {
      w: this.width,
      h: this.height,
    }
    this.loadedImages.forEach((image, index) => {
      this.addImage(image, index)
    })
  }
}
