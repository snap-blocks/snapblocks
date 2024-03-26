/*
 * snapblocks
 * http://snap-blocks.github.io/
 *
 * Copyright 2024, ego-lay-atman-bay
 * snapblocks is a fork of scratchblocks by Tim Radvan
 * @license MIT
 * http://opensource.org/licenses/MIT
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

export default function (window) {
  const version = "1.3.0"

  const document = window.document

  snap.init(window)
  scratch2.init(window)
  scratch3.init(window)

  function appendStyles() {
    document.head.appendChild(snap.makeStyle())
    document.head.appendChild(scratch2.makeStyle())
    document.head.appendChild(scratch3.makeStyle())
  }

  function newView(doc, options) {
    options = {
      style: "snap",
      ...options,
    }

    options.scale = options.scale || 1

    if (/^snap($|-)/.test(options.style)) {
      return snap.newView(doc, options)
    } else if (options.style === "scratch2") {
      return scratch2.newView(doc, options)
    } else if (/^scratch3($|-)/.test(options.style)) {
      return scratch3.newView(doc, options)
    }

    throw new Error(`Unknown style: ${options.style}`)
  }

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

  // insert 'svg' into 'el', with appropriate wrapper elements
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

  /* Render all matching elements in page to shiny snap blocks.
   * Accepts a CSS selector as an argument.
   *
   *  snapblocks.renderMatching("pre.blocks");
   *
   * Like the old 'scratchblocks2.parse().
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
      showSpaces: false,
      elementOptions: false, // set options on the element

      read: readCode, // function(el, options) => code
      parse: parse, // function(code, options) => doc
      render: render, // function(doc) => svg
      replace: replace, // function(el, svg, doc, options)

      ...options,
    }

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

    // find elements
    const results = [].slice.apply(document.querySelectorAll(selector))
    results.forEach(el => {
      let localOptions = { ...options }
      if (options.elementOptions) {
        let overrideOptions = {
          style: el.getAttribute("blockStyle"),
          inline: el.getAttribute("inline"),
          scale: el.getAttribute("scale"),
          wrap: el.getAttribute("wrap"),
          wrapSize: el.getAttribute("wrapSize"),
          zebraColoring:
            el.getAttribute("zebraColoring") || el.getAttribute("zebra"),
          showSpaces: el.getAttribute("showSpaces"),
        }

        for (let [option, value] of Object.entries(overrideOptions)) {
          value = validate(value)
          if (value != null) {
            localOptions[option] = value
          }
        }
      }
      const code = options.read(el, localOptions)

      const doc = options.parse(code, localOptions)

      const svg = options.render(doc, localOptions)

      options.replace(el, svg, doc, localOptions)
    })
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

    appendStyles: appendStyles,
  }
}
