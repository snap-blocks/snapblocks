// Processed by Rollup
export default `
.snapblocks-style-snap,
.snapblocks-style-snap-flat {
  --id: "";
  --snapDropShadow: url(#snapDropShadow-);
  --snapBevelFilter: url(#snapBevelFilter-);
  --snapInputBevelFilter: url(#snapInputBevelFilter-);
  --snapLightFilter: url(#snapLightFilter-);
}

.snap-label {
  font-family: Verdana, Arial, DejaVu Sans, sans-serif;
  font-weight: bold;
  fill: #fff;
  font-size: 10px;
  /* word-spacing: +1px; */
  white-space: pre;
}

.snap-hide-spaces .snap-space {
  display: none;
}
.snap-space {
  fill: #b48c8c
}

.snap-drop-shadow {
  filter: var(--snapDropShadow);
}

.snap-bevel {
  filter: var(--snapBevelFilter);
}

.snap-input-bevel {
  filter: var(--snapInputBevelFilter);
}
.snap-input-number,
.snap-input-string,
.snap-input-number-dropdown,
.snap-input-dropdown {
  font-family: Helvetica, Arial, DejaVu Sans, sans-serif;
  fill: #fff;
}
.snap-literal-number,
.snap-literal-string,
.snap-literal-boolean,
.snap-literal-number-dropdown,
.snap-literal-dropdown,
.snap-literal-number-dropdown-readonly,
.snap-literal-dropdown-readonly {
  font-family: Arial, DejaVu Sans, sans-serif;
  font-weight: normal;
  font-size: 9px;
  word-spacing: 0;
}
.snap-literal-boolean {
  font-weight: bold;
}
.snap-label-dark,
.snap-literal-number,
.snap-literal-string,
.snap-literal-number-dropdown,
.snap-literal-dropdown {
  /* fill: #000; */
}
.snap-literal-number-dropdown-readonly,
.snap-literal-dropdown-readonly {
  /* fill: #fff; */
}

.snap-darker {
  /* filter: var(--snapInputDarkFilter); */
}

.snap-zebra {
  filter: var(--snapLightFilter);
}

.snap-outline {
  stroke: #fff;
  stroke-opacity: 0.2;
  stroke-width: 1;
  fill: none;
}

.snap-comment {
  fill: #ffffb4;
}
.snap-comment-line {
  fill: #ffffb4;
}
.snap-comment-label {
  font-family: Helvetica, Arial, DejaVu Sans, sans-serif;
  font-weight: normal;
  fill: #000;
  word-spacing: 0;
  font-size: 12px;
  filter: none;
}

.snap-diff {
  fill: none;
  stroke: #000;
}
.snap-diff-ins {
  stroke-width: 2px;
}
.snap-diff-del {
  stroke-width: 3px;
}
`
