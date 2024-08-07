function pt2px(size) {
  return size * 1.3333343412075
}

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

export function scaleFontSize(fontSize, scale) {
  let result = splitFontSize(fontSize, scale)

  return `${result.value}${result.unit}`
}

export function getFontHeight(fontSize) {
  fontSize = splitFontSize(fontSize).value
  
  return fontSize * 1.2
}
