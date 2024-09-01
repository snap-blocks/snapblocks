/**
 * @typedef {Object} Options
 * @property {string} id
 * @property {boolean} isFlat
 * @property {number} wrapSize
 * @property {boolean} zebraColoring
 * @property {boolean} showSpaces
 * @property {number} commentWidth
 */

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
import Style from "./style.js"
const {
  categoryColor,
  defaultFontFamily,
  makeStyle,
  makeIcons,
  darkRect,
  bevelFilter,
  dropShadowFilter,
} = style
import {
  scaleFontSize,
  splitFontSize,
  getFontHeight,
} from "../shared/scaleFontSize.js"

/**
 * Icons that should be rendered as unicode characters
 *
 * @type {{}}
 */
const unicodeIcons = {}
/**
 * Category aliases
 *
 * @type {Object}
 */
const categoryAliases = {
  ...aliasExtensions,
  events: "control",
  custom: "other",
  grey: "other",
  gray: "other",
  extension: "other",
  "custom-arg": "variables",
}

export class LabelView {
  /**
   * Creates an instance of LabelView.
   *
   * @constructor
   * @param {(Label | Icon)} label
   * @extends Label
   */
  constructor(label) {
    this._color = new Color(255, 255, 255)
    this.defaultColor = true
    this._fontSize = "10px"
    this.defaultFontSize = true
    this.formatting = {
      italic: false,
      monospace: false,
    }

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
    this.height = 10
    this.metrics = null
    this.x = 0
  }

  /**
   * This is a label
   *
   * @readonly
   * @type {true}
   */
  get isLabel() {
    return true
  }

  /**
   * The label color
   *
   * @type {Color}
   */
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

  /**
   * The label font size as a css unit
   *
   * @type {string}
   */
  get fontSize() {
    return this._fontSize
  }
  set fontSize(size) {
    this._fontSize = size
    this.defaultFontSize = false
  }

  /**
   * Draw label
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  draw(options) {
    if (!options.isFlat) {
      this.el.classList.add("snap-drop-shadow")
    }
    return this.el
  }

  /**
   * Text width
   *
   * @readonly
   * @type {number}
   */
  get width() {
    return this.metrics.width
  }

  /**
   * The width of a space
   *
   * @readonly
   * @type {number}
   */
  get spaceWidth() {
    return this.metrics.spaceWidth
  }

  /**
   * lines
   *
   * @readonly
   * @type {{word: string; width: number; height: number;}[][]}
   */
  get lines() {
    return this.metrics.lines
  }

  /**
   * Snap's raw height
   *
   * @readonly
   * @type {number}
   */
  get rawHeight() {
    // snap does this
    return this.height / 1.2
  }

  /**
   * Measure (and draw) text
   *
   * @param {Options} options
   * @param {boolean} isZebra
   */
  measure(options, isZebra) {
    const value = this.value
    const cls = `snap-${this.cls}`

    if (this.defaultColor) {
      if (/comment-label/.test(this.cls)) {
        this._color = Style.colors.comment.label
      } else if (/boolean/.test(this.cls)) {
        this._color = Style.colors.booleanLiteral
      } else if (/label/.test(this.cls)) {
        this._color = isZebra ? Style.colors.zebraLabel : Style.colors.label
      } else if (/readonly/.test(this.cls)) {
        this._color = isZebra
          ? Style.colors.zebraReadonlyLiteral
          : Style.colors.readonlyLiteral
      } else if (/literal/.test(this.cls)) {
        this._color = Style.colors.literal
      } else {
        this._color = new Color(255, 255, 255)
      }
    }

    if (this.defaultFontSize) {
      this._fontSize = /comment-label/.test(this.cls)
        ? "10px"
        : /literal-boolean/.test(this.cls)
          ? `9px`
          : /literal/.test(this.cls)
            ? `10px`
            : `10px`
    }

    let fontWeight = /comment-label-multiline/.test(this.cls)
      ? "normal"
      : /comment-label/.test(this.cls)
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

    let fontFamily = this.formatting.monospace
      ? "monospace"
      : /comment-label/.test(this.cls)
        ? `Helvetica, Arial, DejaVu Sans, sans-serif`
        : /literal-boolean/.test(this.cls)
          ? `Arial, DejaVu Sans, sans-serif`
          : /literal/.test(this.cls)
            ? `Arial, DejaVu Sans, sans-serif`
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
      // TODO: add some way of making monospaced
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
                class: "snap-space",
                fill: Style.colors.space.toHexString(),
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

  /**
   * Measure text
   *
   * @static
   * @param {string} value
   * @param {string} font
   * @returns {{ width: number; spaceWidth: any; lines: {word: string; width: number; height: number;}[][]; }}
   */
  static measure(value, font) {
    /**
     * Canvas context
     *
     * @type {CanvasRenderingContext2D}
     */
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

/**
 * Cached metrics
 *
 * @type {{[type: string]: { width: number; spaceWidth: any; lines: {word: string; width: number; height: number;}[][]; }}}
 */
LabelView.metricsCache = {}

export class IconView {
  /**
   * @typedef {Object} IconInfo
   * @property {number} width
   * @property {number} height
   * @property {(string | string[])} [fillAttribute]
   * @property {number} [scale]
   * @property {string} [alias]
   * @property {number} [dy=0]
   * @property {boolean} [noShadow=false]
   */

  /**
   * Creates an instance of IconView.
   *
   * @constructor
   * @param {Icon} icon
   */
  constructor(icon) {
    this.scale = 1
    this.width = 12
    this.height = 12
    this.modified = false
    this.name = ""
    this.color = new Color(255, 255, 255)
    this.padx = 4
    this.fillAttribute = "fill"

    const info = this.getInfo(icon.name)

    Object.assign(this, info)
    Object.assign(this, icon)

    // if (this.scale && this.modified) {
    //   this.scale = (10 / 12) * this.scale // set the size to 10 if the scale is set
    // }

    if (this.scale <= 0 || isNaN(this.scale)) {
      this.scale = info.scale || 12 / 10
    }

    if (!this.color) {
      this.color = info.color || new Color(255, 255, 255)
    }

    if (!this.fillAttribute) {
      this.fillAttribute = "fill"
    }
  }

  /**
   * Get icon info
   *
   * @param {string} name
   * @returns {IconInfo}
   */
  getInfo(name) {
    let info = IconView.icons[name]
    if (!info) {
      throw new Error(`no info for icon: ${name}`)
    }

    if (info.alias) {
      info = {
        ...this.getInfo(info.alias),
        ...info,
      }
    }

    return info
  }

  /**
   * Get scaled width
   *
   * @type {number}
   */
  get width() {
    return this._width * this.scale
  }

  set width(width) {
    this._width = width
  }

  /**
   * Get scaled height
   *
   * @type {number}
   */
  get height() {
    return this._height * this.scale
  }

  set height(height) {
    this._height = height
  }

  /**
   * This is an icon
   *
   * @readonly
   * @type {true}
   * @constant
   */
  get isIcon() {
    return true
  }

  /**
   * Draw icon
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
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
    let symbol = SVG.setProps(SVG.symbol(`#snap-${name}-${options.id}`), props)
    if (!options.isFlat && !this.noShadow) {
      symbol = SVG.setProps(SVG.group([symbol]), {
        class: "snap-drop-shadow",
      })
    }
    return symbol
  }

  /**
   * Description placeholder
   *
   * @static
   * @readonly
   * @type {{[type: string]: IconInfo}}
   */
  static get icons() {
    return {
      greenFlag: {
        scale: 1.5,
        color: new Color(0, 200, 0),
        alias: "flag",
      },
      flag: {
        width: 10,
        height: 10,
        fillAttribute: "stroke",
      },
      octagon: { width: 10, height: 10 },
      stopSign: { alias: "octagon", color: new Color(200, 0, 0) },
      turnLeft: {
        width: (10 / 3) * 2,
        height: 10,
        fillAttribute: ["stroke", "fill"],
      },
      turnRight: {
        width: (10 / 3) * 2,
        height: 10,
        fillAttribute: ["stroke", "fill"],
      },
      clockwise: {
        alias: "turnRight",
        scale: 1.5,
      },
      counterclockwise: {
        alias: "turnLeft",
        scale: 1.5,
      },
      loop: {
        width: 20,
        height: 10,
        fillAttribute: ["stroke", "fill"],
      },
      loopArrow: {
        scale: 0.7,
        alias: "loop",
      },
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
        scale: 11 / 12,
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
      turnForward: { width: 16, height: 10, fillAttribute: ["fill", "stroke"] },
      magnifyingGlass: {
        width: 10,
        height: 10,
        fillAttribute: ["fill", "stroke"],
      },
      magnifierOutline: { width: 10, height: 10, fillAttribute: "stroke" },
      selection: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      polygon: { width: 10, height: 10, fillAttribute: "stroke" },
      closedBrush: { width: 10, height: 10, fillAttribute: "stroke" },
      footprints: { width: 10, height: 10 },
      keyboard: { width: 16, height: 10 },
      keyboardFilled: { width: 16, height: 10 },
      listNarrow: { width: 5, height: 10 },
      flipHorizontal: {
        width: 10,
        height: 10,
        fillAttribute: ["fill", "stroke"],
      },
      flipVertical: {
        width: 10,
        height: 10,
        fillAttribute: ["fill", "stroke"],
      },
      trash: { width: 10, height: 10, fillAttribute: ["fill", "stroke"] },
      trashFull: { width: 10, height: 10 },

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

export class InputView {
  /**
   * Creates an instance of InputView.
   *
   * @constructor
   * @param {Input} input
   */
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

  /**
   * This is an icon
   *
   * @readonly
   * @constant
   * @type {true}
   */
  get isInput() {
    return true
  }

  /**
   * Measure input label
   *
   * @param {Options} options
   */
  measure(options) {
    if (this.hasLabel) {
      this.label.measure(options)
    }
  }

  /**
   * Shapes
   *
   * @static
   * @readonly
   * @type {{[type: string]: () => SVGElement}}
   */
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

  /**
   * Draw input
   *
   * @param {Options} options
   * @param {BlockView} parent
   * @returns {SVGElement}
   */
  draw(options, parent) {
    let w, h
    let label
    if (this.isBoolean && !this.isBig) {
      if (this.value == "t") {
        label = SVG.el("path", {
          d: "M 5 6 L 7.5 8.5 L 10 3.5",
          style: `stroke-linecap: round; stroke-linejoin: miter;`,
          fill: "none",
          stroke: "white",
          "stroke-width": 1.5,
          class: !options.isFlat ? "snap-drop-shadow" : "",
        })
      } else {
        label = SVG.el("path", {
          d: "M 13.5 3.5 L 18.5 8.5 M 18.5 3.5 L 13.5 8.5",
          style: `stroke-linecap: butt;`,
          fill: "none",
          stroke: "white",
          "stroke-width": 1,
          class: !options.isFlat ? "snap-drop-shadow" : "",
        })
      }
      w = 24
      h = 12
    } else if (this.icon) {
      label = this.icon.draw(options)
      h = this.icon.height + 4
      w = this.icon.width + this.hasArrow * 12 + 4 + 2
    } else if (this.hasLabel) {
      if (!(this.isBoolean && !this.isBig)) {
        this.label.measure(options, parent.isZebra)
        label = this.label.draw({
          ...options,
          isFlat: !this.isBoolean || options.isFlat,
        })
      }

      h = this.label.height

      if (this.shape === "number" || this.shape === "number-dropdown") {
        w =
          this.label.width +
          2 +
          Math.floor(this.hasArrow * 12 * 0.5) +
          Math.min(h, 12) +
          2
      } else if (this.isBoolean && this.isBig) {
        h += 1
        w = 23 + h * 1.5
      } else {
        w = Math.max(
          this.label.width + this.hasArrow * 12 + 2 + 2,
          this.label.lines.length <= 1 // single vs. multi-line contents
            ? this.label.rawHeight + this.hasArrow * 12
            : getFontHeight(this.label.fontSize) + this.hasArrow * 12,
          this.isBig * 23.8,
        )
      }
    } else {
      h = this.hasLabel ? this.label.height + 1 : this.isInset ? 12 : 13
      w = this.isInset
        ? this.isCommand
          ? 26
          : 24
        : this.isBoolean
          ? 20
          : this.isColor
            ? 14
            : null
    }

    if ((this.isBoolean && !this.isBig) || this.isInset) {
      h -= 1
    }

    // I'm adding a bit of padding around the input
    this.width = w
    this.height = h + 1

    let el = InputView.shapes[this.shape](w, h)

    let color = parent.color

    if (parent.isZebra) {
      color = color.zebra()
    }

    if (this.isColor) {
      SVG.setProps(el, {
        fill: this.value.toHexString(),
      })
    } else if (this.isBoolean) {
      switch (this.value) {
        case "true":
        case "t":
          SVG.setProps(el, {
            fill: categoryColor("true").toHexString(),
          })
          break
        case "false":
        case "f":
          SVG.setProps(el, {
            fill: categoryColor("false").toHexString(),
          })
          break
        default:
          SVG.setProps(el, {
            fill: parent.color.darker(25).toHexString(),
          })
      }
    } else if (this.isDarker) {
      el = darkRect(
        w,
        h,
        this.isBoolean ? color.darker(25) : color.darker(),
        el,
      )
    } else {
      SVG.setProps(el, {
        fill: "white",
      })
    }

    const result = SVG.group([
      SVG.setProps(el, {
        class: `${!options.isFlat ? "snap-input-bevel" : ""} snap-input-${
          this.shape
        }`,
      }),
    ])
    if (this.hasLabel || this.icon) {
      let x, y
      if (this.isBoolean) {
        if (this.isBig) {
          if (this.value == "true") {
            x = h / 2
          } else {
            x = w - h / 2 - 21
          }
          y = 0
        } else {
          // it's offset in the path
          x = 0
          y = 0
        }
      } else if (this.icon) {
        x = 2
        y = 2
      } else {
        x = this.isRound ? Math.floor(Math.min(h, 12) / 2) + 1 : 2 + 1
        y = this.isRound ? 0 : 0
      }
      result.appendChild(SVG.move(x, y, label))
    }
    if (this.isBoolean && this.value) {
      let y = h / 2
      let circle = SVG.el("circle", {
        cx: ["true", "t"].includes(this.value) ? this.width - y : y,
        cy: y,
        r: y,
        fill: new Color(220, 220, 220).toHexString(),
        class: !options.isFlat ? "snap-bevel" : "",
      })
      result.appendChild(circle)
    }
    if (this.hasArrow) {
      result.appendChild(
        SVG.move(
          w - 11,
          3.5,
          SVG.polygon({
            points: [1, 1, 9, 1, 5, 5],
            fill: "#000",
          }),
        ),
      )
    }
    SVG.move(0, 0.5, result)
    return result
  }
}

export class BlockView {
  /**
   * Creates an instance of BlockView.
   *
   * @constructor
   * @param {Block} block
   */
  constructor(block) {
    Object.assign(this, block)
    this.children = block.children.map(newView)
    this.comment = this.comment ? newView(this.comment) : null

    // Avoid accidental mutation
    this.info = {
      ...block.info,
    }

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
    this.strokeWidth = 1
    this.isSnavanced = false
    this.isZebra = false

    this.color = categoryColor(this.info.color || this.info.category)
  }

  /**
   * This is a block
   *
   * @readonly
   * @constant
   * @type {true}
   */
  get isBlock() {
    return true
  }

  /**
   * Measure this block and it's children
   *
   * @param {Options} options
   */
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

  /**
   * Block shapes
   *
   * @static
   * @readonly
   * @type {{[type: string]: () => SVGElement}}
   */
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
      "block-prototype": SVG.hatRect,
      ring: SVG.roundedRect,
    }
  }

  /**
   * Draw block element
   *
   * @param {Options} options
   * @param {number} w
   * @param {number} h
   * @param {(Line | Script)[]} lines
   * @returns {SVGElement}
   */
  drawSelf(options, w, h, lines) {
    let el = null

    // mouths
    if (lines.length > 1) {
      let y = lines[0].totalHeight
      const p = []
      if (this.info.shape === "stack") {
        p.push(SVG.getTop(w))
      } else if (
        this.info.shape === "reporter" ||
        (this.info.shape === "ring" && !this.isSnavanced)
      ) {
        p.push(SVG.getRoundedTop(w, h))
      } else if (this.info.shape === "ring" && this.isSnavanced) {
        p.push(SVG.getRingTop(w, h))
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedTop(w, h))
      } else if (
        ["hat", "block-prototype", "define-hat"].includes(this.info.shape)
      ) {
        p.push(SVG.getHatTop(w, h))
      } else {
        p.push(SVG.getTop(w))
      }
      let isLast = false
      let showBooleanRight = true
      for (let i = 1; i < lines.length; i += 1) {
        isLast = i + 2 === lines.length

        if (lines[i].isScript) {
          p.push(
            SVG.getRightAndBottom(
              w - this.isBoolean * 8,
              y,
              true,
              lines[i].x || (this.isBoolean ? 15 : 9),
            ),
          )
          y += lines[i].height - 3
          p.push(
            SVG.getArm(
              w - this.isBoolean * 8,
              y,
              lines[i].x || (this.isBoolean ? 15 : 9),
            ),
          )

          y += lines[i + 1].totalHeight + 3
          showBooleanRight = false
          i++
        } else {
          y += lines[i].totalHeight
        }
      }
      if (this.info.shape === "stack") {
        p.push(SVG.getRightAndBottom(w, h, !this.isFinal, 0))
      } else if (
        this.info.shape === "reporter" ||
        (this.info.shape === "ring" && !this.isSnavanced)
      ) {
        p.push(SVG.getRoundedBottom(w, h))
      } else if (this.info.shape === "ring" && this.isSnavanced) {
        p.push(SVG.getRingBottom(w, h))
      } else if (this.info.shape === "boolean") {
        p.push(SVG.getPointedBottom(w, h, showBooleanRight))
      } else {
        p.push(SVG.getRightAndBottom(w, h, !this.isFinal, 0))
      }
      p.push("Z")

      let props = {
        class: `snap-block`,
      }

      if (this.isRing) {
        let child = this.children.find(child => child.isBlock)
        if (child) {
          const func = child.isScript
            ? (w, h, isFilled) => {
                return SVG.getCommandSlotPath(w, h - 3, isFilled)
              }
            : child.info.shape === "reporter"
              ? SVG.getReporterSlotPath
              : child.info.shape === "boolean"
                ? SVG.getBooleanSlotPath
                : SVG.getCommandSlotPath

          let cy = child.y,
            cw = child.width,
            ch = child.height
          p.push(
            SVG.translatePath(
              3,
              cy || 4,
              func(cw, ch, !child.isInset).join(" "),
            ),
          )
          props["fill-rule"] = "evenodd"
        }
      }

      props["path"] = p

      el = SVG.path(props)
    } else if (/outline-\w+/.test(this.info.shape)) {
      // outlines
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
        el = SVG.ringRect(
          w,
          h,
          child,
          shape,
          {
            class: `snap-block`,
          },
          !child.isBlock,
        )
      }
    } else {
      const func = BlockView.shapes[this.info.shape]
      if (!func) {
        throw new Error(`no shape func: ${this.info.shape}`)
      }
      el = func(w, h, {
        class: `snap-block`,
      })
    }

    let color = this.color

    if (this.isZebra) {
      if (color) {
        color = color.zebra()
      }
    }
    el.classList.add(options.isFlat ? "snap-flat" : "snap-bevel")
    if (options.isFlat) {
      SVG.setProps(el, {
        stroke: color.darker(25).toHexString(),
        "stroke-width": 1,
      })
    }
    if (color) {
      el.style.fill = color.toHexString()
    }
    return el
  }

  /**
   * Draw local block pin
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  drawLocalPin(options) {
    var ext = { x: 7.92, y: 12 },
      w = ext.x,
      h = ext.y,
      r = w / 2,
      x = 5,
      y = 1,
      contrast = options.isFlat ? 25 : 65,
      path = ""

    if (this.isBoolean) {
      x = 9
    }
    if (this.isCommand) {
      y += 3
    }

    let color = this.isZebra
      ? this.color.darker(contrast)
      : this.color.lighter(contrast)

    path += SVG.canvasArc(
      x + r,
      y + r,
      r,
      SVG.radians(-210),
      SVG.radians(30),
      false,
    )
    path += ` L ${x + r} ${y + h} Z `
    path += SVG.canvasArc(
      x + r,
      y + r,
      r * 0.4,
      SVG.radians(0),
      SVG.radians(360),
      false,
    )

    return SVG.el("path", {
      d: path,
      "fill-rule": "evenodd",
      fill: color,
    })
  }

  /**
   * Draw block
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  draw(options) {
    let children = this.children

    class Line {
      /**
       * Creates an instance of Line.
       *
       * @constructor
       * @param {number} y
       */
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

    let rounding = 9,
      edge = 1,
      corner = 3,
      inset = 6,
      dent = 8,
      labelPadding = 4,
      fontSize = 10,
      bottomPadding = this.isRing ? 0 : 3,
      hatWidth = 70,
      hatHeight = 12,
      index = 0

    let x = 0,
      y,
      lineHeight = 0,
      maxX = 0,
      blockWidth = 0,
      fullWidth = 0,
      blockHeight = 0,
      l = [],
      noWrapLine = [],
      noWrapLines = [],
      lines = [],
      space = this.isBlockPrototype ? 1 : Math.floor(12 / 1.4 / 2),
      ico = this.info.local ? 7.92 + space : 0, // for local block, if I care to add that
      bottomCorrection,
      rightCorrection = 0,
      rightMost,
      hasLoopCSlot = false,
      hasLoopArrow = false,
      lastCSlot = null

    if (this.isReporter || this.isBoolean) {
      blockWidth += rounding * 2 + edge * 2
    } else {
      blockWidth += corner * 4 + edge * 2 + inset * 3 + dent
    }

    index = 0
    children.forEach(child => {
      if (child.isLabel) {
        child.cls = "block-label"
        child.measure(options, this.isZebra)
      }
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
        }
      }

      child.el = child.draw(options, this)

      // snap positioning
      if (child.isCShape) {
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
          loop.scale = IconView.icons.loopArrow.scale || 1
          loop.el = loop.draw(options, this)
        }
        if (l.length > 0) {
          lines.push(l)
          lines.push([child])
          l = []
          x = 0
        } else {
          lines.push([child])
        }
        if (noWrapLine.length > 0) {
          noWrapLines.push(noWrapLine)
          noWrapLines.push([child])
          noWrapLine = []
        } else {
          noWrapLines.push([child])
        }
        this.isSnavanced = true
      } else if (
        child.isIcon &&
        ["delInput", "verticalEllipsis", "addInput"].includes(child.name)
      ) {
        if (
          child.name === "verticalEllipsis" &&
          children[index + 1] &&
          children[index + 1].isIcon &&
          children[index + 1].name === "addInput"
        ) {
          child.el.classList.remove("snap-drop-shadow")
          child.el.setAttribute("opacity", 0.5)
          x += 3
        } else if (
          child.name === "addInput" &&
          children[index + 1] &&
          children[index + 1].isIcon &&
          children[index + 1].name === "verticalEllipsis"
        ) {
          x += child.width + 1
        } else if (
          child.isIcon &&
          child.name === "verticalEllipsis" &&
          children[index - 1] &&
          children[index - 1].isIcon &&
          children[index - 1].name === "delInput" &&
          (!children[index + 1] ||
            !(
              children[index + 1] &&
              children[index + 1].isIcon &&
              children[index + 1].name === "addInput"
            ))
        ) {
          x += child.width
        } else {
          x += child.width + space
          if (
            children[index - 1] &&
            !(
              children[index - 1].isIcon &&
              ["delInput", "verticalEllipsis", "addINput"].includes(
                children[index - 1].name,
              )
            )
          ) {
            if (options.wrapSize > 0 && x > options.wrapSize) {
              lines.push(l)
              l = []
              x = child.width + space
            }
          }
        }
        l.push(child)
      } else {
        x += child.width + space
        if ((options.wrapSize > 0 && x > options.wrapSize) || child.isNewline) {
          if (l.length > 0) {
            lines.push(l)
            l = []
            x = child.width + space
          }
        }
        if (child.isNewline) {
          this.isSnavanced = true
          x = 0

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
            loop.scale = IconView.icons.loopArrow.scale || 1
            loop.el = loop.draw(options, this)
          }

          noWrapLines.push(noWrapLine)
          noWrapLine = []
        } else {
          l.push(child)
          noWrapLine.push(child)
        }
      }
      index += 1
    })
    if (l.length > 0) {
      lines.push(l)
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
        loop.scale = IconView.icons.loopArrow.scale || 1
        loop.el = loop.draw(options, this)
      }
      noWrapLines.push(noWrapLine)
    }

    // distribute parts on lines
    if (this.isCommand || this.isFinal || this.isHat) {
      y = corner + edge
      if (this.isHat) {
        y += hatHeight
      }
    } else if (this.isReporter || this.isBoolean || this.isRing) {
      y = edge * 2
    }

    let drawLines = []
    let drawLine
    let isCSlot = false

    lastCSlot = null
    lines.forEach(line => {
      isCSlot = false
      if (hasLoopCSlot) {
        hasLoopArrow = true
        hasLoopCSlot = false
      }
      x = ico + edge + labelPadding
      if (this.isRing) {
        x = space //this.labelPadding;
      } else if (this.isBoolean) {
        x = ico + rounding
      } else if (this.isUpvar) {
        x = edge + 1
      }
      y += lineHeight
      drawLine = new Line(y)
      lineHeight = 0
      index = 0
      line.forEach(child => {
        if (child.isLoop) {
          hasLoopCSlot = true
        }
        if (child.isCShape) {
          isCSlot = true
          y += 4
          if (drawLines.length) {
            if (!drawLines[drawLines.length - 1]?.isScript) {
              if (!this.hasScript) {
                drawLines[drawLines.length - 1].height +=
                  6 + (this.isCommand || this.isFinal) * 2
              } else {
                drawLines[drawLines.length - 1].height += 4
              }
            }
          }
          if (
            drawLines.length == 0 ||
            drawLines[drawLines.length - 1].isScript
          ) {
            drawLine.height = drawLines.length == 0 ? 8 : 4
            drawLines.push(drawLine)
            drawLine = new Line(y)
          }

          this.hasScript = true
          child.y = y
          drawLines.push(child)
          x -= labelPadding
          x += 8
          if (this.isBoolean) {
            x += 2
          } else if (this.isRing) {
            x += 1
          }
          child.x = x
          SVG.move(x, y, child.el)
          lineHeight = child.height
          fullWidth = Math.max(fullWidth, x + child.width + 8)
          lastCSlot = child

          if (child.commentHeight) {
            this.commentHeight = Math.max(
              this.commentHeight,
              child.y + child.commentHeight,
            )
          }
        } else if (child.isLoop) {
          if (lastCSlot) {
            let cIndex = drawLines.indexOf(lastCSlot)
            let trueRow = drawLines[cIndex + 1]
            if (trueRow) {
              trueRow.width += fontSize * 1.5
              maxX = Math.max(maxX, trueRow.width)
              fullWidth = Math.max(fullWidth, trueRow.width)
            } else {
              x += fontSize * 1.5
            }
            hasLoopArrow = true
          }
        } else {
          child.y = y
          if (this.isBlockPrototype && child.isCommand) {
            child.height += 3
          }
          SVG.move(
            x - (this.isRing ? 1 : 0),
            child.isIcon ? y + (child.dy | 0) : y,
            child.el,
          )
          if (!child.isNewline) {
            if (child.isCShape) {
              x += child.width
            } else if (
              child.isIcon &&
              child.name === "verticalEllipsis" &&
              line[index + 1] &&
              line[index + 1].isIcon &&
              line[index + 1].name === "addInput"
            ) {
              x += child.width
            } else if (
              child.isIcon &&
              child.name === "delInput" &&
              line[index + 1] &&
              line[index + 1].isIcon &&
              line[index + 1].name === "verticalEllipsis"
            ) {
              x += child.width + 1
            } else if (
              child.isIcon &&
              child.name === "verticalEllipsis" &&
              line[index - 1] &&
              line[index - 1].isIcon &&
              line[index - 1].name === "delInput" &&
              (!line[index + 1] ||
                !(
                  line[index + 1] &&
                  line[index + 1].isIcon &&
                  line[index + 1].name === "addInput"
                ))
            ) {
              x += child.width
              SVG.move(-5, 0, child.el)
            } else if (
              child.isIcon &&
              child.name === "delInput" &&
              line[index + 1] &&
              line[index + 1].isIcon &&
              line[index + 1].name === "addInput"
            ) {
              x += child.width + 1
            } else {
              x += child.width + space
            }
          }
          lineHeight = Math.max(
            lineHeight,
            child.isLabel ? child.rawHeight : child.height,
          )
        }
        fullWidth = Math.max(fullWidth, x)
        maxX = Math.max(maxX, x)

        index += 1
      })

      // adjust label row below a loop-arrow C-slot to accomodate the loop icon
      // if (hasLoopArrow) {
      //   x += fontSize * 1.5
      //   maxX = Math.max(maxX, x)
      //   console.log('after', x)
      //   fullWidth = Math.max(fullWidth, x)
      //   // hasLoopArrow = false
      // }

      // center parts vertically on each line:
      line.forEach(child => {
        if (this.isRing) {
          child.y += Math.floor((lineHeight - child.height) / 2)
        }
        if (child.isLoop) {
          return
        }
        SVG.move(0, Math.floor((lineHeight - child.height) / 2), child.el)
      })

      drawLine.width = x
      drawLine.height = lineHeight
      drawLine.children = [...line]
      if (!isCSlot) {
        drawLines.push(drawLine)
      }
    })
    if (isCSlot) {
      // drawLine.height = lineHeight
      drawLines.push(drawLine)
    }

    // if (hasLoopArrow) {
    // maxX = Math.max(maxX, maxX + fontSize * 1.5)
    // fullWidth = Math.max(fullWidth, fullWidth + fontSize * 1.5)
    // hasLoopArrow = false
    // }

    // determine my height:
    y += lineHeight
    if (children.some(any => any.isCShape)) {
      bottomCorrection = bottomPadding
      rightMost = children
        .reverse()
        .find(
          child =>
            child.isIcon && ["delInput", "addInput"].includes(child.name),
        )
      if (
        rightMost &&
        rightMost.isIcon &&
        ["delInput", "addInput"].includes(rightMost.name)
      ) {
        bottomCorrection = 0
      }
      if (this.isReporter || this.isRing) {
        bottomCorrection = Math.max(bottomPadding, rounding - bottomPadding)
      }
      y += bottomCorrection
    }
    if (this.isCommand || this.isFinal || this.isHat) {
      blockHeight = y + corner * 2
    } else if (this.isUpvar) {
      blockHeight = y + (edge * 2 + 3)
    } else if (this.isReporter || this.isBoolean) {
      blockHeight = y + corner * 1.7
    } else if (this.isRing) {
      blockHeight = y + corner * 1.7
    }

    // determine my width:
    if (this.isBoolean) {
      blockWidth = Math.max(blockWidth, maxX + rounding)
      rightCorrection = space
    } else if (this.isUpvar) {
      blockWidth = Math.max(blockWidth, maxX - (edge + 1))
    } else {
      blockWidth = Math.max(blockWidth, maxX + labelPadding - edge)
      rightCorrection = space
    }

    // adjust right padding if rightmost input has arrows
    rightMost = children[children.length - 1]
    if (
      rightMost &&
      rightMost.isIcon &&
      ["delInput", "verticalEllipsis", "addInput"].includes(rightMost.name) &&
      lines.length === 1
    ) {
      blockWidth -= rightCorrection
    }

    // adjust width to hat width
    if (this.isHat) {
      blockWidth = Math.max(blockWidth, hatWidth * 1.5)
    }
    fullWidth = Math.max(fullWidth, blockWidth)

    // set my extent (silently, because we'll redraw later anyway):
    this.width = fullWidth
    this.height = blockHeight - 3

    lastCSlot = null
    noWrapLines.forEach(line => {
      if (line[0] && line[0].isCShape) {
        lastCSlot = line[0]
      } else if (
        lastCSlot &&
        line[line.length - 1] &&
        line[line.length - 1].isLoop
      ) {
        let loop = line[line.length - 1]
        SVG.move(
          blockWidth - loop.width - 2 - this.isBoolean * 8,
          lastCSlot.y + lastCSlot.height - 2,
          loop.el,
        )
      }
    })

    let objects = []

    lines.forEach(line => {
      line.forEach(child => {
        if (this.isRing) {
          if (child.isInset) {
            return
          }
        }
        objects.push(child.el)
      })
    })

    if (this.info.local) {
      objects.push(this.drawLocalPin(options))
    }

    this.lines = drawLines
    this.innerWidth = blockWidth

    const el = this.drawSelf(options, blockWidth, this.height, drawLines)
    objects.splice(0, 0, el)

    return SVG.group(objects)
  }
}

export class CommentView {
  /**
   * Creates an instance of CommentView.
   *
   * @constructor
   * @param {Comment} comment
   */
  constructor(comment) {
    Object.assign(this, comment)
    this.label = newView(comment.label)
    this.arrow = newView(new Icon("addInput"))

    this.padding = 5
  }

  /**
   * This is a comment
   *
   * @readonly
   * @type {boolean}
   */
  get isComment() {
    return true
  }

  /**
   * Line length
   *
   * @static
   * @readonly
   * @type {number}
   */
  static get lineLength() {
    return 8
  }

  /**
   * Comment width
   *
   * @readonly
   * @type {number}
   */
  get width() {
    if (this.isMultiline) {
      return Math.max(this.label.width + 2 * this.padding, 80)
    } else {
      const padding = {
        left: 10,
        arrow: 5,
        right: 10,
      }
      return (
        padding.left +
        this.arrow.width +
        padding.arrow +
        this.label.width +
        padding.right
      )
    }
  }

  /**
   * Comment height
   *
   * @readonly
   * @type {number}
   */
  get height() {
    return Math.max(
      this.titleBarHeight +
        (!this.isMultiline
          ? 0
          : this.padding + this.label.height + this.padding),
    )
  }

  /**
   * Title bar height
   *
   * @readonly
   * @type {number}
   */
  get titleBarHeight() {
    return getFontHeight(this.label.fontSize) + this.padding
  }

  /**
   * Measure the comment label
   *
   * @param {Options} options
   */
  measure(options) {
    this.label.measure({
      ...options,
      showSpaces: false,
    })
  }

  /**
   * Draw comment
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  draw(options) {
    if (this.isMultiline) {
      return this.drawExpanded(options)
    } else {
      return this.drawCollapsed(options)
    }
  }

  /**
   * Draw expanded (multiline) comment
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  drawExpanded(options) {
    let x, y

    const titleBar = SVG.commentRect(this.width, this.titleBarHeight, {
      fill: Style.colors.comment.titleBar.toHexString(),
    })

    x = this.padding
    y = this.titleBarHeight + this.padding

    const arrowEl = SVG.move(
      this.padding,
      this.padding,
      SVG.setProps(this.arrow.draw(options), {
        transform: `rotate(90 ${this.arrow.width / 2} ${this.arrow.height / 2})`,
      }),
    )

    const body = SVG.commentRect(this.width, this.height, {
      fill: Style.colors.comment.body.toHexString(),
      stroke: Style.colors.comment.outline.toHexString(),
    })

    return SVG.group([
      this.hasBlock
        ? SVG.commentLine(CommentView.lineLength, this.titleBarHeight, {
            fill: Style.colors.comment.line.toHexString(),
          })
        : null,
      body,
      titleBar,
      arrowEl,
      SVG.move(
        x,
        y,
        this.label.draw({
          ...options,
          showSpaces: false,
          isFlat: true,
        }),
      ),
    ])
  }

  /**
   * Draw collapsed (one line) comment
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  drawCollapsed(options) {
    const padding = {
      left: 10,
      arrow: 5,
      right: 10,
    }

    const labelEl = this.label.draw({
      ...options,
      showSpaces: false,
      isFlat: true,
    })

    const arrowEl = this.arrow.draw(options)

    // this.width =
    //   padding.left +
    //   this.arrow.width +
    //   padding.arrow +
    //   this.label.width +
    //   padding.right
    return SVG.group([
      this.hasBlock
        ? SVG.commentLine(CommentView.lineLength, this.height, {
            fill: Style.colors.comment.line.toHexString(),
          })
        : null,
      SVG.commentRect(this.width, this.height, {
        fill: Style.colors.comment.titleBar.toHexString(),
      }),
      SVG.move(padding.left, (this.height - this.arrow.height) / 2, arrowEl),
      SVG.move(
        padding.left + this.arrow.width + padding.arrow,
        (this.height - this.label.height + 1) / 2,
        labelEl,
      ),
    ])
  }
}

export class GlowView {
  /**
   * Creates an instance of GlowView.
   *
   * @constructor
   * @param {Glow} glow
   */
  constructor(glow) {
    Object.assign(this, glow)
    /**
     * @type {(Block | Script)}
     */
    this.child = newView(glow.child)

    this.width = null
    this.height = null
    this.y = 0
  }

  /**
   * This is a Glow
   *
   * @readonly
   * @type {boolean}
   */
  get isGlow() {
    return true
  }

  /**
   * Measure the block
   *
   * @param {Options} options
   */
  measure(options) {
    this.child.measure(options)
  }

  /**
   * Draw Glow
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  drawSelf(options) {
    const c = this.child
    let el
    const w = this.width
    const h = this.height - 1
    if (c.isScript) {
      if (!c.isEmpty && c.blocks[0].isHat) {
        el = SVG.hatRect(w, h)
      } else if (c.isFinal) {
        el = BlockView.shapes.cap(w, h)
      } else {
        el = BlockView.shapes.stack(w, h)
      }
    } else {
      el = BlockView.shapes[c.info.shape](w, h + 1)
    }
    return SVG.move(
      0,
      -1,
      SVG.setProps(el, {
        class: "snap-diff snap-diff-ins",
      }),
    )
  }
  // TODO how can we always raise Glows above their parents?

  /**
   * Draw Glow
   *
   * @param {Options} options
   * @returns {SVGElement}
   */
  draw(options) {
    const c = this.child
    const el = c.isScript ? c.draw(options, true) : c.draw(options)

    this.width = c.width
    this.height = (c.isBlock && c.height) || c.height

    // encircle
    return SVG.group([el, this.drawSelf(options)])
  }
}

export class ScriptView {
  /**
   * Creates an instance of ScriptView.
   *
   * @constructor
   * @param {Script} script
   */
  constructor(script) {
    Object.assign(this, script)
    this.blocks = script.blocks.map(newView)

    this.y = 0
    this.commentHeight = 0
    this.color = new Color()
    this.isZebra = false
  }

  /**
   * This is a script
   *
   * @readonly
   * @type {true}
   */
  get isScript() {
    return true
  }

  /**
   * Measure blocks in script
   *
   * @param {Options} options
   */
  measure(options) {
    for (const block of this.blocks) {
      block.measure(options)
    }
  }

  /**
   * Draw script
   *
   * @param {Options} options
   * @param {number} inside - Inside a Glow?
   * @returns {SVGElement}
   */
  draw(options, inside) {
    const children = []
    let y = 0
    this.width = 0
    for (const block of this.blocks) {
      const x = 0
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
        const dh = block.lines[0]?.height || block.height
        children.push(SVG.move(x, y + dh / 2 + 1, SVG.strikethroughLine(dw)))
        this.width = Math.max(this.width, block.width)
      }

      const comment = block.comment
      if (comment) {
        const line = block.firstLine
        const cx = block.innerWidth + CommentView.lineLength
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
    this.height = y + 3
    if (!inside && !this.isFinal) {
      this.height += 3
    }
    const lastBlock = this.blocks[this.blocks.length - 1]
    if (!inside && lastBlock.isGlow) {
      this.height += 2 // TODO unbreak this
    }

    this.height = Math.max(this.height, 3 * 4)
    return SVG.group(children)
  }
}

export class DocumentView {
  /**
   * Creates an instance of DocumentView.
   *
   * @constructor
   * @param {Document} doc
   * @param {Options} options
   */
  constructor(doc, options) {
    this.id = this.makeid(10)

    Object.assign(this, doc)
    this.scripts = doc.scripts.map(newView)

    this.width = null
    this.height = null
    this.el = null
    this.defs = null
    this.scale = options.scale
    /**
     * @type {Options}
     */
    this.options = {
      id: this.id,
      isFlat: options.style.replace("snap-", "").toLowerCase() === "flat",
      wrapSize: options.wrap
        ? options.wrapSize != undefined && options.wrapSize > 0
          ? options.wrapSize
          : 400
        : -1,
      zebraColoring: options.zebraColoring || options.zebra,
      showSpaces: options.showSpaces,
      commentWidth: options.commentWidth || 90,
    }
  }

  /**
   * Create SVG id
   *
   * @param {number} length
   * @returns {string}
   */
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

  /**
   * Update all ids in element and it's children, to add id to the end
   *
   * @param {HTMLOrSVGElement} element
   */
  updateIds(element) {
    let aroundIdRegex = /(#[a-zA-Z][\w:.\-]*)/
    let idRegex = /^#[a-zA-Z][\w:.\-]*$/
    let urlRegex = /\((#[a-zA-Z][\w:.\-]*)\)/

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

    if (element.tagName === "style") {
      let text = element.textContent

      let split = text.split(urlRegex)
      for (let index = 0; index < split.length; index++) {
        let part = split[index]

        if (idRegex.test(part) && !hexColorPat.test(part)) {
          // console.group('is id')
          // console.log(part)
          // console.log('id re', idRegex)
          // console.log('color pat', hexColorPat)
          // console.groupEnd()
          split[index] = `(${part}-${this.id})`
        }
      }
      // console.log('new text')
      // console.log(split)

      element.innerHTML = split.join("")
      // console.log(element.innerHTML)
    }

    for (let child of element.children) {
      this.updateIds(child)
    }
  }

  /**
   * Measure all scripts
   *
   * @param {Options} options
   */
  measure(options) {
    this.scripts.forEach(script => script.measure(options))
  }

  /**
   * Render document
   *
   * @param {Function} cb - DEPRECATED
   * @returns {SVGElement}
   */
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

    let blocksGroup = SVG.group(elements)
    let group = SVG.group([blocksGroup])

    // apply flat design clip-paths
    let clipPaths = []
    if (this.options.isFlat) {
      let blocks = group.querySelectorAll("path.snap-block.snap-flat")

      for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index]

        let clipPath = SVG.withChildren(
          SVG.el("clipPath", {
            id: `block-path-${index}-${this.id}`,
          }),
          [
            SVG.el("path", {
              d: block.getAttribute("d"),
            }),
          ],
        )

        block.setAttribute("clip-path", `url(#block-path-${index}-${this.id})`)

        clipPaths.push(clipPath)
      }
    }

    let clipPathsGroup = SVG.group(clipPaths)

    // return SVG
    const svg = SVG.newSVG(width, height, this.scale)
    svg.classList.add(
      `snapblocks-style-snap${this.options.isFlat ? "-flat" : ""}`,
    )

    let icons = makeIcons(this.options.isFlat)

    for (let icon of icons) {
      this.updateIds(icon)
    }

    blocksGroup.before(
      (this.defs = SVG.withChildren(SVG.el("defs"), [
        bevelFilter(`snapBevelFilter-${this.id}`, false),
        bevelFilter(`snapInputBevelFilter-${this.id}`, true),
        dropShadowFilter(`snapDropShadow-${this.id}`),
        ...icons,
        clipPathsGroup,
      ])),
    )

    group.querySelectorAll(".snap-drop-shadow").forEach(el => {
      el.style.filter = `url(#snapDropShadow-${this.id})`
    })
    group.querySelectorAll(".snap-bevel").forEach(el => {
      el.style.filter = `url(#snapBevelFilter-${this.id})`
    })
    group.querySelectorAll(".snap-input-bevel").forEach(el => {
      el.style.filter = `url(#snapInputBevelFilter-${this.id})`
    })

    svg.appendChild(group)
    this.el = svg
    return svg
  }

  /**
   * Export SVG image as XML string
   *
   * @returns {string}
   */
  exportSVGString() {
    if (this.el == null) {
      throw new Error("call draw() first")
    }

    const style = makeStyle()
    this.updateIds(style)
    // console.log('style', style)
    this.defs.appendChild(style)
    const xml = new SVG.XMLSerializer().serializeToString(this.el)
    this.defs.removeChild(style)
    return xml
  }

  /**
   * Export SVG image as data URI
   *
   * @returns {string}
   */
  exportSVG() {
    const xml = this.exportSVGString()
    return `data:image/svg+xml;utf8,${xml.replace(/[#]/g, encodeURIComponent)}`
  }

  /**
   * Paint on canvas
   *
   * @param {(canvas: HTMLCanvasElement) => any} cb
   * @param {number} [exportScale=1]
   */
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

  /**
   * Export PNG. If it can, this will return a blob url, if not, it will return a data uri.
   *
   * @param {(blobOrUri: string) => any} cb
   * @param {number} scale
   */
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

/**
 * New view for node
 *
 * @param {(Label | Icon | Input | Block | Comment | Glow | Script | Document)} node
 * @returns {(typeof LabelView | typeof IconView | typeof InputView | typeof BlockView | typeof CommentView | typeof GlowView | typeof ScriptView | typeof DocumentView)}
 */
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

/**
 * Create new view
 *
 * @param {(Label | Icon | Input | Block | Comment | Glow | Script | Document)} node
 * @param {Options} options
 * @returns {LabelView | IconView | InputView | BlockView | CommentView | GlowView | ScriptView | DocumentView}
 */
export const newView = (node, options) => new (viewFor(node))(node, options)
