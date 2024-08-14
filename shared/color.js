/**
 * Hex Color pattern
 *
 * @type {RegExp}
 */
export const hexColorPat = /^#(?:[0-9a-fA-F]{3}){1,2}?$/
/**
 * RGB color pattern
 *
 * @type {RegExp}
 */
export const rgbColorPat = /^rgb\( *\d+ *(,? *\d* *){0,2}\)$/

export default class Color {
  /**
   * Creates an instance of Color.
   * 
   * This class is pretty much copied from [morphic.js](https://github.com/jmoenig/morphic.js). This was only converted to ES6 class syntax, and added a few methods, and added hex color support.
   *
   * @constructor
   * @param {number} [r=0]
   * @param {number} [g=0]
   * @param {number} [b=0]
   * @param {number} [a=0]
   */
  constructor(r, g, b, a) {
    // all values are optional, just (r, g, b) is fine
    this.r = r || 0
    this.g = g || 0
    this.b = b || 0
    this.a = a || (a === 0 ? 0 : 1)
  }
  /**
   * Get color from rgb or hex string
   *
   * @static
   * @param {string} aString
   * @returns {Color}
   */
  static fromString(aString) {
    if (hexColorPat.test(aString)) {
      return Color.fromHexString(aString)
    } else {
      return Color.fromRGBAString(aString)
    }
  }
  /**
   * Get color from rgba(r,g,b,a) string
   *
   * @static
   * @param {string} aString
   * @returns {Color}
   */
  static fromRGBAString(aString) {
    // I parse rgb/rgba strings into a Color object
    var components = aString.split(/[\(),]/),
      channels = aString.startsWith("rgba")
        ? components.slice(1, 5)
        : aString.startsWith("rgb")
          ? components.slice(1, 4)
          : components.slice(0, 4)
    return new Color(+channels[0], +channels[1], +channels[2], +channels[3])
  }
  /**
   * Get color from hex color code string
   *
   * @static
   * @param {string} hex
   * @returns {Color}
   */
  static fromHexString(hex) {
    const getChunksFromString = (st, chunkSize) =>
      st.match(new RegExp(`.{${chunkSize}}`, "g"))

    const convertHexUnitTo256 = hexStr =>
      parseInt(hexStr.repeat(2 / hexStr.length), 16)

    const getAlphafloat = (a, alpha) => {
      if (typeof a !== "undefined") {
        return a / 255
      }
      if (typeof alpha != "number" || alpha < 0 || alpha > 1) {
        return 1
      }
      return alpha
    }

    if (!hexColorPat.test(hex)) {
      throw new Error("Invalid HEX")
    }
    const chunkSize = Math.floor((hex.length - 1) / 3)
    const hexArr = getChunksFromString(hex.slice(1), chunkSize)
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256)

    return new Color(r, g, b, getAlphafloat(a))
  }
  /**
   * Color string representation: e.g. 'rgba(255,165,0,1)'
   *
   * @returns {string}
   */
  toString() {
    return (
      "rgba(" +
      Math.round(this.r) +
      "," +
      Math.round(this.g) +
      "," +
      Math.round(this.b) +
      "," +
      this.a +
      ")"
    )
  }
  /**
   * Color string representation: e.g. 'rgb(255,165,0)'
   *
   * @returns {string}
   */
  toRGBstring() {
    return (
      "rgb(" +
      Math.round(this.r) +
      "," +
      Math.round(this.g) +
      "," +
      Math.round(this.b) +
      ")"
    )
  }
  /**
   * Color string representation: e.g. '#ff1100'
   *
   * @returns {string}
   */
  toHexString() {
    var r = Math.max(0, Math.min(Math.round(this.r), 255)),
      g = Math.max(0, Math.min(Math.round(this.g), 255)),
      b = Math.max(0, Math.min(Math.round(this.b), 255))

    return `#${[r, g, b]
      .map(n =>
        n.toString(16).length === 1 ? "0" + n.toString(16) : n.toString(16),
      )
      .join("")}`
  }
  /**
   * Color string representation: e.g. '#ff110011'
   *
   * @returns {string}
   */
  toAlphaHexString() {
    var r = Math.max(0, Math.min(Math.round(this.r), 255)),
      g = Math.max(0, Math.min(Math.round(this.g), 255)),
      b = Math.max(0, Math.min(Math.round(this.b), 255)),
      a = Math.max(0, Math.min(Math.round(this.a * 255), 255))

    return `#${[r, g, b, a]
      .map(n =>
        n.toString(16).length === 1 ? "0" + n.toString(16) : n.toString(16),
      )
      .join("")}`
  }
  /**
   * Color copying
   *
   * @returns {Color}
   */
  copy() {
    return new Color(this.r, this.g, this.b, this.a)
  }
  /**
   * Color comparison
   *
   * @param {Color} aColor
   * @param {boolean} observeAlpha
   * @returns {boolean}
   */
  eq(aColor, observeAlpha) {
    // ==
    return (
      aColor &&
      this.r === aColor.r &&
      this.g === aColor.g &&
      this.b === aColor.b &&
      (observeAlpha ? this.a === aColor.a : true)
    )
  }
  /**
   * experimental - answer whether a color is "close" to another one by
   * a given percentage. tolerance is the percentage by which each color
   * channel may diverge, alpha needs to be the exact same unless ignored
   *
   * @param {Color} aColor
   * @param {boolean} observeAlpha
   * @param {number} tolerance
   * @returns {boolean}
   */
  isCloseTo(aColor, observeAlpha, tolerance) {
    var thres = 2.55 * (tolerance || 10)

    function dist(a, b) {
      var diff = a - b
      return diff < 0 ? 255 + diff : diff
    }

    return (
      aColor &&
      dist(this.r, aColor.r) < thres &&
      dist(this.g, aColor.g) < thres &&
      dist(this.b, aColor.b) < thres &&
      (observeAlpha ? this.a === aColor.a : true)
    )
  }

  /**
   * Color conversion (hsv)
   *
   * @returns {number[]}
   */
  hsv() {
    // ignore alpha
    var max,
      min,
      h,
      s,
      v,
      d,
      rr = this.r / 255,
      gg = this.g / 255,
      bb = this.b / 255
    max = Math.max(rr, gg, bb)
    min = Math.min(rr, gg, bb)
    h = max
    s = max
    v = max
    d = max - min
    s = max === 0 ? 0 : d / max
    if (max === min) {
      h = 0
    } else {
      switch (max) {
        case rr:
          h = (gg - bb) / d + (gg < bb ? 6 : 0)
          break
        case gg:
          h = (bb - rr) / d + 2
          break
        case bb:
          h = (rr - gg) / d + 4
          break
      }
      h /= 6
    }
    return [h, s, v]
  }
  /**
   * Set color to hsv
   *
   * @param {number} h
   * @param {number} s
   * @param {number} v
   */
  set_hsv(h, s, v) {
    // ignore alpha, h, s and v are to be within [0, 1]
    var i, f, p, q, t
    i = Math.floor(h * 6)
    f = h * 6 - i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    switch (i % 6) {
      case 0:
        this.r = v
        this.g = t
        this.b = p
        break
      case 1:
        this.r = q
        this.g = v
        this.b = p
        break
      case 2:
        this.r = p
        this.g = v
        this.b = t
        break
      case 3:
        this.r = p
        this.g = q
        this.b = v
        break
      case 4:
        this.r = t
        this.g = p
        this.b = v
        break
      case 5:
        this.r = v
        this.g = p
        this.b = q
        break
    }

    this.r *= 255
    this.g *= 255
    this.b *= 255
  }
  /**
   * Color conversion (hsl)
   *
   * @returns {number[]}
   */
  hsl() {
    // ignore alpha
    var rr = this.r / 255,
      gg = this.g / 255,
      bb = this.b / 255,
      max = Math.max(rr, gg, bb),
      min = Math.min(rr, gg, bb),
      h,
      s,
      l = (max + min) / 2,
      d
    if (max === min) {
      // achromatic
      h = 0
      s = 0
    } else {
      d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case rr:
          h = (gg - bb) / d + (gg < bb ? 6 : 0)
          break
        case gg:
          h = (bb - rr) / d + 2
          break
        case bb:
          h = (rr - gg) / d + 4
          break
      }
      h /= 6
    }
    return [h, s, l]
  }
  /**
   * Set color using hsl
   *
   * @param {number} h
   * @param {number} s
   * @param {number} l
   */
  set_hsl(h, s, l) {
    // ignore alpha, h, s and l are to be within [0, 1]
    var q, p

    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1
      }
      if (t > 1) {
        t -= 1
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t
      }
      if (t < 1 / 2) {
        return q
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6
      }
      return p
    }

    if (s == 0) {
      // achromatic
      this.r = l
      this.g = l
      this.b = l
    } else {
      q = l < 0.5 ? l * (1 + s) : l + s - l * s
      p = 2 * l - q
      this.r = hue2rgb(p, q, h + 1 / 3)
      this.g = hue2rgb(p, q, h)
      this.b = hue2rgb(p, q, h - 1 / 3)
    }

    this.r *= 255
    this.g *= 255
    this.b *= 255
  }
  /**
   * Color mixing
   *
   * @param {number} proportion
   * @param {Color} otherColor
   * @returns {Color}
   */
  mixed(proportion, otherColor) {
    // answer a copy of this color mixed with another color, ignore alpha
    var frac1 = Math.min(Math.max(proportion, 0), 1),
      frac2 = 1 - frac1
    return new Color(
      this.r * frac1 + otherColor.r * frac2,
      this.g * frac1 + otherColor.g * frac2,
      this.b * frac1 + otherColor.b * frac2,
    )
  }
  /**
   * Darken this color
   *
   * @param {number} percent
   * @returns {Color}
   */
  darker(percent) {
    // return an rgb-interpolated darker copy of me, ignore alpha
    var fract = 0.8333
    if (percent) {
      fract = (100 - percent) / 100
    }
    return this.mixed(fract, new Color(0, 0, 0))
  }
  /**
   * Lighten this color
   *
   * @param {number} percent
   * @returns {Color}
   */
  lighter(percent) {
    // return an rgb-interpolated lighter copy of me, ignore alpha
    var fract = 0.8333
    if (percent) {
      fract = (100 - percent) / 100
    }
    return this.mixed(fract, WHITE)
  }
  /**
   * Return an hsv-interpolated darker copy of me, ignore alpha
   *
   * @returns {Color}
   */
  dansDarker() {
    var hsv = this.hsv(),
      result = new Color(),
      vv = Math.max(hsv[2] - 0.16, 0)
    result.set_hsv(hsv[0], hsv[1], vv)
    return result
  }
  /**
   * Invert this color
   *
   * @returns {Color}
   */
  inverted() {
    return new Color(255 - this.r, 255 - this.g, 255 - this.b)
  }
  /**
   * Remove the alpha channel
   *
   * @returns {Color}
   */
  solid() {
    return new Color(this.r, this.g, this.b)
  }
  /**
   * Get the zebra color of this color
   *
   * @param {number} [zebraContrast=40]
   * @returns {Color}
   */
  zebra(zebraContrast = 40) {
    return zebraContrast < 0
      ? this.darker(Math.abs(zebraContrast))
      : this.lighter(zebraContrast)
  }
}

/**
 * Black constant
 *
 * @type {Color}
 * @constant
 */
const BLACK = new Color()
/**
 * White constant
 *
 * @type {Color}
 * @constant
 */
const WHITE = new Color(255, 255, 255)
/**
 * Fully transparent constant
 *
 * @type {Color}
 * @constant
 */
const CLEAR = new Color(0, 0, 0, 0)
