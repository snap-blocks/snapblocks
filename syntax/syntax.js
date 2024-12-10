function assert(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

import { decode } from "html-entities"

import {
  Label,
  Icon,
  Input,
  Block,
  Comment,
  Glow,
  Script,
  Document,
} from "./model.js"

import {
  allLanguages,
  lookupDropdown,
  minifyHash,
  lookupHash,
  hashSpec,
  applyOverrides,
  rtlLanguages,
  iconPat,
  blockName,
  parseSpec,
  unicodeIcons,
  aliasCategories,
} from "./blocks.js"

import Color, { hexColorPat, rgbColorPat } from "../shared/color.js"

/**
 * Paint block
 *
 * @param {import("./blocks.js").BlockInfo} info
 * @param {import("./model.js").Child[]} children
 * @param {import("./blocks.js").Language[]} languages
 * @returns {Block}
 */
function paintBlock(info, children, languages) {
  let overrides = []
  if (Array.isArray(children[children.length - 1])) {
    overrides = children.pop()
  }
  info.overrides = overrides

  // build hash
  const words = []
  for (const child of children) {
    if (child.isLabel) {
      words.push(child.value)
    } else if (child.isIcon) {
      words.push(`@${child.name}`)
    } else {
      words.push("_")
    }
  }
  const string = words.join(" ")
  const shortHash = (info.hash = minifyHash(string))
  let o = null

  if (!overrides.includes("reset")) {
    o = lookupHash(shortHash, info, children, languages)
  }
  // paint
  let lang
  let type

  if (o) {
    lang = o.lang
    type = o.type
    info.language = lang
    info.isRTL = rtlLanguages.includes(lang.code)

    if (
      type.shape === "ring" ? info.shape === "reporter" : info.shape === "stack"
    ) {
      info.shape = type.shape
    }
    if (aliasCategories[type.category]) {
      info.category = aliasCategories[type.category]
    } else {
      info.category = type.category
    }
    info.categoryIsDefault = true
    // store selector, used for translation among other things
    if (type.selector) {
      info.selector = type.selector
    }
    if (type.id) {
      info.id = type.id
    }
    if (type.snap) {
      info.snap = type.snap
    }
    info.hasLoopArrow = type.hasLoopArrow

    console.log('santa', type.santa)
    if (overrides.includes("santa")) {
      if (type.santa) {
        info.santaHat = type.santa
      } else {
        info.santaHat = "hat"
      }
    }

    // ellipsis block
    if (type.spec === ". . .") {
      children = [new Label(". . .")]
    }
  } else if (
    !overrides.includes("reset") &&
    info.shape === "boolean" &&
    children.length === 1 &&
    children[0].isInput &&
    children[0].isBoolean &&
    children[0].isBig
  ) {
    info.category = "operators"
    info.categoryIsDefault = true
  } else {
    // The block was not recognized, so we check if it's a define block.
    //
    // We check for built-in blocks first to avoid ambiguity, e.g. the
    // `defina o tamanho como (100) %` block in pt_BR.
    for (const lang of languages) {
      if (
        (overrides.includes("define") || overrides.includes("define+")) &&
        !isDefineBlock(
          children,
          lang,
          !(overrides.includes("define") || overrides.includes("define+")),
        )
      ) {
        if (children.length == 0) {
          continue
        }
        if (children[0].isLabel || !children[0].isBlock) {
          continue
        }
        info.category = "events"
        info.shape = "block-prototype"

        let block = children[0]
        if (block.info.categoryIsDefault) {
          block.info.category = "custom"
        }

        let customChildren = []
        let isBlack = true
        let addPlusses = overrides.includes("define+")

        if (addPlusses) {
          for (let child of block.children) {
            customChildren.push(new Icon("+"))
            customChildren.push(child)
          }
          customChildren.push(new Icon("+"))
        } else {
          for (let index = 0; index < block.children.length; index++) {
            let child = block.children[index]
            if (
              child.isLabel &&
              child.value === "+" &&
              !child.raw.includes("\\")
            ) {
              if (isBlack) {
                customChildren.push(new Icon("+"))
              } else {
                customChildren.push(child)
              }
              isBlack = !isBlack
            } else if (child.isIcon && child.name === "plusSign") {
              customChildren.push(child)
              isBlack = false
            } else {
              customChildren.push(child)
              isBlack = true
            }
          }
        }

        block.children = customChildren.map(child => {
          if (child.isIcon && child.name == "plusSign") {
            return child
          }
          if (child.isInput && child.isBoolean) {
            // Convert empty boolean slot to empty boolean argument.
            child = new Block(
              {
                shape: "reporter",
                argument: "boolean",
                category: "custom-arg",
              },
              [new Label(child.value ? child.value : ""), new Label("?")],
            )
          } else if (child.isInput && child.shape === "string") {
            // Convert string inputs to string arguments.
            const labels = child.value.split(/ +/g).map(word => new Label(word))
            child = new Block(
              {
                shape: "reporter",
                argument: "string",
                category: "custom-arg",
              },
              labels,
            )
          } else if (child.isInput && child.shape === "number") {
            // Convert number inputs to number arguments.
            const labels = child.value.split(/ +/g).map(word => new Label(word))
            child = new Block(
              {
                shape: "reporter",
                argument: "number",
                category: "custom-arg",
              },
              [...labels, new Label("#")],
            )
            child.info.argument = "number"
          } else if (child.isReporter && !child.isUpvar) {
            // Convert variables to number arguments.
            if (child.info.categoryIsDefault) {
              child.info.category = "custom-arg"
            }
            child.info.argument = "number"
            child.children.push(new Label("#"))
          } else if (child.isBoolean) {
            if (child.info.categoryIsDefault) {
              child.info.category = "custom-arg"
            }
            child.info.shape = "reporter"
            child.isReporter = true
            child.isBoolean = false
            child.info.argument = "boolean"
            child.children.push(new Label("?"))
          } else if (child.isCommand) {
            if (child.info.categoryIsDefault) {
              child.info.category = "custom-arg"
            }
            child.info.shape = "reporter"
            child.isReporter = true
            child.isCommand = false
            child.info.argument = "ring"
            child.children.push(new Label("λ"))
          }
          if (!child.isUpvar && !child.isLabel && !child.isIcon) {
            applyOverrides(child.info, child.info.overrides)
            child = paintBlock(
              {
                shape: "reporter",
                category: block.info.category,
                color: block.info.color,
                categoryIsDefault: true,
              },
              [child],
              languages,
            )
          }
          return child
        })

        break // We don't need to check other languages, do we?
      }

      if (
        (overrides.includes("reset") && !overrides.includes("define")) ||
        !isDefineBlock(children, lang, !overrides.includes("define"))
      ) {
        continue
      }

      if (!overrides.includes("define")) {
        // Setting the shape also triggers some logic in recognizeStuff.
        if (overrides.includes("stack")) {
          continue
        }

        applyOverrides(info, overrides)
        if (info.shape != "stack") {
          continue
        }
      }

      info.category = "custom"

      info.shape = "define-hat"

      // Move the children of the define block into an "outline", transforming
      // () and [] shapes as we go.

      let outlineShape = "stack"

      let blockChildren = children.slice(
        lang.definePrefix.length,
        children.length - lang.defineSuffix.length,
      )

      if (blockChildren.length == 1 && !blockChildren[0].isLabel) {
        if (blockChildren[0] instanceof Input) {
          // outlineShape = children[1].shape
        } else {
          outlineShape = blockChildren[0].info.shape
          blockChildren = blockChildren[0].children
          children = [
            ...children.slice(0, lang.definePrefix.length),
            ...blockChildren,
            ...children.slice(children.length - lang.defineSuffix.length),
          ]
        }
      }
      const outlineChildren = children
        .splice(
          lang.definePrefix.length,
          children.length - lang.defineSuffix.length,
        )
        .map(child => {
          if (child.isInput && child.isBoolean) {
            // Convert empty boolean slot to empty boolean argument.
            child = paintBlock(
              {
                shape: "boolean",
                argument: "boolean",
                category: "custom-arg",
              },
              [new Label(child.value ? child.value : "")],
              languages,
            )
          } else if (
            child.isInput &&
            (child.shape === "string" || child.shape === "number")
          ) {
            // Convert string inputs to string arguments, number inputs to number arguments.
            const labels = child.value.split(/ +/g).map(word => new Label(word))
            child = paintBlock(
              {
                shape: "reporter",
                argument: child.shape === "string" ? "string" : "number",
                category: "custom-arg",
              },
              labels,
              languages,
            )
          } else if (child.isReporter || child.isBoolean) {
            // Convert variables to number arguments, predicates to boolean arguments.
            if (child.info.categoryIsDefault) {
              child.info.category = "custom-arg"
              child.info.argument = child.isBoolean ? "boolean" : "number"
            }
          }
          return child
        })

      const outlineInfo = {
        shape: `outline-${outlineShape}`,
        category: "custom",
        categoryIsDefault: true,
        hasLoopArrow: false,
      }
      const outline = new Block(outlineInfo, outlineChildren)
      children.splice(lang.definePrefix.length, 0, outline)
      break
    }
  }

  // Apply overrides.
  applyOverrides(info, overrides)

  // loop arrows
  // if (
  //   !overrides.includes('noloop') && info.hasLoopArrow &&
  //   !(
  //     children[children.length - 1].isIcon &&
  //     ["loopArrow", "loop"].includes(children[children.length - 1].name)
  //   )
  // ) {
  //   let arrow = new Icon("loopArrow")
  //   children.push(arrow)
  // }

  const block = new Block(info, children)

  // image replacement
  if (type && type.isAlias) {
    block.translate(lang, true)
  }

  // diffs
  if (info.diff === "+") {
    return new Glow(block)
  }
  block.diff = info.diff

  return block
}

/**
 * Check if block is a define block
 *
 * @param {import("./model.js").Child[]} children
 * @param {import("./blocks.js").Language} lang
 * @param {boolean} [testBlock=true] - Test if defined block is a block (aka, is it using the `define {block}` syntax)
 * @returns {boolean}
 */
function isDefineBlock(children, lang, testBlock = true) {
  if (children.length < lang.definePrefix.length) {
    return false
  }
  if (children.length < lang.defineSuffix.length) {
    return false
  }

  for (let i = 0; i < lang.definePrefix.length; i++) {
    const defineWord = lang.definePrefix[i]
    const child = children[i]
    if (!child.isLabel || minifyHash(child.value) !== minifyHash(defineWord)) {
      return false
    }
  }

  for (let i = 1; i <= lang.defineSuffix.length; i++) {
    const defineWord = lang.defineSuffix[lang.defineSuffix.length - i]
    const child = children[children.length - i]
    if (!child.isLabel || minifyHash(child.value) !== minifyHash(defineWord)) {
      return false
    }
  }

  if (!testBlock) {
    return true
  }

  if (
    children.length !=
    lang.definePrefix.length + lang.defineSuffix.length + 1
  ) {
    return false
  }

  const outlineChildren = children.slice(
    lang.definePrefix.length,
    children.length - lang.defineSuffix.length,
  )

  if (outlineChildren[0].isLabel) {
    return false
  }

  if (!outlineChildren[0].isCommand) {
    return false
  }

  return true
}

/**
 * Parse snapblocks code
 *
 * @param {string} code
 * @param {import("./blocks.js").Language[]} languages
 * @returns {() => (Block | Comment | "NL")}
 */
function parseLines(code, languages) {
  let tok = code[0]
  let index = 0
  /** Go to the next character */
  function next() {
    tok = code[++index]
  }
  /**
   * Peek at next character
   *
   * @param {number} [amount=1]
   * @returns {string}
   */
  function peek(amount = 1) {
    return code[index + amount]
  }
  /**
   * Peak at next character, ignoring whitespace
   *
   * @returns {string}
   */
  function peekNonWs() {
    for (let i = index + 1; i < code.length; i++) {
      if (code[i] !== " ") {
        return code[i]
      }
    }
  }

  let sawNL

  let define = []
  languages.map(lang => {
    define = define.concat(lang.define)
  })

  /**
   * Create block
   *
   * @param {string} shape
   * @param {import("./model.js").Child[]} children
   * @returns {Block}
   */
  function makeBlock(shape, children) {
    const hasInputs = children.filter(x => !x.isLabel).length

    const info = {
      shape: shape,
      category: shape === "reporter" && !hasInputs ? "variables" : "obsolete",
      categoryIsDefault: true,
      hasLoopArrow: false,
    }
    for (let child of children) {
      if (child.isScript) {
        child.shape = shape
      }
    }
    return paintBlock(info, children, languages)
  }

  /**
   * Create dropdown input
   *
   * @param {string} shape
   * @param {(string | Icon)} value
   * @param {boolean} isReadonly
   * @returns {Input}
   */
  function makeMenu(shape, value, isReadonly) {
    const menu = lookupDropdown(value, languages) || value
    return new Input(shape, value, menu, isReadonly)
  }

  /**
   * Parse block parts
   *
   * @param {string} end - End character
   * @returns {import("./model.js").Child[]}
   */
  function pParts(end) {
    const children = []
    let label
    let labelProps = {
      modified: false,
      scale: null,
      color: null,
    }
    while (tok && tok !== "\n") {
      // So that comparison operators `<()<()>` and `<()>()>` don't need the
      // central <> escaped, we interpret it as a label if particular
      // conditions are met.
      if (
        (tok === "<" || tok === ">") &&
        end === ">" && // We're parsing a predicate.
        children.length === 1 && // There's exactly one AST node behind us.
        !(children[0].isInput && children[0].isBoolean && children[0].isBig) &&
        !children[children.length - 1].isLabel // That node is not a label.
      ) {
        const c = peekNonWs()
        // The next token starts some kind of input.
        if (c === "[" || c === "(" || c === "<" || c == "{") {
          label = null
          children.push(new Label(tok))
          next()
          continue
        }
      }
      if (tok === end) {
        break
      }
      if (tok === "/" && ["/", "*"].includes(peek())) {
        break
      }

      // allow all unicode icons, not just exceptions
      let unicodeIcon = Object.keys(unicodeIcons).find(
        name => unicodeIcons[name] === tok,
      )
      if (unicodeIcon) {
        next()
        let icon = unicodeIcon.slice(1, unicodeIcon.length)
        children.push(new Icon(icon))
        label = null
      } else {
        switch (tok) {
          case "[":
            label = null
            children.push(pString())
            break
          case "(":
            label = null
            children.push(pReporter())
            break
          case "<":
            label = null
            children.push(pPredicate())
            break
          case "{":
            label = null
            children.push(pEmbedded())
            break
          case " ":
          case "\t":
            next() // Skip over whitespace.
            label = null
            break
          case "$":
          case "@": {
            let start = tok
            next()
            let name = ""
            let value = ""
            let raw = ""
            label = new Label("")
            let modifiers = []
            while (tok && /[a-zA-Z+\\]/.test(tok)) {
              if (tok === "\\") {
                if (peek() === "\n") {
                  break
                }
                label.raw += tok
                raw += tok
                next()
              }
              raw += tok
              name += tok
              label.value += tok
              label.raw += tok
              next()
            }
            if (tok === "-") {
              label.value += tok
              label.raw += tok
              modifiers = []
              let modifier = 0
              modifiers[modifier] = ""
              next() // "-"
              while (tok && /[0-9a-z-A-Z\-\\\.]/.test(tok)) {
                if (tok === "\\") {
                  if (peek() === "\n") {
                    break
                  }
                  label.raw += tok
                  next()
                  modifiers[modifier] += tok
                } else if (tok === "-") {
                  modifier += 1
                  modifiers[modifier] = ""
                } else {
                  modifiers[modifier] += tok
                }
                label.value += tok
                label.raw += tok
                next()
              }
            }

            if (
              Object.prototype.hasOwnProperty.call(Icon.icons, raw) ||
              Object.prototype.hasOwnProperty.call(Icon.iconAliases, raw)
            ) {
              children.push(
                new Icon(
                  raw,
                  modifiers[0],
                  modifiers.length > 1
                    ? new Color(
                        modifiers[1] ? modifiers[1] : 255,
                        modifiers[2] ? modifiers[2] : 255,
                        modifiers[3] ? modifiers[3] : 255,
                        // modifiers[4] ? modifiers[4] : 1,
                      )
                    : null,
                ),
              )
              break
            }
            if (start == "$" && modifiers) {
              label = new Label(
                name,
                null,
                modifiers[0] ? modifiers[0] : null,
                modifiers[1]
                  ? new Color(
                      modifiers[1] ? modifiers[1] : 255,
                      modifiers[2] ? modifiers[2] : 255,
                      modifiers[3] ? modifiers[3] : 255,
                    )
                  : null,
              )
              label.raw = raw
              label.modified = true
            } else {
              label.value = start + label.value
              label.raw = start + label.raw
            }
            children.push(label)
            break
          }
          case "\n":
            if (end) {
              break
            }
          case "\\":
            if (!label) {
              label = new Label("")
            }
            if (label) {
              label.raw += tok
            }

            if (tok === "\\" && ["n", "\n"].includes(peek())) {
              label = null
              children.push(new Label("\n"))
              next()
              next()
              break
            }
            if (!children.includes(label)) {
              children.push(label)
            }
            next() // escape character
          // fallthrough
          case ":":
            if (tok === ":" && peek() === ":") {
              children.push(pOverrides(end))
              return children
            }
          // fallthrough
          default:
            if (!label) {
              children.push(
                (label = new Label(
                  "",
                  null,
                  labelProps.scale,
                  labelProps.color,
                )),
              )
            }
            if (tok) {
              label.value += tok
              label.raw += tok
            }
            next()
        }
      }

      if (label == null) {
        labelProps = {
          modified: false,
          scale: null,
          color: null,
        }
      }

      if (tok === "\n") {
        if (end && end !== "}") {
          label = null
          while (tok && tok !== end && tok === "\n") {
            children.push(new Label("\n"))
            next()
          }
        }
      }
    }
    return children
  }

  /**
   * Parse string input
   *
   * @returns {Input}
   */
  function pString() {
    next() // '['
    let s = ""
    let raw = ""
    let isBig = false
    let escapeV = false
    let escapedLast = false
    let brackets = 0
    while (tok && ((tok !== "]" && brackets == 0) || brackets > 0)) {
      raw += tok
      if (tok === "\\") {
        next()
        escapedLast = true
        raw += tok
        if (tok.toLowerCase() == "v") {
          escapeV = true
        } else if (tok === "]" && brackets) {
          brackets -= 1
        } else if (["n", "\n"].includes(tok)) {
          s += "\n"
          next()
          raw += tok
        }
        if (!tok) {
          break
        }
      } else {
        escapeV = false
        escapedLast = false
        if (tok === "[") {
          brackets += 1
        } else if (tok === "]" && brackets) {
          brackets -= 1
        }
      }
      s += tok
      next()
    }
    if (!tok) {
      if (code[index - 1] == "]" && !escapedLast) {
        s = s.slice(0, s.length - 2)
        raw = raw.slice(0, raw.length - 2)
      }
    }
    if (tok === "]") {
      next()
    }
    if (raw[0] === "{" && raw[raw.length - 1] == "}" && !escapedLast) {
      isBig = true
      raw = raw.slice(1, raw.length - 1)
      s = s.slice(1, s.length - 1)
    }
    if (hexColorPat.test(raw) || rgbColorPat.test(raw)) {
      return new Input("color", Color.fromString(s))
    }

    let isDropdown = false,
      isReadonly = false,
      value

    if (!escapeV && / [vV]$/.test(s)) {
      isDropdown = true
      isReadonly = / V$/.test(s)
      s = s.slice(0, s.length - 2)
      raw = raw.slice(0, raw.length - 2)
    }

    let formatting = {
      italic: false,
      monospace: false,
    }

    escapedLast = false
    let start = raw[0]
    let end = ""

    for (let c = 0; c < raw.length; c++) {
      const t = raw[c]

      if (t == "\\") {
        escapedLast = true
        c += 1
      } else {
        escapedLast = false
      }
    }

    end = raw[raw.length - 1]
    if (!escapedLast) {
      let formatted = false
      if (start == "`" && end == "`") {
        formatting.monospace = true
        formatted = true
      } else if (start == "[" && end == "]") {
        formatting.italic = !isReadonly
        formatted = true
      }

      if (formatted) {
        s = s.slice(1, s.length - 1)
      }
    }

    value = s

    if (raw == "[__shout__go__]") {
      value = new Icon("greenFlag")
    }

    let input = isDropdown
      ? makeMenu("dropdown", value, isReadonly)
      : new Input("string", value, true)

    input.isBig = isBig
    if (input.hasLabel) {
      input.label.raw = raw
      input.label.formatting = formatting
    }
    return input
  }

  /**
   * Parse block
   *
   * @param {string} end
   * @returns {(Block | Comment)}
   */
  function pBlock(end) {
    const children = pParts(end)

    let comment = null

    if (tok === "/" && ["/", "*"].includes(peek())) {
      comment = pComment(end)
    }

    if (tok && tok === "\n") {
      sawNL = true
      next()
    }

    if (children.length === 0) {
      if (comment) {
        comment.hasBlock = false
        return comment
      }
      return
    }

    // standalone reporters
    if (children.length === 1) {
      const child = children[0]
      if (
        (child.isBlock &&
          (child.isReporter || child.isBoolean || child.isRing)) ||
        child.isGlow
      ) {
        if (comment) {
          child.comment = comment
          comment.hasBlock = true
        }
        return child
      }
    }
    // big boolean reporters
    if (children.length === 1) {
      const child = children[0]
      if (child.isInput && child.isBoolean && child.isBig) {
        return paintBlock(
          {
            shape: "boolean",
            category: "operators",
          },
          [child],
          languages,
        )
      }
    }
    let block = makeBlock("stack", children)
    if (comment) {
      comment.hasBlock = true
      block.comment = comment
    }

    return block
  }

  /**
   * parse reporter or number input
   *
   * @returns {(Block | Input)}
   */
  function pReporter() {
    next() // '('

    // set start index
    let startIndex = index
    let comment = null

    let text = ""
    // empty number-dropdown
    if (tok === " ") {
      while (tok === " ") {
        text += tok
        next()
      }
      if (tok === "v" && peek() === ")") {
        next()
        next()
        return new Input("number-dropdown", text.substring(1, text.length))
      }
      if (tok === "V" && peek() === ")") {
        next()
        next()
        return new Input(
          "number-dropdown",
          text.substring(1, text.length),
          null,
          true,
        )
      }
    }

    const children = pParts(")")
    if (tok && tok === "/" && ["/", "*"].includes(peek())) {
      comment = pComment(")")
    }
    if (tok && tok === ")") {
      next()
    }

    // empty numbers
    if (children.length === 0) {
      return new Input("number", "")
    }

    // number
    if (children.length === 1 && children[0].isLabel) {
      const value = children[0].value
      const raw = children[0].raw
      let input
      if (/^[0-9e.-]*$/.test(value)) {
        input = new Input("number", value)
        if (input.hasLabel) {
          input.label.raw = children[0].raw
        }
        return input
      }
      if (hexColorPat.test(raw) || rgbColorPat.test(raw)) {
        input = new Input("color", Color.fromString(raw))
        return input
      }
    }

    // number-dropdown
    if (children.length > 1) {
      const last = children[children.length - 1]
      let finalV = last.raw
      if (finalV === "v" || finalV === "V") {
        // Yes, I know this is a very hacky solution, I just want to keep all the spaces,
        // and deal with backslashes. I wish I could come up with a much better way then backtracking.

        let endIndex = index
        let currentIndex = endIndex

        while (code[currentIndex] != finalV) {
          currentIndex -= 1
        }
        currentIndex -= 2
        index = startIndex - 1

        let value = ""
        let raw = ""

        while (index < currentIndex) {
          next()
          if (tok === "\\") {
            raw += tok
            next()
          }
          value += tok
          raw += tok
        }

        let isReadonly = finalV === "V"

        index = endIndex
        tok = code[index]

        let formatting = {
          italic: false,
          monospace: false,
        }

        let escapedLast = false
        let start = raw[0]
        let end = raw[raw.length - 1]

        for (let c = 0; c < raw.length; c++) {
          const t = raw[c]

          if (t == "\\") {
            escapedLast = true
            c += 1
          } else {
            escapedLast = false
          }
        }

        if (!escapedLast) {
          let formatted = false
          if (start == "`" && end == "`") {
            formatting.monospace = true
            formatted = true
          } else if (start == "[" && end == "]") {
            formatting.italic = !isReadonly
            formatted = true
          }

          if (formatted) {
            value = value.slice(1, value.length - 1)
          }
        }

        if (raw == "[__shout__go__]") {
          value = new Icon("greenFlag")
        }

        let input = makeMenu("number-dropdown", value, isReadonly)
        if (input.hasLabel) {
          input.label.raw = raw
          input.label.formatting = formatting
        }
        return input
      }
    }

    const block = makeBlock("reporter", children)

    // rings
    if (block.info && block.info.shape === "ring") {
      const first = block.children[0]
      if (
        first &&
        first.isInput &&
        first.shape === "number" &&
        first.value === ""
      ) {
        block.children[0] = new Input(
          first.isCommand
            ? "stack"
            : first.isBoolean
              ? "boolean"
              : first.isRound
                ? "reporter"
                : "stack",
        )
      } else if (
        (first && first.isScript && first.isEmpty) ||
        (first && first.isBlock && !first.children.length)
      ) {
        block.children[0] = new Input(
          first.isCommand
            ? "stack"
            : first.isBoolean
              ? "boolean"
              : first.isRound
                ? "reporter"
                : "stack",
        )
      }
    }

    if (comment) {
      block.comment = comment
      comment.hasBlock = true
    }

    return block
  }

  /**
   * Parse predicate or boolean input
   *
   * @returns {(Block | Input)}
   */
  function pPredicate() {
    next() // '<'
    const children = pParts(">")
    let comment = null
    if (tok && tok === "/" && ["/", "*"].includes(peek())) {
      comment = pComment(">")
    }
    if (tok && tok === ">") {
      next()
    }
    if (children.length === 0) {
      return new Input("boolean")
    }
    if (
      children.length === 1 &&
      children[0].isLabel &&
      ["t", "f"].includes(children[0].raw.toLowerCase())
    ) {
      return new Input("boolean", children[0].value.toLowerCase())
    }
    if (
      children.length === 1 &&
      children[0].isLabel &&
      ["true", "false"].includes(children[0].raw.toLowerCase())
    ) {
      return new Input("boolean", children[0].value.toLowerCase())
    }
    const block = makeBlock("boolean", children)

    if (comment) {
      block.comment = comment
      comment.hasBlock = true
    }

    return block
  }

  function pEmbedded() {
    next() // '{'

    sawNL = false
    let isCShape = false
    while (tok && tok === " ") {
      next()
    }
    isCShape = tok === "\n"
    const f = function () {
      let blocks = []
      while (tok && tok !== "}") {
        let block = pBlock("}")
        if (block && block.isComment) {
          let comment = block
          block = makeBlock("stack", [])
          comment.hasBlock = true
          block.comment = comment
        }
        if (block) {
          return block
        }
      }
    }
    const scripts = parseScripts(f)
    let blocks = []
    scripts.forEach(script => {
      blocks = blocks.concat(script.blocks)
    })

    if (tok === "}") {
      next()
    }
    if (!isCShape) {
      for (let block of blocks) {
        if (block.comment) {
          let label = block.comment.label.value
        }
      }
    }
    if (!sawNL && blocks.length <= 1) {
      return blocks.length ? blocks[0] : makeBlock("stack", [])
    }
    const block = new Script(blocks)
    block.isCShape = isCShape
    return block
  }

  function pIcon() {
    const c = tok
    next()
    switch (c) {
      case "☁":
        return new Icon("cloud")
      case "▸":
        return new Icon("addInput")
      case "◂":
        return new Icon("delInput")
      case "➤":
        return new Icon("turtle")
      default:
        return
    }
  }

  /**
   * Parse overrides
   *
   * @param {string} end
   * @returns {string[]}
   */
  function pOverrides(end) {
    next()
    const overrides = []
    next()
    let override = ""
    while (tok && tok !== "\n" && tok !== end) {
      if (tok === " ") {
        if (override) {
          overrides.push(override)
          override = ""
        }
      } else if (tok === "/" && ["/", "*"].includes(peek())) {
        break
      } else if (tok === "(") {
        override += tok
        while (tok && tok !== "\n" && tok !== ")") {
          next()
          override += tok
        }
      } else {
        override += tok
      }
      next()
    }
    if (override) {
      overrides.push(override)
    }
    return overrides
  }

  /**
   * Parse comment
   *
   * @param {string} end
   * @returns {Comment}
   */
  function pComment(end) {
    next()
    let isMultiline = tok === "*"
    next()
    let comment = ""
    let raw = ""
    if (tok === " ") {
      next()
    }
    while (
      tok &&
      ((!isMultiline && tok !== "\n") || isMultiline) &&
      ((!isMultiline && tok !== end) ||
        (isMultiline && !(tok === "*" && peek() === "/")))
    ) {
      raw += tok
      if (tok === "\\") {
        next()
        raw += tok
      }
      comment += tok
      next()
    }
    if (isMultiline && tok && tok === "*") {
      next()
      if (tok === "/") {
        next()
      }
    }
    if (tok && tok === "\n") {
      next()
    }
    if (comment[comment.length - 1] === " ") {
      comment = comment.slice(0, comment.length - 1)
    }

    let com = new Comment(comment, true, isMultiline)
    com.label.raw = raw

    return com
  }

  /**
   * Parse line
   *
   * @returns {(Block | Comment)}
   */
  function pLine() {
    let diff
    if (tok === "+" || tok === "-") {
      diff = tok
      next()
    }
    const block = pBlock()
    if (tok === "/" && ["/", "*"].includes(peek())) {
      const comment = pComment()
      comment.hasBlock = block && block.children.length
      if (!comment.hasBlock) {
        return comment
      }
      block.comment = comment
    }
    if (block) {
      block.diff = diff
    }
    return block
  }

  return () => {
    if (!tok) {
      return undefined
    }
    const line = pLine()
    return line || "NL"
  }
}

/* * */

/**
 * Parse scripts.
 *
 * @param {() => (Block | Comment | "NL")} getLine - Result from `parseLines()`
 * @returns {Script[]}
 */
function parseScripts(getLine) {
  let line = getLine()
  function next() {
    line = getLine()
  }

  /**
   * Parse lines
   *
   * @returns {Script[]}
   */
  function pFile() {
    while (line === "NL") {
      next()
    }
    const scripts = []
    while (line) {
      let blocks = []
      while (line && line !== "NL") {
        let b = pLine()
        const isGlow = b.diff === "+"
        if (isGlow) {
          b.diff = null
        }

        if (b.isElse || b.isEnd) {
          b = new Block({ ...b.info, shape: "stack" }, b.children)
        }

        if (isGlow) {
          const last = blocks[blocks.length - 1]
          let children = []
          if (last && last.isGlow) {
            blocks.pop()
            children = last.child.isScript ? last.child.blocks : [last.child]
          }
          children.push(b)
          blocks.push(new Glow(new Script(children)))
        } else if (b.isHat) {
          if (blocks.length) {
            scripts.push(new Script(blocks))
          }
          blocks = [b]
        } else if (b.isFinal) {
          blocks.push(b)
          break
        } else if (b.isCommand) {
          blocks.push(b)
        } else {
          // reporter or predicate
          if (blocks.length) {
            scripts.push(new Script(blocks))
          }
          scripts.push(new Script([b]))
          blocks = []
          break
        }
      }
      if (blocks.length) {
        scripts.push(new Script(blocks))
      }
      while (line === "NL") {
        next()
      }
    }
    return scripts
  }

  /**
   * Parse line
   *
   * @returns {Script}
   */
  function pLine() {
    const b = line
    next()

    if (b.hasScript) {
      while (true) {
        const blocks = pMouth()
        b.children.push(new Script(blocks))
        if (line && line.isElse) {
          for (const child of line.children) {
            b.children.push(child)
          }
          next()
          continue
        }
        if (line && line.isEnd) {
          next()
        }
        break
      }
    }
    return b
  }

  /**
   * Parse mouths
   *
   * @returns {(Script | Glow)}
   */
  function pMouth() {
    const blocks = []
    while (line) {
      if (line === "NL") {
        next()
        continue
      }
      if (!line.isCommand) {
        return blocks
      }

      const b = pLine()
      const isGlow = b.diff === "+"
      if (isGlow) {
        b.diff = null
      }

      if (isGlow) {
        const last = blocks[blocks.length - 1]
        let children = []
        if (last && last.isGlow) {
          blocks.pop()
          children = last.child.isScript ? last.child.blocks : [last.child]
        }
        children.push(b)
        blocks.push(new Glow(new Script(children)))
      } else {
        blocks.push(b)
      }
    }
    return blocks
  }

  return pFile()
}

/* * */

/**
 * @callback eachBlock~requestCallback
 * @param {Block} block - Block
 */

/**
 * Iterate over each block in script
 *
 * @param {(Script | Block | Glow)} x
 * @param {eachBlock~requestCallback} [cb]
 */
function eachBlock(x, cb) {
  if (x.isScript) {
    x.blocks = x.blocks.map(block => {
      eachBlock(block, cb)
      return cb(block) || block
    })
  } else if (x.isBlock) {
    x.children = x.children.map(child => {
      eachBlock(child, cb)
      return cb(child) || child
    })
  } else if (x.isGlow) {
    eachBlock(x.child, cb)
  }
}

/**
 * Blocks that have a list inputs. The key is the block id, and the value is the input index that contains the list name.
 *
 * @type {{ "append:toList:": number; "deleteLine:ofList:": number; "insert:at:ofList:": number; "setLine:ofList:to:": number; "showList:": number; "hideList:": number; }}
 */
const listBlocks = {
  "append:toList:": 1,
  "deleteLine:ofList:": 1,
  "insert:at:ofList:": 2,
  "setLine:ofList:to:": 1,
  "showList:": 0,
  "hideList:": 0,
}

/**
 * Recognize stuff
 *
 * @param {Script[]} scripts
 */
function recognizeStuff(scripts) {
  const customBlocksByHash = Object.create(null)
  const listNames = new Set()

  scripts.forEach(script => {
    const customArgs = new Set()

    eachBlock(script, block => {
      if (!block.isBlock) {
        return
      }

      // custom blocks
      if (block.info.shape === "define-hat") {
        // There should be exactly one `outline` child, added in paintBlock.
        const outline = block.children.find(child => child.isOutline)
        if (!outline) {
          return
        }

        const names = []
        const parts = []
        for (const child of outline.children) {
          if (child.isLabel) {
            parts.push(child.value)
          } else if (child.isBlock) {
            if (!child.info.argument) {
              return
            }
            parts.push(
              {
                number: "%n",
                string: "%s",
                boolean: "%b",
              }[child.info.argument],
            )

            const name = blockName(child)
            names.push(name)
            customArgs.add(name)
          } else if (child.isIcon) {
            parts.push(`@${child.name}`)
          }
        }
        const spec = parts.join(" ")
        const hash = hashSpec(spec)

        const info = {
          spec: spec,
          names: names,
          category: block.info.category,
          shape: outline.info.shape.replace("outline-", ""),
          local: outline.info.local,
        }
        if (!customBlocksByHash[hash]) {
          customBlocksByHash[hash] = [info]
        } else {
          customBlocksByHash[hash].push(info)
        }
        block.info.id = "PROCEDURES_DEFINITION"
        block.info.selector = "procDef"
        block.info.call = info.spec
        block.info.names = info.names

        // custom arguments
      } else if (
        block.info.categoryIsDefault &&
        (block.isReporter || block.isBoolean)
      ) {
        const name = blockName(block)
        if (customArgs.has(name)) {
          block.info.category = "custom-arg"
          block.info.categoryIsDefault = false
          block.info.selector = "getParam"
        }

        // snap custom blocks
      } else if (block.isBlockPrototype) {
        // custom blocks will always be the first child. Anything after doesn't matter
        if (!block.children[0].isBlock) {
          return
        }

        let customBlock = block.children[0]

        const names = []
        const parts = []
        for (const child of customBlock.children) {
          // we can format custom blocks with + between segments like snap
          if (child.isIcon && child.name === "plusSign") {
            continue
          }
          if (child.isLabel) {
            if (child.modified && child.value === "nl" && child.scale == null) {
              parts.push("\n")
            } else {
              parts.push(child.value)
            }
          } else if (child.isBlock) {
            if (!child.isUpvar) {
              return
            }

            let argument = "string"
            let argVar = child.children[0]

            // detect argument type from argVar name
            if (argVar.children.length > 1) {
              const containsEq = argVar.children.find(
                child => child.value == "=",
              )

              var typePosition = argVar.children.length - 1
              if (containsEq) {
                for (
                  typePosition = argVar.children.length - 1;
                  typePosition > 0;
                  typePosition--
                ) {
                  const argChild = argVar.children[typePosition]
                  if (argChild.isLabel && argChild.value == "=") {
                    typePosition -= 1
                    break
                  }
                }
              }
            }

            const types = {
              "\u2191": "upvar",
              "...": "multi",
              "\u03BB": "ring",
              "?": "boolean",
              "\uFE19": "list",
              "#": "number",
            }

            if (argVar.children[typePosition]) {
              argument = types[argVar.children[typePosition].value]
              if (!argument) {
                argument = "string"
              }
            }

            parts.push(
              {
                number: "%n",
                string: "%s",
                boolean: "%b",
              }[argument] || "%s",
            )

            const name = blockName(argVar)
            names.push(name)
            customArgs.add(name)
          } else if (child.isIcon) {
            parts.push(`@${child.name}`)
          }
        }
        const spec = parts.join(" ")
        const hash = hashSpec(spec)

        let info = {
          spec: spec,
          names: names,
          category: customBlock.info.category,
          color: customBlock.info.color,
          shape: customBlock.info.shape,
          local: customBlock.info.local,
        }
        if (!customBlocksByHash[hash]) {
          customBlocksByHash[hash] = [info]
        } else {
          customBlocksByHash[hash].push(info)
        }
        block.info.id = "PROCEDURES_DEFINITION"
        block.info.selector = "procDef"
        block.info.call = info.spec
        block.info.names = info.names

        // list names
      } else if (
        Object.prototype.hasOwnProperty.call(listBlocks, block.info.selector)
      ) {
        const argIndex = listBlocks[block.info.selector]
        const inputs = block.children.filter(child => !child.isLabel)
        const input = inputs[argIndex]
        if (input && input.isInput) {
          listNames.add(input.value)
        }
      }
    })
  })

  scripts.forEach(script => {
    eachBlock(script, block => {
      if (
        block.info &&
        block.info.categoryIsDefault &&
        (block.info.category === "obsolete" ||
          (block.isReporter && block.info.category === "variables"))
      ) {
        // custom blocks
        const blocksInfo = customBlocksByHash[block.info.hash]
        if (blocksInfo) {
          let selected = blocksInfo[0]
          for (let info of blocksInfo) {
            if (info.shape == block.info.shape) {
              selected = info
            }
          }
          if (selected) {
            block.info.selector = "call"
            block.info.call = selected.spec
            block.info.names = selected.names
            block.info.category = selected.category
            block.info.color = selected.color
            block.info.local = selected.local
            // block.info.shape = selected.shape
            block.info.isCustom = true
          }
        }
      }

      let name, info
      if (
        block.isReporter &&
        !block.info.isCustom &&
        block.info.category === "variables" &&
        block.info.categoryIsDefault
      ) {
        // We set the selector here for some reason
        block.info.selector = "readVariable"
        name = blockName(block)
        info = block.info
      }

      // ring
      if (
        block.info &&
        block.info.categoryIsDefault &&
        block.info.category === "obsolete" &&
        block.info.shape === "ring"
      ) {
        block.info.category = "grey"
      }

      // upvars
      if (block.isBlock) {
        for (const child of block.children) {
          if (child.isUpvar) {
            child.info.category = block.info.category
            child.info.color = block.info.color
          }
        }
      }

      if (!name) {
        return
      }

      // list reporters
      if (listNames.has(name)) {
        info.category = "lists"
        info.categoryIsDefault = false
        info.selector = "contentsOfList:"
      }

      return // already done
    })
  })
}

/**
 * Parse snapblocks code.
 *
 * @export
 * @param {string} code - Snapblocks code to parse
 * @param {import("../index.js").Options} options - Snapblocks options
 * @returns {Document} - Parsed document
 */
export function parse(code, options) {
  options = {
    inline: false,
    languages: ["en"],
    ...options,
  }

  if (options.dialect) {
    throw new Error("Option 'dialect' no longer supported")
  }

  // let textarea = document.createElement("textarea")
  // textarea.innerHTML = code
  // code = textarea.value

  code = decode(code)
  code = code.replaceAll("\u00a0", " ") // replace non-breaking space (this is a big issue on the snap wiki)

  const languages = options.languages.map(code => {
    const lang = allLanguages[code]
    if (!lang) {
      throw new Error(`Unknown language: '${code}'`)
    }
    return lang
  })

  /* * */

  const f = parseLines(code, languages)
  const scripts = parseScripts(f)
  recognizeStuff(scripts)
  return new Document(scripts)
}
