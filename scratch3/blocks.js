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
  defaultFont,
  commentFont,
  makeStyle,
  makeOriginalIcons,
  makeHighContrastIcons,
  iconName,
  highContrastIcons,
  snapIcons,
  zebraFilter,
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
    this.lineHeight = 5
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
    const cls = `sb3-${this.cls}`

    if (this.defaultColor) {
      this._color = /comment-label|label-dark/.test(this.cls)
        ? new Color()
        : /(boolean|dropdown)/.test(this.cls)
          ? options.isHighContrast
            ? new Color()
            : new Color(255, 255, 255)
          : /literal/.test(this.cls)
            ? new Color()
            : options.isHighContrast
              ? new Color()
              : new Color(255, 255, 255)
    }

    if (this.defaultFontSize) {
      this._fontSize = "12pt"
    }

    let fontWeight = /comment-label/.test(this.cls) ? "500" : "400"

    let scaledFontSize = scaleFontSize(this.fontSize, this.scale)
    let fontSizeData = splitFontSize(this.fontSize, this.scale)

    const fontFamily = this.formatting.monospace
      ? "monospace"
      : /comment-label/.test(this.cls)
        ? commentFont
        : defaultFont

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
        // let wordHeight = (wordInfo.height ? wordInfo.height : fontSizeData.value + (2 * this.scale))
        let wordHeight = getFontHeight(fontSizeData.value)
        if (!first) {
          if (options.showSpaces && !this.formatting.monospace) {
            x += this.spaceWidth / 2
            lineGroup.push(
              SVG.el("circle", {
                cx: x,
                cy: y + wordHeight / 2,
                r: this.spaceWidth / 2,
                class: "sb3-space",
              }),
            )
            x += this.spaceWidth / 2
          } else {
            x += this.spaceWidth
          }
        }
        lineGroup.push(
          SVG.text(x, y + wordHeight / 1.2, wordInfo.word, {
            class: `sb3-label ${cls}`,
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
    this.height = Math.max(13, y)

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
          // height:
          //   textMetrics.fontBoundingBoxAscent +
          //   textMetrics.fontBoundingBoxDescent,
        })
      }
      computedLines.push(computedLine)
    }

    width = (width + 3) | 0
    return {
      width: width,
      spaceWidth: spaceWidth,
      lines: computedLines,
    }
  }
}

LabelView.metricsCache = {}
LabelView.toMeasure = []

export class IconView {
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
      this.color = info.color || null
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
    let isSnapIcon = snapIcons.has(this.name)
    return (this._width + isSnapIcon * this._width) * this.scale
  }

  set width(width) {
    this._width = width
  }

  get height() {
    let isSnapIcon = snapIcons.has(this.name)
    return (this._height + isSnapIcon * this._height) * this.scale
  }

  set height(height) {
    this._height = height
  }

  get isIcon() {
    return true
  }

  draw(options) {
    let isSnapIcon = snapIcons.has(this.name)
    let props = {
      width: this.width,
      height: this.height,
      transform: `scale(${this.scale + isSnapIcon * this.scale})`,
    }

    if (!this.color) {
      this.color = options.isHighContrast
        ? new Color()
        : new Color(255, 255, 255)
    }

    let name = this.alias || this.name
    if (Array.isArray(this.fillAttribute)) {
      for (const fillAttribute of this.fillAttribute) {
        props[fillAttribute] = this.color.toHexString()
      }
    } else {
      props[this.fillAttribute] = this.color.toHexString()
    }
    let symbol = SVG.setProps(
      SVG.symbol(`#sb3-${iconName(name, options)}-${options.id}`),
      props,
    )
    return symbol
  }

  static get icons() {
    return {
      greenFlag: {
        color: Color.fromHexString("#4CBF56"),
        alias: "flag",
      },
      flag: {
        width: 24,
        height: 24,
      },
      octagon: { width: 20, height: 20 },
      stopSign: { alias: "octagon", color: new Color(236, 89, 89) },
      turnLeft: { width: 24, height: 24 },
      turnRight: { width: 24, height: 24 },
      clockwise: {
        alias: "turnRight",
      },
      counterclockwise: {
        alias: "turnLeft",
      },
      loop: { width: 24, height: 24, scale: 1 },
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
      notes: { alias: "musicBlock" },
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

      musicBlock: { width: 40, height: 40 },
      penBlock: { width: 40, height: 40 },
      videoBlock: { width: 40, height: 40, dy: 10 },
      ttsBlock: { width: 40, height: 40 },
      translateBlock: { width: 40, height: 40 },
      wedoBlock: { width: 40, height: 40 },
      ev3Block: { width: 40, height: 40 },
      microbitBlock: { width: 40, height: 40 },
      makeymakeyBlock: { width: 40, height: 40 },
      gdxforBlock: { width: 40, height: 40 },
      boostBlock: { width: 40, height: 40 },

      plusSign: {
        width: 16.799999999999955,
        height: 12,
        dy: -12,
        color: Color.fromHexString("#2d2d2d"),
        fillAttribute: "stroke",
      },
    }
  }

  get isExtension() {
    if (!this.name.endsWith("Block")) {
      return false
    }
    let extension = this.name.replace("Block", "")
    if (extensions[extension]) {
      return true
    }
    return false
  }
}

export class LineView {
  constructor() {
    this.width = 1
    this.height = 40
    this.x = 0
  }

  get isLine() {
    return true
  }

  measure(options) {}

  draw(options, parent) {
    const category = parent.info.category
    return SVG.el("line", {
      class: `sb3-${category}`,
      "stroke-linecap": "round",
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 40,
      stroke: parent.color.tertiary,
    })
  }
}

export class InputView {
  constructor(input) {
    Object.assign(this, input)
    if (input.label) {
      this.label = newView(input.label)
    }
    if (input.icon) {
      this.icon = newView(input.icon)
    }
    this.isBoolean = this.shape === "boolean"
    this.isDropdown = this.shape === "dropdown"
    this.isRound = !(this.isBoolean || this.isDropdown)

    this.x = 0
    this.y = 0
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
      string: (w, h) => SVG.roundRect(w, h, 16),
      number: (w, h) => SVG.roundRect(w, h, 16),
      "number-dropdown": SVG.pillRect,
      color: SVG.pillRect,
      dropdown: SVG.roundRect,

      boolean: SVG.pointedRect,
      stack: SVG.stackRect,
      reporter: SVG.pillRect,
    }
  }

  draw(options, parent) {
    let w, h
    let label
    if (this.isBoolean && !this.isBig) {
      label = SVG.el("path", {
        d:
          this.value == "t"
            ? "M 14 16 L 21 23 L 28 9"
            : "M 41 9 L 55 23 M 55 9 L 41 23",
        style: `stroke-linecap: round;
                stroke-linejoin: round;`,
        fill: "none",
        stroke: "white",
        "stroke-width": 2,
      })
      w = this.value ? 70 : 48
      h = 32
    } else if (this.icon) {
      label = this.icon.draw(options)
      h = this.icon.height + 4
      w = this.icon.width + this.hasArrow * 12 + 4 + 2
    } else if (this.isColor) {
      w = 40
      h = 32
    } else if (this.hasLabel) {
      if (!(this.isBoolean && !this.isBig)) {
        // if (!this.isBoolean && this.isDarker && parent.isZebra) {
        //   this.label.color = new Color()
        //   // this.label.measure(options)
        // }
        label = this.label.draw(options)
      }

      if (this.isBoolean && this.isBig) {
        h = this.label.height + 19
        w = 85
        label = SVG.move(0, 9, label)
      } else {
        // Minimum padding of 11
        // Minimum width of 40, at which point we center the label
        h = this.label.height + 19
        const px = this.label.width >= 18 ? 11 : (40 - this.label.width) / 2
        w = Math.max(this.label.width + 2 * px, this.isBig * 70)
        label = SVG.move(px, 9, label)
      }
    } else {
      h = 32
      w = !this.isStack ? 40 : 60
    }
    if (this.hasArrow) {
      w += 20
    }
    this.width = w

    if (this.isRound || this.isColor) {
      h += 1
    }

    this.height = h

    let color = parent.color

    if (parent.isZebra) {
      color = color.makeZebra(options.isHighContrast)
    }

    const el = InputView.shapes[this.shape](w, h)
    SVG.setProps(el, {
      class: `sb3-input sb3-input-${this.shape}`,
      stroke: color.tertiary.toHexString(),
    })

    if (this.isColor) {
      SVG.setProps(el, {
        fill: this.value.toHexString(),
      })
    } else if (this.isBoolean) {
      switch (this.value) {
        case "true":
        case "t":
          SVG.setProps(el, {
            fill: options.isHighContrast
              ? new Color(0, 200, 0).lighter(30)
              : new Color(0, 200, 0).toHexString(),
          })
          break
        case "false":
        case "f":
          SVG.setProps(el, {
            fill: options.isHighContrast
              ? new Color(200, 0, 0).lighter(40)
              : new Color(200, 0, 0).toHexString(),
          })
          break
        default:
          SVG.setProps(el, {
            fill: parent.color.tertiary.toHexString(),
          })
      }
    } else if (this.shape === "dropdown") {
      // custom colors
      SVG.setProps(el, {
        fill: color.primary.toHexString(),
      })
    } else if (this.shape === "number-dropdown") {
      SVG.setProps(el, {
        fill: color.secondary.toHexString(),
      })
    }

    const result = SVG.group([el])
    if (this.hasLabel || this.icon) {
      let x
      if (this.isBoolean && this.isBig) {
        if (this.value == "true") {
          x = h / 2
        } else {
          x = w - h / 2 - 32
        }
      } else if (this.isBoolean && !this.isBig) {
        // it's offset in the path
        x = 0
      } else if (this.icon) {
        x = 2
        // y = 2
      } else {
        x = 0
      }
      result.appendChild(SVG.move(x, 0, label))
    }
    if (this.isBoolean && this.value) {
      let y = (this.height + 1) / 2
      let circle = SVG.el("circle", {
        cx: ["true", "t"].includes(this.value) ? this.width - y + 1 : y - 1,
        cy: y - 0.5,
        r: y,
        fill: new Color(220, 220, 220).toHexString(),
      })
      result.appendChild(circle)
    }
    if (this.hasArrow) {
      result.appendChild(
        SVG.move(
          w - 24,
          Math.min(h - 20, 13),
          SVG.symbol(
            options.isHighContrast
              ? `#sb3-dropdownArrow-high-contrast-${options.id}`
              : `#sb3-dropdownArrow-${options.id}`,
            {},
          ),
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
    this.isRound = this.isReporter

    // Avoid accidental mutation
    this.info = { ...block.info }
    if (
      Object.prototype.hasOwnProperty.call(categoryAliases, this.info.category)
    ) {
      this.info.category = categoryAliases[this.info.category]
    }
    if (
      Object.prototype.hasOwnProperty.call(extensions, this.info.category) ||
      this.info.local
    ) {
      this.children.unshift(new LineView())
      if (
        Object.prototype.hasOwnProperty.call(extensions, this.info.category)
      ) {
        this.children.unshift(
          new IconView({ name: this.info.category + "Block" }),
        )
        this.info.category = "extension"
      }
      if (this.info.local) {
        this.children.unshift(newView(new Icon("location", 1.5)))
      }
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
      reporter: SVG.pillRect,
      boolean: SVG.pointedRect,
      hat: SVG.hatRect,
      cat: SVG.catHat,
      "define-hat": SVG.procHatRect,
      "block-prototype": SVG.hatRect,
      ring: SVG.pillRect,
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
        p.push(
          SVG.getRoundedTop(
            w,
            h,
            Math.max(
              lines[0].totalHeight,
              lines[lines.length - 1].totalHeight,
            ) / 2,
          ),
        )
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedTop(w, h))
      } else if (
        ["hat", "block-prototype", "define-hat"].includes(this.info.shape)
      ) {
        p.push(SVG.getHatTop(w))
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

        if (lines[i].isScript) {
          p.push(
            SVG.getRightAndBottom(
              w - (this.info.shape === "boolean") * 20,
              y,
              true,
              16,
            ),
          )
          y += lines[i].height - 3

          hasNotch = !lines[i].hasFinal

          if (hasNotch) {
            p.push(SVG.getArm(w - (this.info.shape === "boolean") * 20, y))
          } else {
            p.push(
              SVG.getArmNoNotch(w - (this.info.shape === "boolean") * 20, y),
            )
          }

          inset = isLast ? 0 : 16
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
        p.push(SVG.getRightAndBottom(w, y, !this.isFinal, 0))
      } else if (this.info.shape === "reporter" || this.info.shape === "ring") {
        p.push(
          SVG.getRoundedBottom(
            w,
            y,
            Math.max(
              lines[0].totalHeight,
              lines[lines.length - 1].totalHeight,
            ) / 2,
          ),
        )
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedBottom(w, h, showBooleanRight))
      } else {
        p.push(SVG.getRightAndBottom(w, h, !this.isFinal, 0))
      }
      p.push("Z")
      el = SVG.path({
        class: `sb3-${this.info.category}`,
        path: p,
      })
    } else if (/outline-\w+/.test(this.info.shape)) {
      // outlines
      if (this.info.shape === "outline-stack") {
        el = SVG.setProps(SVG.stackRect(w, h), {
          class: `sb3-${this.info.category} sb3-${this.info.category}-alt`,
        })
      } else if (this.info.shape === "outline-reporter") {
        el = SVG.setProps(SVG.pillRect(w, h), {
          class: `sb3-${this.info.category} sb3-${this.info.category}-alt`,
        })
      } else if (this.info.shape === "outline-boolean") {
        el = SVG.setProps(SVG.pointedRect(w, h), {
          class: `sb3-${this.info.category} sb3-${this.info.category}-alt`,
        })
      }
      if (el) {
        el.style.fill = this.color.secondary
      }
    } else if (this.isRing) {
      // rings
      const child = this.children[0]
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
          class: `sb3-${this.info.category}`,
        })
      }
    } else {
      const func = BlockView.shapes[this.info.shape]
      if (!func) {
        throw new Error(`no shape func: ${this.info.shape}`)
      }
      el = func(w, h, {
        class: `sb3-${this.info.category}`,
      })
    }

    let color = { ...this.color }
    if (this.isZebra) {
      color = color.makeZebra(options.isHighContrast)
    }
    if (this.info.shape === "cat") {
      el.children[0].style.fill = color.primary.toHexString()
      el.children[0].style.stroke = color.tertiary.toHexString()
    } else {
      el.style.fill = color.primary.toHexString()
      el.style.stroke = color.tertiary.toHexString()
    }
    return el
  }

  applyZebra(el, isDark) {
    el.classList.add(`sb3-${isDark ? "dark" : "light"}-zebra`)
    return el
  }

  static get padding() {
    return {
      hat: [
        [20, 30],
        [12, 21],
      ],
      cat: [
        [20, 30],
        [12, 21],
      ],
      "define-hat": [
        [20, 17],
        [16, 16],
      ],
      "block-prototype": [
        [20, 30],
        [12 + 4, 21 + 4],
      ],
      boolean: [
        [4, 14],
        [4, 14],
      ],
      reporter: [
        [4, 14],
        [4, 14],
      ],
      null: [
        [4, 18],
        [4, 17],
      ],
    }
  }

  horizontalPadding(child) {
    if (this.isRound) {
      if (child.isIcon) {
        return 16
      } else if (child.isLabel) {
        return 12 // text in circle: 3 units
      } else if (child.isDropdown) {
        return 12 // square in circle: 3 units
      } else if (child.isBoolean) {
        return 12 // hexagon in circle: 3 units
      } else if (child.isRound) {
        return 4 // circle in circle: 1 unit
      }
    } else if (this.isBoolean) {
      if (child.isIcon) {
        return 24 // icon in hexagon: ???
      } else if (child.isLabel) {
        return 20 // text in hexagon: 5 units
      } else if (child.isDropdown) {
        return 20 // square in hexagon: 5 units
      } else if (child.isRound && child.isBlock) {
        return 24 // circle in hexagon: 5 + 1 units
      } else if (child.isRound) {
        return 20 // circle in hexagon: 5 units
      } else if (child.isBoolean) {
        return 8 // hexagon in hexagon: 2 units
      }
    }
    return 8 // default: 2 units
  }

  marginBetween(a, b) {
    // Consecutive labels should be rendered as a single text element.
    // For now, approximate the size of one space
    if (a.isLabel && b.isLabel) {
      return 5
    }

    return 8 // default: 2 units
  }

  getColor(options) {
    this.color = categoryColor(
      this.info.color || this.info.category,
      options.isHighContrast,
    )

    return this.color
  }

  draw(options) {
    this.getColor(options)

    const isDefine = this.info.shape === "define-hat"
    let children = this.children
    const isCommand = this.isCommand

    const padding = BlockView.padding[this.info.shape] || BlockView.padding.null
    const pt = padding[0][1],
      pb = padding[1][1],
      ptmin = padding[0][0],
      pbmin = padding[1][0]

    let y = this.info.shape === "cat" ? 16 : 0
    let extensionLineWidth = 0
    class Line {
      constructor(y) {
        this.y = y
        this.width = extensionLineWidth
        this.padding = {
          top: 0,
          bottom: 0,
        }
        this.height = 21
        this.children = []
        this.firstLine = false
        this.firstSection = false
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
      y += line.padding.top + line.padding.bottom
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
    let previousChild
    let lastChild
    line.firstLine = true
    line.firstSection = true
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (options.zebraColoring) {
        if (child.isUpvar) {
          if (this.color.primary.eq(child.getColor(options).primary)) {
            child.isZebra = this.isZebra
          }
        } else if (this.isBlockPrototype) {
          if (
            child.isBlock &&
            child.getColor(options).primary.eq(this.color.primary)
          ) {
            this.isZebra = true
          }
        } else if (
          !this.isZebra &&
          child.isBlock &&
          !child.isOutline &&
          !child.isUpvar
        ) {
          if (child.getColor(options).primary.eq(this.color.primary)) {
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

      if (previousChild?.isLine) {
        extensionLineWidth =
          line.width + this.marginBetween(previousChild, child)
      }

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

        if (line.firstLine && line.firstSection) {
          line.padding.top = Math.max(pt - (line.height - 13) / 2, ptmin)
        }
        if (line.firstSection || (!line.firstLine && !line.firstSection)) {
          line.padding.bottom += Math.max(pb - (line.height - 13) / 2, pbmin)
        } else {
          line.padding.bottom += Math.max(
            pbmin * 2 - (line.height - 13) / 2,
            pbmin,
          )
        }

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

        child.y = y - 1
        lines.push(child)
        scriptWidth = Math.max(scriptWidth, Math.max(1, child.width))
        child.height = Math.max(29, child.height + 3) - 2
        y += child.height

        this.commentHeight = Math.max(
          this.commentHeight,
          child.y + child.commentHeight,
        )

        line = new Line(y)
        line.firstLine = true
        line.padding.top = 2
        lastChild = child
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
        previousChild = child

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
      } else {
        // Remember the last child on the first line
        if (!lines.length) {
          lastChild = child
        }

        // block wrapping
        if (
          options.wrapSize > 0 &&
          line.width + child.width > options.wrapSize
        ) {
          if (previousChild && line.children.length > 0) {
            line.width += this.marginBetween(previousChild, child)
          }
          let firstSection = line.firstSection
          if (line.firstLine && line.firstSection) {
            line.padding.top = Math.max(
              (this.isOutline ? pt - 4 : pt) - (line.height - 13) / 2,
              ptmin,
            )
          }
          if (line.firstSection || (!line.firstLine && !line.firstSection)) {
            line.padding.bottom += Math.max(
              (this.isOutline ? pb - 4 : pb) - (line.height - 13) / 2,
              pbmin,
            )
          } else {
            line.padding.bottom += Math.max(
              pbmin * 2 - (line.height - 13) / 2,
              pbmin,
            )
          }
          pushLine()
          line = new Line(y)
          line.firstSection = firstSection
        }

        // Leave space between inputs
        if (previousChild && line.children.length > 0) {
          line.width += this.marginBetween(previousChild, child)
        }

        // Align first input with right of notch
        if (children[0] != null) {
          const cmw = 48 - this.horizontalPadding(children[0])
          if (
            (this.isCommand || this.isOutline) &&
            !child.isLabel &&
            !child.isIcon &&
            line.width < cmw
          ) {
            line.width = cmw
          }
        }

        // Align extension category icons below notch
        if (child.isIcon && i === 0 && this.isCommand) {
          line.height = Math.max(line.height, child.height)
        }

        child.x = line.width
        line.width += child.width
        innerWidth = Math.max(innerWidth, line.width)
        line.height = Math.max(line.height, child.height)
        line.children.push(child)
        previousChild = child
      }
    }
    if (line.firstLine && line.firstSection) {
      line.padding.top = Math.max(
        (this.isOutline ? pt - 4 : pt) - (line.height - 13) / 2,
        ptmin,
      )
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

    if (line.firstSection || (!line.firstLine && !line.firstSection)) {
      line.padding.bottom += Math.max(
        (this.isOutline ? pb - 4 : pb) - (line.height - 13) / 2,
        pbmin,
      )
    } else {
      line.padding.bottom += Math.max(pbmin * 2 - (line.height - 13) / 2, pbmin)
    }
    // y += pb
    pushLine()

    this.lines = lines

    let padLeft = children.length ? this.horizontalPadding(children[0]) : 0
    const padRight = children.length ? this.horizontalPadding(lastChild) : 0

    innerWidth += padLeft + padRight

    // Commands have a minimum width.
    // Outline min-width is deliberately higher (because Scratch 3 looks silly).
    const originalInnerWidth = innerWidth

    innerWidth = Math.max(
      this.hasScript
        ? 160
        : this.isHat
          ? 100 // Correct for Scratch 3.0.
          : this.isCommand || this.isOutline || this.isFinal
            ? 64
            : this.isReporter
              ? 48
              : 0,
      innerWidth,
    )

    // Center the label text inside small reporters.
    if (this.isReporter && !this.hasScript) {
      padLeft += (innerWidth - originalInnerWidth) / 2
    }

    this.height = y

    this.width = scriptWidth
      ? Math.max(innerWidth, 16 + (this.isBoolean ? 20 : 0) + scriptWidth)
      : innerWidth
    this.firstLine = lines[0]
    this.innerWidth = innerWidth

    const objects = []
    lastCSlot = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.isScript) {
        objects.push(SVG.move(16, line.y, line.el))
        lastCSlot = line
        continue
      }

      const h = line.height

      for (let j = 0; j < line.children.length; j++) {
        const child = line.children[j]
        if (child.isLoop && lastCSlot) {
          objects.push(
            SVG.move(
              innerWidth - child.width - 4 - this.isBoolean * 18,
              lastCSlot.y + lastCSlot.height,
              child.el,
            ),
          )
          continue
        }

        let y = pt + (h - child.height - pt - pb) / 2
        if (child.isLabel && i === 0) {
          // We only do this for the first line so that the `else` label is
          // correctly aligned
          y -= 1
        } else if (isDefine && child.isLabel) {
          y += 3
        } else if (child.isIcon) {
          y += child.dy | 0
          if (this.isCommand && i === 0 && j === 0 && child.isExtension) {
            y += 4
          }
        }

        let x = padLeft + child.x
        if (child.dx) {
          x += child.dx
        }

        if (this.isRing) {
          child.y = (line.y + y) | 0
          if (child.isInset) {
            continue
          }
        }

        objects.push(SVG.move(x, (line.y + y) | 0, child.el))
      }
    }

    const el = this.drawSelf(options, innerWidth, this.height, lines)
    objects.splice(0, 0, el)
    if (this.info.color) {
      SVG.setProps(el, {
        fill: this.info.color,
        stroke: "rgba(0, 0, 0, 0.2)",
      })
    }

    return SVG.group(objects)
  }
}

export class CommentView {
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
    if (this.isMultiline) {
      return Math.max(this.label.width + this.textMargin * 2, 100)
    } else {
      return 32 + this.label.width + 16
    }
  }

  get height() {
    if (this.isMultiline) {
      return this.titleBarHeight + this.label.height + this.textMargin * 2
    } else {
      return 32
    }
  }

  get titleBarHeight() {
    return 32
  }

  get textMargin() {
    return 12
  }

  measure(options) {
    this.label.measure({
      ...options,
      showSpaces: false,
    })
  }

  draw(options, block) {
    if (this.isMultiline) {
      return this.drawExpanded(options, block)
    } else {
      return this.drawCollapsed(options, block)
    }
  }

  drawExpanded(options, block) {
    let border = block
      ? block.color.tertiary.toHexString()
      : style.colors.comment.border.toHexString()

    return SVG.group([
      this.hasBlock
        ? SVG.commentLine(CommentView.lineLength, {
            fill: border,
          })
        : null,
      SVG.el("rect", {
        rx: 4,
        ry: 4,
        width: this.width,
        height: this.height,
        fill: style.colors.comment.body.toHexString(),
        stroke: border,
        "stroke-width": 1,
      }),
      SVG.el("rect", {
        rx: 1,
        ry: 1,
        width: this.width,
        height: this.titleBarHeight,
        fill: "black",
        "fill-opacity": 0.1,
      }),
      SVG.move(
        this.textMargin,
        this.titleBarHeight + this.textMargin,
        this.label.draw({
          ...options,
          showSpaces: false,
        }),
      ),
      SVG.move(
        32 / 2 - 10 / 2,
        32 / 2 - 10 / 2,
        SVG.symbol(
          options.isHighContrast
            ? `#sb3-commentArrowDown-high-contrast-${options.id}`
            : `#sb3-commentArrowDown-${options.id}`,
        ),
      ),
    ])
  }

  drawCollapsed(options, block) {
    let border = block
      ? block.color.tertiary.toHexString()
      : style.colors.comment.border.toHexString()
    const labelEl = this.label.draw({
      ...options,
      showSpaces: false,
    })

    return SVG.group([
      this.hasBlock
        ? SVG.commentLine(CommentView.lineLength, {
            fill: border,
          })
        : null,
      SVG.commentRect(this.width, this.height, {
        // class: "sb3-comment",
        fill: style.colors.comment.body.toHexString(),
        stroke: border,
      }),
      SVG.move(32, 5, labelEl),
      SVG.move(
        32 / 2 - 10 / 2,
        32 / 2 - 10 / 2,
        SVG.symbol(
          options.isHighContrast
            ? `#sb3-commentArrowUp-high-contrast-${options.id}`
            : `#sb3-commentArrowUp-${options.id}`,
        ),
      ),
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
      class: "sb3-diff sb3-diff-ins",
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
    this.isZebra = false

    this.color = categoryColor("obsolete")
  }

  get isScript() {
    return true
  }

  get hasFinal() {
    let last = this.blocks[this.blocks.length - 1]
    if (last) {
      return last.isFinal
    }
    return false
  }

  measure(options) {
    for (const block of this.blocks) {
      block.measure(options)
    }
  }

  draw(options, inside) {
    const children = []
    let y = 1
    this.width = 0
    for (const block of this.blocks) {
      const x = inside ? 0 : 2
      if (block.isBlock) {
        if (
          inside &&
          !this.isZebra &&
          this.color.primary.eq(block.getColor(options).primary)
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

      const comment = block.comment
      if (comment) {
        const line = block.firstLine
        const cx = block.innerWidth + 2 + CommentView.lineLength
        const cy = y + 5
        const el = comment.draw(options, block)
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
    const lastBlock = this.blocks[this.blocks.length - 1]
    this.height = y + 1
    if (!inside && !this.isFinal) {
      this.height += lastBlock.hasPuzzle ? 8 : 0
    }
    if (!inside && lastBlock.isGlow) {
      this.height += 7 // TODO unbreak this
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
    this.isHighContrast =
      options.style.replace("scratch3-", "") == "high-contrast"

    this.options = {
      id: this.id,
      isHighContrast: this.isHighContrast,
      wrapSize: options.wrap
        ? options.wrapSize != undefined && options.wrapSize > 0
          ? options.wrapSize
          : 600
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

  measure(options) {
    this.scripts.forEach(script => {
      script.measure(options)
    })
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
    for (let i = 0; i < this.scripts.length; i++) {
      const script = this.scripts[i]
      if (height) {
        height += 10
      }
      script.y = height
      elements.push(SVG.move(0, height, script.draw(this.options)))
      height += Math.max(
        script.height,
        script.commentHeight ? script.commentHeight : 0,
      )
      if (i !== this.scripts.length - 1) {
        height += 36
      }
      width = Math.max(width, script.width + 4)
    }
    this.width = width
    this.height = height

    // return SVG
    const svg = SVG.newSVG(width, height, this.scale)
    svg.classList.add(
      `snapblocks-style-scratch3${this.isHighContrast ? `-high-contrast` : ""}`,
    )
    svg.classList.add("scratch3")

    const icons = this.isHighContrast
      ? makeHighContrastIcons()
      : makeOriginalIcons()

    for (let icon of icons) {
      this.updateIds(icon)
    }

    svg.appendChild(
      (this.defs = SVG.withChildren(SVG.el("defs"), [
        ...icons,
        this.isHighContrast
          ? zebraFilter(`sb3DarkFilter-${this.id}`, true)
          : zebraFilter(`sb3LightFilter-${this.id}`, false),
      ])),
    )

    let group = SVG.group(elements)

    group.style.setProperty("--id", this.id)
    group.style.setProperty("--sb3DarkFilter", `url(#sb3DarkFilter-${this.id})`)
    group.style.setProperty(
      "--sb3LightFilter",
      `url(#sb3LightFilter-${this.id})`,
    )

    svg.appendChild(
      SVG.setProps(SVG.group([group]), {
        style: `transform: scale(${this.scale})`,
      }),
    )
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
