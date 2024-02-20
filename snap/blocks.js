import {
  Label,
  Icon,
  Input,
  Block,
  Comment,
  Glow,
  Script,
  Document,
  extensions,
  movedExtensions,
  aliasExtensions,
} from "../syntax/index.js"

import SVG from "./draw.js"

import style from "./style.js"
const {
  defaultFontFamily,
  makeStyle,
  makeIcons,
  darkRect,
  bevelFilter,
  darkFilter,
  dropShadowFilter,
  lightFilter,
} = style

const unicodeIcons = {}
const categoryAliases = {
  ...aliasExtensions,
  events: "control",
  custom: "other",
}

export class LabelView {
  constructor(label) {
    Object.assign(this, label)

    this.el = null
    this.height = 10
    this.metrics = null
    this.x = 0
  }

  get isLabel() {
    return true
  }

  draw(options) {
    if (!options.isFlat) {
      this.el.classList.add("snap-drop-shadow")
    }
    return this.el
  }

  get width() {
    return this.metrics.width
  }

  measure() {
    const value = this.value
    const cls = `snap-${this.cls}`

    let lines = value.split("\n")
    let group = []

    let y = 0
    for (let line of lines) {
      y += 10
      group.push(
        SVG.text(0, y, line, {
          class: `snap-label ${cls}`,
        }),
      )
    }
    this.height = y + 2

    this.el = SVG.group(group)

    let cache = LabelView.metricsCache[cls]
    if (!cache) {
      cache = LabelView.metricsCache[cls] = Object.create(null)
    }

    if (Object.hasOwnProperty.call(cache, value)) {
      this.metrics = cache[value]
    } else {
      const font = /comment-label/.test(this.cls)
        ? "bold 12px Helvetica, Arial, DejaVu Sans, sans-serif"
        : /literal/.test(this.cls)
        ? `normal 9px Arial, DejaVu Sans, sans-serif`
        : `bold 10px ${defaultFontFamily}`
      this.metrics = cache[value] = LabelView.measure(value, font)
      // TODO: word-spacing? (fortunately it seems to have no effect!)
      // TODO: add some way of making monospaced
    }
  }

  static measure(value, font) {
    const context = LabelView.measuring
    context.font = font
    let lines = value.split("\n")
    let width = 0
    for (let line of lines) {
      const textMetrics = context.measureText(line)
      width = Math.max(width, textMetrics.width)
    }

    width = (width + 3) | 0
    return { width: width }
  }
}

LabelView.metricsCache = {}
LabelView.toMeasure = []

class IconView {
  constructor(icon) {
    Object.assign(this, icon)

    this.padx = 4

    const info = IconView.icons[this.name]
    if (!info) {
      throw new Error(`no info for icon: ${this.name}`)
    }
    Object.assign(this, info)

    if (isNaN(this.scale) || this.scale <= 0) {
      this.scale = 1
    }

    this.scale =
      !isNaN(icon.scale) && icon.scale !== null
        ? icon.scale
        : isNaN(this.scale) || this.scale == null
        ? 1
        : this.scale
    this.r =
      !isNaN(icon.r) && icon.r !== null
        ? icon.r
        : isNaN(this.r) || this.r == null
        ? 255
        : this.r
    this.g =
      !isNaN(icon.g) && icon.g !== null
        ? icon.g
        : isNaN(this.g) || this.g == null
        ? 255
        : this.g
    this.b =
      !isNaN(icon.b) && icon.b !== null
        ? icon.b
        : isNaN(this.b) || this.b == null
        ? 255
        : this.b

    if (this.scale <= 0) {
      this.scale = 1
    }

    if (isNaN(this.r) || this.r == null) {
      this.r = 255
    }

    this.width = this.width * this.scale
    this.height = this.height * this.scale

    if (!this.fillAttribute) {
      this.fillAttribute = "fill"
    }
  }

  get isIcon() {
    return true
  }

  draw(options) {
    let props = {
      width: this.width,
      height: this.height,
      transform: `scale(${this.scale})`,
    }
    if (Array.isArray(this.fillAttribute)) {
      for (const fillAttribute of this.fillAttribute) {
        props[fillAttribute] = SVG.rgbToHex(this.r, this.g, this.b)
      }
    } else {
      props[this.fillAttribute] = SVG.rgbToHex(this.r, this.g, this.b)
    }
    let symbol = SVG.setProps(SVG.symbol(`#snap-${this.name}`), props)
    if (!options.isFlat) {
      symbol.classList.add("snap-drop-shadow")
    }
    return symbol
  }

  static get icons() {
    return {
      greenFlag: {
        width: 12,
        height: 12,
        dy: 0,
        scale: 1.5,
        r: 0,
        g: 200,
        b: 0,
        fillAttribute: "stroke",
      },
      stopSign: { width: 21, height: 21, r: 200, g: 0, b: 0 },
      turnLeft: { width: 10, height: 12, dy: +1 },
      turnRight: { width: 10, height: 12, dy: +1 },
      loopArrow: { width: 24, height: 12, fillAttribute: ["stroke", "fill"] },
      addInput: { width: 5, height: 12, r: 0, g: 0, b: 0 },
      delInput: { width: 5, height: 12, r: 0, g: 0, b: 0 },
      verticalEllipsis: {
        width: 2,
        height: 12,
        scale: 0.833333333,
        r: 0,
        g: 0,
        b: 0,
      },
      list: { width: 12, height: 14 },
      pointRight: { width: 12, height: 12 },
      turtle: { width: 18, height: 12, dy: +1 },
      turtleOutline: { width: 18, height: 12, dy: +1, fillAttribute: "stroke" },
      pause: { width: 12, height: 12, dy: +1, r: 255, g: 220, b: 0 },
      cloud: { width: 20, height: 12 },
      cloudOutline: { width: 20, height: 12, fillAttribute: "stroke" },
      flash: { width: 10, height: 12 },
      camera: { width: 12, height: 12 },
      circle: { width: 12, height: 12, r: 255, g: 0, b: 0 },

      arrowUp: { width: 12, height: 12 },
      arrowUpOutline: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowUpThin: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowDown: { width: 12, height: 12 },
      arrowDownOutline: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowDownThin: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowLeft: { width: 12, height: 12 },
      arrowLeftOutline: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowLeftThin: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowRight: { width: 12, height: 12 },
      arrowRightOutline: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowRightThin: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowUpDownThin: { width: 12, height: 12, fillAttribute: "stroke" },
      arrowLeftRightThin: { width: 12, height: 12, fillAttribute: "stroke" },

      plusSign: { width: 6, height: 14, dy: 12, padx: 0 },
    }
  }
}

class InputView {
  constructor(input) {
    Object.assign(this, input)
    if (input.label) {
      this.label = newView(input.label)
    }

    this.x = 0
  }

  measure() {
    if (this.hasLabel) {
      this.label.measure()
    }
  }

  static get shapes() {
    return {
      string: SVG.rect,
      number: SVG.roundedRect,
      "number-dropdown": SVG.roundedRect,
      color: SVG.rect,
      dropdown: SVG.rect,

      boolean: SVG.pointedRectInput,
      stack: SVG.stackRect,
      reporter: SVG.roundedRect,
      ring: SVG.roundedRect,
    }
  }

  draw(options, parent) {
    let w
    let label
    if (this.hasLabel) {
      label = this.label.draw({
        ...options,
        isFlat: true,
      })
      w = Math.max(
        this.shape === "string" ? 8 : 11,
        this.label.width +
          (this.shape === "string"
            ? 1
            : this.shape === "number-dropdown"
            ? 16
            : 11),
      )
    } else {
      w = this.isBoolean ? 22 : this.isInset ? 30 : this.isColor ? 14 : null
    }

    let h = this.hasLabel ? this.label.height : 13

    if (this.isBoolean) {
      h -= 2
    }

    this.width = w
    this.height = h

    let el = InputView.shapes[this.shape](w, h)
    if (this.isColor) {
      SVG.setProps(el, {
        fill: this.value,
      })
    } else if (this.isDarker) {
      el = darkRect(w, h, parent.info.category, el)
      if (parent.info.color) {
        SVG.setProps(el, {
          fill: parent.info.color,
        })
      }
    }

    const result = SVG.group([
      SVG.setProps(el, {
        class: `${!options.isFlat ? "snap-input-bevel" : ""} snap-input-${
          this.shape
        }`,
      }),
    ])
    if (this.hasLabel) {
      const x = this.isRound ? 6 : 2
      result.appendChild(SVG.move(x, 0, label))
    }
    if (this.hasArrow) {
      const y = 4
      result.appendChild(
        SVG.move(
          w - 12,
          y,
          SVG.polygon({
            points: [1, 1, 11, 1, 6, 6],
            fill: "#000",
          }),
        ),
      )
    }
    return result
  }
}

class BlockView {
  constructor(block) {
    Object.assign(this, block)
    this.children = block.children.map(newView)
    this.comment = this.comment ? newView(this.comment) : null

    if (
      Object.prototype.hasOwnProperty.call(categoryAliases, this.info.category)
    ) {
      // handle aliases first
      this.info.category = categoryAliases[this.info.category]
    }
    if (
      Object.prototype.hasOwnProperty.call(movedExtensions, this.info.category)
    ) {
      this.info.category = movedExtensions[this.info.category]
    } else if (
      Object.prototype.hasOwnProperty.call(extensions, this.info.category)
    ) {
      this.info.category = "extension"
    }

    this.x = 0
    this.width = null
    this.height = null
    this.firstLine = null
    this.innerWidth = null
    this.strokeWidth = 1
    this.isSuperSnap = false
    this.isZebra = false
  }

  get isBlock() {
    return true
  }

  measure() {
    for (const child of this.children) {
      if (child.measure) {
        child.measure()
      }
    }
    if (this.comment) {
      this.comment.measure()
    }
  }

  static get shapes() {
    return {
      stack: SVG.stackRect,
      "c-block": SVG.stackRect,
      "if-block": SVG.stackRect,
      celse: SVG.stackRect,
      cend: SVG.stackRect,

      cap: SVG.capRect,
      reporter: SVG.roundedRect,
      boolean: SVG.pointedRect,
      hat: SVG.hatRect,
      cat: SVG.hatRect,
      "define-hat": SVG.hatRect,
      "snap-define": SVG.hatRect,
      ring: SVG.roundedRect,
    }
  }

  drawSelf(options, w, h, lines) {
    // mouths
    if (lines.length > 1) {
      let y = lines[0].totalHeight
      const p = []
      if (this.info.shape === "stack") {
        p.push(SVG.getTop(w))
      } else if (
        this.info.shape === "reporter" ||
        (this.info.shape === "ring" && !this.isSuperSnap)
      ) {
        p.push(SVG.getRoundedTop(w, h))
      } else if (this.info.shape === "ring" && this.isSuperSnap) {
        p.push(SVG.getRingTop(w, h))
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedTop(w, h))
      } else if (
        ["hat", "snap-define", "define-hat"].includes(this.info.shape)
      ) {
        p.push(SVG.getHatTop(w, h))
      } else {
        p.push(SVG.getTop(w))
      }
      let addBottom = true
      let hasNotch = true
      let inset = 0
      let isLast = false
      let showBooleanRight = true
      for (let i = 1; i < lines.length; i += 1) {
        isLast = i + 2 === lines.length

        if (lines[i] instanceof ScriptView) {
          p.push(
            SVG.getRightAndBottom(
              w - (this.info.shape === "boolean") * 9,
              y,
              true,
              8,
            ),
          )
          y += lines[i].height - 3
          p.push(SVG.getArm(w - (this.info.shape === "boolean") * 9, y, 8))

          hasNotch = !(isLast && this.isFinal)
          inset = isLast ? 0 : 2
          y += lines[i + 1].totalHeight + 3
          addBottom = false
          showBooleanRight = false
          i++
        } else {
          y += lines[i].totalHeight
          addBottom = true
        }
      }
      if (this.info.shape === "stack") {
        p.push(SVG.getRightAndBottom(w, h, !this.isFinal, 0))
      } else if (
        this.info.shape === "reporter" ||
        (this.info.shape === "ring" && !this.isSuperSnap)
      ) {
        p.push(SVG.getRoundedBottom(w, h))
      } else if (this.info.shape === "ring" && this.isSuperSnap) {
        p.push(SVG.getRingBottom(w, h))
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedBottom(w, h, showBooleanRight))
      } else {
        p.push(SVG.getRightAndBottom(w, h, !this.isFinal, 0))
      }
      p.push("Z")
      let el = SVG.path({
        class: `snap-${this.info.category} ${
          options.isFlat ? "snap-flat" : "snap-bevel"
        }`,
        path: p,
      })

      if (options.isFlat) {
        SVG.setProps(el, {
          "clip-path": `path('${SVG.translatePath(
            this.strokeWidth / 2,
            this.strokeWidth / 2,
            p.join(" "),
          )}')`,
        })
      }

      if (this.isZebra) {
        el = this.applyZebra(el)
      }
      el.classList.add(options.isFlat ? "snap-flat" : "snap-bevel")

      return el
    }

    // outlines
    if (/outline-\w+/.test(this.info.shape)) {
      if (this.info.shape === "outline-stack") {
        return SVG.setProps(SVG.stackRect(w, h), {
          class: "snap-outline",
        })
      } else if (this.info.shape === "outline-reporter") {
        return SVG.setProps(SVG.roundedRect(w, h), {
          class: "snap-outline",
        })
      } else if (this.info.shape === "outline-boolean") {
        return SVG.setProps(SVG.pointedRect(w, h), {
          class: "snap-outline",
        })
      }
    }

    // rings
    if (this.isRing) {
      const child = this.children[0]
      // We use isStack for InputView; isBlock for BlockView; isScript for ScriptView.
      if (
        child &&
        (child.isStack ||
          child.isBlock ||
          child.isScript ||
          child.isRound ||
          child.isBoolean)
      ) {
        const shape = child.shape || child.info?.shape
        let el = SVG.ringRect(
          w,
          h,
          child,
          shape,
          {
            class: `snap-${this.info.category}`,
          },
          !child.isBlock,
        )

        if (options.isFlat) {
          SVG.setProps(el, {
            "clip-path": `path('${SVG.translatePath(
              this.strokeWidth / 2,
              this.strokeWidth / 2,
              el.getAttribute("d"),
            )}')`,
          })
        }
        if (this.isZebra) {
          el = this.applyZebra(el)
        }
        el.classList.add(options.isFlat ? "snap-flat" : "snap-bevel")
        return el
      }
    }

    const func = BlockView.shapes[this.info.shape]
    if (!func) {
      throw new Error(`no shape func: ${this.info.shape}`)
    }
    let el = func(w, h, {
      class: `snap-${this.info.category} ${
        options.isFlat ? "snap-flat" : "snap-bevel"
      }`,
    })

    if (options.isFlat) {
      SVG.setProps(el, {
        "clip-path": `path('${SVG.translatePath(
          this.strokeWidth / 2,
          this.strokeWidth / 2,
          el.getAttribute("d"),
        )}')`,
      })
    }
    if (this.isZebra) {
      el = this.applyZebra(el)
    }
    el.classList.add(options.isFlat ? "snap-flat" : "snap-bevel")
    return el
  }

  applyZebra(el) {
    el.classList.add("snap-zebra")
    return SVG.group([el])
  }

  minDistance(child) {
    if (this.isBoolean) {
      return child.isReporter
        ? (4 + child.height / 4) | 0
        : child.isLabel
        ? (5 + child.height / 2) | 0
        : child.isBoolean || child.shape === "boolean"
        ? 5
        : (2 + child.height / 2) | 0
    }
    if (this.isReporter) {
      return (child.isInput && child.isRound) ||
        ((child.isReporter || child.isBoolean) && !child.hasScript)
        ? 3
        : child.isLabel
        ? (2 + child.height / 2) | 0
        : (4 + child.height / 2) | 20
    }
    return 0
  }

  static get padding() {
    return {
      hat: [12, 3, 5],
      cat: [12, 3, 5],
      "define-hat": [13, 3, 7],
      "snap-define": [12, 3, 7],
      reporter: [2, 3, 2],
      boolean: [2, 5, 2],
      cap: [4, 3, 4],
      "c-block": [4, 3, 4],
      "if-block": [4, 3, 4],
      ring: [2, 3, 2],
      null: [4, 3, 4],
    }
  }

  draw(options) {
    const isDefine = this.info.shape === "define-hat"
    let children = this.children

    const padding = BlockView.padding[this.info.shape] || BlockView.padding.null
    let pt = padding[0]
    const px = padding[1]
    const pb = padding[2]

    let y = 0
    class Line {
      constructor(y) {
        this.y = y
        this.width = 0
        this.padding = {
          top: 0,
          bottom: 0,
        }
        this.height = 1
        this.children = []
      }
      get totalHeight() {
        return this.height + this.padding.top + this.padding.bottom
      }
    }

    let innerWidth = 0
    let scriptWidth = 0
    let line = new Line(y)
    const pushLine = () => {
      line.y += line.padding.top
      y += line.height
      // line.y = 0
      if (!this.isUpvar) {
        y += line.padding.top + line.padding.bottom
        line.width += px
      }
      innerWidth = Math.max(innerWidth, line.width)
      lines.push(line)
    }

    if (this.info.isRTL) {
      let start = 0
      const flip = () => {
        children = children
          .slice(0, start)
          .concat(children.slice(start, i).reverse())
          .concat(children.slice(i))
      }
      let i
      for (i = 0; i < children.length; i++) {
        if (children[i].isScript) {
          flip()
          start = i + 1
        }
      }
      if (start < i) {
        flip()
      }
    }

    const lines = []
    if (this.isUpvar) {
      line.padding.top += 1
    } else {
      line.padding.top += pt
    }
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      
      if (options.zebraColoring) {
        if (this.info.shape === "snap-define") {
          console.log("snap-define", this.info.category)
          if (child.isBlock && child.info.category === this.info.category) {
            this.isZebra = true
          }
        } else if (!this.isZebra && child.isBlock && !child.isUpvar) {
          if (
            child.info.category === this.info.category ||
            (child.info.color && child.info.color === this.info.color)
          ) {
            child.isZebra = true
          }
        }
        if (child.isScript) {
          child.parentCategory = this.info.color || this.info.category
          child.isZebra = this.isZebra
        }
        if (this.isZebra && child.isLabel) {
          child.cls = "label-dark"
          child.measure()
        }
      }

      child.el = child.draw(options, this)

      if (child.isCShape) {
        this.hasScript = true
        line.padding.bottom += pb

        this.isSuperSnap = true
        pushLine()
        child.y = y
        lines.push(child)
        scriptWidth = Math.max(scriptWidth, Math.max(1, child.width))
        child.height = Math.max(12, child.height + 3)
        y += child.height
        line = new Line(y)
      } else if (child.isLabel && child.value === "\n") {
        this.isSuperSnap = true
        pushLine()
        line = new Line(y)
      } else {
        if (
          options.wrapSize > 0 &&
          line.width + child.width > options.wrapSize
        ) {
          pushLine()
          line = new Line(y)
        }

        if (line.width < px && !this.isUpvar) {
          line.width = px
        }
        if (line.children.length !== 0) {
          if (child.isIcon) {
            line.width += child.padx
          } else {
            line.width += 4
          }
        }

        child.x = line.width
        line.width += child.width
        if (!child.isLabel) {
          line.height = Math.max(line.height, child.height + 2)
        } else {
          line.height = Math.max(line.height, child.height - 2)
        }
        line.children.push(child)
      }
    }
    y += pb
    pushLine()

    innerWidth = Math.max(
      innerWidth + px * 2,
      this.isHat
        ? 110
        : this.hasScript
        ? 39
        : this.isCommand || this.isOutline || this.isRing
        ? 39
        : 20,
    )
    this.height = y
    this.width = scriptWidth
      ? Math.max(innerWidth, 8 + (this.isBoolean ? 9 : 0) + scriptWidth)
      : innerWidth
    if (isDefine) {
      const p = Math.min(26, (3.5 + 0.13 * innerWidth) | 0) - 18
      this.height += p
      pt += 2 * p
    }
    this.firstLine = lines[0]
    this.innerWidth = innerWidth

    const objects = []

    for (const line of lines) {
      if (line.isScript) {
        objects.push(SVG.move(8, line.y, line.el))
        continue
      }

      const h = line.height

      for (const child of line.children) {
        if (child.isLoop) {
          objects.push(
            SVG.move(
              innerWidth -
                child.width -
                3 -
                (this.info.shape === "boolean") * 6,
              this.height - child.height - 3,
              child.el,
            ),
          )
          continue
        }

        let y = pt + (h - child.height - pt - pb) / 2
        if (isDefine && child.isLabel) {
          y += 3
        } else if (child.isIcon) {
          y += child.dy | 0
        }
        if (this.isRing) {
          child.y = (line.y + y) | 0
          child.x -= 2
          if (child.isInset) {
            continue
          }
        }
        objects.push(SVG.move(px + child.x, (line.y + y) | 0, child.el))

        if (child.diff === "+") {
          const ellipse = SVG.insEllipse(child.width, child.height)
          objects.push(SVG.move(px + child.x, (line.y + y) | 0, ellipse))
        }
      }
    }

    const el = this.drawSelf(options, innerWidth, this.height, lines)
    objects.splice(0, 0, el)
    if (this.info.color) {
      SVG.setProps(el, {
        fill: this.info.color,
      })
    }

    return SVG.group(objects)
  }
}

class CommentView {
  constructor(comment) {
    Object.assign(this, comment)
    this.label = newView(comment.label)

    this.width = null
  }

  get isComment() {
    return true
  }

  static get lineLength() {
    return 12
  }

  get height() {
    return 20
  }

  measure() {
    this.label.measure()
  }

  draw(options) {
    const labelEl = this.label.draw(options)

    this.width = this.label.width + 16
    return SVG.group([
      SVG.commentLine(this.hasBlock ? CommentView.lineLength : 0, 6),
      SVG.commentRect(this.width, this.height, {
        class: "snap-comment",
      }),
      SVG.move(8, 4, labelEl),
    ])
  }
}

class GlowView {
  constructor(glow) {
    Object.assign(this, glow)
    this.child = newView(glow.child)

    this.width = null
    this.height = null
    this.y = 0
  }

  get isGlow() {
    return true
  }

  measure() {
    this.child.measure()
  }

  drawSelf() {
    const c = this.child
    let el
    const w = this.width
    const h = this.height - 1
    if (c.isScript) {
      if (!c.isEmpty && c.blocks[0].isHat) {
        el = SVG.hatRect(w, h)
      } else if (c.isFinal) {
        el = SVG.capRect(w, h)
      } else {
        el = SVG.stackRect(w, h)
      }
    } else {
      el = c.drawSelf(w, h, [])
    }
    return SVG.setProps(el, {
      class: "snap-diff snap-diff-ins",
    })
  }
  // TODO how can we always raise Glows above their parents?

  draw(options) {
    const c = this.child
    const el = c.isScript ? c.draw(true) : c.draw()

    this.width = c.width
    this.height = (c.isBlock && c.firstLine.height) || c.height

    // encircle
    return SVG.group([el, this.drawSelf()])
  }
}

class ScriptView {
  constructor(script) {
    Object.assign(this, script)
    this.blocks = script.blocks.map(newView)

    this.y = 0
    this.parentCategory = null
    this.isZebra = false
  }

  get isScript() {
    return true
  }

  measure() {
    for (const block of this.blocks) {
      block.measure()
    }
  }

  draw(options, inside) {
    const children = []
    let y = 0
    this.width = 0
    for (const block of this.blocks) {
      const x = inside ? 0 : 2
      if (!this.isZebra && this.parentCategory) {
        if (
          this.parentCategory.toLowerCase() ===
            block.info.category.toLowerCase() ||
          this.parentCategory.toLowerCase() === block.info.color?.toLowerCase()
        ) {
          block.isZebra = true
        }
      }
      const child = block.draw(options)
      children.push(SVG.move(x, y, child))
      this.width = Math.max(this.width, block.width)

      const diff = block.diff
      if (diff === "-") {
        const dw = block.width
        const dh = block.firstLine.height || block.height
        children.push(SVG.move(x, y + dh / 2 + 1, SVG.strikethroughLine(dw)))
        this.width = Math.max(this.width, block.width)
      }

      y += block.height

      const comment = block.comment
      if (comment) {
        const line = block.firstLine
        const cx = block.innerWidth + 2 + CommentView.lineLength
        const cy = y - block.height + line.height / 2
        const el = comment.draw()
        children.push(SVG.move(cx, cy - comment.height / 2, el))
        this.width = Math.max(this.width, cx + comment.width)
      }
    }
    this.height = y
    if (!inside && !this.isFinal) {
      this.height += 3
    }
    const lastBlock = this.blocks[this.blocks.length - 1]
    if (!inside && lastBlock.isGlow) {
      this.height += 2 // TODO unbreak this
    }
    return SVG.group(children)
  }
}

class DocumentView {
  constructor(doc, options) {
    Object.assign(this, doc)
    this.scripts = doc.scripts.map(newView)

    this.width = null
    this.height = null
    this.el = null
    this.defs = null
    this.scale = options.scale
    this.options = {
      isFlat: options.style.replace("snap-", "").toLowerCase() === "flat",
      wrapSize: options.wrap
        ? options.wrapSize != undefined
          ? options.wrapSize
          : 460
        : -1,
      zebraColoring: options.zebraColoring,
    }
  }

  measure() {
    this.scripts.forEach(script => script.measure())
  }

  render(cb) {
    if (typeof cb === "function") {
      throw new Error("render() no longer takes a callback")
    }

    // measure strings
    this.measure()

    // TODO: separate layout + render steps.
    // render each script
    let width = 0
    let height = 0
    const elements = []
    for (const script of this.scripts) {
      if (height) {
        height += 10
      }
      script.y = height
      elements.push(SVG.move(0, height, script.draw(this.options)))
      height += script.height
      width = Math.max(width, script.width + 4)
    }
    this.width = width
    this.height = height

    // return SVG
    const svg = SVG.newSVG(width, height, this.scale)
    svg.appendChild(
      (this.defs = SVG.withChildren(SVG.el("defs"), [
        bevelFilter("snapBevelFilter", false),
        bevelFilter("snapInputBevelFilter", true),
        darkFilter("snapInputDarkFilter"),
        lightFilter("snapLightFilter"),
        dropShadowFilter("snapDropShadow"),
        ...makeIcons(),
      ])),
    )

    svg.appendChild(SVG.group(elements))
    this.el = svg
    return svg
  }

  /* Export SVG image as XML string */
  exportSVGString() {
    if (this.el == null) {
      throw new Error("call draw() first")
    }

    const style = makeStyle()
    this.defs.appendChild(style)
    const xml = new SVG.XMLSerializer().serializeToString(this.el)
    this.defs.removeChild(style)
    return xml
  }

  /* Export SVG image as data URI */
  exportSVG() {
    const xml = this.exportSVGString()
    return `data:image/svg+xml;utf8,${xml.replace(/[#]/g, encodeURIComponent)}`
  }

  toCanvas(cb, exportScale) {
    exportScale = exportScale || 1.0

    const canvas = SVG.makeCanvas()
    canvas.width = Math.max(1, this.width * exportScale * this.scale)
    canvas.height = Math.max(1, this.height * exportScale * this.scale)
    const context = canvas.getContext("2d")

    const image = new Image()
    image.src = this.exportSVG()
    image.onload = () => {
      context.save()
      context.scale(exportScale, exportScale)
      context.drawImage(image, 0, 0)
      context.restore()

      cb(canvas)
    }
  }

  exportPNG(cb, scale) {
    this.toCanvas(canvas => {
      if (URL && URL.createObjectURL && Blob && canvas.toBlob) {
        canvas.toBlob(blob => {
          cb(URL.createObjectURL(blob))
        }, "image/png")
      } else {
        cb(canvas.toDataURL("image/png"))
      }
    }, scale)
  }
}

const viewFor = node => {
  if (node instanceof Icon && unicodeIcons[node.name]) {
    return LabelView
  }

  switch (node.constructor) {
    case Label:
      return LabelView
    case Icon:
      return IconView
    case Input:
      return InputView
    case Block:
      return BlockView
    case Comment:
      return CommentView
    case Glow:
      return GlowView
    case Script:
      return ScriptView
    case Document:
      return DocumentView
    default:
      throw new Error(`no view for ${node.constructor.name}`)
  }
}

export const newView = (node, options) => new (viewFor(node))(node, options)
