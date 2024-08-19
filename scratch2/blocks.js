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
import Color, { hexColorPat } from "../shared/color.js"

import SVG from "./draw.js"

import style from "./style.js"
import {
  scaleFontSize,
  splitFontSize,
  getFontHeight,
} from "../shared/scaleFontSize.js"
const {
  categoryColor,
  defaultFontFamily,
  makeStyle,
  makeIcons,
  darkRect,
  bevelFilter,
  darkFilter,
  lightFilter,
} = style

const unicodeIcons = {
  cloud: "☁",
  cloudOutline: "☁",
  cloudGradient: "☁",
}
const categoryAliases = {
  ...aliasExtensions,
  grey: "other",
  gray: "other",
}

export class LabelView {
  constructor(label) {
    this._color = new Color(255, 255, 255)
    this.defaultColor = true
    this._fontSize = "10px"
    this.defaultFontSize = true

    if (label.isIcon && unicodeIcons[label.name]) {
      Object.assign(this, { value: unicodeIcons[label.name] })
    } else {
      Object.assign(this, label)
    }

    if (label.color) {
      this.color = label.color
    }

    if (!this.scale) {
      this.scale = 1
    }

    this.el = null
    this.height = 12
    this.metrics = null
    this.x = 0
  }

  get isLabel() {
    return true
  }

  get color() {
    return this._color
  }

  set color(color) {
    if (color) {
      this.defaultColor = false
      if (!(color instanceof Color)) {
        color = Color.fromString(color)
      }
      this._color = color
    }
  }

  get fontSize() {
    return this._fontSize
  }
  set fontSize(size) {
    this._fontSize = size
    this.defaultFontSize = false
  }

  draw(options) {
    return this.el
  }

  get width() {
    return this.metrics.width
  }

  get spaceWidth() {
    return this.metrics.spaceWidth
  }

  get lines() {
    return this.metrics.lines
  }

  measure(options) {
    const value = this.value
    const cls = `sb-${this.cls}`

    if (this.defaultColor) {
      if (/comment-label/.test(this.cls)) {
        this._color = new Color(92, 93, 95)
      } else if (/boolean/.test(this.cls)) {
        this._color = new Color(255, 255, 255)
      } else if (/label/.test(this.cls)) {
        this._color = new Color()
      } else if (/readonly/.test(this.cls)) {
        this._color = new Color(255, 255, 255)
      } else if (/literal/.test(this.cls)) {
        this._color = new Color()
      } else {
        this._color = new Color(255, 255, 255)
      }
    }

    if (this.defaultFontSize) {
      this._fontSize = /comment-label/.test(this.cls)
        ? "12px"
        : /literal-boolean/.test(this.cls)
          ? `10px`
          : /literal/.test(this.cls)
            ? `9px`
            : `10px`
    }

    let fontWeight = /comment-label/.test(this.cls)
      ? `bold`
      : /literal-boolean/.test(this.cls)
        ? `bold`
        : /literal/.test(this.cls)
          ? `normal`
          : `bold`

    if (this.modified && fontWeight == "bold") {
      fontWeight = "normal"
    }

    let scaledFontSize = scaleFontSize(this.fontSize, this.scale)
    let fontSizeData = splitFontSize(this.fontSize, this.scale)

    const fontFamily = this.formatting.monospace
      ? "monospace"
      : /comment-label/.test(this.cls)
        ? "Helvetica, Arial, DejaVu Sans, sans-serif"
        : defaultFontFamily

    const font = `${this.formatting.italic ? "italic" : "normal"} ${fontWeight} ${scaledFontSize} ${fontFamily}`

    let cache = LabelView.metricsCache[font]
    if (!cache) {
      cache = LabelView.metricsCache[font] = Object.create(null)
    }

    if (Object.hasOwnProperty.call(cache, value)) {
      this.metrics = cache[value]
    } else {
      this.metrics = cache[value] = LabelView.measure(value, font)
      // TODO: word-spacing? (fortunately it seems to have no effect!)
    }

    let lines = this.lines
    let group = []

    let y = 0
    let height = 0
    for (let line of lines) {
      let lineGroup = []
      height = 0
      let x = 0
      let first = true
      for (let wordInfo of line) {
        let wordHeight = getFontHeight(fontSizeData.value)
        if (!first) {
          if (options.showSpaces && !this.formatting.monospace) {
            x += this.spaceWidth / 2
            lineGroup.push(
              SVG.el("circle", {
                cx: x,
                cy: y + wordHeight / 2,
                r: this.spaceWidth / 2,
                class: "sb-space",
              }),
            )
            x += this.spaceWidth / 2
          } else {
            x += this.spaceWidth
          }
        }
        lineGroup.push(
          SVG.text(x, y + wordHeight / 1.2, wordInfo.word, {
            class: `snap-label ${cls}`,
            style: `font: ${font}`,
          }),
        )
        lineGroup[lineGroup.length - 1].style.fill = this.color.toHexString()
        x += wordInfo.width
        height = Math.max(height, wordHeight)
        first = false
      }
      y += height
      group.push(SVG.group(lineGroup))
    }
    this.height = y

    this.el = SVG.group(group)
  }

  static measure(value, font) {
    const context = LabelView.measuring
    context.font = font

    let spaceWidth = context.measureText(" ").width
    let lines = value.split("\n")
    let computedLines = []
    let width = 0
    for (let line of lines) {
      const textMetrics = context.measureText(line)
      width = Math.max(width, textMetrics.width)
      let words = line.split(" ")
      let computedLine = []
      for (let word of words) {
        const textMetrics = context.measureText(word)
        computedLine.push({
          word: word,
          width: textMetrics.width,
          height:
            textMetrics.fontBoundingBoxAscent +
            textMetrics.fontBoundingBoxDescent,
        })
      }
      computedLines.push(computedLine)
    }

    width = width | 0
    return {
      width: width,
      spaceWidth: spaceWidth,
      lines: computedLines,
    }
  }
}

LabelView.metricsCache = {}
LabelView.toMeasure = []

class IconView {
  constructor(icon) {
    this.scale = 1
    this.width = 12
    this.height = 12
    this.modified = false
    this.name = ""
    this.color = new Color(255, 255, 255)
    this.padx = 4
    this.fillAttribute = "fill"

    const info = IconView.getInfo(icon.name)

    Object.assign(this, info)
    Object.assign(this, icon)

    if (this.scale <= 0 || isNaN(this.scale)) {
      this.scale = info.scale || 1
    }

    if (!this.color) {
      this.color = info.color || new Color(255, 255, 255)
    }

    if (!this.fillAttribute) {
      this.fillAttribute = "fill"
    }
  }

  static getInfo(name) {
    let info = IconView.icons[name]
    if (!info) {
      throw new Error(`no info for icon: ${name}`)
    }
    if (info.alias) {
      info = {
        ...IconView.getInfo(info.alias),
        ...info,
      }
    }

    return info
  }

  get width() {
    return this._width * this.scale
  }

  set width(width) {
    this._width = width
  }

  get height() {
    return this._height * this.scale
  }

  set height(height) {
    this._height = height
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
    let name = this.alias || this.name
    if (Array.isArray(this.fillAttribute)) {
      for (const fillAttribute of this.fillAttribute) {
        props[fillAttribute] = this.color.toHexString()
      }
    } else {
      props[this.fillAttribute] = this.color.toHexString()
    }
    let symbol = SVG.setProps(SVG.symbol(`#sb-${name}-${options.id}`), props)
    return symbol
  }

  static get icons() {
    return {
      greenFlag: {
        color: new Color(63, 141, 21),
        alias: "flag",
      },
      flag: {
        width: 20,
        height: 21,
      },
      octagon: { width: 20, height: 20 },
      stopSign: { alias: "octagon", color: new Color(187, 0, 16) },
      turnLeft: { width: 15, height: 12, dy: +1 },
      turnRight: { width: 15, height: 12, dy: +1 },
      clockwise: {
        alias: "turnRight",
      },
      counterclockwise: {
        alias: "turnLeft",
      },
      loop: { width: 13, height: 10, scale: 1 },
      loopArrow: { alias: "loop" },
      addInput: {
        width: 5,
        height: 10,
        color: new Color(0, 0, 0),
        noShadow: true,
      },
      delInput: {
        width: 5,
        height: 10,
        color: new Color(0, 0, 0),
        noShadow: true,
      },
      verticalEllipsis: {
        width: 2,
        height: 10,
        dy: 0,
        scale: 10 / 12,
        color: new Color(0, 0, 0),
      },
      list: { width: 8, height: 10 },
      pointRight: { width: 12, height: 12 },
      turtle: { width: 13, height: 10, scale: 1.2 },
      turtleOutline: { width: 13, height: 10, fillAttribute: "stroke" },
      pause: { width: 10, height: 10, color: new Color(255, 220, 0), scale: 1 },
      cloud: { width: 16, height: 10 },
      cloudGradient: { width: 16, height: 10 },
      cloudOutline: { width: 16, height: 10, fillAttribute: "stroke" },
      flash: { width: 8, height: 10 },
      blitz: { alias: "flash", scale: 1 },
      camera: { width: 10, height: 10 },
      circleSolid: { width: 10, height: 10 },
      circle: { width: 10, height: 10, fillAttribute: "stroke" },
      notes: { width: 10, height: 10, fillAttribute: ["stroke", "fill"] },
      storage: { width: 10, height: 10, fillAttribute: ["stroke", "fill"] },
      brush: { width: 10, height: 10, fillAttribute: ["stroke", "fill"] },
      pipette: {
        width: 10,
        height: 10,
        scale: 1,
        fillAttribute: ["stroke", "fill"],
      },
      paintbucket: { width: 10, height: 10, fillAttribute: ["stroke", "fill"] },
      eraser: { width: 10, height: 10, fillAttribute: ["stroke", "fill"] },
      location: { width: 6, height: 10 },
      gears: { width: 10, height: 10 },
      gearPartial: { width: 10, height: 10 },
      gearBig: { width: 10, height: 10 },
      globe: { width: 10, height: 10, fillAttribute: "stroke" },
      globeBig: { width: 10, height: 10, fillAttribute: "stroke" },
      square: { width: 10, height: 10 },
      robot: { width: 10, height: 10 },
      stepForward: { width: 10, height: 10 },
      file: { width: 8, height: 10 },
      fullScreen: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      grow: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      normalScreen: {
        width: 10,
        height: 10,
        fillAttribute: ["fill", "stroke"],
      },
      shrink: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      smallStage: { width: 12, height: 10 },
      normalStage: { width: 12, height: 10 },
      stage: { width: 13, height: 10 },
      turnAround: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      poster: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      tick: { width: 10, height: 10 },
      checkedBox: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      rectangle: { width: 10, height: 10, fillAttribute: "stroke" },
      rectangleSolid: { width: 10, height: 10 },
      dot: { width: 4, height: 10 },
      line: { width: 10, height: 10, fillAttribute: "stroke" },
      cross: { width: 10, height: 10, fillAttribute: "stroke" },
      crosshairs: { width: 10, height: 10, fillAttribute: "stroke" },
      speechBubble: { width: 10, height: 10 },
      speechBubbleOutline: { width: 10, height: 10, fillAttribute: "stroke" },
      turnBack: { width: 16, height: 10, fillAttribute: ["fill", "stroke"] },

      arrowUp: { width: 10, height: 10 },
      arrowUpOutline: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowUpThin: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowDown: { width: 10, height: 10 },
      arrowDownOutline: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowDownThin: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowLeft: { width: 10, height: 10 },
      arrowLeftOutline: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowLeftThin: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowRight: { width: 10, height: 10 },
      arrowRightOutline: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowRightThin: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowUpDownThin: { width: 10, height: 10, fillAttribute: "stroke" },
      arrowLeftRightThin: { width: 10, height: 10, fillAttribute: "stroke" },

      plusSign: {
        width: 8.399999999999977,
        height: 12,
        dy: -2,
        color: Color.fromHexString("#2d2d2d"),
        fillAttribute: "stroke",
      },
    }
  }
}

class InputView {
  constructor(input) {
    Object.assign(this, input)
    if (input.label) {
      this.label = newView(input.label)
    }
    if (input.icon) {
      this.icon = newView(input.icon)
    }

    this.x = 0
  }

  get isInput() {
    return true
  }

  measure(options) {
    if (this.hasLabel) {
      this.label.measure(options)
    }
  }

  static get shapes() {
    return {
      string: SVG.rect,
      number: SVG.roundedRect,
      "number-dropdown": SVG.roundedRect,
      color: SVG.rect,
      dropdown: SVG.rect,

      boolean: SVG.pointedRect,
      stack: SVG.stackRect,
      reporter: SVG.roundedRect,
      ring: SVG.roundedRect,
    }
  }

  draw(options, parent) {
    let w, h
    let label
    if (this.isBoolean && !this.isBig) {
      label = SVG.el("path", {
        d:
          this.value == "t"
            ? "M 5 6 L 7.5 8.5 L 10 3.5"
            : "M 13.5 3.5 L 18.5 8.5 M 18.5 3.5 L 13.5 8.5",
        style: `stroke-linecap: round;
                stroke-linejoin: round;`,
        fill: "none",
        stroke: "white",
        strokeWidth: 1.5,
        class: !options.isFlat ? "snap-drop-shadow" : "",
      })
      w = 24
      h = 12
    } else if (this.icon) {
      label = this.icon.draw(options)
      h = this.icon.height + 4
      w = this.icon.width + this.hasArrow * 12 + 4 + 2
    } else if (this.hasLabel) {
      if (!(this.isBoolean && !this.isBig)) {
        label = this.label.draw(options)
      }

      h = this.label.height

      if (this.isBoolean && this.isBig) {
        h += 1
        w = 26 + h * 1.5
      } else {
        w = Math.max(
          this.isBig ? 23.8 : 14,
          this.label.width +
            (this.shape === "string" || this.shape === "number-dropdown"
              ? 6
              : 9),
        )
      }
    } else {
      h = this.hasLabel ? this.label.height : 13

      w = this.isInset ? 30 : this.isColor ? 13 : null
    }
    if (this.hasArrow) {
      w += 10
    }
    this.width = w

    if (this.isRound || this.isColor) {
      h += 1
    }

    this.height = h

    let el = InputView.shapes[this.shape](w, h)
    if (this.isColor) {
      SVG.setProps(el, {
        fill: this.value.toHexString(),
      })
    } else if (this.isBoolean) {
      switch (this.value) {
        case "true":
        case "t":
          SVG.setProps(el, {
            fill: new Color(0, 200, 0).toHexString(),
          })
          break
        case "false":
        case "f":
          SVG.setProps(el, {
            fill: new Color(200, 0, 0).toHexString(),
          })
          break
        default:
          SVG.setProps(el, {
            fill:
              parent.color instanceof Color
                ? parent.color.darker().toHexString()
                : parent.color
                  ? Color.fromString(parent.color)?.toHexString()
                  : "white",
          })
          break
      }
    } else if (this.isDarker) {
      el = darkRect(w, h, parent.color, el)
    }

    const result = SVG.group([
      SVG.setProps(el, {
        class: `sb-input sb-input-${this.shape}`,
      }),
    ])
    if (this.hasLabel || this.icon) {
      let x,
        y = 0
      if (this.isBoolean && this.isBig) {
        if (this.value == "true") {
          x = h / 2
        } else {
          x = w - h / 2 - 26
        }
      } else if (this.isBoolean && !this.isBig) {
        // it's offset in the path
        x = 0
      } else if (this.icon) {
        x = 2
        y = 2
      } else {
        x = this.isRound ? 5 : 4
      }
      result.appendChild(SVG.move(x, y, label))
    }
    if (this.isBoolean && this.value) {
      let y = this.height / 2
      let circle = SVG.el("circle", {
        cx: ["true", "t"].includes(this.value) ? this.width - y - 1 : y,
        cy: y,
        r: y,
        fill: new Color(220, 220, 220).toHexString(),
        class: "sb-bevel",
      })
      result.appendChild(circle)
    }
    if (this.hasArrow) {
      const y = this.shape === "dropdown" ? 5 : 4
      result.appendChild(
        SVG.move(
          w - 10,
          y,
          SVG.polygon({
            points: [7, 0, 3.5, 4, 0, 0],
            fill: "#000",
            opacity: "0.6",
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

    // Avoid accidental mutation
    this.info = { ...block.info }

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
    this.commentHeight = 0
    this.firstLine = null
    this.innerWidth = null
    this.lines = []
    this.isZebra = false

    this.color = categoryColor(this.info.color || this.info.category)
  }

  get isBlock() {
    return true
  }

  measure(options) {
    for (const child of this.children) {
      if (child.measure) {
        child.measure(options)
      }
    }
    if (this.comment) {
      this.comment.measure(options)
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
      "define-hat": SVG.procHatRect,
      "block-prototype": SVG.hatRect,
      ring: SVG.roundedRect,
    }
  }

  drawSelf(options, w, h, lines) {
    let el = null

    // mouths
    if (lines.length > 1) {
      let y = lines[0].totalHeight
      const p = []
      if (this.info.shape === "stack") {
        p.push(SVG.getTop(w))
      } else if (this.info.shape === "reporter" || this.info.shape === "ring") {
        p.push(SVG.getRoundedTop(w, h))
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedTop(w, h))
      } else if (
        ["hat", "block-prototype", "define-hat"].includes(this.info.shape)
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
              w - (this.info.shape === "boolean") * 8,
              y,
              true,
              15,
            ),
          )
          y += lines[i].height - 3
          p.push(SVG.getArm(w - (this.info.shape === "boolean") * 8, y))

          hasNotch = !(isLast && this.isFinal)
          inset = isLast ? 0 : 15
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
      } else if (this.info.shape === "reporter" || this.info.shape === "ring") {
        p.push(SVG.getRoundedBottom(w, h))
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedBottom(w, h, showBooleanRight))
      } else {
        p.push(SVG.getRightAndBottom(w, h, !this.isFinal, 0))
      }

      el = SVG.path({
        class: `sb-block`,
        path: p,
      })
    } else if (/outline-\w+/.test(this.info.shape)) {
      // outlines
      if (this.info.shape === "outline-stack") {
        return SVG.setProps(SVG.stackRect(w, h), {
          class: "sb-outline",
        })
      } else if (this.info.shape === "outline-reporter") {
        return SVG.setProps(SVG.roundedRect(w, h), {
          class: "sb-outline",
        })
      } else if (this.info.shape === "outline-boolean") {
        return SVG.setProps(SVG.pointedRect(w, h), {
          class: "sb-outline",
        })
      }
    } else if (this.isRing) {
      // rings
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
        el = SVG.ringRect(w, h, child, shape, {
          class: `sb-block`,
        })
      }
    } else {
      const func = BlockView.shapes[this.info.shape]
      if (!func) {
        throw new Error(`no shape func: ${this.info.shape}`)
      }
      el = func(w, h, {
        class: `sb-block`,
      })
    }

    let color = this.color

    if (this.isZebra) {
      if (color) {
        color = color.zebra()
      }
    }
    el.classList.add("sb-bevel")
    if (color) {
      el.style.fill = color.toHexString()
    }
    return el
  }

  applyZebra(el) {
    el.classList.add("sb-zebra")
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
        ? 4
        : child.isLabel
          ? (2 + child.height / 2) | 0
          : (-2 + child.height / 2) | 0
    }
    return 4
  }

  static get padding() {
    return {
      hat: [12, 3, 5],
      cat: [12, 3, 5],
      "define-hat": [16, 3, 6],
      "block-prototype": [15, 3, 10],
      reporter: [4, 4, 3],
      boolean: [4, 4, 3],
      cap: [5, 3, 4],
      "c-block": [3, 6, 2],
      "if-block": [3, 6, 2],
      ring: [4, 4, 3],
      null: [5, 3, 4],
    }
  }

  draw(options) {
    const isDefine = this.info.shape === "define-hat"
    let children = this.children

    const padding = BlockView.padding[this.info.shape] || BlockView.padding.null
    let pt = padding[0]
    let px = padding[1]
    const pb = padding[2]

    if (this.info.local) {
      px += IconView.icons.location.width
    }

    let y = 0
    class Line {
      constructor(y) {
        this.y = y
        this.width = 0
        this.padding = {
          top: 0,
          bottom: 0,
        }
        this.height = 9
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
        let last = line.children[line.children.length - 1]
        if (last) {
          if (last.isLabel || last.isIcon) {
            line.width += px
          } else {
            const cmw = 5 // 27
            const md = this.isCommand ? 0 : this.minDistance(last)
            const mw = this.isCommand
              ? last.isBlock || last.isInput
                ? cmw
                : 0
              : md

            line.width += mw - px
          }
        }
      } else {
        y += 1
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
    let noWrapLine = [],
      noWrapLines = [],
      hasLoopArrow = false,
      lastCSlot = null
    if (this.isUpvar) {
      line.padding.top += 3
    } else {
      line.padding.top += pt
    }
    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      if (options.zebraColoring) {
        if (child.isUpvar) {
          if (this.color.eq(child.color)) {
            child.isZebra = this.isZebra
          }
        } else if (this.isBlockPrototype) {
          if (child.isBlock && !child.isUpvar && this.color.eq(child.color)) {
            this.isZebra = true
          }
        } else if (
          !this.isZebra &&
          child.isBlock &&
          !child.isOutline &&
          !child.isUpvar
        ) {
          if (this.color.eq(child.color)) {
            child.isZebra = true
          }
        } else if (child.isScript) {
          child.color = this.color
          child.isZebra = this.isZebra
        } else if (this.isZebra && child.isLabel) {
          child.cls = "label-dark"
          child.measure(options)
        }
      }

      child.el = child.draw(options, this)

      if (child.isCShape) {
        if (noWrapLine.length > 0) {
          noWrapLines.push(noWrapLine)
          noWrapLines.push([child])
          noWrapLine = []
        } else {
          noWrapLines.push([child])
        }
      } else {
        noWrapLine.push(child)
      }

      let loop = noWrapLine[noWrapLine.length - 1]
      if (child.isCShape) {
        this.hasScript = true
        line.padding.bottom += pb

        if (
          loop &&
          loop.isIcon &&
          !loop.modified &&
          loop.isArrow &&
          noWrapLines[noWrapLines.length - 1] &&
          noWrapLines[noWrapLines.length - 1][0].isCShape
        ) {
          loop.isLoop = true
          loop.scale = 1
        }

        pushLine()
        child.y = y

        this.commentHeight = Math.max(
          this.commentHeight,
          child.y + child.commentHeight,
        )

        lines.push(child)
        scriptWidth = Math.max(scriptWidth, Math.max(1, child.width))
        child.height = Math.max(13, child.height + 3)
        y += child.height
        line = new Line(y)
        lastCSlot = child
      } else if (
        loop &&
        loop.isIcon &&
        !loop.modified &&
        loop.isArrow &&
        noWrapLines[noWrapLines.length - 1] &&
        noWrapLines[noWrapLines.length - 1][0].isCShape
      ) {
        loop.isLoop = true
        loop.scale = 1
        line.children.push(child)

        let cIndex = lines.indexOf(lastCSlot)
        let trueRow = lines[cIndex + 1]
        if (trueRow) {
          trueRow.width += IconView.getInfo("loopArrow").width * 0.5
          innerWidth = Math.max(innerWidth, trueRow.width)
        } else {
          line.width += IconView.getInfo("loopArrow").width * 0.5
        }
        hasLoopArrow = true
      } else if (child.isNewline) {
        noWrapLines.push(noWrapLine)
        noWrapLine = []

        line.padding.bottom = 4
        if (line.firstLine) {
          line.padding.top = Math.max(pt - (line.height - 13) / 2, ptmin)
        }
        let firstSection = line.firstSection
        pushLine()
        line = new Line(y)
        line.firstSection = firstSection
      } else if (child.isNewline) {
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

        if (line.width < px) {
          line.width = px
        }
        if (line.children.length !== 0) {
          if (child.isIcon) {
            if (
              (line.children[line.children.length - 1].isIcon &&
                line.children[line.children.length - 1].name == "delInput" &&
                child.name == "verticalEllipsis") ||
              (line.children[line.children.length - 1].isIcon &&
                line.children[line.children.length - 1].name ==
                  "verticalEllipsis" &&
                child.name == "addInput")
            ) {
              line.width += 2
            } else {
              line.width += child.padx
            }
          } else {
            line.width += 5
          }
        }

        child.x = line.width
        line.width += child.width
        if (!child.isLabel) {
          line.height = Math.max(line.height, child.height)
          if (!this.isUpvar && child.isBlock) {
            if (line.padding.top >= pt) {
              line.padding.top -= 1
              line.padding.bottom -= 2
            }
          }
        } else {
          line.height = Math.max(line.height, child.height)
        }
        line.children.push(child)
      }
    }
    if (noWrapLine.length > 0) {
      let loop = noWrapLine[noWrapLine.length - 1]
      if (
        loop &&
        loop.isIcon &&
        !loop.modified &&
        loop.isArrow &&
        noWrapLines[noWrapLines.length - 1] &&
        noWrapLines[noWrapLines.length - 1][0].isCShape
      ) {
        loop.isLoop = true
        loop.scale = 1
      }
      noWrapLines.push(noWrapLine)
    }
    y += pb
    pushLine()

    innerWidth = Math.max(
      innerWidth + px * 2,
      this.isHat || this.hasScript
        ? 83
        : this.isCommand || this.isOutline || this.isRing
          ? 39
          : 20,
    )
    this.height = y
    this.width = scriptWidth
      ? Math.max(innerWidth, 15 + (this.isBoolean ? 8 : 0) + scriptWidth)
      : innerWidth
    if (isDefine) {
      const p = Math.min(10, (3.5 + 0.13 * innerWidth) | 0)
      this.height += p
      // pt += p
    }
    this.firstLine = lines[0]
    this.innerWidth = innerWidth

    const objects = []
    lastCSlot = null

    this.lines = lines

    if (this.info.local) {
      let localPin = newView(
        new Icon(
          "location",
          1.2,
          this.isZebra ? this.color.darker(65) : this.color.lighter(65),
        ),
      )

      objects.push(SVG.move(padding[1] * 2, pt, localPin.draw(options)))
    }

    for (const line of lines) {
      if (line.isScript) {
        objects.push(SVG.move(15, line.y, line.el))
        lastCSlot = line
        continue
      }

      const h = line.height

      for (const child of line.children) {
        if (child.isLoop && lastCSlot) {
          objects.push(
            SVG.move(
              innerWidth - child.width - 3 - this.isBoolean * 6,
              lastCSlot.y + lastCSlot.height,
              child.el,
            ),
          )
          continue
        }

        let y = pt + (h - child.height - pt - pb) / 2 - 1
        if (isDefine && child.isLabel) {
          y += 3
        } else if (child.isIcon) {
          y += child.dy | 0
        }
        if (this.isRing) {
          child.y = (line.y + y) | 0
          if (child.isCommand) {
            child.x -= px
          }
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
  }

  get isComment() {
    return true
  }

  static get lineLength() {
    return 12
  }

  get width() {
    return !this.isMultiline * 4 + Math.max(this.label.width + 16, 100)
  }

  get height() {
    if (this.isMultiline) {
      return this.titleBarHeight + this.label.height + 2
    } else {
      return 20
    }
  }

  get titleBarHeight() {
    return 22
  }

  measure(options) {
    this.label.measure({
      ...options,
      showSpaces: false,
    })
  }

  draw(options) {
    if (this.isMultiline) {
      return this.drawExpanded(options)
    } else {
      return this.drawCollapsed(options)
    }
  }

  drawExpanded(options) {
    let x = 5,
      y = 20

    return SVG.group([
      this.hasBlock
        ? SVG.commentLine(CommentView.lineLength, {
            fill: style.colors.comment.titleBar.toHexString(),
          })
        : null,
      SVG.el("rect", {
        width: this.width,
        height: this.height,
        fill: style.colors.comment.body.toHexString(),
        stroke: style.colors.comment.border.toHexString(),
        rx: 5,
        ry: 5,
      }),
      SVG.group([
        SVG.el("rect", {
          width: this.width,
          height: this.titleBarHeight,
          rx: 5,
          ry: 5,
          fill: style.colors.comment.titleBar.toHexString(),
        }),
        SVG.el("rect", {
          y: this.titleBarHeight - 4,
          width: this.width,
          height: 4,
          fill: style.colors.comment.body.toHexString(),
        }),
      ]),
      SVG.move(4, 4, SVG.symbol(`#sb-commentArrowDown-${options.id}`)),
      SVG.move(
        x,
        y,
        this.label.draw({
          ...options,
          showSpaces: false,
        }),
      ),
    ])
  }

  drawCollapsed(options) {
    const labelEl = this.label.draw({
      ...options,
      showSpaces: false,
    })

    return SVG.group([
      this.hasBlock
        ? SVG.commentLine(CommentView.lineLength, {
            fill: style.colors.comment.titleBar.toHexString(),
          })
        : null,
      SVG.commentRect(this.width, this.height, {
        fill: style.colors.comment.titleBar.toHexString(),
        stroke: style.colors.comment.border.toHexString(),
      }),
      SVG.move(16, 4, labelEl),
      SVG.move(4, 4, SVG.symbol(`#sb-commentArrowRight-${options.id}`)),
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

  measure(options) {
    this.child.measure(options)
  }

  drawSelf(options) {
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
      el = BlockView.shapes[c.info.shape](w, h)
    }
    return SVG.setProps(el, {
      class: "sb-diff sb-diff-ins",
    })
  }
  // TODO how can we always raise Glows above their parents?

  draw(options) {
    const c = this.child
    const el = c.isScript ? c.draw(options, true) : c.draw(options)

    this.width = c.width
    this.height = (c.isBlock && c.height) || c.height

    // encircle
    return SVG.group([el, this.drawSelf(options)])
  }
}

class ScriptView {
  constructor(script) {
    Object.assign(this, script)
    this.blocks = script.blocks.map(newView)

    this.y = 0
    this.commentHeight = 0
    this.color = new Color()
    this.isZebra = false
  }

  get isScript() {
    return true
  }

  measure(options) {
    for (const block of this.blocks) {
      block.measure(options)
    }
  }

  draw(options, inside) {
    const children = []
    let y = 0
    this.width = 0
    for (const block of this.blocks) {
      const x = inside ? 0 : 2
      if (inside && !this.isZebra && this.color) {
        if (this.color.eq(block.color)) {
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

      const comment = block.comment
      if (comment) {
        const line = block.firstLine
        const cx = block.innerWidth + 2 + CommentView.lineLength
        const cy = y + 2
        const el = comment.draw(options)
        children.push(SVG.move(cx, cy, el))
        this.width = Math.max(this.width, cx + comment.width)
        this.commentHeight = Math.max(
          this.commentHeight,
          cy + comment.height + 1,
        )
      }
      this.commentHeight = Math.max(this.commentHeight, y + block.commentHeight)
      y += block.height
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
    this.id = this.makeid(10)

    Object.assign(this, doc)
    this.scripts = doc.scripts.map(newView)

    this.width = null
    this.height = null
    this.el = null
    this.defs = null
    this.scale = options.scale
    this.options = {
      id: this.id,
      wrapSize: options.wrap
        ? options.wrapSize != undefined && options.wrapSize > 0
          ? options.wrapSize
          : 460
        : -1,
      zebraColoring: options.zebraColoring || options.zebra,
      showSpaces: options.showSpaces,
    }
  }

  makeid(length) {
    let result = ""
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  measure(options) {
    this.scripts.forEach(script => script.measure(options))
  }

  updateIds(element) {
    let aroundIdRegex = /(#[a-zA-Z][\w:.\-]*)/
    let idRegex = /#[a-zA-Z][\w:.\-]*/

    let id = element.getAttribute("id")
    if (id) {
      element.setAttribute("id", `${id}-${this.id}`)
    }

    Array.from(element.attributes).forEach(attribute => {
      let value = attribute.nodeValue

      let split = value.split(aroundIdRegex)

      for (let index = 0; index < split.length; index++) {
        let part = split[index]

        if (idRegex.test(part) && !hexColorPat.test(part)) {
          split[index] = `${part}-${this.id}`
        }
      }

      attribute.nodeValue = split.join("")
    })

    for (let child of element.children) {
      this.updateIds(child)
    }
  }

  render(cb) {
    if (typeof cb === "function") {
      throw new Error("render() no longer takes a callback")
    }

    // measure strings
    this.measure(this.options)

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
      height += Math.max(
        script.height,
        script.commentHeight ? script.commentHeight : 0,
      )
      width = Math.max(width, script.width + 4)
    }
    this.width = width
    this.height = height

    // return SVG
    const svg = SVG.newSVG(width, height, this.scale)
    svg.classList.add("snapblocks-style-scratch2")

    let icons = makeIcons()
    for (let icon of icons) {
      this.updateIds(icon)
    }

    svg.appendChild(
      (this.defs = SVG.withChildren(SVG.el("defs"), [
        bevelFilter(`sbBevelFilter-${this.id}`, false),
        bevelFilter(`sbInputBevelFilter-${this.id}`, true),
        darkFilter(`sbInputDarkFilter-${this.id}`),
        lightFilter(`sbLightFilter-${this.id}`),
        ...icons,
      ])),
    )

    let group = SVG.group(elements)

    group.style.setProperty("--id", this.id)
    group.style.setProperty("--sbBevelFilter", `url(#sbBevelFilter-${this.id})`)
    group.style.setProperty(
      "--sbInputBevelFilter",
      `url(#sbInputBevelFilter-${this.id})`,
    )
    group.style.setProperty(
      "--sbInputDarkFilter",
      `url(#sbInputDarkFilter-${this.id})`,
    )
    group.style.setProperty("--sbLightFilter", `url(#sbLightFilter-${this.id})`)

    svg.appendChild(group)
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
