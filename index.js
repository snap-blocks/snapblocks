/*
 * snapblocks
 * http://snap-blocks.github.io/
 *
 * Copyright 2013-2021, Tim Radvan
 * Copyright 2024, ego-lay-atman-bay
 * snapblocks is a fork of scratchblocks by Tim Radvan
 * @license MIT
 * http://opensource.org/licenses/MIT
 */

/**
 * Snapblocks options
 * @typedef {Object} Options
 * @property {Object} options - Snapblocks options
 * @property {("snap" | "snap-flat" | "scratch2" | "scratch3" | "scratch3-high-contrast")} [style=snap] - Block style
 * @property {boolean} [inline=false] - Render inline
 * @property {string[]} [languages=["en"]] - Languages
 * @property {number} [scale=1] - Display scale
 * @property {boolean} [zebraColoring=false] - Zebra coloring
 * @property {boolean} [wrap=false] - Wrap blocks
 * @property {(number|null)} [wrapSize=null] - Minimum block wrap width
 * @property {(number|null)} [commentWidth=null] - Maximum comment width. Set this to -1 to not wrap.
 * @property {boolean} [showSpaces=false] - Show spaces
 * @property {boolean} [santa=false] - Use Santa Hats
 * @property {(boolean | string["blockstyle" | "inline" | "scale" | "wrap" | "wrapsize" | "commentWidth" | "zebracoloring" | "zebra" | "showspaces" | "santa"])} [elementOptions=false] - Allow elements to specify options. If this is a list, the list contains the allowed options.
 */

import {
  parse,
  allLanguages,
  loadLanguages,
  Label,
  Icon,
  Input,
  Block,
  Comment,
  Script,
  Document,
} from "./syntax/index.js"
import * as scratch2 from "./scratch2/index.js"
import * as scratch3 from "./scratch3/index.js"
import * as snap from "./snap/index.js"

/**
 * Validate value
 *
 * @param {*} value
 * @returns {*}
 */
function validate(value) {
  if (typeof value != "string") {
    return value
  }

  if (["true", "false"].includes(value.toLowerCase())) {
    return value.toLowerCase() === "true"
  } else if (!isNaN(value)) {
    return parseFloat(value)
  }
  return value
}

export default function (window) {
  const version = "1.8.0"

  const document = window.document

  snap.init(window)
  scratch2.init(window)
  scratch3.init(window)

  /** Add the css styles to the page head. */
  function appendStyles() {
    document.head.appendChild(snap.makeStyle())
    document.head.appendChild(scratch2.makeStyle())
    document.head.appendChild(scratch3.makeStyle())
  }

  /**
   * Create a view for the style in the options.
   *
   * @param {Document} doc
   * @param {Options} options - Snapblocks options
   * @returns {(snap.Document | scratch2.Document | scratch3.Document)}
   */
  function newView(doc, options) {
    options = {
      style: "snap",
      ...options,
    }

    options.scale = options.scale || 1

    if (typeof options.style != "string") {
      options.style = "snap"
    }

    if (/^snap($|-)/.test(options.style)) {
      return snap.newView(doc, options)
    } else if (options.style === "scratch2") {
      return scratch2.newView(doc, options)
    } else if (/^scratch3($|-)/.test(options.style)) {
      return scratch3.newView(doc, options)
    } else {
      console.error(`unknown style: ${options.style}`)
      return snap.newView(doc, options) // I don't want it to throw an error
    }
  }

  /**
   * Render the parsed document
   *
   * @param {Document} doc
   * @param {Options} options - Snapblocks options
   * @returns {HTMLOrSVGElement}
   */
  function render(doc, options) {
    if (typeof options === "function") {
      throw new Error("render() no longer takes a callback")
    }
    const view = newView(doc, options)
    const svg = view.render()
    // Used in high contrast theme
    svg.classList.add(
      `snapblocks-style-${options.style != undefined ? options.style : "snap"}`,
    )
    return svg
  }

  /*****************************************************************************/

  /*** Render ***/

  // read code from a DOM element
  /**
   * Get the text snapblocks code from element
   *
   * @param {HTMLElement} el - HTML element to get text from.
   * @param {Options} options - Snapblocks options
   * @returns {string}
   */
  function readCode(el, options) {
    options = {
      inline: false,
      ...options,
    }

    const html = el.innerHTML.replace(/<br>\s?|\n|\r\n|\r/gi, "\n")
    const pre = document.createElement("pre")
    pre.innerHTML = html
    let code = pre.textContent
    return code
  }

  /**
   * insert `svg` into `el`, with appropriate wrapper elements
   *
   * @param {HTMLElement} el - Element to wrap
   * @param {HTMLOrSVGElement} svg - Svg element to replace element with
   * @param {Document} doc - Parsed document
   * @param {Options} options - Snapblocks options
   */
  function replace(el, svg, doc, options) {
    let container
    if (options.inline) {
      container = document.createElement("span")
      let cls = "snapblocks snapblocks-inline"
      if (doc.scripts[0] && !doc.scripts[0].isEmpty) {
        cls += ` snapblocks-inline-${doc.scripts[0].blocks[0].shape}`
      }
      container.className = cls
      container.style.display = "inline-block"
      container.style.verticalAlign = "middle"
    } else {
      container = document.createElement("div")
      container.className = "snapblocks"
    }
    container.appendChild(svg)

    el.innerHTML = ""
    el.appendChild(container)
  }

  /**
   * Render all matching elements in page to shiny snap blocks.
   * Accepts a CSS selector as an argument.
   *
   * Like the old `scratchblocks2.parse()`.
   *
   * @example
   * snapblocks.renderMatching("pre.blocks");
   *
   * @param {string} selector - Element selector
   * @param {Options} options - Snapblocks options
   */
  const renderMatching = function (selector, options) {
    selector = selector || "pre.blocks"
    options = {
      // Default values for the options
      style: "snap",
      inline: false,
      languages: ["en"],
      scale: 1,
      zebraColoring: false,
      wrap: false,
      wrapSize: null,
      commentWidth: null,
      showSpaces: false,
      santa: false,
      elementOptions: false, // set options on the element

      read: readCode, // function(el, options) => code
      parse: parse, // function(code, options) => doc
      render: render, // function(doc) => svg
      replace: replace, // function(el, svg, doc, options)

      ...options,
    }

    // find elements
    const results = [].slice.apply(document.querySelectorAll(selector))
    results.forEach(el => {
      try {
        this.renderElement(el, options)
      } catch (error) {
        console.error(error)
      }
    })
  }

  /**
   * Render element.
   *
   * @param {string} element - Element to render
   * @param {Options} options - Snapblocks options
   */
  const renderElement = function (element, options) {
    options = {
      // Default values for the options
      style: "snap",
      inline: false,
      languages: ["en"],
      scale: 1,
      zebraColoring: false,
      wrap: false,
      wrapSize: null,
      commentWidth: null,
      showSpaces: false,
      santa: false,
      elementOptions: false, // set options on the element

      read: readCode, // function(el, options) => code
      parse: parse, // function(code, options) => doc
      render: render, // function(doc) => svg
      replace: replace, // function(el, svg, doc, options)

      ...options,
    }

    let localOptions = { ...options }
    let overrideOptions = {}
    let acceptedOptions = [
      "blockstyle",
      "inline",
      "scale",
      "wrap",
      "wrapsize",
      "zebracoloring",
      "zebra",
      "showspaces",
      "commentwidth",
      "santa",
    ]
    if (Array.isArray(options.elementOptions)) {
      acceptedOptions = []
      for (const option of options.elementOptions) {
        acceptedOptions.push(option.toLowerCase())
      }
    }
    if (options.elementOptions) {
      overrideOptions = {
        style: acceptedOptions.includes("blockstyle")
          ? element.getAttribute("blockStyle")
          : null,
        inline: acceptedOptions.includes("inline")
          ? element.getAttribute("inline")
          : null,
        scale: acceptedOptions.includes("scale")
          ? element.getAttribute("scale")
          : null,
        wrap: acceptedOptions.includes("wrap")
          ? element.getAttribute("wrap")
          : null,
        wrapSize: acceptedOptions.includes("wrapsize")
          ? element.getAttribute("wrapSize")
          : null,
        commentWidth: acceptedOptions.includes("commentwidth")
          ? element.getAttribute("commentwidth")
          : null,
        zebraColoring: acceptedOptions.includes("zebracoloring")
          ? element.getAttribute("zebraColoring")
          : null,
        zebra: acceptedOptions.includes("zebra")
          ? element.getAttribute("zebra")
          : null,
        showSpaces: acceptedOptions.includes("showspaces")
          ? element.getAttribute("showSpaces")
          : null,
        santa: acceptedOptions.includes("santa")
          ? element.getAttribute("santa")
          : null,
      }
    }
    for (let [option, value] of Object.entries(overrideOptions)) {
      value = validate(value)
      if (value != null) {
        localOptions[option] = value
      }
    }

    const code = options.read(element, localOptions)
    try {
      const doc = options.parse(code, localOptions)
      const svg = options.render(doc, localOptions)
      options.replace(element, svg, doc, localOptions)
    } catch (error) {
      console.group("error rendering snapblocks")
      console.error(error)
      console.groupCollapsed("code")
      console.info(code)
      console.groupEnd()
      console.groupEnd()
    }
  }

  return {
    version: version,

    allLanguages: allLanguages, // read-only
    loadLanguages: loadLanguages,

    stringify: function (doc) {
      return doc.stringify()
    },

    Label,
    Icon,
    Input,
    Block,
    Comment,
    Script,
    Document,

    newView: newView,
    read: readCode,
    parse: parse,
    replace: replace,
    render: render,
    renderMatching: renderMatching,
    renderElement: renderElement,

    appendStyles: appendStyles,

    styles: {
      snap: snap,
      scratch2: scratch2,
      scratch3: scratch3,
    },
  }
}
