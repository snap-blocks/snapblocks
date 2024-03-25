function assert(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

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
  hexColorPat,
  minifyHash,
  lookupHash,
  hashSpec,
  applyOverrides,
  rtlLanguages,
  iconPat,
  blockName,
  parseSpec,
  unicodeIcons,
} from "./blocks.js"

function paintBlock(info, children, languages) {
  let overrides = []
  if (Array.isArray(children[children.length - 1])) {
    overrides = children.pop()
  }

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

  // paint
  const o = lookupHash(shortHash, info, children, languages)
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
    info.category = type.category
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

    // ellipsis block
    if (type.spec === ". . .") {
      children = [new Label(". . .")]
    }
  } else {
    // The block was not recognized, so we check if it's a define block.
    //
    // We check for built-in blocks first to avoid ambiguity, e.g. the
    // `defina o tamanho como (100) %` block in pt_BR.
    for (const lang of languages) {
      // console.log("define")
      // console.log("lang", lang.definePrefix, lang.defineSuffix)

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
        info.shape = "snap-define"

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
        block.children = customChildren
        continue
      }

      if (!isDefineBlock(children, lang, !overrides.includes("define"))) {
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

      // console.log("info", info.category)
      info.shape = "define-hat"

      // Move the children of the define block into an "outline", transforming
      // () and [] shapes as we go.

      let outlineShape = "stack"

      let blockChildren = children.slice(
        lang.definePrefix.length,
        children.length - lang.defineSuffix.length,
      )

      // console.log("outlineChildren", structuredClone(blockChildren))

      if (blockChildren.length == 1 && !blockChildren[0].isLabel) {
        // console.log("shape", blockChildren[1])
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
          // console.log("cloned children", children)
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
              [new Label("")],
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
  if (info.hasLoopArrow) {
    let arrow = new Icon("loopArrow")
    arrow.isLoop = true
    arrow.scale = 0.5
    children.push(arrow)
  }

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

function parseLines(code, languages) {
  let tok = code[0]
  let index = 0
  function next() {
    tok = code[++index]
  }
  function peek(amount = 1) {
    return code[index + amount]
  }
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

  function makeBlock(shape, children) {
    const hasInputs = children.filter(x => !x.isLabel).length

    const info = {
      shape: shape,
      category: shape === "reporter" && !hasInputs ? "variables" : "obsolete",
      categoryIsDefault: true,
      hasLoopArrow: false,
    }
    // console.log("children", children)
    return paintBlock(info, children, languages)
  }

  function makeMenu(shape, value, isReadonly) {
    const menu = lookupDropdown(value, languages) || value
    return new Input(shape, value, menu, isReadonly)
  }

  function pParts(end) {
    const children = []
    let label
    while (tok && tok !== "\n") {
      // So that comparison operators `<()<()>` and `<()>()>` don't need the
      // central <> escaped, we interpret it as a label if particular
      // conditions are met.
      if (
        (tok === "<" || tok === ">") &&
        end === ">" && // We're parsing a predicate.
        children.length === 1 && // There's exactly one AST node behind us.
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
      if (tok === "/" && peek() === "/" && !end) {
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
          case "@": {
            next()
            let name = ""
            let modifiers = []
            while (tok && /[a-zA-Z+]/.test(tok)) {
              name += tok
              next()
            }
            if (tok === "-") {
              modifiers = []
              let modifier = 0
              modifiers[modifier] = ""
              next() // "-"
              while (tok && /[0-9a-z-A-Z\-\.]/.test(tok)) {
                if (tok === "-") {
                  modifier += 1
                  modifiers[modifier] = ""
                } else {
                  modifiers[modifier] += tok
                }
                next()
              }
            }
            children.push(
              Object.prototype.hasOwnProperty.call(Icon.icons, name) ||
                Object.prototype.hasOwnProperty.call(Icon.iconAliases, name)
                ? new Icon(name, modifiers)
                : new Label(
                    `@${name}${modifiers.length ? "-" : ""}${modifiers.join(
                      "-",
                    )}`,
                  ),
            )
            label = null
            break
          }
          case "\n":
            // console.log("end", end)
            if (end) {
              break
            }
          case "\\":
            if (!label) {
              children.push((label = new Label("")))
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
              children.push((label = new Label("")))
            }
            label.value += tok
            label.raw += tok
            next()
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

  function pString() {
    next() // '['
    let s = ""
    let raw = ""
    let escapeV = false
    while (tok && tok !== "]") {
      raw += tok
      if (tok === "\\") {
        next()
        raw += tok
        if (tok === "v") {
          escapeV = true
        }
        if (tok === ["n", "\n"].includes(peek())) {
          s += "\n"
          next()
        }
        if (!tok) {
          break
        }
      } else {
        escapeV = false
      }
      s += tok
      next()
    }
    if (tok === "]") {
      next()
    }
    if (hexColorPat.test(s)) {
      return new Input("color", s)
    }
    return !escapeV && / v$/.test(s)
      ? makeMenu("dropdown", s.slice(0, s.length - 2), false)
      : !escapeV && / V$/.test(s)
        ? makeMenu("dropdown", s.slice(0, s.length - 2), true)
        : (() => {
            let input = new Input("string", s, true)
            if (input.hasLabel) {
              input.label.raw = raw
            }
            return input
          })()
  }

  function pBlock(end) {
    const children = pParts(end)
    if (tok && tok === "\n") {
      sawNL = true
      next()
    }
    if (children.length === 0) {
      return
    }

    // standalone reporters
    if (children.length === 1) {
      const child = children[0]
      if (
        child.isBlock &&
        (child.isReporter || child.isBoolean || child.isRing)
      ) {
        return child
      }
    }
    return makeBlock("stack", children)
  }

  function pReporter() {
    next() // '('

    // set start index
    let startIndex = index

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
      // console.log("tok", tok)
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
      let input
      if (/^[0-9e.-]*$/.test(value)) {
        input = new Input("number", value)
        if (input.hasLabel) {
          input.label.raw = children[0].raw
        }
        return input
      }
      if (hexColorPat.test(value)) {
        input = new Input("color", value)
        return input
      }
    }

    // number-dropdown
    if (children.length > 1) {
      const last = children[children.length - 1]
      let end = last.value
      if (end === "v" || end === "V") {
        // Yes, I know this is a very hacky solution, I just want to keep all the spaces,
        // and deal with backslashes. I wish I could come up with a much better way, then backtracking.

        let endIndex = index
        let currentIndex = endIndex

        while (code[currentIndex] != end) {
          currentIndex -= 1
        }
        currentIndex -= 2
        index = startIndex - 1

        let value = ""
        let raw = ""

        while (index < currentIndex) {
          next()
          if (tok === "\\") {
            next()
            raw += tok
          }
          value += tok
          raw += tok
        }

        index = endIndex
        tok = code[index]

        let input = makeMenu("number-dropdown", value, end === "V")
        if (input.hasLabel) {
          input.label.raw = raw
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

    return block
  }

  function pPredicate() {
    next() // '<'
    const children = pParts(">")
    if (tok && tok === ">") {
      next()
    }
    if (children.length === 0) {
      return new Input("boolean")
    }
    return makeBlock("boolean", children)
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
      while (tok && tok !== "}") {
        const block = pBlock("}")
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
    if (!sawNL) {
      assert(blocks.length <= 1)
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

  function pOverrides(end) {
    next()
    next()
    const overrides = []
    let override = ""
    while (tok && tok !== "\n" && tok !== end) {
      if (tok === " ") {
        if (override) {
          overrides.push(override)
          override = ""
        }
      } else if (tok === "/" && peek() === "/") {
        break
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

  function pComment(end) {
    next()
    next()
    let comment = ""
    if (tok === " ") {
      next()
    }
    while (tok && tok !== "\n" && tok !== end) {
      comment += tok
      next()
    }
    if (tok && tok === "\n") {
      next()
    }
    return new Comment(comment, true)
  }

  function pLine() {
    let diff
    if (tok === "+" || tok === "-") {
      diff = tok
      next()
    }
    const block = pBlock()
    if (tok === "/" && peek() === "/") {
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

function parseScripts(getLine) {
  let line = getLine()
  function next() {
    line = getLine()
  }

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

const listBlocks = {
  "append:toList:": 1,
  "deleteLine:ofList:": 1,
  "insert:at:ofList:": 2,
  "setLine:ofList:to:": 1,
  "showList:": 0,
  "hideList:": 0,
}

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
          shape: block.info.shape,
        }
        if (!customBlocksByHash[hash]) {
          customBlocksByHash[hash] = info
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
      } else if (block.isSnapDefine) {
        // console.log("snap")

        // custom blocks will always be the first child. Anything after doesn't matter
        if (!block.children[0].isBlock) {
          return
        }

        let customBlock = block.children[0]

        const names = []
        const parts = []
        for (const child of customBlock.children) {
          // console.log("value", child)
          // we can format custom blocks with + between segments like snap
          if (child.isIcon && child.name === "plusSign") {
            continue
          }
          if (child.isLabel) {
            if (child.value === "$nl") {
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
              // console.log("containsEq", containsEq)

              var typePosition = argVar.children.length - 1
              if (containsEq) {
                for (
                  typePosition = argVar.children.length - 1;
                  typePosition > 0;
                  typePosition--
                ) {
                  const argChild = argVar.children[typePosition]
                  // console.log("argChild", argChild)
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
              // console.log(argument)
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
            // console.log("part", parts[parts.length - 1])

            const name = blockName(argVar)
            names.push(name)
            customArgs.add(name)
          } else if (child.isIcon) {
            parts.push(`@${child.name}`)
          }
        }
        const spec = parts.join(" ")
        const hash = hashSpec(spec)

        // console.log("spec", spec)
        let info = {
          spec: spec,
          names: names,
          category: customBlock.info.category,
          shape: customBlock.info.shape,
        }
        if (!customBlocksByHash[hash]) {
          customBlocksByHash[hash] = info
        }
        // console.log("hash", hash)
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
        block.info.category === "obsolete"
      ) {
        // custom blocks
        // console.log("block hash", block.info.hash)
        const info = customBlocksByHash[block.info.hash]
        if (info) {
          block.info.selector = "call"
          block.info.call = info.spec
          block.info.names = info.names
          block.info.category = info.category
          // block.info.shape = info.shape
          block.info.isCustom = true
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
        // console.log("block", block.info.isCustom)
        for (const child of block.children) {
          // console.log("upvar", child.isUpvar)
          if (child.isUpvar) {
            // console.log("category", block.info.category)
            child.info.category = block.info.category
          }
        }
      }

      if (!name) {
        return
      }

      // list reporters
      if (listNames.has(name)) {
        info.category = "list"
        info.categoryIsDefault = false
        info.selector = "contentsOfList:"
      }

      return // already done
    })
  })
}

export function parse(code, options) {
  options = {
    inline: false,
    languages: ["en"],
    ...options,
  }

  if (options.dialect) {
    throw new Error("Option 'dialect' no longer supported")
  }

  code = code.replace(/&lt;/g, "<")
  code = code.replace(/&gt;/g, ">")
  if (options.inline) {
    code = code.replace(/\n/g, " ")
  }

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
