/**
 * Convert pt to px
 *
 * @param {number} size
 * @returns {number}
 */
function pt2px(size) {
  return size * 1.3333343412075
}

/**
 * Split css font unit. If it's a 'pt', then it will convert to 'px'.
 *
 * @export
 * @param {string} fontSize
 * @param {number} [scale=1] - Optional, scale the font size
 * @returns {{ value: number; unit: string; }}
 */
export function splitFontSize(fontSize, scale) {
  if (!scale) {
    scale = 1
  }

  fontSize = String(fontSize)

  let parts = fontSize.split(/^([\d\.]*)(.*)$/)
  let value = parseFloat(parts[1])
  let unit = parts[2]

  if (unit.toLowerCase() == "pt") {
    value = pt2px(value)
    unit = "px"
  }

  return {
    value: value * scale,
    unit,
  }
}

/**
 * Scale font size
 *
 * @export
 * @param {string} fontSize
 * @param {number} scale
 * @returns {string}
 */
export function scaleFontSize(fontSize, scale) {
  let result = splitFontSize(fontSize, scale)

  return `${result.value}${result.unit}`
}

/**
 * Get the font height. This is the same as in Snap!, only it allows css font size units.
 *
 * @export
 * @param {(number | string)} fontSize
 * @returns {number}
 */
export function getFontHeight(fontSize) {
  fontSize = splitFontSize(fontSize).value

  return fontSize * 1.2
}
