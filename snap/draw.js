/* for constructing SVGs */

function assert(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

// set by SVG.init
let document
let xml

const directProps = {
  textContent: true,
}

export default class SVG {
  static init(window) {
    document = window.document
    const DOMParser = window.DOMParser
    xml = new DOMParser().parseFromString("<xml></xml>", "application/xml")
    SVG.XMLSerializer = window.XMLSerializer
  }

  static makeCanvas() {
    return document.createElement("canvas")
  }

  static cdata(content) {
    return xml.createCDATASection(content)
  }

  static el(name, props) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name)
    return SVG.setProps(el, props)
  }

  static setProps(el, props) {
    for (const key in props) {
      const value = String(props[key])
      if (directProps[key]) {
        el[key] = value
      } else if (
        props[key] != null &&
        Object.prototype.hasOwnProperty.call(props, key)
      ) {
        el.setAttributeNS(null, key, value)
      }
    }
    return el
  }

  static withChildren(el, children) {
    for (const child of children) {
      el.appendChild(child)
    }
    return el
  }

  static group(children) {
    return SVG.withChildren(SVG.el("g"), children)
  }

  static newSVG(width, height, scale) {
    return SVG.el("svg", {
      width: width * scale,
      height: height * scale,
      viewBox: `0 0 ${width} ${height}`,
    })
  }

  static polygon(props) {
    return SVG.el("polygon", { ...props, points: props.points.join(" ") })
  }

  static path(props) {
    return SVG.el("path", { ...props, path: null, d: props.path.join(" ") })
  }

  static text(x, y, content, props) {
    const text = SVG.el("text", { ...props, x: x, y: y, textContent: content })
    return text
  }

  static symbol(href) {
    return SVG.el("use", {
      href: href,
    })
  }

  static move(dx, dy, el) {
    let currentValue = el.getAttributeNS(null, "transform")
    if (!currentValue) {
      SVG.setProps(el, {
        transform: `translate(${dx} ${dy})`,
      })
    } else {
      SVG.setProps(el, {
        transform: `translate(${dx} ${dy}) ${currentValue}`,
      })
    }
    return el
  }

  // translatePath takes a path string such as "M 0 0 L 0 10 L 10 0 Z", fins
  // the individual X/Y components, and translates them by dx/dy, so as to
  // "move" the path.
  //
  // This is not a particularly good way of doing this, but given we control
  // the inputs to it it works well enough I guess?
  static translatePath(dx, dy, path) {
    let isX = true
    const parts = path.split(/\s+/)
    const out = []
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i]
      if (part === "A") {
        const j = i + 5
        out.push("A")
        while (i < j) {
          out.push(parts[++i])
        }
        continue
      } else if (/[A-Za-z]/.test(part)) {
        // This assertion means the path was not a valid sequence of
        // [operation, X coordinate, Y coordinate, ...].
        //
        // It could indicate missing whitespace between the coordinates and the
        // operation.
        assert(isX, `translatePath: invalid argument: ${part}`)
      } else {
        part = +part
        part += isX ? dx : dy
        isX = !isX
      }
      out.push(part)
    }
    return out.join(" ")
  }

  /* shapes */

  static rect(w, h, props) {
    return SVG.el("rect", { ...props, x: 0, y: 0, width: w, height: h })
  }

  static ellipse(w, h, props) {
    return SVG.el("ellipse", {
      ...props,
      cx: w / 2,
      cy: h / 2,
      rx: w / 2,
      ry: h / 2,
    })
  }

  static arc(p1x, p1y, p2x, p2y, rx, ry) {
    return `L ${p1x} ${p1y} A ${rx} ${ry} 0 0 1 ${p2x} ${p2y}`
  }

  static canvasArc(
    x,
    y,
    radius,
    startAngle,
    endAngle,
    counterClockwise,
    startCommand = "M",
  ) {
    // taken from https://github.com/gliffy/canvas2svg/blob/master/canvas2svg.js#L1008

    // in canvas no circle is drawn if no angle is provided.
    if (startAngle === endAngle) {
      return ""
    }
    startAngle = startAngle % (2 * Math.PI)
    endAngle = endAngle % (2 * Math.PI)
    if (startAngle === endAngle) {
      //circle time! subtract some of the angle so svg is happy (svg elliptical arc can't draw a full circle)
      endAngle =
        (endAngle + 2 * Math.PI - 0.001 * (counterClockwise ? -1 : 1)) %
        (2 * Math.PI)
    }
    var endX = x + radius * Math.cos(endAngle),
      endY = y + radius * Math.sin(endAngle),
      startX = x + radius * Math.cos(startAngle),
      startY = y + radius * Math.sin(startAngle),
      sweepFlag = counterClockwise ? 0 : 1,
      largeArcFlag = 0,
      diff = endAngle - startAngle

    if (diff < 0) {
      diff += 2 * Math.PI
    }

    if (counterClockwise) {
      largeArcFlag = diff > Math.PI ? 0 : 1
    } else {
      largeArcFlag = diff > Math.PI ? 1 : 0
    }

    let command = `${startCommand} ${startX} ${startY}`
    command += ` A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`

    return command
  }

  static radians(degrees) {
    return (degrees * Math.PI) / 180
  }

  static arcw(p1x, p1y, p2x, p2y, rx, ry) {
    return `L ${p1x} ${p1y} A ${rx} ${ry} 0 0 0 ${p2x} ${p2y}`
  }

  static roundedPath(w, h) {
    return [SVG.getRoundedTop(w, h), SVG.getRoundedBottom(w, h)]
  }

  static roundedRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getRoundedTop(w, h), SVG.getRoundedBottom(w, h)],
    })
  }

  static getRoundedTop(w, h, rounding = 9) {
    // I'm too lazy to figure out how to recreate the snap reporter,
    // so here's almost the same code snap uses to draw it.
    // It's not exactly the same, as snap uses canvas apis, and we use svg.
    var edge = 1,
      r = Math.max(Math.min(rounding, h / 2), edge),
      path = ""

    // top left
    path += this.canvasArc(
      r,
      r,
      r,
      this.radians(180),
      this.radians(270),
      false,
      "M",
    )

    // top line
    path += ` L ${w - r} 0 `

    // top right
    path += this.canvasArc(
      w - r,
      r,
      r,
      this.radians(-90),
      this.radians(0),
      false,
      "L",
    )

    return path
  }

  static getRoundedBottom(w, h, rounding = 9) {
    var edge = 1,
      r = Math.max(Math.min(rounding, h / 2), edge),
      path = ""

    path += this.canvasArc(
      w - r,
      h - r,
      r,
      this.radians(0),
      this.radians(90),
      false,
      "L",
    )

    // bottom line
    path += ` L ${w - r} ${h} `

    // bottom left
    path += this.canvasArc(
      r,
      h - r,
      r,
      this.radians(90),
      this.radians(180),
      false,
      "L",
    )

    return path
  }

  static pointedPath(w, h) {
    return [SVG.getPointedTop(w, h), SVG.getPointedBottom(w, h, true)]
  }

  static pointedInput(w, h) {
    return [
      SVG.getPointedTop(w, h, h / 2),
      SVG.getPointedBottom(w, h, true, h / 2),
    ]
  }

  static getPointedTop(w, h, r = 8) {
    var h2 = Math.floor(h / 2),
      path = ""

    path = `M ${r} ${h} L 0 ${h2}
            L ${r} 0 L ${w - r} 0`
    return path
  }

  static getPointedBottom(w, h, showRight, r = 8) {
    var h2 = Math.floor(h / 2),
      path = ""
    if (showRight) {
      path += `L ${w} ${h2} `
    }
    path += `L ${w - r} ${h} Z`
    return path
  }

  static pointedRect(w, h, props) {
    return SVG.path({
      ...props,
      path: SVG.pointedPath(w, h),
    })
  }

  static pointedRectInput(w, h, props) {
    return SVG.path({
      ...props,
      path: SVG.pointedInput(w, h),
    })
  }

  static getRingTop(w, h) {
    return this.getRoundedTop(w, h, 4.5)
  }

  static getRingBottom(w, h) {
    return this.getRoundedBottom(w, h, 4.5)
  }

  static getRingPath(w, h) {
    return this.roundedRect(w, h)
  }

  static getTop(w) {
    var corner = 3,
      dent = 8,
      indent = corner * 2 + 6,
      path = ""

    path += this.canvasArc(
      corner,
      corner,
      corner,
      this.radians(-180),
      this.radians(-90),
      false,
    )

    path += ` L ${corner + 6} 0 `
    path += `L ${indent} ${corner} `
    path += `L ${indent + dent} ${corner} `
    path += `L ${corner * 3 + 6 + dent} 0 `
    path += `L ${w - corner} 0 `

    path += this.canvasArc(
      w - corner,
      corner,
      corner,
      this.radians(-90),
      this.radians(-0),
      false,
      "L",
    )

    return path
  }

  static getRightAndBottom(w, y, hasNotch, inset) {
    if (typeof inset === "undefined") {
      inset = 0
    }
    var corner = 3,
      dent = 8,
      indent = corner * 2 + 6 + inset,
      radius = corner,
      path = ""

    path += this.canvasArc(
      w - corner,
      y - corner,
      radius,
      this.radians(0),
      this.radians(90),
      false,
      "L",
    )

    if (hasNotch) {
      path += ` L ${corner * 3 + 6 + inset + dent} ${y} `
      path += `L ${indent + dent} ${y + corner} `
      path += `L ${indent} ${y + corner} `
      path += `L ${corner + 6 + inset} ${y}`
    }

    if (inset > 0) {
      path += this.canvasArc(
        corner + inset,
        y + corner,
        radius,
        this.radians(-90),
        this.radians(180),
        true,
        " L",
      )
    } else {
      path += this.canvasArc(
        corner + inset,
        y - corner,
        radius,
        this.radians(90),
        this.radians(180),
        false,
        " L",
      )
    }

    return path
  }

  static getCommandSlotTop(w, isFilled = false) {
    var corner = 3,
      ins = isFilled ? 6 : 3,
      dent = isFilled ? 8 : 4,
      indent = corner * 2 + ins,
      edge = isFilled ? 0 : 1,
      rf = 0,
      path = ""

    path += SVG.canvasArc(
      corner + edge,
      corner + edge,
      corner,
      SVG.radians(-180),
      SVG.radians(-90),
      false,
      "M",
    )

    path += ` L ${corner + ins + edge + rf * 2} ${edge}`
    path += ` L ${indent + edge + rf * 2} ${corner + edge}`
    path += ` L ${indent + edge + rf * 2 + (dent - rf * 2)} ${corner + edge}`
    path += ` L ${indent + edge + rf * 2 + (dent - rf * 2) + corner} ${edge}`
    path += ` L ${w - corner - edge} ${edge}`

    return path
  }

  static getCommandSlotRightAndBottom(w, h, isFilled = false) {
    var corner = 3,
      edge = (edge = isFilled ? 0 : 1),
      y = h - corner - edge,
      path = ""

    path += SVG.canvasArc(
      w - corner - edge,
      corner + edge,
      corner,
      SVG.radians(-90),
      SVG.radians(-0),
      false,
      "L",
    )

    path += SVG.canvasArc(
      w - corner - edge,
      y,
      corner,
      SVG.radians(0),
      SVG.radians(90),
      false,
      " L",
    )

    path += SVG.canvasArc(
      corner + edge,
      y,
      corner,
      SVG.radians(90),
      SVG.radians(180),
      false,
      " L",
    )

    return path
  }

  static getCommandSlotPath(w, h, isFilled = false) {
    return [
      SVG.getCommandSlotTop(w, isFilled),
      SVG.getCommandSlotRightAndBottom(w, h, isFilled),
      "Z",
    ]
  }

  static getCommandSlotRect(w, h, isFilled = false, props) {
    return SVG.path({
      ...props,
      path: SVG.getCommandSlotPath(w, h, isFilled),
    })
  }

  static getReporterSlotTop(w, h, isFilled = false) {
    var rounding = 9,
      r = Math.min(rounding, h / 2),
      edge = (edge = isFilled ? 0 : 1),
      path = ""

    path += SVG.canvasArc(
      r + edge,
      r + edge,
      r,
      SVG.radians(-180),
      SVG.radians(-90),
      false,
      "M",
    )

    return path
  }

  static getReporterSlotRightAndBottom(w, h, isFilled = false) {
    var rounding = 9,
      r = Math.min(rounding, h / 2),
      edge = (edge = isFilled ? 0 : 1),
      path = ""

    path += SVG.canvasArc(
      w - r - edge,
      r + edge,
      r,
      SVG.radians(-90),
      SVG.radians(-0),
      false,
      "L",
    )

    path += SVG.canvasArc(
      w - r - edge,
      h - r - edge,
      r,
      SVG.radians(0),
      SVG.radians(90),
      false,
      " L",
    )

    path += SVG.canvasArc(
      r + edge,
      h - r - edge,
      r,
      SVG.radians(90),
      SVG.radians(180),
      false,
      " L",
    )

    path += " Z"

    return path
  }

  static getReporterSlotPath(w, h, isFilled = false) {
    return [
      SVG.getReporterSlotTop(w, h, isFilled),
      SVG.getReporterSlotRightAndBottom(w, h, isFilled),
      "Z",
    ]
  }

  static getReporterSlotRect(w, h, props) {
    return SVG.path({
      ...props,
      path: SVG.getReporterSlotPath(w, h),
    })
  }

  static getBooleanSlotTop(w, h, isFilled = false) {
    var edge = (edge = isFilled ? 0 : 1),
      rounding = 9,
      h2 = Math.floor(h / 2),
      r = Math.min(rounding, h2),
      path = ""

    path += `M ${edge} ${h2} `
    path += `L ${r + edge} ${edge} `
    path += `L ${w - r - edge} ${edge}`

    return path
  }

  static getBooleanSlotRightAndBottom(w, h, isFilled = false) {
    var edge = (edge = isFilled ? 0 : 1),
      rounding = 9,
      h2 = Math.floor(h / 2),
      r = Math.min(rounding, h2),
      path = ""

    path += `L ${w - edge} ${h2} `
    path += `L ${w - r - edge} ${h - edge} `
    path += `L ${r + edge} ${h - edge} `
    path += `L ${edge} ${h2}`

    return path
  }

  static getBooleanSlotPath(w, h, isFilled = false) {
    return [
      SVG.getBooleanSlotTop(w, h, isFilled),
      SVG.getBooleanSlotRightAndBottom(w, h, isFilled),
      "Z",
    ]
  }

  static getBooleanSlotRect(w, h, props) {
    return SVG.path({
      ...props,
      path: SVG.getBooleanSlotPath(w, h),
    })
  }

  static getRoundSlotTop(w, h) {
    var edge = 1,
      shift = edge * 0.5,
      r = Math.max((h - edge * 2) / 2, 0),
      start,
      end,
      path = ""

    start = r + edge
    end = w - r - edge
    path += SVG.canvasArc(
      r,
      r,
      r - shift,
      SVG.radians(180),
      SVG.radians(270),
      false,
      "M",
    )
    if (end > start) {
      path += ` L ${start} ${shift} `
      path += `L ${end} ${shift} `
    }
  }

  static getArm(w, armTop, inset) {
    if (!inset && inset !== 0) {
      inset = 10
    }

    var ox = inset,
      oy = armTop,
      corner = 3,
      radius = Math.max(corner, 0),
      path = ""

    path += this.canvasArc(
      inset + corner,
      armTop - corner,
      corner,
      this.radians(180),
      this.radians(90),
      true,
      "L",
    )

    path += ` L ${w - corner} ${armTop} `

    path += this.canvasArc(
      w - corner,
      armTop + corner,
      radius,
      this.radians(-90),
      this.radians(-0),
      false,
      "L",
    )

    return path
  }

  static stackRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getTop(w), SVG.getRightAndBottom(w, h, true, 0), "Z"],
    })
  }

  static capPath(w, h) {
    return [SVG.getTop(w), SVG.getRightAndBottom(w, h, false, 0), "Z"]
  }

  static capRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.capPath(w, h) })
  }

  static getHatTop(w, h) {
    return [
      "M",
      0,
      12,
      SVG.arc(0, 12, 35, 0, 50, 50),
      "C",
      70,
      0,
      70,
      12,
      Math.min(70 * 1.7, w - 5),
      12,
      "L",
      w - 5,
      12,
      `C ${w - 2} 12 ${w} 13 ${w} 17`,
    ].join(" ")
  }

  static hatRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getHatTop(w, h), SVG.getRightAndBottom(w, h, true), "Z"],
    })
  }

  static curve(p1x, p1y, p2x, p2y, roundness) {
    roundness = roundness || 0.42
    const midX = (p1x + p2x) / 2.0
    const midY = (p1y + p2y) / 2.0
    const cx = Math.round(midX + roundness * (p2y - p1y))
    const cy = Math.round(midY - roundness * (p2x - p1x))
    return `${cx} ${cy} ${p2x} ${p2y}`
  }

  static procHatBase(w, h, archRoundness, props) {
    // TODO use arc()
    archRoundness = Math.min(0.2, 35 / w)
    return SVG.path({
      ...props,
      path: [
        "M",
        0,
        15,
        "Q",
        SVG.curve(0, 15, w, 15, archRoundness),
        SVG.getRightAndBottom(w, h, true),
        "M",
        -1,
        13,
        "Q",
        SVG.curve(-1, 13, w + 1, 13, archRoundness),
        "Q",
        SVG.curve(w + 1, 13, w, 16, 0.6),
        "Q",
        SVG.curve(w, 16, 0, 16, -archRoundness),
        "Q",
        SVG.curve(0, 16, -1, 13, 0.6),
        "Z",
      ],
    })
  }

  static procHatCap(w, h, archRoundness) {
    // TODO use arc()
    // TODO this doesn't look quite right
    return SVG.path({
      path: [
        "M",
        -1,
        13,
        "Q",
        SVG.curve(-1, 13, w + 1, 13, archRoundness),
        "Q",
        SVG.curve(w + 1, 13, w, 16, 0.6),
        "Q",
        SVG.curve(w, 16, 0, 16, -archRoundness),
        "Q",
        SVG.curve(0, 16, -1, 13, 0.6),
        "Z",
      ],
      class: "snap-define-hat-cap",
    })
  }

  static procHatRect(w, h, props) {
    const q = 52
    const y = h - q

    const archRoundness = Math.min(0.2, 35 / w)

    return SVG.move(
      0,
      y,
      SVG.group([
        SVG.procHatBase(w, q, archRoundness, props),
        SVG.procHatCap(w, q, archRoundness),
      ]),
    )
  }

  static mouthRect(w, h, isFinal, lines, props) {
    let y = lines[0].height
    const p = [SVG.getTop(w), SVG.getRightAndBottom(w, y, true, 15)]
    for (let i = 1; i < lines.length; i += 2) {
      const isLast = i + 2 === lines.length

      y += lines[i].height - 3
      p.push(SVG.getArm(w, y))

      const hasNotch = !(isLast && isFinal)
      const inset = isLast ? 0 : 15
      y += lines[i + 1].height + 3
      p.push(SVG.getRightAndBottom(w, y, hasNotch, inset))
    }
    return SVG.path({ ...props, path: p })
  }

  static ringRect(w, h, child, shape, props, isEmpty) {
    const r = 8
    let cy = child.y,
      cw = child.width,
      ch = child.height

    const func =
      shape === "reporter"
        ? SVG.getReporterSlotPath
        : shape === "boolean"
          ? SVG.getBooleanSlotPath
          : SVG.getCommandSlotPath
    return SVG.path({
      ...props,
      path: [
        "M",
        r,
        0,
        SVG.arcw(r, 0, 0, r, r, r),
        SVG.arcw(0, h - r, r, h, r, r),
        SVG.arcw(w - r, h, w, h - r, r, r),
        SVG.arcw(w, r, w - r, 0, r, r),
        "Z",
        SVG.translatePath(4, cy || 4, func(cw, ch, !child.isInset).join(" ")),
      ],
      "fill-rule": "even-odd",
    })
  }

  static commentRect(w, h, props) {
    const r = 8
    return SVG.path({
      ...props,
      class: "snap-comment",
      path: [
        "M",
        r,
        0,
        SVG.arc(w - r, 0, w, r, r, r),
        SVG.arc(w, h - r, w - r, h, r, r),
        SVG.arc(r, h, 0, h - r, r, r),
        SVG.arc(0, r, r, 0, r, r),
        "Z",
      ],
    })
  }

  static commentLine(width, height, props) {
    return SVG.move(
      -width,
      height / 2,
      SVG.rect(width, 1, { ...props, class: "snap-comment-line" }),
    )
  }

  static strikethroughLine(w, props) {
    return SVG.path({
      ...props,
      path: ["M", 0, 0, "L", w, 0],
      class: "snap-diff snap-diff-del",
    })
  }

  static rgbToHex(r, g, b) {
    if (r > 255) r = 255
    else if (r < 0) r = 0
    if (g > 255) g = 255
    else if (g < 0) g = 0
    if (b > 255) b = 255
    else if (b < 0) b = 0
    return `#${[r, g, b]
      .map(n =>
        n.toString(16).length === 1 ? "0" + n.toString(16) : n.toString(16),
      )
      .join("")}`
  }
}
