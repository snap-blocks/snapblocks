// Processed by Rollup

const common = `
.snapblocks-style-scratch3,
.snapblocks-style-scratch3-high-contrast {
  --id: "";
}

.sb3-label {
  font: 500 12pt Helvetica Neue, Helvetica, sans-serif;
  word-spacing: +1pt;
}

.sb3-hide-spaces .sb3-space {
  display: none;
}
.sb3-space {
  fill: #b48c8c
}

.sb3-literal-number,
.sb3-literal-string,
.sb3-literal-number-dropdown,
.sb3-literal-dropdown {
  word-spacing: 0;
}

.sb3-diff {
  fill: none;
  stroke: #000;
}
.sb3-diff-ins {
  stroke-width: 2px;
}
.sb3-diff-del {
  stroke-width: 3px;
}
`

// These override colors defined per style
const commonOverride = `
/* Note: comment colors are different from Scratch. */

.sb3-comment {
  fill: #ffffa5;
  stroke: #d0d1d2;
  stroke-width: 1;
}
.sb3-comment-line {
  fill: #ffff80;
}
/* specificity */
.sb3-comment-label, .sb3-label.sb3-comment-label {
  font: 400 12pt Helvetica Neue, Helvetica, sans-serif;
  fill: #000;
  word-spacing: 0;
}`

const createRule = (category, name, style) => `
${name} .sb3-${category} {
  fill: ${style[category + "Primary"]};
  stroke: ${style[category + "Tertiary"]};
}
${name} .sb3-${category}-alt {
  fill: ${style[category + "Secondary"]};
}
${name} .sb3-${category}-dark {
  fill: ${style[category + "Tertiary"]};
}
`

const create = (name, style) => `

${name} .sb3-label {
  fill: ${style.label};
}

${name} .sb3-input-color {
  stroke: ${style.inputColorStroke};
}

${name} .sb3-input-number,
${name} .sb3-input-string {
  fill: ${style.inputFill};
}
${name} .sb3-literal-number,
${name} .sb3-literal-string {
  fill: ${style.literal};
}

${name} .sb3-custom-arg {
  fill: ${style.customPrimary};
  stroke: ${style.customTertiary};
}
`

const originalStyle = {
  label: "#fff",
  inputColorStroke: "#fff",
  inputFill: "#fff",
  /* Blockly color: text */
  literal: "#575e75",
}

const highContrastStyle = {
  label: "#000",
  inputColorStroke: "#fff",
  inputFill: "#fff",
  literal: "#000",
}

export default common +
  create("", originalStyle) +
  create(".snapblocks-style-scratch3-high-contrast", highContrastStyle) +
  commonOverride
