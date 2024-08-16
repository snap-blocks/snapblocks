/**
 * @typedef {(Label | Icon | Input | Script)} Child
 */

/**
 * Check if value is true
 *
 * @param {*} bool
 * @param {string} message - Message to throw
 */
function assert(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

/**
 * Indent text.
 *
 * @param {string} text
 * @returns {string}
 */
function indent(text) {
  return text
    .split("\n")
    .map(line => {
      return `  ${line}`
    })
    .join("\n")
}

import Color from "../shared/color.js"
import {
  parseSpec,
  inputPat,
  parseInputNumber,
  iconPat,
  rtlLanguages,
  unicodeIcons,
} from "./blocks.js"

export class Label {
  /**
   * Creates an instance of Label.
   *
   * @constructor
   * @param {string} value
   * @param {string} [cls=]
   * @param {number} [scale=1]
   * @param {(Color | string)} [color=null]
   */
  constructor(value, cls, scale, color) {
    /**
     * Label value
     * @type {string}
     * @public
     */
    this.value = value
    /**
     * Raw unescaped value
     * @type {string}
     * @public
     */
    this.raw = value
    /**
     * Label class
     * @type {string}
     * @public
     * @default ""
     */
    this.cls = cls || ""
    /**
     * Rendered HTML element
     * @type {SVGElement}
     * @public
     * @default null
     */
    this.el = null
    /**
     * Label height
     * @type {number}
     * @public
     * @default 12
     */
    this.height = 12
    /**
     * Calculated text metrics
     * @type {{width: number, spaceWidth: number, lines: {word: string, width: number, height: number}[][]}}
     * @public
     * @default null
     */
    this.metrics = null

    /**
     * X position of label
     * @type {number}
     * @public
     * @default 0
     */
    this.x = 0
    /**
     * Special formatting
     * @type {{italic: boolean, monospace: boolean}}
     * @public
     * @default
     */
    this.formatting = {
      italic: false,
      monospace: false,
    }

    /**
     * Is this a newline?
     * @type {boolean}
     * @public
     */
    this.isNewline = value == "\n"

    /**
     * Is this label a modified label?
     * @type {boolean}
     * @public
     * @default false
     */
    this.modified = false
    /**
     * Text scale
     * @type {number}
     * @public
     * @default null
     */
    this.scale = scale ? parseFloat(scale) : null
    if (this.scale === NaN) {
      this.scale = null
    }
    /**
     * Label color
     * @type {(Color | null)}
     * @public
     * @default null
     */
    this.color =
      color instanceof Color
        ? color.copy()
        : typeof color == "string"
          ? Color.fromString(color)
          : null
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
   * Return the stringified and escaped text.
   *
   * @returns {string}
   */
  stringify() {
    if (this.value === "<" || this.value === ">") {
      return this.value
    }

    let suffix = ""
    let prefix = ""
    let value = this.value.replace(/([<>[\](){}])/g, "\\$1")

    if (this.scale) {
      prefix = "$"
      suffix += `-${this.scale}`
    }
    if (this.color) {
      if (prefix === "") {
        prefix = "$"
      }
      if (suffix === "") {
        suffix += "-1"
      }
      suffix += `-${this.color.r}-${this.color.g}-${this.color.b}`
    }

    return `${prefix}${value}${suffix}`
  }
}

export class Icon {
  /**
   * Creates an instance of Icon.
   *
   * @constructor
   * @param {string} name
   * @param {number} [scale=null]
   * @param {(Color | string)} [color=null]
   */
  constructor(name, scale, color) {
    if (
      !Object.prototype.hasOwnProperty.call(Icon.icons, name) &&
      Object.prototype.hasOwnProperty.call(Icon.iconAliases, name)
    ) {
      this.name = Icon.iconAliases[name]
    } else {
      this.name = name
    }
    this.isArrow = this.name === "loopArrow" || this.name === "loop"
    this.isLoop = false

    this.modified = false
    this.scale = scale ? parseFloat(scale) : null
    if (isNaN(this.scale)) {
      this.scale = null
    }
    this.color =
      color instanceof Color
        ? color.copy()
        : typeof color == "string"
          ? Color.fromString(color)
          : null

    if (this.color || scale) {
      this.modified = true
    }

    // assert(Icon.icons[this.name], `no info for icon ${this.name}`)
  }
  /**
   * This is an icon
   *
   * @readonly
   * @type {true}
   */
  get isIcon() {
    return true
  }

  /**
   * Icon aliases.
   *
   * @static
   * @readonly
   * @type {{ "+": string; bucket: string; greenflag: string; stop: string; }}
   */
  static get iconAliases() {
    return {
      "+": "plusSign", // I can't have + in an id.
      bucket: "paintbucket",
      greenflag: "greenFlag", // snap greenflag icon (no capital)
      stop: "stopSign",
    }
  }

  /**
   * Available icons.
   *
   * TODO:
   * - rectangleSolid
   * - dot
   * - ellipse
   * - line
   * - cross
   * - crosshairs
   * - speechBubble
   * - speechBubbleOutline
   * - turnBack
   * - turnForward
   * - magnifyingGlass
   * - magnifierOutline
   * - selection
   * - polygon
   * - closedBrush
   * - footprints
   * - keyboard
   * - keyboardFilled
   * - listNarrow
   * - flipVertical
   * - flipHorizontal
   * - trash
   * - trashFull
   *
   * @static
   * @readonly
   * @type {{[type: string]: true}}
   */
  static get icons() {
    return {
      greenFlag: true,
      flag: true,
      stopSign: true,
      octagon: true,
      turnLeft: true,
      turnRight: true,
      clockwise: true,
      counterclockwise: true,
      loop: true,
      loopArrow: true,
      addInput: true,
      delInput: true,
      verticalEllipsis: true,
      list: true,
      pointRight: true,
      turtle: true,
      turtleOutline: true,
      pause: true,
      cloud: true,
      cloudGradient: true,
      cloudOutline: true,
      flash: true,
      blitz: true,
      camera: true,
      circleSolid: true,
      circle: true,
      notes: true,
      storage: true,
      brush: true,
      pipette: true,
      paintbucket: true,
      eraser: true,
      location: true,
      gears: true,
      gearPartial: true,
      gearBig: true,
      globe: true,
      globeBig: true,
      square: true,
      robot: true,
      stepForward: true,
      file: true,
      fullScreen: true,
      grow: true,
      normalScreen: true,
      shrink: true,
      smallStage: true,
      normalStage: true,
      stage: true,
      turnAround: true,
      poster: true,
      tick: true,
      rectangle: true,

      arrowUp: true,
      arrowUpOutline: true,
      arrowUpThin: true,
      arrowDown: true,
      arrowDownOutline: true,
      arrowDownThin: true,
      arrowLeft: true,
      arrowLeftOutline: true,
      arrowLeftThin: true,
      arrowRight: true,
      arrowRightOutline: true,
      arrowRightThin: true,
      arrowUpDownThin: true,
      arrowLeftRightThin: true,

      plusSign: true,
    }
  }

  /**
   * Return the stringified version of this icon.
   *
   * @returns {string}
   */
  stringify() {
    let start = "@"
    let suffix = ""
    let name = this.name
    let alias = Object.keys(Icon.iconAliases).find(
      k => Icon.iconAliases[k] === name,
    )
    if (alias) {
      name = alias
    }
    if (this.scale) {
      start = "$"
      suffix += `-${this.scale}`
    }
    if (this.color) {
      if (suffix === "") {
        suffix += "-1"
      }
      suffix += `-${this.color.r}-${this.color.g}-${this.color.b}`
    }
    if (suffix === "" && unicodeIcons[`@${name}`]) {
      name = unicodeIcons[`@${name}`]
      start = ""
    }
    if (name === "+") {
      start = ""
    }
    return `${start}${name}${suffix}`
  }
}

export class Input {
  /**
   * Creates an instance of Input.
   *
   * @constructor
   * @param {("string" | "dropdown" | "number" | "number-dropdown" | "color" | "stack" | "reporter" | "boolean")} shape
   * @param {(string | Icon)} value
   * @param {boolean} [menu=false]
   * @param {boolean} [isReadonly=false]
   */
  constructor(shape, value, menu, isReadonly) {
    this.shape = shape
    this.value = value
    this.menu = menu || null

    this.isRound =
      shape === "number" || shape === "number-dropdown" || shape === "reporter"
    this.isBoolean = shape === "boolean"
    this.isStack = shape === "stack"
    this.isInset =
      shape === "boolean" || shape === "stack" || shape === "reporter"
    this.isColor = shape === "color"
    this.hasArrow = shape === "dropdown" || shape === "number-dropdown"
    this.isDarker = shape === "boolean" || shape === "stack" || isReadonly
    this.isSquare =
      shape === "string" || shape === "color" || shape === "dropdown"

    this.hasLabel =
      (!(this.isColor || this.isInset) || (this.value && this.isBoolean)) &&
      !this.value.isIcon
    this.label = this.hasLabel
      ? new Label(
          value,
          `literal-${this.shape}` + (isReadonly ? "-readonly" : ""),
        )
      : null
    this.icon = this.value?.isIcon ? this.value : null
    this.isBig = this.isBoolean && this.value ? this.value.length > 1 : null
    this.x = 0
  }
  /**
   * This is an input.
   *
   * @readonly
   * @type {true}
   */
  get isInput() {
    return true
  }

  /**
   * Return the stringified version of the input.
   *
   * @returns {string}
   */
  stringify() {
    if (this.isColor) {
      assert(this.value instanceof Color)
      return `[${this.value.toHexString()}]`
    }
    if (this.isBoolean) {
      if (this.value) {
        return `<${this.value}>`
      } else {
        return "<>"
      }
    }
    // Order sensitive; see #439
    let text = (this.value ? String(this.value) : "")
      .replace(/([\]\\])/g, "\\$1")
      .replace(/ v$/, " \\v")
      .replace(/ V$/, " \\V")
    if (this.hasArrow) {
      text += this.isDarker ? " V" : " v"
    }
    return this.isRound
      ? `(${text})`
      : this.isSquare
        ? `[${text}]`
        : this.isBoolean
          ? "<>"
          : this.isStack
            ? "{}"
            : text
  }

  /**
   * Translate this input into the specified language
   *
   * @param {Object} _lang
   */
  translate(_lang) {
    if (this.hasArrow) {
      const value = this.menu || this.value
      this.value = value // TODO translate dropdown value
      this.label = new Label(this.value, `literal-${this.shape}`)
    }
  }
}

export class Block {
  /**
   * Creates an instance of Block.
   *
   * @constructor
   * @param {Object} info
   * @param {(Label | Icon | Input | Script)[]} children
   * @param {Comment} [comment=null]
   */
  constructor(info, children, comment) {
    assert(info)
    this.info = { ...info }
    this.children = children
    this.comment = comment || null
    this.diff = null

    const shape = this.info.shape
    this.isHat =
      shape === "hat" ||
      shape === "cat" ||
      shape === "define-hat" ||
      shape === "block-prototype"
    this.hasPuzzle =
      shape === "stack" ||
      shape === "hat" ||
      shape === "cat" ||
      shape === "c-block" ||
      shape === "block-prototype"
    this.isFinal = /cap/.test(shape)
    this.isCommand = /stack/.test(shape) || shape === /cap/.test(shape)
    this.isOutline = /outline-\w+/.test(shape)
    this.isReporter = /reporter/.test(shape)
    this.isBoolean = /boolean/.test(shape)

    this.isRing = shape === "ring"
    this.isElse = shape === "celse"
    this.isEnd = shape === "cend"

    this.isBlockPrototype = shape === "block-prototype"

    this.isUpvar =
      this.isReporter &&
      info.categoryIsDefault &&
      children.length == 1 &&
      children[0].isBlock
  }
  get isBlock() {
    return true
  }

  /**
   * Return the block as a string.
   *
   * @param {string} [extras=] - Extra overrides.
   * @returns {string}
   */
  stringify(extras) {
    let firstInput = null
    let checkAlias = false
    let text = this.children
      .map(child => {
        if (child.isIcon) {
          checkAlias = true
        }
        if (!firstInput && !(child.isLabel || child.isIcon)) {
          firstInput = child
        }
        return child.isScript
          ? `{\n${indent(child.stringify())}\n} `
          : child.isCommand
            ? `{${child.stringify()}}`
            : child.stringify().replace(/^\x20+|\x20+$/g, "") + " " // keep newlines, while also trimming spaces
      })
      .join("")
      .replace(/^\x20+|\x20+$/g, "")

    const lang = this.info.language
    if (checkAlias && lang && this.info.selector) {
      const aliases = lang.nativeAliases[this.info.id]
      if (aliases && aliases.length) {
        let alias = aliases[0]
        // TODO make translate() not in-place, and use that
        if (inputPat.test(alias) && firstInput) {
          alias = alias.replace(inputPat, firstInput.stringify())
        }
        return alias
      }
    }

    let overrides = extras || ""
    if (this.isBlockPrototype) {
      if (overrides) {
        overrides += " "
      }
      overrides += "define"
    }
    if (
      this.info.categoryIsDefault === false ||
      (this.info.category === "custom-arg" &&
        (this.isReporter || this.isBoolean)) ||
      (this.info.category === "custom" && this.info.shape === "stack")
    ) {
      if (overrides) {
        overrides += " "
      }
      overrides += this.info.category
    }
    if (this.info.color) {
      if (overrides) {
        overrides += " "
      }
      overrides += this.info.color.toHexString()
    }
    if (overrides) {
      text += ` :: ${overrides}`
    }
    return this.hasScript
      ? text + "\nend"
      : this.info.shape === "reporter" || this.info.shape === "ring"
        ? `(${text})`
        : this.info.shape === "boolean"
          ? `<${text}>`
          : text
  }

  /**
   * Translate this block.
   *
   * @param {Object} lang - Language data
   * @param {boolean} [isShallow=false] - Only translate this block, no children.
   */
  translate(lang, isShallow) {
    if (!lang) {
      throw new Error("Missing language")
    }

    const id = this.info.id
    if (!id) {
      return
    }

    if (id === "PROCEDURES_DEFINITION") {
      // Find the first 'outline' child (there should be exactly one).
      const outline = this.children.find(child => child.isOutline)

      this.children = []
      for (const word of lang.definePrefix) {
        this.children.push(new Label(word))
      }
      this.children.push(outline)
      for (const word of lang.defineSuffix) {
        this.children.push(new Label(word))
      }
      return
    }

    const oldSpec = this.info.language.commands[id]

    const nativeSpec = lang.commands[id]
    if (!nativeSpec) {
      return
    }
    const nativeInfo = parseSpec(nativeSpec)

    const rawArgs = this.children.filter(
      child => !child.isLabel && !child.isIcon,
    )

    if (!isShallow) {
      rawArgs.forEach(child => child.translate(lang))
    }

    // Work out indexes of existing children
    const oldParts = parseSpec(oldSpec).parts
    const oldInputOrder = oldParts
      .map(part => parseInputNumber(part))
      .filter(x => x)
    // console.log('translate: oldParts', oldParts)
    // console.log('translate: oldInputOrder', oldInputOrder)

    let highestNumber = 0
    const args = oldInputOrder.map(number => {
      highestNumber = Math.max(highestNumber, number)
      return rawArgs[number - 1]
    })
    const remainingArgs = rawArgs.slice(highestNumber)
    // console.log('translate: remainingArgs', remainingArgs)

    // Get new children by index
    // console.log('translate: children', this.children)
    this.children = nativeInfo.parts
      .map(part => {
        part = part.trim()
        if (!part) {
          return
        }
        const number = parseInputNumber(part)
        if (number) {
          return args[number - 1]
        }
        return iconPat.test(part) ? new Icon(part.slice(1)) : new Label(part)
      })
      .filter(x => x)
    // console.log('translate: children', this.children)

    // Push any remaining children, so we pick up C block bodies
    remainingArgs.forEach((arg, index) => {
      if (index === 1 && this.info.id === "CONTROL_IF") {
        this.children.push(new Label(lang.commands.CONTROL_ELSE))
      }
      this.children.push(arg)
    })

    this.info.language = lang
    this.info.isRTL = rtlLanguages.includes(lang.code)
    this.info.categoryIsDefault = true
  }
}

export class Comment {
  /**
   * Creates an instance of Comment.
   *
   * @constructor
   * @param {string} value
   * @param {boolean} [hasBlock=false]
   * @param {boolean} [isMultiline=false]
   */
  constructor(value, hasBlock, isMultiline) {
    this.label = new Label(
      value,
      `comment-label${isMultiline ? " comment-label-multiline" : ""}`,
    )
    this.hasBlock = hasBlock
    this.isMultiline = isMultiline || value.includes("\n")
  }
  /**
   * This is a comment
   *
   * @readonly
   * @type {true}
   */
  get isComment() {
    return true
  }

  /**
   * Return this comment as a string.
   *
   * @returns {string}
   */
  stringify() {
    if (this.isMultiline) {
      return `/* ${this.label.raw.replace("*/", "\\*/")} */`
    }
    return `// ${this.label.raw}`
  }
}

export class Glow {
  /**
   * Creates an instance of Glow.
   *
   * @constructor
   * @param {Block} child
   */
  constructor(child) {
    assert(child)
    this.child = child
    if (child.isBlock) {
      this.shape = child.info.shape
      this.info = child.info
    } else {
      this.shape = "stack"
    }
  }
  /**
   * This is a Glow
   *
   * @readonly
   * @type {true}
   */
  get isGlow() {
    return true
  }

  /**
   * Return this Glow as a string.
   *
   * @returns {string}
   */
  stringify() {
    if (this.child.isBlock) {
      return this.child.stringify("+")
    }
    const lines = this.child.stringify().split("\n")
    return lines.map(line => `+ ${line}`).join("\n")
  }

  /**
   * Translate the block in this Glow.
   *
   * @param {Object} lang - Language data
   */
  translate(lang) {
    this.child.translate(lang)
  }
}

export class Script {
  /**
   * Creates an instance of Script.
   *
   * @constructor
   * @param {(Block | Comment)[]} blocks
   * @param {string} shape
   */
  constructor(blocks, shape) {
    this.blocks = blocks
    this.isEmpty = !blocks.length
    this.isFinal = !this.isEmpty && blocks[blocks.length - 1].isFinal
    this.isCShape = false
    this.shape = shape || "stack"
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
   * Return this script as a string
   *
   * @returns {string}
   */
  stringify() {
    return this.blocks
      .map(block => {
        let line = block.stringify()
        if (block.comment) {
          line += ` ${block.comment.stringify()}`
        }
        return line
      })
      .join("\n")
  }

  /**
   * Translate this script
   *
   * @param {Object} lang - Language data
   */
  translate(lang) {
    this.blocks.forEach(block => block.translate(lang))
  }
}

export class Document {
  /**
   * Creates an instance of Document.
   *
   * @constructor
   * @param {Script[]} scripts
   */
  constructor(scripts) {
    this.scripts = scripts
  }

  /**
   * Return this document as a string
   *
   * @returns {string}
   */
  stringify() {
    return this.scripts.map(script => script.stringify()).join("\n\n")
  }

  /**
   * Translate this document
   *
   * @param {Object} lang - Language data
   */
  translate(lang) {
    this.scripts.forEach(script => script.translate(lang))
  }
}
