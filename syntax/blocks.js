import { extensions, aliasExtensions } from "./extensions.js"

// List of classes we're allowed to override.

/**
 * @typedef {Object} BlockInfo
 * @property {string} id - Used for Scratch 3 translations
 * @property {string} spec - Block spec
 * @property {{[key: string]: string[]}} specDefs - Spec defs to be filled into the block spec
 * @property {string} snap - Used for Snap! translations
 * @property {string[]} parts - Spec split by inputs
 * @property {string} selector - Scratch 2 id
 * @property {string[]} inputs - Block inputs
 * @property {string} shape - Block shape
 * @property {string} category - Block category
 * @property {boolean} hasLoopArrow - Has loop arrow?
 * @property {string[]} aliases - List of block aliases
  }
 */

/**
 * @typedef {Object} Language
 * @property {string} name - Language name
 * @property {{[key: string]: string}} aliases - Block aliases
 * @property {{[key: string]: string}} nativeAliases - Native block aliases
 * @property {{[key: string]: string}} renamedBlocks - Blocks that were renamed in scratch 3
 * @property {string[]} definePrefix - Scratch define block prefix
 * @property {[string[]]} defineSuffix - Scratch define block suffix
 * @property {string[]} ignorelt - For ignoring the lt sign in the "when distance < _" block
 * @property {{math: string[], list: string[], text: string[]}} of - Valid arguments to "of" dropdown, for resolving ambiguous situations
 * @property {string[]} soundEffects - Valid arguments to "sound effect" dropdown, for resolving ambiguous situations
 * @property {string[]} microbitWhen - Valid arguments to "microbit when" dropdown
 * @property {string[]} picoWhen - Valid arguments to "pico when" dropdown
 * @property {string[]} osis - For detecting the "stop" cap / stack block
 * @property {string[]} setFlag - Valid arguments to sensing "set [] to <>" block.
 * @property {{}} dropdowns
 * @property {{}} nativeDropdowns
 * @property {{[type: string]: string}} commands - {block_id: block_spec}
 * @property {BlockInfo[]} fullBlocks - Translatable block spec info.
}
 */

/**
 * List of categories
 *
 * @type {string[]}
 */
export const overrideCategories = [
  "motion",
  "looks",
  "sound",
  "variables",
  "lists",
  "events",
  "control",
  "sensing",
  "operators",
  "custom",
  "custom-arg",
  "extension",
  "other",
  "obsolete",
  ...Object.keys(extensions),
  ...Object.keys(aliasExtensions),
]

/**
 * Category aliases
 *
 * @type {{ grey: string; gray: string; list: string; }}
 */
export const aliasCategories = {
  grey: "other",
  gray: "other",
  list: "lists",
}

/**
 * List of shapes
 *
 * @type {string[]}
 */
export const overrideShapes = [
  "hat",
  "cap",
  "stack",
  "boolean",
  "reporter",
  "ring",
  "cat",
  "santa",
]

/**
 * Shape aliases
 *
 * @type {{ predicate: string; command: string; }}
 */
export const aliasShapes = {
  predicate: "boolean",
  command: "stack",
}

/**
 * List of santa hats
 *
 * @type {string[]}
 */
export const santaHats = [
  "hat",
  "trumpet",
  "star",
  "candles",
  "gift",
  "pretzel",
  "letter",
  "train",
  "house",
]

/**
 * Santa hat aliases
 *
 * @type {{ predicate: string; command: string; }}
 */
export const aliasSantaHats = {
  advent: "candles",
  present: "gift",
  gingerbread: "house",
  "gingerbread-house": "house",
}

/**
 * languages that should be displayed right to left
 *
 * @type {("ar" | "ckb" | "fa" | "he")[]}
 */
export const rtlLanguages = ["ar", "ckb", "fa", "he"]

// List of commands taken from Scratch
import scratchCommands from "./commands.js"

import Color, { hexColorPat, rgbColorPat } from "../shared/color.js"

/**
 * Input number regex
 *
 * @constant {RegExp}
 */
const inputNumberPat = /%([0-9]+)/
/**
 * Input regex
 *
 * @constant {RegExp}
 */
export const inputPat = /(%[a-zA-Z0-9](?:\.[a-zA-Z0-9]+)?)/
/**
 * Global input regex
 *
 * @type {RegExp}
 */
const inputPatGlobal = new RegExp(inputPat.source, "g")
/**
 * Icon regex
 *
 * @type {RegExp}
 */
export const iconPat = /(@[a-zA-Z]+)/
/**
 * Block spec split regex
 *
 * @type {RegExp}
 */
const splitPat = new RegExp(`${inputPat.source}|${iconPat.source}| +`, "g")

/**
 * Parse input number
 *
 * @export
 * @param {string} part
 * @returns {number}
 */
export function parseInputNumber(part) {
  const m = inputNumberPat.exec(part)
  return m ? +m[1] : 0
}

/**
 * Parse spec
 *
 * @export
 * @param {string} spec
 * @returns {{ spec: string; parts: string; inputs: string; hash: string; }}
 */
export function parseSpec(spec) {
  const parts = spec.split(splitPat).filter(x => x)
  const inputs = parts.filter(p => inputPat.test(p))
  return {
    spec: spec,
    parts: parts,
    inputs: inputs,
    hash: hashSpec(spec),
  }
}

/**
 * Get the hash of the spec
 *
 * @export
 * @param {string} spec
 * @returns {string}
 */
export function hashSpec(spec) {
  return minifyHash(spec.replace(inputPatGlobal, " _ "))
}

/**
 * Minify the block hash
 *
 * @export
 * @param {string} hash
 * @returns {string}
 */
export function minifyHash(hash) {
  return hash
    .replace(/_/g, " _ ")
    .replace(/ +/g, " ")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(". . .", "...")
    .replace(/…/, "...")
    .trim()
    .toLowerCase()
}

/**
 * Block info with id as key
 *
 * @type {Object}
 */
export const blocksById = {}
/**
 * All the blocks
 *
 * @type {BlockInfo[]}
 */
const allBlocks = scratchCommands.map(def => {
  if (!def.id) {
    if (!def.selector && !def.snap) {
      throw new Error(`Missing ID: ${def.spec}`)
    }
    if (def.selector) {
      def.id = `sb2:${def.selector}`
    }
    if (def.snap) {
      def.id = `snap:${def.snap}`
    }
  }
  if (!def.spec) {
    throw new Error(`Missing spec: ${def.id}`)
  }

  const info = {
    id: def.id, // Used for Scratch 3 translations
    spec: def.spec, // Used for Scratch 2 translations
    specDefs: def.specDefs,
    snap: def.snap, // Used for Snap! translations
    parts: def.spec.split(splitPat).filter(x => x),
    selector: def.selector || `sb3:${def.id}`, // Used for JSON marshalling
    inputs: def.inputs == null ? [] : def.inputs,
    shape: def.shape,
    category: def.category,
    hasLoopArrow: !!def.hasLoopArrow,
    aliases: def.aliases == null ? [] : def.aliases,
  }
  if (blocksById[info.id]) {
    throw new Error(`Duplicate ID: ${info.id}`)
  }
  blocksById[info.id] = info
  return info
})

/**
 * Icons as unicode characters
 *
 * @type {{ "@greenFlag": string; "@turnRight": string; "@turnLeft": string; "@addInput": string; "@delInput": string; "@turtle": string; "@cloud": string; "@verticalEllipsis": string; "@notes": string; }}
 */
export const unicodeIcons = {
  "@greenFlag": "⚑",
  "@turnRight": "↻",
  "@turnLeft": "↺",
  "@addInput": "▸",
  "@delInput": "◂",
  "@turtle": "➤",
  "@cloud": "☁",
  "@verticalEllipsis": "⋮",
  "@notes": "♫",
}

/**
 * All the loaded languages
 *
 * @type {{[key: string]: Language}}
 */
export const allLanguages = {}
/**
 * Load language
 *
 * @param {string} code - Language code
 * @param {Language} language - Language data
 */
function loadLanguage(code, language) {
  const blocksByHash = (language.blocksByHash = {})
  language.blocksById = {}
  if (!language.fullBlocks) {
    language.fullBlocks = []
  }

  Object.keys(language.commands).forEach(blockId => {
    const nativeSpec = language.commands[blockId]
    const block = blocksById[blockId]

    const nativeHash = hashSpec(nativeSpec)
    if (!blocksByHash[nativeHash]) {
      blocksByHash[nativeHash] = []
    }
    blocksByHash[nativeHash].push(block)

    // fallback image replacement, for languages without aliases
    const m = iconPat.exec(block.spec)
    if (m) {
      const image = m[0]
      const hash = nativeHash.replace(hashSpec(image), unicodeIcons[image])
      if (!blocksByHash[hash]) {
        blocksByHash[hash] = []
      }
      blocksByHash[hash].push(block)
    }
  })

  language.nativeAliases = {}
  Object.keys(language.aliases).forEach(alias => {
    const blockId = language.aliases[alias]
    const block = blocksById[blockId]
    if (block === undefined) {
      throw new Error(`Invalid alias '${blockId}'`)
    }
    const aliasHash = hashSpec(alias)
    if (!blocksByHash[aliasHash]) {
      blocksByHash[aliasHash] = []
    }
    blocksByHash[aliasHash].push(block)

    if (!language.nativeAliases[blockId]) {
      language.nativeAliases[blockId] = []
    }
    language.nativeAliases[blockId].push(alias)
  })

  // Some English blocks were renamed between Scratch 2 and Scratch 3. Wire them
  // into language.blocksByHash
  Object.keys(language.renamedBlocks || {}).forEach(alt => {
    const id = language.renamedBlocks[alt]
    if (!blocksById[id]) {
      console.error(`Unknown ID: ${id}`)
      return
    }
    const block = blocksById[id]
    const hash = hashSpec(alt)
    if (!english.blocksByHash[hash]) {
      english.blocksByHash[hash] = []
    }
    english.blocksByHash[hash].push(block)
  })

  language.nativeDropdowns = {}
  Object.keys(language.dropdowns).forEach(name => {
    const nativeName = language.dropdowns[name]
    language.nativeDropdowns[nativeName] = name
  })

  Object.keys(language.aliases).forEach(alias => {
    let blockId = language.aliases[alias]
    let block = {
      id: blockId,
      spec: alias,
      isAlias: true,
    }
    language.fullBlocks.push(block)
  })
  Object.keys(language.commands).forEach(blockId => {
    let spec = language.commands[blockId]
    let block = {
      id: blockId,
      spec: spec,
    }
    language.fullBlocks.push(block)
  })
  if (language.renamedBlocks) {
    Object.keys(language.renamedBlocks).forEach(spec => {
      let blockId = language.renamedBlocks[spec]
      let block = {
        id: blockId,
        spec: spec,
      }
      language.fullBlocks.push(block)
    })
  }

  language.code = code
  allLanguages[code] = language
}
/**
 * Load list of languages
 *
 * @export
 * @param {Language[]} languages
 */
export function loadLanguages(languages) {
  Object.keys(languages).forEach(code => loadLanguage(code, languages[code]))
}

/**
 * The English language
 *
 * @type {Language}
 */
export const english = {
  aliases: {
    "turn ccw %1 degrees": "MOTION_TURNLEFT",
    "turn left %1 degrees": "MOTION_TURNLEFT",
    "turn cw %1 degrees": "MOTION_TURNRIGHT",
    "turn right %1 degrees": "MOTION_TURNRIGHT",
    "when flag clicked": "EVENT_WHENFLAGCLICKED",
    "when gf clicked": "EVENT_WHENFLAGCLICKED",
    "when green flag clicked": "EVENT_WHENFLAGCLICKED",
    "pause all": "snap:doPauseAll",
  },

  renamedBlocks: {
    "say %1 for %2 secs": "LOOKS_SAYFORSECS",
    "think %1 for %2 secs": "LOOKS_THINKFORSECS",
    "play sound %1": "SOUND_PLAY",
    "wait %1 secs": "CONTROL_WAIT",
    clear: "pen.clear",
  },

  definePrefix: ["define"],
  defineSuffix: [],

  // For ignoring the lt sign in the "when distance < _" block
  ignorelt: ["when distance"],

  // Valid arguments to "of" dropdown, for resolving ambiguous situations
  of: {
    math: [
      "abs",
      "neg",
      "sign",
      "ceiling",
      "floor",
      "sqrt",
      "sin",
      "cos",
      "tan",
      "asin",
      "acos",
      "atan",
      "ln",
      "log",
      "lg",
      "e ^",
      "e^",
      "10 ^",
      "10^",
      "2 ^",
      "2^",
      "id",
    ],
    list: [
      "length",
      "rank",
      "dimensions",
      "flatten",
      "columns",
      "uniques",
      "distribution",
      "sorted",
      "shuffled",
      "reverse",
      "text",
      "lines",
      "csv",
      "json",
    ],
    text: [
      "select",
      "unselect",
      "encode uri",
      "decode uri",
      "encode uri component",
      "decode uri component",
      "xml escape",
      "xml unescape",
      "js escape",
      "hex sha512 hash",
    ],
  },

  // Language name is needed for the English locale as well
  name: "English",

  // Valid arguments to "sound effect" dropdown, for resolving ambiguous situations
  soundEffects: ["pitch", "pan left/right"],

  // Valid arguments to "microbit when" dropdown
  microbitWhen: ["moved", "shaken", "jumped"],

  picoWhen: [
    "button pressed",
    "A connected",
    "B connected",
    "C connected",
    "D connected",
  ],

  // For detecting the "stop" cap / stack block
  osis: [
    "other scripts in sprite",
    "other scripts in stage",
    "all but this script",
  ],

  setFlag: [
    "turbo mode",
    "case sensitivity",
    "flat line ends",
    "log pen vectors",
    "video capture",
    "mirror video",
  ],

  dropdowns: {},

  commands: {},

  fullBlocks: [],
}
allBlocks.forEach(info => {
  if (info.hasLoopArrow) {
    english.aliases[info.spec + " @loop"] = info.id
    english.aliases[info.spec] = info.id
    info.spec = info.spec + " @loopArrow"
  }

  english.fullBlocks.push(structuredClone(info))
  english.commands[info.id] = info.spec

  if (info.aliases) {
    for (const alias of info.aliases) {
      english.aliases[alias] = info.id
    }
  }
})
loadLanguages({
  en: english,
})

/*****************************************************************************/

/**
 * Register block detection check
 *
 * @param {string} id - Block id
 * @param {Function} func
 */
function registerCheck(id, func) {
  if (!blocksById[id]) {
    throw new Error(`Unknown ID: ${id}`)
  }
  blocksById[id].accepts = func
}

/**
 * Add block special case
 *
 * @param {string} id - Block id
 * @param {Function} func
 */
function specialCase(id, func) {
  if (!blocksById[id]) {
    throw new Error(`Unknown ID: ${id}`)
  }
  blocksById[id].specialCase = func
}

/**
 * Add disambiguation
 *
 * @param {string} id1 - Block id 1
 * @param {string} id2 - Block id 2
 * @param {Function} test
 */
function disambig(id1, id2, test) {
  registerCheck(id1, (_, children, lang) => {
    return test(children, lang)
  })
  registerCheck(id2, (_, children, lang) => {
    return !test(children, lang)
  })
}

// 4-way disambiguation
registerCheck("OPERATORS_MATHOP", (info, children, lang) => {
  // Operators if math function
  const first = children[0]
  if (!first.isInput) {
    return
  }
  const last = children[children.length - 1]
  if ((last.isInput && last.hasArrow) || last.isRing) {
    return
  }
  const name = first.value
  return lang.of.math.includes(name.toLowerCase())
})

registerCheck("snap:reportTextFunction", (info, children, lang) => {
  // Operators if text function
  const first = children[0]
  if (!first.isInput) {
    return
  }
  const last = children[children.length - 1]
  if ((last.isInput && last.hasArrow) || last.isRing) {
    return
  }
  const name = first.value
  return lang.of.text.includes(name.toLowerCase())
})

registerCheck("snap:reportListAttribute", (info, children, lang) => {
  // Operators if text function
  const first = children[0]
  if (!first.isInput) {
    return
  }
  const last = children[children.length - 1]
  if ((last.isInput && last.hasArrow) || last.isRing) {
    return
  }
  const name = first.value
  return lang.of.list.includes(name.toLowerCase())
})

registerCheck("SENSING_OF", (info, children, lang) => {
  // sensing if not math, text, or list function
  const first = children[0]
  if (!first.isInput) {
    return true
  }
  const last = children[children.length - 1]
  if ((last.isInput && last.hasArrow) || last.isRing) {
    return true
  }
  const name = first.value
  return (
    !lang.of.math.includes(name.toLowerCase()) &&
    !lang.of.text.includes(name.toLowerCase())
  )
})

// I could not figure out how to get it to detect list of with specDefs, or aliases.
// Maybe if I fix the translate function to work with specDefs,
// then maybe I could do away with this, but for now, this is it.
// (seriously, why does snap have 4 block with the same spec?)
specialCase("SENSING_OF", (_, children, lang) => {
  const first = children[0]
  if (!first.isInput) {
    return
  }
  const name = first.value
  if (lang.of.list.includes(name.toLowerCase())) {
    return { ...blocksById["snap:reportListAttribute"] }
  }
})

disambig("SOUND_CHANGEEFFECTBY", "LOOKS_CHANGEEFFECTBY", (children, lang) => {
  // Sound if sound effect, otherwise default to graphic effect
  for (const child of children) {
    if (child.shape === "dropdown") {
      const name = child.value
      for (const effect of lang.soundEffects) {
        if (minifyHash(effect) === minifyHash(name)) {
          return true
        }
      }
    }
  }
  return false
})

disambig("SOUND_SETEFFECTO", "LOOKS_SETEFFECTTO", (children, lang) => {
  // Sound if sound effect, otherwise default to graphic effect
  for (const child of children) {
    if (child.shape === "dropdown") {
      const name = child.value
      for (const effect of lang.soundEffects) {
        if (minifyHash(effect) === minifyHash(name)) {
          return true
        }
      }
    }
  }
  return false
})

specialCase("OPERATORS_LENGTH", (_, children, lang) => {
  const last = children[children.length - 1]
  if ((last.isInput && last.shape === "dropdown") || last.isIcon) {
    return { ...blocksById.DATA_LENGTHOFLIST }
  }
  return
})

disambig(
  "makeymakey.whenKeyPressed",
  "EVENT_WHENKEYPRESSED",
  (children, _lang) => {
    // makey makey block if number-dropdown, otherwise events
    const first = children[1]
    if (!first.isInput) {
      return
    }
    return first.shape === "number-dropdown"
  },
)

// spec defs break disambig
specialCase("OPERATORS_CONTAINS", (_, children, lang) => {
  const first = children[0]
  if (first.isInput && first.shape === "dropdown") {
    return { ...blocksById.DATA_LISTCONTAINSITEM }
  }
  return
})

disambig("pen.setColor", "pen.setHue", (children, _lang) => {
  // Color block if color input, otherwise numeric
  const last = children[children.length - 1]
  // If variable, assume color input, since the RGBA hack is common.
  // TODO fix Scratch :P
  return (last.isInput && last.isColor) || last.isBlock
})

registerCheck("microbit.whenGesture", (info, children, lang) => {
  let first = children.find(child => !child.isLabel)

  if (!first.shape.includes("dropdown")) {
    return false
  }

  const name = first.value
  return lang.microbitWhen.includes(name) && !lang.picoWhen.includes(name)
})

registerCheck("sb2:whenSensorConnected", (info, children, lang) => {
  let first = children.find(child => !child.isLabel)

  if (!first.shape.includes("dropdown")) {
    return false
  }

  const name = first.value
  return !lang.microbitWhen.includes(name) && lang.picoWhen.includes(name)
})

registerCheck("gdxfor.whenGesture", (info, children, lang) => {
  let first = children.find(child => !child.isLabel)

  if (!first.shape.includes("dropdown")) {
    return false
  }

  const name = first.value
  return !lang.microbitWhen.includes(name) && !lang.picoWhen.includes(name)
})

// This is more important that scratch extensions
registerCheck("snap:receiveCondition", (info, children, lang) => {
  for (const child of children) {
    if (child.isInput && child.shape.includes("dropdown")) {
      return false
    }
  }
  return true
})

// This block does not need disambiguation in English;
// however, many other languages do require that.
disambig("ev3.buttonPressed", "microbit.isButtonPressed", (children, _lang) => {
  for (const child of children) {
    // EV3 "button pressed" block uses numeric identifier
    // and does not support "any".
    switch (minifyHash(child.value)) {
      case "1":
      case "2":
      case "3":
      case "4":
        return true
      default:
    }
  }
  return false
})

disambig("snap:reportIfElse", "CONTROL_ELSE", (children, _lang) => {
  let first = children[3]
  if (first.isCShape) {
    return false
  }

  let last = children[5]
  if (last.isCShape) {
    return false
  }

  return true
})

disambig("snap:doSetGlobalFlag", "DATA_SETVARIABLETO", (children, _lang) => {
  let last = children[children.length - 1]
  let first = children.find(child => !child.isLabel)
  if (last.isInput && last.isBoolean) {
    return true
  }

  if (first.isInput && _lang.setFlag.includes(first.value)) {
    return true
  }

  return false
})

specialCase("CONTROL_FOR_EACH", (_, children, _lang) => {
  let isSnap = true

  let inputNum = 0
  for (const child of children) {
    if (!child.isLabel) {
      switch (inputNum) {
        case 0:
          if (child.isInput) {
            isSnap = false
          }
          break

        case 1:
          if (child.isIcon) {
            isSnap = true
          }
          break

        default:
          break
      }

      inputNum += 1
    }
  }

  if (isSnap) {
    return { ...blocksById["snap:doForEach"], shape: "stack" }
  }
})

specialCase("CONTROL_STOP", (_, children, lang) => {
  // Cap block unless argument is "other scripts in sprite"
  const last = children[children.length - 1]
  if (!last.isInput) {
    return
  }
  const value = last.value
  if (lang.osis.includes(value)) {
    return { ...blocksById.CONTROL_STOP, shape: "stack" }
  }
})

// convert * to × for the snap variadic version
specialCase("OPERATORS_MULTIPLY", (_, children, lang) => {
  let operators = children.filter(
    child => child.isLabel && ["*", "x"].includes(child.value.toLowerCase()),
  )
  let last = children[children.length - 1]

  if (last.isIcon) {
    for (let operator of operators) {
      operator.value = "×"
    }
  }
})

// convert / to ÷
specialCase("snap:reportAtan2", (_, children, lang) => {
  let operators = children.filter(child => child.value === "/")
  for (let operator of operators) {
    operator.value = "÷"
  }
})

// convert <= to ≤
specialCase("snap:reportVariadicLessThanOrEquals", (_, children, lang) => {
  let operators = children.filter(child => child.value === "<=")
  for (let operator of operators) {
    operator.value = "≤"
  }
})

// convert != to ≠
specialCase("snap:reportVariadicNotEquals", (_, children, lang) => {
  let operators = children.filter(child => child.value === "!=")
  for (let operator of operators) {
    operator.value = "≠"
  }
})

// convert >= to ≥
specialCase("snap:reportVariadicGreaterThanOrEquals", (_, children, lang) => {
  let operators = children.filter(child => child.value === ">=")
  for (let operator of operators) {
    operator.value = "≥"
  }
})

/**
 * Fill spec def
 *
 * @export
 * @param {string} part
 * @param {Object} defs
 * @returns {string}
 */
export function fillSpecDef(part, defs) {
  if (/^{[^ {}\\]+}$/gm.test(part)) {
    let defName = part.slice(1, part.length - 1)
    if (defs[defName]) {
      let parts = []
      for (const replacement of defs[defName]) {
        let replacementHash = hashSpec(replacement)
        let replacementParts = replacementHash.split(" ")
        let filledParts = fillSpecDef(replacementParts[0], defs)
        for (const part of filledParts) {
          parts.push([part, ...replacementParts.slice(1)].join(" "))
        }
      }
      return parts
    }
  }
  return [part]
}

/**
 * Find block with abstract spec
 *
 * @export
 * @param {string[]} partialHashParts
 * @param {string} fullHash
 * @param {Object[]} commands
 * @param {boolean} [onlyCheckInputs=false] - Unused
 * @returns {{ commands: {}; full: boolean; }}
 */
export function findAbstractBlocks(
  partialHashParts,
  fullHash,
  commands,
  onlyCheckInputs = false,
) {
  let partialCommands = []
  let fullCommands = []

  // partials
  // console.log('full spec', fullHash)
  for (let command of commands) {
    // console.log('abstract: command', command)
    // console.log('abstract: partialHashParts', partialHashParts)
    let originalSpec = hashSpec(command.spec)
    let splitSpec = originalSpec.split(" ")
    let specs = []
    if (command.specDefs) {
      let filledParts = fillSpecDef(
        splitSpec[partialHashParts.length - 1],
        command.specDefs,
      )
      // console.log('')
      // console.log('abstract: filled spec parts', filledParts)
      for (const filled of filledParts) {
        // console.log('abstract: partialHashParts length', partialHashParts.length)
        // console.log('abstract: old spec', splitSpec)
        // console.log('abstract: before current', splitSpec.slice(0, partialHashParts.length - 1))
        // console.log('abstract: after current', splitSpec.slice(partialHashParts.length, splitSpec.length + 1))
        splitSpec = [
          ...splitSpec.slice(0, partialHashParts.length - 1),
          filled,
          ...splitSpec.slice(partialHashParts.length, splitSpec.length + 1),
        ]
        let newSpec = splitSpec.join(" ")
        // console.log('abstract: new spec', newSpec)
        specs.push(newSpec)
      }
    } else {
      specs.push(originalSpec)
    }
    for (let spec of specs) {
      // console.log('abstract: spec starts with spec', spec)
      // console.log('abstract: spec starts with', spec.startsWith(partialHashParts.join(' ')))

      // take into account blank spec defs
      if (
        spec
          .split(" ")
          .filter(part => part !== "")
          .join(" ")
          .startsWith(partialHashParts.join(" "))
      ) {
        partialCommands.push({
          ...command,
          spec: spec,
          parts: spec.split(" "),
        })
      }
    }
  }

  // full
  for (const command of partialCommands) {
    // take into account blank spec defs
    let spec = command.spec
      .split(" ")
      .filter(part => part !== "")
      .join(" ")
    if (spec === fullHash) {
      fullCommands.push(command)
    }
  }

  if (fullCommands.length > 0) {
    return {
      commands: fullCommands,
      full: true,
    }
  }

  return {
    commands: partialCommands,
    full: false,
  }
}

/**
 * Find block info with hash
 *
 * @export
 * @param {string} hash
 * @param {Object} info
 * @param {[]} children
 * @param {Object[]} languages
 * @returns {{ type: Object; lang: Object }}
 */
export function lookupHash(hash, info, children, languages) {
  // console.log("info", structuredClone(info))
  // console.log("lookupHash hash", hash)

  let allCommands = []

  for (const lang of languages) {
    allCommands = structuredClone(lang.fullBlocks)
    // console.log('lang', lang)
    // console.log('lang: blocks', allCommands)
    // console.log('lang: blocksById', blocksById)
    let full = false

    let splitHash = hash.split(" ")
    for (let partIndex = 0; partIndex < splitHash.length; partIndex++) {
      const part = splitHash[partIndex]
      // console.log('abstract: part number', partIndex)
      let newCommands = findAbstractBlocks(
        splitHash.slice(0, partIndex + 1),
        hash,
        allCommands,
      )
      allCommands = newCommands.commands
      full = newCommands.full
      // console.log("new commands", allCommands)

      if (full || allCommands.length === 0) {
        break
      }
    }

    // console.log('allCommands', allCommands)
    if (full && allCommands.length > 0) {
      for (let block of allCommands) {
        let blockById = blocksById[block.id]
        // console.log('blocksById', lang.blocksById[block.id])
        if (
          info.shape === "reporter" &&
          block.shape !== "reporter" &&
          block.shape !== "ring"
        ) {
          continue
        }
        if (info.shape === "boolean" && block.shape !== "boolean") {
          continue
        }
        if (allCommands.length > 1) {
          // Only check in case of collision;
          // perform "disambiguation"
          // console.log("block", allCommands)
          if (blockById.accepts && !blockById.accepts(info, children, lang)) {
            continue
          }
        }

        block.category = blockById.category
        block.selector = blockById.selector
        block.snap = blockById.snap
        block.spec = block.spec.replace(/((?<=^| )_(?= |$))/gm, "%s")
        block.shape = blockById.shape

        if (blockById.specialCase) {
          block = blockById.specialCase(info, children, lang) || block
        }
        let specInfo = parseSpec(block.spec)
        block.inputs = specInfo.inputs
        block.parts = specInfo.parts
        return { type: block, lang: lang }
      }
    }
  }

  return // I don't know if I want to use the old method as a fallback
  for (const lang of languages) {
    if (Object.prototype.hasOwnProperty.call(lang.blocksByHash, hash)) {
      const collisions = lang.blocksByHash[hash]
      for (let block of collisions) {
        if (
          info.shape === "reporter" &&
          block.shape !== "reporter" &&
          block.shape !== "ring"
        ) {
          continue
        }
        if (info.shape === "boolean" && block.shape !== "boolean") {
          continue
        }
        if (collisions.length > 1) {
          // Only check in case of collision;
          // perform "disambiguation"
          if (block.accepts && !block.accepts(info, children, lang)) {
            continue
          }
        }
        if (block.specialCase) {
          block = block.specialCase(info, children, lang) || block
        }
        return { type: block, lang: lang }
      }
    }
  }
}

/**
 * Get dropdown
 *
 * @export
 * @param {string} name
 * @param {Language[]} languages
 * @returns {string}
 */
export function lookupDropdown(name, languages) {
  for (const lang of languages) {
    if (Object.prototype.hasOwnProperty.call(lang.nativeDropdowns, name)) {
      return lang.nativeDropdowns[name]
    }
  }
}

/**
 * Apply overrides to block info
 *
 * @export
 * @param {Object} info
 * @param {string[]} overrides
 */
export function applyOverrides(info, overrides) {
  if (!Array.isArray(overrides)) {
    return
  }
  for (const name of overrides) {
    if (hexColorPat.test(name) || rgbColorPat.test(name)) {
      info.color = Color.fromString(name)
      info.category = ""
      info.categoryIsDefault = false
    } else if (overrideCategories.includes(name)) {
      info.category = name
      info.categoryIsDefault = false
    } else if (
      aliasCategories[name] &&
      overrideCategories.includes(aliasCategories[name])
    ) {
      info.category = aliasCategories[name]
      info.categoryIsDefault = false
    } else if (overrideShapes.includes(name)) {
      info.shape = name
    } else if (aliasShapes[name]) {
      info.shape = aliasShapes[name]
    } else if (name === "loop") {
      info.hasLoopArrow = true
    } else if (name === "+" || name === "-") {
      info.diff = name
    } else if (name === "local") {
      info.local = true
    } else if (["condition", "rule"].includes(name)) {
      info.isConditionHat = true
      info.shape = "hat"
    } else if (name === "hide") {
      info.hide = true
    } else if (name.startsWith("santa-")) {
      let hat = name.replace("santa-", "").toLowerCase()
      if (aliasSantaHats.hasOwnProperty(hat)) {
        info.santaHat = aliasSantaHats[hat]
        info.shape = "santa"
      } else if (santaHats.includes(hat)) {
        info.santaHat = hat
        info.shape = "santa"
      }
    }
  }
}

/**
 * Block name
 *
 * @export
 * @param {import("./model.js").Block} block
 * @returns {string | null}
 */
export function blockName(block) {
  const words = []
  for (const child of block.children) {
    if (!child.isLabel) {
      return
    }
    words.push(child.value)
  }
  return words.join(" ")
}
