export default function scaleFontSize(fontSize, scale) {
  let parts = fontSize.split(/^([\d\.]*)(.*)$/)
  let value = parseFloat(parts[1])
  let unit = parts[2]

  return `${value * scale}${unit}`
}
