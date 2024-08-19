import SVG from "./draw.js"

export default class Filter {
  /**
   * Creates an instance of Filter.
   *
   * @constructor
   * @param {string} id
   * @param {Object} props
   */
  constructor(id, props) {
    this.el = SVG.el("filter", {
      ...props,
      id: id,
      x0: "-50%",
      y0: "-50%",
      width: "200%",
      height: "200%",
    })
    this.highestId = 0
  }

  /**
   * Filter element
   *
   * @param {string} name
   * @param {Object} props
   * @param {SVGElement[]} children
   * @returns {string} - Filter id
   */
  fe(name, props, children) {
    const shortName = name.toLowerCase().replace(/gaussian|osite/, "")
    const id = `${shortName}-${++this.highestId}`
    this.el.appendChild(
      SVG.withChildren(
        SVG.el(`fe${name}`, { ...props, result: id }),
        children || [],
      ),
    )
    return id
  }

  /**
   * Add composite filter
   *
   * @param {string} op
   * @param {string} in1
   * @param {string} in2
   * @param {Object} props
   * @returns {string}
   */
  comp(op, in1, in2, props) {
    return this.fe("Composite", { ...props, operator: op, in: in1, in2: in2 })
  }

  /**
   * Subtract filter
   *
   * @param {string} in1
   * @param {string} in2
   * @returns {string}
   */
  subtract(in1, in2) {
    return this.comp("arithmetic", in1, in2, { k2: +1, k3: -1 })
  }

  /**
   * Offset filter
   *
   * @param {number} dx
   * @param {number} dy
   * @param {string} in1
   * @returns {string}
   */
  offset(dx, dy, in1) {
    return this.fe("Offset", {
      in: in1,
      dx: dx,
      dy: dy,
    })
  }

  /**
   * Flood filter
   *
   * @param {string} color
   * @param {number} opacity
   * @param {string} in1
   * @returns {string}
   */
  flood(color, opacity, in1) {
    return this.fe("Flood", {
      in: in1,
      "flood-color": color,
      "flood-opacity": opacity,
    })
  }

  /**
   * Blur filter
   *
   * @param {number} dev
   * @param {string} in1
   * @returns {string}
   */
  blur(dev, in1) {
    return this.fe("GaussianBlur", {
      in: in1,
      stdDeviation: `${dev} ${dev}`,
    })
  }

  /**
   * Dropshadow filter
   *
   * @param {number} dx
   * @param {number} dy
   * @param {number} blur
   * @param {string} color
   * @param {number} opacity
   * @returns {string}
   */
  dropShadow(dx, dy, blur, color, opacity) {
    return this.fe("DropShadow", {
      dx: dx,
      dy: dy,
      stdDeviation: blur,
      "flood-color": color,
      "flood-opacity": opacity,
    })
  }

  /**
   * Color matrix
   *
   * @param {string} in1
   * @param {string[]} values
   * @returns {string}
   */
  colorMatrix(in1, values) {
    return this.fe("ColorMatrix", {
      in: in1,
      type: "matrix",
      values: values.join(" "),
    })
  }

  /**
   * Merge
   *
   * @param {string[]} children - Filter ids
   */
  merge(children) {
    this.fe(
      "Merge",
      {},
      children.map(name =>
        SVG.el("feMergeNode", {
          in: name,
        }),
      ),
    )
  }
}
