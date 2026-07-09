import SVG from "./draw.js"
import Color from "../shared/color.js"
import cssContent from "./style.css.js"
import Filter from "./filter.js"

// Need to define here, as we cannot reference Style#makeNewIcons
// during JS loading phase.
const highContrastIcons = new Set([
  "dropdownArrow",
  "turnRight",
  "turnLeft",
  "loop",
  "musicBlock",
  "penBlock",
  "videoBlock",
  "facesensingBlock",
  "ttsBlock",
  "translationBlock",
  "cloud",
  "cloudGradient",
  "turtle",
  "turtleOutline",
  "circle",
  "circleSolid",
  "notes",
  "storage",
  "location",
  "gearPartial",
  "gearBig",
  "globe",
  "globeBig",
  "square",
  "pointRight",
  "stepForward",
  "fullScreen",
  "grow",
  "normalScreen",
  "shrink",
  "smallStage",
  "normalStage",
  "stage",
  "turnAround",
  "poster",
  "tick",
  "checkedBox",
  "rectangle",
  "rectangleSolid",
  "dot",
  "cross",
  "crosshairs",
  "speechBubble",
  "speechBubbleOutline",
  "magnifyingGlass",
  "magnifierOutline",
  "selection",
  "polygon",
  "closedBrush",
  "footprints",
  "keyboard",
  "keyboardFilled",
  "listNarrow",
  "trashFull",
  "cube",
  "cubeSolid",
  "infinity",
  "blocks",
  "turtlePlus",

  "arrowUpThin",
  "arrowDownThin",
  "arrowLeftThin",
  "arrowRightThin",
  "arrowUpDownThin",
  "arrowLeftRightThin",
])

const snapIcons = new Set([
  "list",
  "cloud",
  "cloudGradient",
  "turtle",
  "turtleOutline",
  "circle",
  "circleSolid",
  "storage",
  "location",
  "gearPartial",
  "gearBig",
  "globe",
  "globeBig",
  "square",
  "pointRight",
  "stepForward",
  "fullScreen",
  "grow",
  "normalScreen",
  "shrink",
  "smallStage",
  "normalStage",
  "stage",
  "poster",
  "tick",
  "checkedBox",
  "rectangle",
  "rectangleSolid",
  "dot",
  "line",
  "cross",
  "crosshairs",
  "speechBubble",
  "speechBubbleOutline",
  "magnifyingGlass",
  "magnifierOutline",
  "selection",
  "closedBrush",
  "footprints",
  "keyboard",
  "keyboardFilled",
  "listNarrow",

  "trashFull",
  "cube",
  "cubeSolid",
  "infinity",
  "blocks",
  "turtlePlus",

  "arrowUpThin",
  "arrowDownThin",
  "arrowLeftThin",
  "arrowRightThin",
  "arrowUpDownThin",
  "arrowLeftRightThin",
])

export default class Style {
  static highContrastIcons = highContrastIcons
  static snapIcons = snapIcons

  static get cssContent() {
    return cssContent
  }

  static colors = {
    comment: {
      border: Color.fromString("#bcA903"),
      body: Color.fromString("#fef49c"),
    },

    categories: {
      motion: {
        primary: Color.fromString("#4c97ff"),
        secondary: Color.fromString("#4280d7"),
        tertiary: Color.fromString("#3373cc"),
      },
      looks: {
        primary: Color.fromString("#9966ff"),
        secondary: Color.fromString("#855cd6"),
        tertiary: Color.fromString("#774dcb"),
      },
      sound: {
        primary: Color.fromString("#cf63cf"),
        secondary: Color.fromString("#c94fc9"),
        tertiary: Color.fromString("#bd42bd"),
      },
      control: {
        primary: Color.fromString("#ffab19"),
        secondary: Color.fromString("#ec9c13"),
        tertiary: Color.fromString("#cf8b17"),
      },
      events: {
        primary: Color.fromString("#ffbf00"),
        secondary: Color.fromString("#e6ac00"),
        tertiary: Color.fromString("#cc9900"),
      },
      sensing: {
        primary: Color.fromString("#5cb1d6"),
        secondary: Color.fromString("#47a8d1"),
        tertiary: Color.fromString("#2e8eb8"),
      },
      operators: {
        primary: Color.fromString("#59c059"),
        secondary: Color.fromString("#46b946"),
        tertiary: Color.fromString("#389438"),
      },
      variables: {
        primary: Color.fromString("#ff8c1a"),
        secondary: Color.fromString("#ff8000"),
        tertiary: Color.fromString("#db6e00"),
      },
      lists: {
        primary: Color.fromString("#ff661a"),
        secondary: Color.fromString("#ff5500"),
        tertiary: Color.fromString("#e64d00"),
      },
      custom: {
        primary: Color.fromString("#ff6680"),
        secondary: Color.fromString("#ff4d6a"),
        tertiary: Color.fromString("#ff3355"),
      },
      extension: {
        primary: Color.fromString("#0fbd8c"),
        secondary: Color.fromString("#0da57a"),
        tertiary: Color.fromString("#0b8e69"),
      },
      obsolete: {
        primary: Color.fromString("#ed4242"),
        secondary: Color.fromString("#db3333"),
        tertiary: Color.fromString("#ca2b2b"),
      },
      other: {
        primary: Color.fromString("#bfbfbf"),
        secondary: Color.fromString("#b2b2b2"),
        tertiary: Color.fromString("#909090"),
      },
    },

    highContrastCategories: {
      motion: {
        primary: Color.fromString("#80b5ff"),
        secondary: Color.fromString("#b3d2ff"),
        tertiary: Color.fromString("#3373cc"),
      },
      looks: {
        primary: Color.fromString("#ccb3ff"),
        secondary: Color.fromString("#ddccff"),
        tertiary: Color.fromString("#774dcb"),
      },
      sound: {
        primary: Color.fromString("#e19de1"),
        secondary: Color.fromString("#ffb3ff"),
        tertiary: Color.fromString("#bd42bd"),
      },
      control: {
        primary: Color.fromString("#ffbe4c"),
        secondary: Color.fromString("#ffda99"),
        tertiary: Color.fromString("#cf8b17"),
      },
      events: {
        primary: Color.fromString("#ffd966"),
        secondary: Color.fromString("#ffecb3"),
        tertiary: Color.fromString("#cc9900"),
      },
      sensing: {
        primary: Color.fromString("#85c4e0"),
        secondary: Color.fromString("#aed8ea"),
        tertiary: Color.fromString("#2e8eb8"),
      },
      operators: {
        primary: Color.fromString("#7ece7e"),
        secondary: Color.fromString("#b5e3b5"),
        tertiary: Color.fromString("#389438"),
      },
      variables: {
        primary: Color.fromString("#ffa54c"),
        secondary: Color.fromString("#ffcc99"),
        tertiary: Color.fromString("#db6e00"),
      },
      lists: {
        primary: Color.fromString("#ff9966"),
        secondary: Color.fromString("#ffcab0"),
        tertiary: Color.fromString("#e64d00"),
      },
      custom: {
        primary: Color.fromString("#ff99aa"),
        secondary: Color.fromString("#ffccd5"),
        tertiary: Color.fromString("#e64d00"),
      },
      extension: {
        primary: Color.fromString("#13ecaf"),
        secondary: Color.fromString("#75f0cd"),
        tertiary: Color.fromString("#0b8e69"),
      },
      /* Manually picked to be readable on black text */
      obsolete: {
        primary: Color.fromString("#fc6666"),
        secondary: Color.fromString("#fcb0b0"),
        tertiary: Color.fromString("#d32121"),
      },
      other: {
        primary: Color.fromString("#bfbfbf"),
        secondary: Color.fromString("#b2b2b2"),
        /* Changed to be AAA against #000000, was AA */
        tertiary: Color.fromString("#959595"),
      },
    },
  }

  static categoryColor(category, isHighContrast) {
    let categories = Style.colors.categories,
      color
    if (isHighContrast) {
      categories = Style.colors.highContrastCategories
    }

    if (categories[category]) {
      color = categories[category]
    } else if (category instanceof Color) {
      color = {
        primary: category,
        secondary: category.darker(20),
        tertiary: category.darker(10),
      }
    } else {
      color = categories.obsolete
    }

    return {
      ...color,
      makeZebra: function (isHighContrast) {
        let color = { ...this }
        if (isHighContrast) {
          color.primary = color.primary.darker(10)
          color.secondary = color.secondary.darker(10)
          color.tertiary = color.tertiary.darker(10)
        } else {
          color.primary = color.primary.lighter(30)
          color.secondary = color.secondary.lighter(30)
          color.tertiary = color.tertiary.lighter(30)
        }

        return color
      },
    }
  }

  static makeCommonIcons() {
    let arrow
    return [
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71,2.44A2.41,2.41,0,0,1,12,4.16L8.08,8.08a2.45,2.45,0,0,1-3.45,0L0.72,4.16A2.42,2.42,0,0,1,0,2.44,2.48,2.48,0,0,1,.71.71C1,0.47,1.43,0,6.36,0S11.75,0.46,12,.71A2.44,2.44,0,0,1,12.71,2.44Z",
            fill: "#231f20",
            opacity: ".1",
          }),
          SVG.el("path", {
            d: "M6.36,7.79a1.43,1.43,0,0,1-1-.42L1.42,3.45a1.44,1.44,0,0,1,0-2c0.56-.56,9.31-0.56,9.87,0a1.44,1.44,0,0,1,0,2L7.37,7.37A1.43,1.43,0,0,1,6.36,7.79Z",
            fill: "#fff",
          }),
        ]),
        {
          id: "sb3-dropdownArrow",
        },
      ),
      // https://github.com/scratchfoundation/scratch-gui/tree/beta/src/lib/themes/high-contrast/blocks-media
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71,2.44A2.41,2.41,0,0,1,12,4.16L8.08,8.08a2.45,2.45,0,0,1-3.45,0L0.72,4.16A2.42,2.42,0,0,1,0,2.44,2.48,2.48,0,0,1,.71.71C1,0.47,1.43,0,6.36,0S11.75,0.46,12,.71A2.44,2.44,0,0,1,12.71,2.44Z",
            fill: "#231f20",
            opacity: ".1",
          }),
          SVG.el("path", {
            d: "M6.36,7.79a1.43,1.43,0,0,1-1-.42L1.42,3.45a1.44,1.44,0,0,1,0-2c0.56-.56,9.31-0.56,9.87,0a1.44,1.44,0,0,1,0,2L7.37,7.37A1.43,1.43,0,0,1,6.36,7.79Z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-dropdownArrow-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.8,3.7c-0.4-0.2-0.9-0.1-1.2,0.2c-2,1.6-4.8,1.6-6.8,0c-2.3-1.9-5.6-2.3-8.3-1V2.5c0-0.6-0.5-1-1-1  s-1,0.4-1,1v18.8c0,0.5,0.5,1,1,1h0.1c0.5,0,1-0.5,1-1v-6.4c1-0.7,2.1-1.2,3.4-1.3c1.2,0,2.4,0.4,3.4,1.2c2.9,2.3,7,2.3,9.8,0  c0.3-0.2,0.4-0.5,0.4-0.9V4.7C21.6,4.2,21.3,3.8,20.8,3.7z M20.5,13.9C20.5,13.9,20.5,13.9,20.5,13.9C18,16,14.4,16,11.9,14  c-1.1-0.9-2.5-1.4-4-1.4c-1.2,0.1-2.3,0.5-3.4,1.1V4C7,2.6,10,2.9,12.2,4.6c2.4,1.9,5.7,1.9,8.1,0c0.1,0,0.1,0,0.2,0  c0,0,0.1,0.1,0.1,0.1L20.5,13.9z",
            fill: "#45993D",
          }),
          SVG.el("path", {
            d: "M20.6,4.8l-0.1,9.1c0,0,0,0.1,0,0.1c-2.5,2-6.1,2-8.6,0c-1.1-0.9-2.5-1.4-4-1.4c-1.2,0.1-2.3,0.5-3.4,1.1V4  C7,2.6,10,2.9,12.2,4.6c2.4,1.9,5.7,1.9,8.1,0c0.1,0,0.1,0,0.2,0C20.5,4.7,20.6,4.7,20.6,4.8z",
          }),
        ]),
        {
          id: "sb3-flag",
        },
      ),

      SVG.setProps(
        SVG.el("polygon", {
          points:
            "6.6,0.5 13.12,0.5 19.5,6.6 19.5,13.12 13.12,19.5 6.6,19.5 0.5,13.12 0.5,6.6 ",
          stroke: "#b84848",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
        }),
        {
          id: "sb3-octagon",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71,2.44A2.41,2.41,0,0,1,12,4.16L8.08,8.08a2.45,2.45,0,0,1-3.45,0L0.72,4.16A2.42,2.42,0,0,1,0,2.44,2.48,2.48,0,0,1,.71.71C1,0.47,1.43,0,6.36,0S11.75,0.46,12,.71A2.44,2.44,0,0,1,12.71,2.44Z",
            fill: "#231f20",
            opacity: 0.1,
          }),
          SVG.el("path", {
            d: "M6.36,7.79a1.43,1.43,0,0,1-1-.42L1.42,3.45a1.44,1.44,0,0,1,0-2c0.56-.56,9.31-0.56,9.87,0a1.44,1.44,0,0,1,0,2L7.37,7.37A1.43,1.43,0,0,1,6.36,7.79Z",
          }),
        ]),
        {
          id: "sb3-delInput",
          transform: "translate(8.79, 0), rotate(90), translate(-1, 0)",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71,2.44A2.41,2.41,0,0,1,12,4.16L8.08,8.08a2.45,2.45,0,0,1-3.45,0L0.72,4.16A2.42,2.42,0,0,1,0,2.44,2.48,2.48,0,0,1,.71.71C1,0.47,1.43,0,6.36,0S11.75,0.46,12,.71A2.44,2.44,0,0,1,12.71,2.44Z",
            fill: "#231f20",
            opacity: 0.1,
          }),
          SVG.el("path", {
            d: "M6.36,7.79a1.43,1.43,0,0,1-1-.42L1.42,3.45a1.44,1.44,0,0,1,0-2c0.56-.56,9.31-0.56,9.87,0a1.44,1.44,0,0,1,0,2L7.37,7.37A1.43,1.43,0,0,1,6.36,7.79Z",
          }),
        ]),
        {
          id: "sb3-addInput",
          transform: "translate(0, 12.71), rotate(-90), translate(1, 0)",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          //  M x y,  r r x,l,s x                  y
          d: `M 2 1 A 1 1 0 1 1 1.9999995000000417 0.9990000001666661
              M 2 5 A 1 1 0 1 1 1.9999995000000417 4.999000000166666
              M 2 9 A 1 1 0 1 1 1.9999995000000417 8.999000000166665`,
        }),
        {
          id: "sb3-verticalEllipsis",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("mask", {
              id: "sb3-list-holes",
            }),
            [
              SVG.el("rect", {
                x: "0",
                y: "0",
                width: "8",
                height: "10",
                fill: "white",
              }),
              SVG.el("rect", {
                x: "1",
                y: "1",
                width: "6",
                height: "2",
                fill: "black",
              }),
              SVG.el("rect", {
                x: "1",
                y: "4",
                width: "6",
                height: "2",
                fill: "black",
              }),
              SVG.el("rect", {
                x: "1",
                y: "7",
                width: "6",
                height: "2",
                fill: "black",
              }),
            ],
          ),
          SVG.group([
            SVG.el("rect", {
              x: 1,
              y: 1,
              width: "6",
              height: "2",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: 1,
              y: 4,
              width: "6",
              height: "2",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: 1,
              y: 7,
              width: "6",
              height: "2",
              fill: "#ff8c00",
            }),
          ]),
          SVG.el("rect", {
            x: "0",
            y: "0",
            width: "8",
            height: "10",
            fill: "white",
            mask: "url(#sb3-list-holes)",
          }),
        ]),
        {
          id: "sb3-list",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 8.660254037844387 5 L 0 10 Z",
        }),
        {
          id: "sb3-pointRight",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 13 5 L 0 10 L 5 5 Z",
        }),
        {
          id: "sb3-turtle",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 13 5 L 0 10 L 5 5 Z",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-turtleOutline",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            width: (10 / 5) * 2,
            height: 10,
          }),
          SVG.el("rect", {
            width: (10 / 5) * 2,
            height: 10,
            x: (10 / 5) * 3,
          }),
        ]),
        {
          id: "sb3-pause",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M6.1919265,9.97041267 C6.39817578,10.4827993 6.8451296,10.5515418 7.19456044,10.1185825 L7.4614448,9.78790167 C7.80893496,9.35734694 8.43422564,9.28545516 8.87346661,9.63974521 L11.68656,11.9087754 C12.118908,12.2575055 12.3030858,12.1265903 12.0962705,11.6122341 L9.74921575,5.77503453 C9.54314462,5.26252912 9.09584472,5.19401738 8.7458012,5.62738515 L8.4784489,5.9583779 C8.13034947,6.38933881 7.50456486,6.46155987 7.06532389,6.10726982 L4.25223048,3.83823967 C3.81988252,3.48950949 3.63584851,3.62032891 3.84284261,4.13456591 L6.1919265,9.97041267 Z`,
          transform:
            "translate(3, 5.873508) rotate(69.000000) translate(-7.969395, -7.873508)",
          "stroke-width": 1,
        }),
        {
          id: "sb3-flash",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 8.5 12 C 6.8485 12 5.5 10.6515 5.5 9 C 5.5 7.3365 6.8485 6 8.5 6 C 10.1635 6 11.5 7.3365 11.5 9 C 11.5 10.6515 10.1635 12 8.5 12 M 14.5 3.75 L 13.45 3.75 C 13.1635 3.75 12.925 3.6 12.7885 3.36 L 11.7835 1.5315 C 11.515 1.05 11.02 0.75 10.465 0.75 L 6.55 0.75 C 5.995 0.75 5.5 1.05 5.2285 1.5315 L 4.21 3.36 C 4.075 3.6 3.835 3.75 3.565 3.75 L 2.5 3.75 C 1.675 3.75 1 4.425 1 5.25 L 1 12.75 C 1 13.5765 1.675 14.25 2.5 14.25 L 14.5 14.25 C 15.325 14.25 16 13.5765 16 12.75 L 16 5.25 C 16 4.425 15.325 3.75 14.5 3.75`,
          "fill-rule": "evenodd",
        }),
        {
          id: "sb3-camera",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 5,
          cx: 5,
          cy: 5,
        }),
        {
          id: "sb3-circleSolid",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 4.5,
          cx: 4.75,
          cy: 5,
        }),
        {
          id: "sb3-circle",
          fill: "none",
          "stroke-width": 1,
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 10 8.660254037844386 A 10 10 0 0 1 1.7763568394002505e-15 8.660254037844387 L 0 8.181818181818182 L 1.7763568394002505e-15 6.842072219662569 A 10 10 0 0 0 10 6.842072219662567 Z
                M 10 5.932981310571659 A 10 10 0 0 1 1.7763568394002505e-15 5.932981310571661 L 0 5.454545454545455 L 1.7763568394002505e-15 4.114799492389842 A 10 10 0 0 0 10 4.1147994923898406 Z
                M 10 3.2057085832989314 A 10 10 0 0 1 1.7763568394002505e-15 3.205708583298933 L 0 2.7272727272727275 L 1.7763568394002505e-15 1.3875267651171148 A 10 10 0 0 0 10 1.387526765117113 Z`,
            "stroke-width": 0.5 / 2,
          }),
          SVG.el("path", {
            d: `M 1.7763568394002505e-15 6.794291416701066 A 10 10 0 0 1 10 6.794291416701068
            M 1.7763568394002505e-15 4.067018689428339 A 10 10 0 0 1 10 4.067018689428341
            M 1.7763568394002505e-15 1.3397459621556127 A 10 10 0 0 1 10 1.3397459621556145`,
            "stroke-width": 0.5,
            fill: "none",
          }),
        ]),
        {
          id: "sb3-storage",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 10.5787 8.2102 C 9.6196 9.1693 8.9129 9.6615 8.3577 9.8508 C 8.1936 9.346 7.916 8.879 7.5248 8.4878 C 7.1209 8.0966 6.654 7.819 6.1492 7.6423 C 6.3511 7.0871 6.8433 6.3804 7.7898 5.4339 C 10.0613 3.1497 14.0996 0.3608 14.8694 1.1306 C 15.6392 1.9004 12.8503 5.9387 10.5787 8.2102 Z M 6.3912 12.412 C 6.0157 12.7749 5.5311 12.9621 5.0465 12.9856 L 5.0465 12.9973 L 4.9254 12.9973 C 1.6787 13.1143 0.2613 9.4389 1.3758 9.8252 C 2.8417 10.3285 3.4365 9.6028 3.4595 9.5794 C 4.2712 8.8069 5.5796 8.8069 6.3912 9.5794 C 7.2029 10.3636 7.2029 11.6395 6.3912 12.412 Z",
        }),
        {
          id: "sb3-brush",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 7.1533 10.4825 C 7.0339 10.6189 6.8804 10.7041 6.6075 10.7723 C 5.9081 10.9257 5.2429 11.5565 5.0382 12.2554 C 4.9699 12.477 4.7482 12.7157 4.5094 12.835 L 2.7353 13.6703 C 2.65 13.7044 2.5818 13.7215 2.5477 13.7215 L 2.2748 13.4658 C 2.2748 13.4487 2.2748 13.3805 2.3259 13.2612 L 3.1618 11.4712 C 3.2641 11.2496 3.5029 11.028 3.7418 10.9598 C 4.4411 10.7382 5.0723 10.0904 5.2599 9.2381 C 5.294 9.1017 5.3793 8.9653 5.4987 8.8289 L 9.4391 4.9081 L 11.0937 6.5616 L 7.1533 10.4825 Z M 14.6077 3.2886 C 14.8635 3.0329 15 2.6749 15 2.3339 C 15 1.993 14.8635 1.6521 14.6077 1.3963 C 14.0789 0.8679 13.243 0.8679 12.7142 1.3963 L 11.2302 2.8795 L 11.0596 2.709 L 10.5138 2.1635 C 10.1726 1.8225 9.6097 1.8225 9.2685 2.1635 L 8.6033 2.8113 C 8.2792 3.1522 8.2621 3.6466 8.5521 3.9875 L 4.5947 7.9254 C 4.3047 8.2323 4.1 8.5903 3.9806 9.1017 C 3.9294 9.3574 3.6394 9.6472 3.3665 9.7324 C 2.8036 9.9029 2.2577 10.3802 2.0018 10.9428 L 1.166 12.7157 C 0.8931 13.3123 0.9613 13.926 1.3366 14.3181 L 1.6777 14.6591 C 1.8995 14.8807 2.2065 15 2.5477 15 C 2.7695 15 3.0253 14.9318 3.2641 14.8295 L 5.0552 13.9942 C 5.6181 13.7215 6.0958 13.193 6.2663 12.6304 C 6.3346 12.3577 6.6416 12.0679 7.051 11.9826 C 7.4092 11.8974 7.7674 11.6928 8.0574 11.386 L 12.0149 7.4481 C 12.356 7.7379 12.8678 7.7038 13.1748 7.3799 L 13.8401 6.7321 C 14.1812 6.3912 14.1812 5.8286 13.8401 5.4877 L 13.2601 4.9081 L 13.1236 4.7717 L 14.6077 3.2886 Z",
        }),
        {
          id: "sb3-pipette",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 12.0451 7.6935 L 12.0307 7.6792 C 11.4397 7.3638 10.5171 6.6902 9.4215 5.6009 C 9.09 5.2712 8.7873 4.9559 8.5422 4.6549 C 8.7152 4.4399 8.8882 4.2249 9.0612 4.0099 C 9.3783 4.2679 9.7243 4.5832 10.0846 4.9416 C 10.3153 5.1709 10.5027 5.3716 10.6901 5.5722 C 10.7189 5.6152 10.7622 5.6582 10.8198 5.7012 C 11.6271 6.6185 12.1028 7.3638 12.319 7.7938 C 12.319 7.8082 12.3334 7.8225 12.3334 7.8368 C 12.2469 7.7938 12.146 7.7508 12.0451 7.6935 M 8.5999 8.0662 C 7.735 8.5391 6.9133 8.9835 5.616 8.6825 C 4.1745 8.3528 3.4825 7.7652 3.1942 7.4212 L 6.3079 3.4079 C 6.5241 3.8379 6.8412 4.2822 7.1728 4.6979 C 6.8268 5.2139 6.5529 5.6439 6.4232 5.8445 C 6.2791 6.0882 6.3511 6.4179 6.6106 6.5755 C 6.6971 6.6329 6.798 6.6615 6.8845 6.6615 C 7.0719 6.6615 7.2449 6.5612 7.3458 6.4035 C 7.5043 6.1312 7.6917 5.8445 7.8935 5.5579 C 8.1963 5.9019 8.4702 6.1742 8.6575 6.3605 C 9.0756 6.7762 9.4936 7.1488 9.8972 7.4785 C 9.4215 7.6075 9.0035 7.8512 8.5999 8.0662 M 8.2107 3.3363 C 8.0954 3.4939 7.9656 3.6516 7.8503 3.7949 C 7.5043 3.3363 7.2881 2.9636 7.1728 2.7056 C 7.4179 2.806 7.7638 3.0209 8.2107 3.3363 M 11.5117 2.075 C 11.6703 2.075 11.8433 2.1036 11.8721 2.1753 C 12.0451 2.4906 11.6271 3.4939 11.0649 4.3969 L 10.8486 4.1819 C 10.618 3.9526 10.2288 3.5943 9.7819 3.2073 C 10.445 2.5336 11.0505 2.075 11.5117 2.075 M 14.5533 10.1588 C 14.3371 9.5998 13.9911 9.0981 13.5875 8.6681 C 13.5443 8.6108 13.4866 8.5678 13.4289 8.5248 C 13.674 7.9945 13.2704 7.2348 12.9244 6.6902 C 12.6505 6.2459 12.2757 5.7442 11.8289 5.2426 C 12.3911 4.3826 13.3569 2.677 12.8379 1.6736 C 12.6794 1.3727 12.319 1 11.5117 1 L 11.4973 1 C 10.6757 1 9.7675 1.6593 8.9459 2.5193 C 8.0233 1.8456 7.0142 1.3153 6.4088 1.6593 C 6.3511 1.688 6.2791 1.7166 6.2358 1.774 C 6.2214 1.7883 6.1926 1.8026 6.1782 1.8313 C 6.1637 1.8456 6.1493 1.86 6.1349 1.8886 L 6.1205 1.9173 L 2.1275 7.0485 C 2.1131 7.0485 2.1131 7.0485 2.0987 7.0628 L 1.2049 8.2238 L 1.1617 8.2668 C 1.1185 8.3098 1.0896 8.3671 1.0752 8.4101 L 1.0752 8.4245 C 0.6283 9.3418 2.2861 11.1334 3.0645 11.9217 C 3.7564 12.6097 5.2844 14 6.2358 14 C 6.4376 14 6.5962 13.9427 6.7403 13.8137 L 12.2613 9.5568 C 12.2902 9.5424 12.3046 9.5138 12.3334 9.4851 C 12.3622 9.5138 12.3766 9.5568 12.3911 9.5854 C 12.564 9.9294 12.6794 10.2878 12.6938 10.6748 C 12.737 11.0617 12.7082 11.4631 12.6505 11.8501 L 12.6505 11.8644 C 12.6361 11.9791 12.6361 12.0794 12.6505 12.194 C 12.7514 12.839 13.3569 13.2834 13.9911 13.183 C 14.6398 13.0827 15.0867 12.4807 14.9858 11.8357 C 14.8993 11.2767 14.784 10.7034 14.5533 10.1588",
        }),
        {
          id: "sb3-paintbucket",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 11.537 11.8292 L 8.9661 11.8292 L 6.3016 9.1647 L 9.1686 6.2977 L 13.1263 10.2554 L 11.537 11.8292 Z M 14.778 9.6945 L 9.1686 4.1007 L 6.3016 1.2337 C 6.0056 0.9221 5.507 0.9221 5.1953 1.2337 L 1.222 5.207 C 0.926 5.5031 0.926 6.0017 1.222 6.2977 L 4.1046 9.1647 L 8.0935 13.1536 C 8.2337 13.3094 8.4363 13.3873 8.6388 13.3873 L 11.8642 13.3873 C 12.0668 13.3873 12.2693 13.3094 12.4096 13.1536 L 14.778 10.8008 C 15.074 10.5047 15.074 10.0061 14.778 9.6945 L 14.778 9.6945 Z",
        }),
        {
          id: "sb3-eraser",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 3 M 0 2.9999999999999996 A 3 3 0 0 1 6 3 L 3 10 L 0 3 M 4.5 3 A 1.5 1.5 0 1 1 4.499999250000062 2.998500000249999",
          "fill-rule": "evenodd",
        }),
        {
          id: "sb3-location",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M8.27206 2.68377C8.40818 2.27543 8.79032 2 9.22075 2H10.7792C11.2097 2 11.5918 2.27543 11.7279 2.68377L12.3219 4.4658C12.7914 4.663 13.2304 4.91818 13.6302 5.22238L15.4721 4.84547C15.8938 4.75917 16.3234 4.9524 16.5386 5.32516L17.3178 6.67485C17.533 7.04761 17.4856 7.51627 17.2 7.83832L15.9529 9.24468C15.984 9.49208 16 9.74417 16 10C16 10.2558 15.984 10.5079 15.9529 10.7553L17.2 12.1617C17.4856 12.4837 17.533 12.9524 17.3178 13.3252L16.5386 14.6748C16.3234 15.0476 15.8938 15.2408 15.4721 15.1545L13.6302 14.7776C13.2304 15.0818 12.7914 15.337 12.3219 15.5342L11.7279 17.3162C11.5918 17.7246 11.2097 18 10.7792 18H9.22075C8.79032 18 8.40818 17.7246 8.27206 17.3162L7.67805 15.5342C7.20862 15.337 6.76955 15.0818 6.36982 14.7776L4.52792 15.1545C4.10623 15.2408 3.67663 15.0476 3.46141 14.6748L2.68217 13.3252C2.46696 12.9524 2.51442 12.4837 2.8 12.1617L4.04708 10.7553C4.016 10.5079 3.99999 10.2558 3.99999 10C3.99999 9.74416 4.016 9.49207 4.04707 9.24466L2.8 7.83832C2.51442 7.51627 2.46696 7.04761 2.68217 6.67485L3.46141 5.32516C3.67663 4.9524 4.10623 4.75917 4.52792 4.84547L6.3698 5.22238C6.76954 4.91818 7.20861 4.663 7.67805 4.4658L8.27206 2.68377ZM9.99999 8C8.89542 8 7.99999 8.89543 7.99999 10C7.99999 11.1046 8.89542 12 9.99999 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 9.99999 8Z`,
          "fill-rule": "evenodd",
        }),
        {
          id: "sb3-gears",
          transform: "translate(-2, -5)",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 10 7.5 L 10 10 L 0.5 10 A 7.5 7.5 0 0 1 0.2389 9.3779 L 2.3298 8.4117 A 5.25 5.25 0 0 1 2.3298 6.5883 L 0.2389 5.6221 A 7.5 7.5 0 0 1 0.5709 4.6299 L 0.5709 4.6299 A 7.5 7.5 0 0 1 1.0378 3.6935 L 3.1995 4.4887 A 5.25 5.25 0 0 1 4.4887 3.1995 L 3.6935 1.0378 A 7.5 7.5 0 0 1 4.6299 0.5709 L 4.6299 0.5709 A 7.5 7.5 0 0 1 5.6221 0.2389 L 6.5883 2.3298 A 5.25 5.25 0 0 1 8.4117 2.3298 L 9.3779 0.2389 A 7.5 7.5 0 0 1 10 0.5 L 10 7.5 L 9.75 7.5 A 2.25 2.25 0 1 1 9.75 7.4978`,
          "fill-rule": "evenodd",
        }),
        {
          id: "sb3-gearPartial",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 10 5
              L 10 5 A 5 5 0 0 1 9.962730758206611 5.609346717025737
              L 8.939231012048833 5.694592710667721 A 4 4 0 0 1 8.595176185196667 6.75348458715631
              L 9.373098535696979 7.424048101231685 A 5 5 0 0 1 9.045084971874736 7.938926261462366
              L 9.045084971874736 7.938926261462366 A 5 5 0 0 1 8.656768508095853 8.409991800312493
              L 7.778633481835989 7.877359201354604 A 4 4 0 0 1 6.877886251143563 8.531790371435708
              L 7.113091308703497 9.53153893518325 A 5 5 0 0 1 6.545084971874737 9.755282581475768
              L 6.545084971874737 9.755282581475768 A 5 5 0 0 1 5.954044976882725 9.908135917238319
              L 5.5566924038402625 8.96107227496628 A 4 4 0 0 1 4.443307596159738 8.96107227496628
              L 4.045955023117276 9.908135917238319 A 5 5 0 0 1 3.454915028125263 9.755282581475768
              L 3.454915028125263 9.755282581475768 A 5 5 0 0 1 2.886908691296503 9.53153893518325
              L 3.122113748856438 8.531790371435708 A 4 4 0 0 1 2.221366518164012 7.877359201354606
              L 1.343231491904148 8.409991800312493 A 5 5 0 0 1 0.9549150281252636 7.938926261462367
              L 0.9549150281252636 7.938926261462367 A 5 5 0 0 1 0.6269014643030211 7.424048101231685
              L 1.4048238148033318 6.75348458715631 A 4 4 0 0 1 1.060768987951168 5.694592710667721
              L 0.03726924179338997 5.609346717025738 A 5 5 0 0 1 0 5.000000000000001
              L 0 5.000000000000001 A 5 5 0 0 1 0.03726924179338997 4.390653282974261
              L 1.060768987951168 4.305407289332278 A 4 4 0 0 1 1.4048238148033314 3.2465154128436917
              L 0.6269014643030211 2.575951898768315 A 5 5 0 0 1 0.9549150281252627 2.061073738537635
              L 0.9549150281252627 2.061073738537635 A 5 5 0 0 1 1.343231491904147 1.5900081996875084
              L 2.22136651816401 2.1226407986453966 A 4 4 0 0 1 3.122113748856437 1.468209628564292
              L 2.8869086912965 0.46846106481675154 A 5 5 0 0 1 3.4549150281252623 0.24471741852423268
              L 3.4549150281252623 0.24471741852423268 A 5 5 0 0 1 4.045955023117273 0.09186408276168034
              L 4.44330759615974 1.0389277250337186 A 4 4 0 0 1 5.556692403840262 1.0389277250337186
              L 5.954044976882721 0.09186408276167946 A 5 5 0 0 1 6.545084971874736 0.2447174185242318
              L 6.545084971874736 0.2447174185242318 A 5 5 0 0 1 7.113091308703498 0.46846106481675065
              L 6.877886251143561 1.4682096285642916 A 4 4 0 0 1 7.778633481835986 2.122640798645393
              L 8.656768508095853 1.5900081996875088 A 5 5 0 0 1 9.045084971874736 2.061073738537633
              L 9.045084971874736 2.061073738537633 A 5 5 0 0 1 9.373098535696979 2.5759518987683157
              L 8.595176185196669 3.246515412843692 A 4 4 0 0 1 8.939231012048833 4.305407289332275
              L 9.962730758206611 4.3906532829742595 A 5 5 0 0 1 10 5L 10 5
              L 8 5 A 3 3 0 1 1 7.999998500000125 4.997000000499998
              L 6 5 A 1 1 0 1 1 5.999999500000042 4.999000000166666`,
          "fill-rule": "evenodd",
        }),
        {
          id: "sb3-gearBig",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 9.5 5 A 4.5 4.5 0 1 1 9.5 4.9955 M 0.5 5 L 9.5 5 M 4.6332 0.5127 A 7.5 7.5 0 0 0 4.6332 9.4826 M 5.3668 0.5127 A 7.5 7.5 0 0 1 5.3668 9.4826",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-globe",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 9.5 5 A 4.5 4.5 0 1 1 9.5 4.9955 M 0.5 5 L 9.5 5 M 4.6332 0.5127 A 7.5 7.5 0 0 0 4.6332 9.4826 M 5.3668 0.5127 A 7.5 7.5 0 0 1 5.3668 9.4826 M 1 3 L 9 3 M 1 7 L 9 7`,
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-globeBig",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 10,
          height: 10,
        }),
        {
          id: "sb3-square",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.group([
            SVG.el("path", {
              d: "M6.75652727,15.5218 L6.75652727,1.2698",
              "stroke-width": 0.75,
              fill: "none",
            }),
            SVG.el("path", {
              d: "M1.51161818,13.2809091 C1.51161818,10.3841818 3.8598,8.036 6.75652727,8.036 C9.65198182,8.036 12.0001636,10.3841818 12.0001636,13.2809091",
              "stroke-width": 0.75,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              fill: "none",
            }),
            SVG.el("path", {
              d: "M10.9663273,14.315 C10.9663273,13.7435455 11.4296,13.2815455 11.9997818,13.2815455 C12.5725091,13.2815455 13.0345091,13.7435455 13.0345091,14.315",
              "stroke-width": 0.75,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              fill: "none",
            }),
            SVG.el("path", {
              d: "M0.477527273,14.315 C0.477527273,13.7435455 0.939527273,13.2815455 1.51098182,13.2815455 C2.08243636,13.2815455 2.54570909,13.7435455 2.54570909,14.315",
              "stroke-width": 0.75,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              fill: "none",
            }),
          ]),
          SVG.group([
            SVG.el("path", {
              d: "M9.60527273,8.03587273 L3.906,8.03587273 C3.20345455,8.03587273 2.63327273,7.46696364 2.63327273,6.76314545 L2.63327273,4.63641818 C2.63327273,3.93387273 3.20345455,3.36369091 3.906,3.36369091 L9.60527273,3.36369091 C10.3090909,3.36369091 10.878,3.93387273 10.878,4.63641818 L10.878,6.76314545 C10.878,7.46696364 10.3090909,8.03587273 9.60527273,8.03587273",
              stroke: "none",
            }),
            SVG.el("path", {
              d: "M9.11310909,13.0782909 L4.39892727,13.0782909 C3.77147273,13.0782909 3.26238182,12.5692 3.26238182,11.9404727 L3.26238182,11.0126545 C3.26238182,9.0832 4.82656364,7.51901818 6.75601818,7.51901818 C8.68547273,7.51901818 10.2496545,9.0832 10.2496545,11.0126545 L10.2496545,11.9404727 C10.2496545,12.5692 9.74056364,13.0782909 9.11310909,13.0782909",
              stroke: "none",
            }),
            SVG.el("path", {
              d: "M7.777,15.5218 C7.777,16.0843455 7.32009091,16.5425273 6.75627273,16.5425273 C6.19245455,16.5425273 5.73554545,16.0843455 5.73554545,15.5218 C5.73554545,14.9579818 6.19245455,14.4998 6.75627273,14.4998 C7.32009091,14.4998 7.777,14.9579818 7.777,15.5218",
              stroke: "none",
            }),
            SVG.el("path", {
              d: "M8.03052727,1.27450909 C8.03052727,1.9796 7.46034545,2.54978182 6.75652727,2.54978182 C6.05143636,2.54978182 5.48125455,1.9796 5.48125455,1.27450909 C5.48125455,0.570690909 6.05143636,0.000509090909 6.75652727,0.000509090909 C7.46034545,0.000509090909 8.03052727,0.570690909 8.03052727,1.27450909",
              stroke: "none",
            }),
            SVG.el("path", {
              d: "M8.75636364,6.40398182 L4.75490909,6.40398182 C4.36672727,6.40398182 4.05236364,6.08961818 4.05236364,5.70016364 C4.05236364,5.31198182 4.36672727,4.99634545 4.75490909,4.99634545 L8.75636364,4.99634545 C9.14581818,4.99634545 9.46145455,5.31198182 9.46145455,5.70016364 C9.46145455,6.08961818 9.14581818,6.40398182 8.75636364,6.40398182",
              fill: "#575e75",
              stroke: "none",
            }),
          ]),
        ]),
        {
          id: "sb3-robot",
          transform: "translate(-1, 1)",
        },
      ),
      SVG.setProps(
        SVG.el(
          "path",
          {
            d: "M23 16.7 18.7 21c-.4.3-.9.4-1.3.2s-.7-.6-.7-1.1v-1.6l-6-.8c-1-.1-1.7-.9-1.7-1.9v-.2c.1-.9.8-1.5 1.6-1.6l6-.9v-1.6c0-.5.3-.9.7-1.1.4-.2.9-.1 1.3.3L23 15c.2.2.3.5.3.8l-.3.9z",
            stroke: "#000",
            "stroke-opacity": 0.1,
            "stroke-width": 2,
          },
          {
            paintOrder: "stroke",
            transformOrigin: "13px 13px",
          },
        ),
        {
          id: "sb3-arrowUp",
          transform: "matrix(0, -1, 1, 0, -10, -5), translate(-2, 2)",
        },
      ),
      SVG.setProps(
        SVG.el(
          "path",
          {
            d: "M22.6 16.3zM16.2 19l-5.6-.8a2.5 2.5 0 0 1-2.1-2.4v-.3c.2-1.1 1-1.9 2-2l5.6-.8v-1.1c0-.7.4-1.3 1-1.6.6-.3 1.3-.1 1.8.4l4.3 4.3c.3.3.5.7.5 1.2 0 .4-.2.9-.5 1.2L19 21.4c-.5.5-1.2.6-1.8.3-.6-.3-1-.9-1-1.5V19z",
            fill: "none",
            "stroke-width": 1,
          },
          {
            paintOrder: "stroke",
            transformOrigin: "13px 13px",
          },
        ),
        {
          id: "sb3-arrowUpOutline",
          transform: "matrix(0, -1, 1, 0, -10, -5), translate(-2, 2)",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.666666666666666 3.3333333333333335 L 5 1 L 3.3333333333333335 3.3333333333333335 M 5 1 L 5 9.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: "none",
        }),
        {
          id: "sb3-arrowUpThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp",
          transform: "translate(16.5, 15), rotate(180)",
        }),
        {
          id: "sb3-arrowDown",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline",
          transform: "translate(16.5, 15), rotate(180)",
        }),
        {
          id: "sb3-arrowDownOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin",
          transform: "rotate(180 5 5)",
        }),
        {
          id: "sb3-arrowDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp",
          transform: "translate(0, 15.5), rotate(-90)",
        }),
        {
          id: "sb3-arrowLeft",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline",
          transform: "translate(0, 15.5), rotate(-90)",
        }),
        {
          id: "sb3-arrowLeftOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin",
          transform: "rotate(-90 5 5)",
        }),
        {
          id: "sb3-arrowLeftThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp",
          transform: "translate(-6, 0), rotate(90 10 10)",
        }),
        {
          id: "sb3-arrowRight",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline",
          transform: "translate(-6, 0), rotate(90 5 5)",
        }),
        {
          id: "sb3-arrowRightOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin",
          transform: "rotate(90 5 5)",
        }),
        {
          id: "sb3-arrowRightThin",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.666666666666666 3.3333333333333335 L 5 1 L 3.3333333333333335 3.3333333333333335 M 6.666666666666666 6.666666666666666 L 5 9 L 3.3333333333333335 6.666666666666666 M 5 1 L 5 9",
          fill: "none",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
        {
          id: "sb3-arrowUpDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpDownThin",
          transform: "rotate(90 5 5)",
        }),
        {
          id: "sb3-arrowLeftRightThin",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 0 0 L 7.5 5 L 0 10 Z`,
          }),
          SVG.el("rect", {
            x: 7.5,
            y: 0,
            width: 2.5,
            height: 10,
          }),
        ]),
        {
          id: "sb3-stepForward",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M4.98116 1H15.0196C16.4042 1 17.6158 2.21154 17.6158 3.59615V10.8654H13.635C11.385 10.8654 9.65424 12.7692 9.65424 14.8462V18.8269H4.98116C3.59655 18.8269 2.38501 17.6154 2.38501 16.2308V3.59615C2.38501 2.21154 3.59655 1 4.98116 1ZM6.01963 9.82692H8.78886C9.48116 9.82692 10.0004 9.48077 10.0004 8.78846C10.0004 8.09615 9.48116 7.75 8.96193 7.75H6.01963C5.50039 7.75 4.98116 8.26923 4.98116 8.78846C4.98116 9.30769 5.50039 9.82692 6.01963 9.82692ZM14.1542 5.84615H6.01963C5.32732 5.84615 4.98116 5.32692 4.98116 4.80769C4.98116 4.28846 5.50039 3.76923 6.01963 3.76923H14.1542C14.6735 3.76923 15.1927 4.28846 15.1927 4.80769C15.0196 5.32692 14.6735 5.84615 14.1542 5.84615ZM17.4427 12.25H13.4619C12.0773 12.25 10.8658 13.4615 10.8658 15.0192V19L17.4427 12.25Z",
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
        }),
        {
          id: "sb3-file",
          transform: "translate(-1, 0)",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 4.5 5.5 L 1 9 M 5.5 4.5 L 9 1`,
            "stroke-width": 2,
          }),
          SVG.el("path", {
            d: `M 0 10 L 0 5 L 5 10 Z M 10 0 L 5 0 L 10 5 Z`,
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-fullScreen",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.group([
            SVG.el("path", {
              d: `M 3.5 6.5 L 1 9 M 6.5 3.5 L 9 1`,
              "stroke-width": 1.4285714285714286,
            }),
            SVG.el("path", {
              d: `M 0 10 L 0 6.666666666666666 L 3.3333333333333335 10 Z M 10 0 L 6.666666666666666 0 L 10 3.3333333333333335 Z`,
              stroke: "none",
            }),
          ]),
          SVG.setProps(
            SVG.group([
              SVG.el("path", {
                d: `M 3.5 6.5 L 1 9 M 6.5 3.5 L 9 1`,
                "stroke-width": 1.4285714285714286,
              }),
              SVG.el("path", {
                d: `M 0 10 L 0 6.666666666666666 L 3.3333333333333335 10 Z M 10 0 L 6.666666666666666 0 L 10 3.3333333333333335 Z`,
                stroke: "none",
              }),
            ]),
            {
              transform: "translate(10 0) rotate(90)",
            },
          ),
        ]),
        {
          id: "sb3-grow",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 3.5 6.5 L 0.5 9.5 M 6.5 3.5 L 9.5 0.5`,
            "stroke-width": 2,
          }),
          SVG.el("path", {
            d: `M 5.5 4.5 L 10 4.5 L 5.5 0 Z M 4.5 5.5 L 0 5.5 L 4.5 10 Z`,
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-normalScreen",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.group([
            SVG.el("path", {
              d: `M 3.5 6.5 L 0.5 9.5 M 6.5 3.5 L 9.5 0.5`,
              "stroke-width": 1.25,
            }),
            SVG.el("path", {
              d: `M 6 4 L 9.5 4 L 6 0.5 Z M 4 6 L 0.5 6 L 4 9.5 Z`,
              stroke: "none",
            }),
          ]),
          SVG.setProps(
            SVG.group([
              SVG.el("path", {
                d: `M 3.5 6.5 L 0.5 9.5 M 6.5 3.5 L 9.5 0.5`,
                "stroke-width": 1.25,
              }),
              SVG.el("path", {
                d: `M 6 4 L 9.5 4 L 6 0.5 Z M 4 6 L 0.5 6 L 4 9.5 Z`,
                stroke: "none",
              }),
            ]),
            {
              transform: "translate(10 0) rotate(90)",
            },
          ),
        ]),
        {
          id: "sb3-shrink",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            width: 12,
            height: 10,
            filter: "brightness(0.5)",
          }),
          SVG.el("rect", {
            x: 6,
            width: 6,
            height: 5,
          }),
        ]),
        {
          id: "sb3-smallStage",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            width: 12,
            height: 10,
          }),
          SVG.el("rect", {
            x: 6,
            width: 6,
            height: 5,
            filter: "brightness(0.5)",
          }),
        ]),
        {
          id: "sb3-normalStage",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 13,
          height: 10,
        }),
        {
          id: "sb3-stage",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 5 3.3333333333333335 L 1.6666666666666667 10 M 5 3.3333333333333335 L 5 10 M 5 3.3333333333333335 L 8.333333333333334 10",
            "stroke-width": 0.6666666666666666,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 0 0 L 10 0 L 10 5.5 L 8 5.5 L 8 7.5 L 0 7.5 Z",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 10 5.5 L 8 5.5 L 8 7.5 Z",
            stroke: "none",
            filter: "brightness(0.75)",
          }),
        ]),
        {
          id: "sb3-poster",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 2 5 L 5 10 L 8 3 L 10 0 L 6.5 2 L 5 6.5 Z",
          stroke: "none",
        }),
        {
          id: "sb3-tick",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("use", {
            href: "#sb3-rectangle",
          }),
          SVG.el("use", {
            href: "#sb3-tick",
          }),
        ]),
        {
          id: "sb3-checkedBox",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          x: 0.5,
          y: 0.5,
          width: 9.5,
          height: 9.5,
          "stroke-width": 1,
          fill: "none",
        }),
        {
          id: "sb3-rectangle",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 10,
          height: 10,
        }),
        {
          id: "sb3-rectangleSolid",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 2,
          cx: 2,
          cy: 5,
        }),
        {
          id: "sb3-dot",
        },
      ),
      SVG.setProps(
        SVG.el("line", {
          x1: 9.5,
          y1: 0.5,
          x2: 0.5,
          y2: 9.5,
          "stroke-width": 1,
          "stroke-linecap": "round",
        }),
        {
          id: "sb3-line",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 9.5 5 M 5 0.5 L 5 9.5",
          "stroke-linecap": "round",
          "stroke-width": 1,
        }),
        {
          id: "sb3-cross",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 9.5 5 M 5 0.5 L 5 9.5 M 7.833333333333334 5 A 2.8333333333333335 2.8333333333333335 0 1 1 7.8333319166667845 4.997166667138887",
          "stroke-width": 1,
          fill: "none",
        }),
        {
          id: "sb3-crosshairs",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 3.3333333333333335 6.666666666666667 Q 0.5 6.666666666666667 0.5 3.3333333333333335 Q 0.5 0.5 3.3333333333333335 0.5 L 6.666666666666667 0.5 Q 9.5 0.5 9.5 3.3333333333333335 Q 9.5 6.666666666666667 6.666666666666667 6.666666666666667 L 1.6666666666666667 9.5 Z",
        }),
        {
          id: "sb3-speechBubble",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 3.3333333333333335 6.666666666666667 Q 0.5 6.666666666666667 0.5 3.3333333333333335 Q 0.5 0.5 3.3333333333333335 0.5 L 6.666666666666667 0.5 Q 9.5 0.5 9.5 3.3333333333333335 Q 9.5 6.666666666666667 6.666666666666667 6.666666666666667 L 1.6666666666666667 9.5 Z",
          "stroke-width": 1,
          fill: "none",
        }),
        {
          id: "snap-speechBubbleOutline",
        },
      ),
      SVG.setProps(
        SVG.el(
          "path",
          {
            d: "M15.5581635,12.7700651 L11.8403972,16.4941315 C11.5610922,16.7671364 11.1830854,16.9211391 10.7903784,16.9211391 C10.3990715,16.9211391 10.0210647,16.7671364 9.74035971,16.4941315 L6.02399342,12.7700651 C5.5969858,12.3430574 5.47098355,11.7060461 5.70198767,11.1530362 C5.93299179,10.6000263 6.46500128,10.24302 7.06701202,10.24302 L8.40403587,10.24302 C8.36903525,9.92101423 8.27803362,9.55700774 8.12403088,9.17200087 C8.07573002,9.05999887 8.02602913,8.94799688 7.97002813,8.83599488 C7.89302676,8.70999263 7.90072689,8.67499201 7.79502501,8.52098926 C7.62702201,8.26898476 7.47301926,8.07998139 7.29031601,7.86297752 C6.9200094,7.4639704 6.47200141,7.12096429 5.99599292,6.86895979 C5.5129843,6.6169553 5.00897531,6.46295255 4.56096732,6.37895105 C4.11995945,6.30194968 3.71395221,6.29494955 3.47594796,6.29494955 C3.35694584,6.28794943 3.2029431,6.31594993 3.12594172,6.32295005 C3.04194022,6.32995018 2.99293935,6.3369503 2.99293935,6.3369503 C2.49593048,6.38595117 2.04792249,6.02194468 1.99892162,5.52493582 C1.95692087,5.10492832 2.20192524,4.72692158 2.57293186,4.58691908 C2.57293186,4.58691908 2.62193273,4.56591871 2.6989341,4.53791821 C2.78993573,4.50991771 2.87393723,4.46091684 3.06994072,4.40491584 C3.46194772,4.28591371 3.95895658,4.15991147 4.60996819,4.09691034 C5.25397968,4.04090934 6.03099354,4.05490959 6.85070816,4.22291259 C7.66902276,4.39791571 8.53003812,4.72692158 9.32805235,5.20293007 C9.7060591,5.44793444 10.1120663,5.73493956 10.427072,6.01494456 C10.5670745,6.11994643 10.8050787,6.35795068 10.9450812,6.5049533 C11.1060841,6.67295629 11.2530867,6.84095929 11.4007893,7.01596241 C11.9670994,7.7159749 12.3871069,8.47198839 12.6601118,9.15800062 C12.8211147,9.55000762 12.9331167,9.92101423 13.0171182,10.24302 L14.5151449,10.24302 C15.1171556,10.24302 15.6491651,10.6000263 15.8801692,11.1530362 C16.1111734,11.7060461 15.9851711,12.3430574 15.5581635,12.7700651",
            transform:
              "translate(5, 3) scale(-1, 1) rotate(-45.000000) translate(-11.994247, -10.494247) ",
            stroke: "#000",
            "stroke-opacity": 0.1,
            "stroke-width": 2,
          },
          {
            paintOrder: "stroke",
          },
        ),
        {
          id: "sb3-turnBack",
        },
      ),
      SVG.setProps(
        SVG.el(
          "path",
          {
            d: "M17.5581635,12.7700651 L13.8403972,16.4941315 C13.5610922,16.7671364 13.1830854,16.9211391 12.7903784,16.9211391 C12.3990715,16.9211391 12.0210647,16.7671364 11.7403597,16.4941315 L8.02399342,12.7700651 C7.5969858,12.3430574 7.47098355,11.7060461 7.70198767,11.1530362 C7.93299179,10.6000263 8.46500128,10.24302 9.06701202,10.24302 L10.4040359,10.24302 C10.3690352,9.92101423 10.2780336,9.55700774 10.1240309,9.17200087 C10.07573,9.05999887 10.0260291,8.94799688 9.97002813,8.83599488 C9.89302676,8.70999263 9.90072689,8.67499201 9.79502501,8.52098926 C9.62702201,8.26898476 9.47301926,8.07998139 9.29031601,7.86297752 C8.9200094,7.4639704 8.47200141,7.12096429 7.99599292,6.86895979 C7.5129843,6.6169553 7.00897531,6.46295255 6.56096732,6.37895105 C6.11995945,6.30194968 5.71395221,6.29494955 5.47594796,6.29494955 C5.35694584,6.28794943 5.2029431,6.31594993 5.12594172,6.32295005 C5.04194022,6.32995018 4.99293935,6.3369503 4.99293935,6.3369503 C4.49593048,6.38595117 4.04792249,6.02194468 3.99892162,5.52493582 C3.95692087,5.10492832 4.20192524,4.72692158 4.57293186,4.58691908 C4.57293186,4.58691908 4.62193273,4.56591871 4.6989341,4.53791821 C4.78993573,4.50991771 4.87393723,4.46091684 5.06994072,4.40491584 C5.46194772,4.28591371 5.95895658,4.15991147 6.60996819,4.09691034 C7.25397968,4.04090934 8.03099354,4.05490959 8.85070816,4.22291259 C9.66902276,4.39791571 10.5300381,4.72692158 11.3280524,5.20293007 C11.7060591,5.44793444 12.1120663,5.73493956 12.427072,6.01494456 C12.5670745,6.11994643 12.8050787,6.35795068 12.9450812,6.5049533 C13.1060841,6.67295629 13.2530867,6.84095929 13.4007893,7.01596241 C13.9670994,7.7159749 14.3871069,8.47198839 14.6601118,9.15800062 C14.8211147,9.55000762 14.9331167,9.92101423 15.0171182,10.24302 L16.5151449,10.24302 C17.1171556,10.24302 17.6491651,10.6000263 17.8801692,11.1530362 C18.1111734,11.7060461 17.9851711,12.3430574 17.5581635,12.7700651",
            transform:
              "translate(5, 4.5) rotate(-45.000000) translate(-6.994247, -5.494247) ",
            stroke: "#000",
            "stroke-opacity": 0.1,
            "stroke-width": 2,
          },
          {
            paintOrder: "stroke",
          },
        ),
        {
          id: "sb3-turnForward",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("radialGradient", {
              id: "sb3-magnifyingGlass-fill",
            }),
            [
              SVG.el("stop", {
                offset: "0%",
                "stop-color": "rgba(0, 0, 0, 0.5)",
              }),
              SVG.el("stop", {
                offset: "100%",
                "stop-color": "rgba(0, 0, 0, 0.25)",
              }),
            ],
          ),
          SVG.el("path", {
            d: "M 7.934615859097789 5.065384140902211 A 3 3 0 1 1 7.934614359097914 5.062384141402209",
            stroke: "none",
            filter: "invert(1)",
          }),
          SVG.el("path", {
            d: "M 7.934615859097789 5.065384140902211 A 3 3 0 1 1 7.934614359097914 5.062384141402209",
            stroke: "none",
            filter: "invert(1)",
            fill: "url(#sb3-magnifyingGlass-fill)",
          }),
          SVG.el("path", {
            d: "M 7.934615859097789 5.065384140902211 A 3 3 0 1 1 7.934614359097914 5.062384141402209",
            fill: "none",
            "stroke-width": 1,
          }),
          SVG.el("path", {
            d: "M 1 9 L 2.6985478815979995 7.3014521184020005",
            fill: "none",
            "stroke-width": 2,
          }),
        ]),
        {
          id: "sb3-magnifyingGlass",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 7.934615859097789 5.065384140902211 A 3 3 0 1 1 7.934614359097914 5.062384141402209
              M 1 9 L 2.6985478815979995 7.3014521184020005`,
          fill: "none",
        }),
        {
          id: "sb3-magnifierOutline",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("use", {
            href: "#sb3-rectangle",
            "stroke-dasharray": 3,
          }),
          SVG.el("use", {
            href: "#sb3-arrowDown",
            transform: "translate(7, 4) scale(0.5) rotate(135)",
          }),
        ]),
        {
          id: "sb3-selection",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 3.5 9 A 2.5 2.5 0 0 1 1 6.5 L 0.7679491924311226 5.444444444444445 A 2 2 0 0 1 3.5 2.7123936368755674 L 2.0358983848622456 2.9999999999999996 A 4 4 0 0 1 9.125231148146598 3.3095269530372002 L 6.52094453300079 3.0455767409633756 A 3 3 0 0 1 6 9 Z",
          fill: "none",
        }),
        {
          id: "sb3-closedBrush",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.09046106882113736 2.013030214988503 A 1.5 1.5 0 1 1 3 1.5 L 3 5.5 L 1 6 Z M 3.016044443118978 6.10721239031346 A 1 1 0 1 1 1.2651922469877919 6.57635182233307 Z
              M 7 4.5 A 1.5 1.5 0 1 1 9.909538931178863 5.013030214988503 L 9 8.5 L 7 8 Z M 8.75 9 A 1 1 0 1 1 6.883974596215562 8.5 Z`,
        }),
        {
          id: "sb3-footprints",
        },
      ),
      SVG.setProps(
        SVG.group(
          (() => {
            // It's much easier to generate this icon instead
            let children = [],
              h = 10,
              u = h / 10,
              k = h / 5,
              row,
              col

            for (row = 0; row < 2; row += 1) {
              for (col = 0; col < 5; col += 1) {
                children.push(
                  SVG.el("rect", {
                    x: (u + k) * col + u,
                    y: (u + k) * row + u,
                    width: k,
                    height: k,
                  }),
                )
              }
            }
            children.push(
              SVG.el("rect", {
                x: u * 4,
                y: u * 7,
                width: k * 4,
                height: k,
              }),
            )

            return children
          })(),
        ),
        {
          id: "sb3-keyboard",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("mask", {
              id: "sb3-keyboard-holes",
            }),
            [
              SVG.el("rect", {
                width: 16,
                height: 10,
                fill: "white",
              }),
              SVG.el("use", {
                href: "#sb3-keyboard",
                fill: "black",
              }),
            ],
          ),
          SVG.el("rect", {
            width: 16,
            height: 10,
            mask: "url(#sb3-keyboard-holes)",
          }),
        ]),
        {
          id: "sb3-keyboardFilled",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("mask", {
              id: "sb3-listNarrow-holes",
            }),
            [
              SVG.el("rect", {
                x: "0",
                y: "0",
                width: "5",
                height: "10",
                fill: "white",
              }),
              SVG.el("rect", {
                x: "1",
                y: "1",
                width: "3",
                height: "2",
                fill: "black",
              }),
              SVG.el("rect", {
                x: "1",
                y: "4",
                width: "3",
                height: "2",
                fill: "black",
              }),
              SVG.el("rect", {
                x: "1",
                y: "7",
                width: "3",
                height: "2",
                fill: "black",
              }),
            ],
          ),
          SVG.el("rect", {
            x: "0",
            y: "0",
            width: "5",
            height: "10",
            mask: "url(#sb3-listNarrow-holes)",
          }),
        ]),
        {
          id: "sb3-listNarrow",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-flipHorizontal",
          transform: "translate(1 15) rotate(-90)",
        }),
        {
          id: "sb3-flipVertical",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            fill: "#575E75",
            opacity: 0.5,
            cx: 8,
            cy: 0.7,
            r: 1,
          }),
          SVG.el("circle", {
            fill: "#575E75",
            opacity: 0.5,
            cx: 8,
            cy: 3.875,
            r: 1,
          }),
          SVG.el("circle", {
            fill: "#575E75",
            opacity: 0.5,
            cx: 8,
            cy: 7,
            r: 1,
          }),
          SVG.el("circle", {
            fill: "#575E75",
            opacity: 0.5,
            cx: 8,
            cy: 10.125,
            r: 1,
          }),
          SVG.el("circle", {
            fill: "#575E75",
            opacity: 0.5,
            cx: 8,
            cy: 13.25,
            r: 1,
          }),

          SVG.el("path", {
            d: "M0,10.9157458 L0,3.08425423 C0,2.56573745 0.742550911,2.30430042 1.17470525,2.67176469 L5.79807074,6.58896289 C6.06730975,6.81554165 6.06730975,7.18591078 5.79807074,7.41248954 L1.17470525,11.3282353 C0.742550911,11.6956996 0,11.4342626 0,10.9157458",
          }),
          SVG.el("path", {
            d: "M16,3.08425423 L16,10.9157458 C16,11.4342626 15.2574491,11.6956996 14.8235798,11.3282353 L10.2019293,7.41103711 C9.93269025,7.18445835 9.93269025,6.81408922 10.2019293,6.58751046 L14.8235798,2.67176469 C15.2574491,2.30430042 16,2.56573745 16,3.08425423",
            opacity: 0.5,
          }),
        ]),
        {
          id: "sb3-flipHorizontal",
          transform: "translate(1, 0)",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M2,3.25 L14,3.25 C14.4437164,3.25 14.7904293,3.63311343 14.7462779,4.07462779 L13.6363275,15.1741315 C13.5468672,16.0687347 12.7940775,16.75 11.8950124,16.75 L4.10498756,16.75 C3.20592253,16.75 2.45313279,16.0687347 2.36367248,15.1741315 L1.25372211,4.07462779 C1.20957067,3.63311343 1.55628356,3.25 2,3.25 Z M8.75,12 L8.75,7 C8.75,6.58578644 8.41421356,6.25 8,6.25 C7.58578644,6.25 7.25,6.58578644 7.25,7 L7.25,12 C7.25,12.4142136 7.58578644,12.75 8,12.75 C8.41421356,12.75 8.75,12.4142136 8.75,12 Z M11.25,12 L11.25,7 C11.25,6.58578644 10.9142136,6.25 10.5,6.25 C10.0857864,6.25 9.75,6.58578644 9.75,7 L9.75,12 C9.75,12.4142136 10.0857864,12.75 10.5,12.75 C10.9142136,12.75 11.25,12.4142136 11.25,12 Z M6.25,12 L6.25,7 C6.25,6.58578644 5.91421356,6.25 5.5,6.25 C5.08578644,6.25 4.75,6.58578644 4.75,7 L4.75,12 C4.75,12.4142136 5.08578644,12.75 5.5,12.75 C5.91421356,12.75 6.25,12.4142136 6.25,12 Z M1.5,4 L14.5,4 L1.5,4 Z M1.5,3 L14.5,3 C15.0522847,3 15.5,3.44771525 15.5,4 C15.5,4.55228475 15.0522847,5 14.5,5 L1.5,5 C0.94771525,5 0.5,4.55228475 0.5,4 C0.5,3.44771525 0.94771525,3 1.5,3 Z M9.25,3.25 L9.25,2 C9.25,1.86192881 9.13807119,1.75 9,1.75 L7,1.75 C6.86192881,1.75 6.75,1.86192881 6.75,2 L6.75,3.25 L9.25,3.25 Z M7,0.25 L9,0.25 C9.96649831,0.25 10.75,1.03350169 10.75,2 L10.75,4.75 L5.25,4.75 L5.25,2 C5.25,1.03350169 6.03350169,0.25 7,0.25 Z`,
        }),
        {
          id: "sb3-trash",
          transform: "scale(1.1, 1.1), translate(0, -1.5)",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 1 4 L 1.5 9.5 L 2.5 10 L 7.5 10 L 8.5 9.5 L 9 4 L 1 4
                M 2.5 5.5 A 0.5 0.5 0 0 1 3.5 5.5 L 3.5 8.5 A 0.5 0.5 0 0 1 2.5 8.5
                M 4.5 5.5 A 0.5 0.5 0 0 1 5.5 5.5 L 5.5 8.5 A 0.5 0.5 0 0 1 4.5 8.5
                M 6.5 5.5 A 0.5 0.5 0 0 1 7.5 5.5 L 7.5 8.5 A 0.5 0.5 0 0 1 6.5 8.5`,
          }),
          SVG.el("path", {
            d: `M 2 0 L 6 0 L 8 2 L 8 3.5 L 2 3.5 Z`,
          }),
          SVG.el("path", {
            d: `M 6 0 L 8 2 L 6 2 Z`,
            filter: "brightness(0.75)",
          }),
        ]),
        {
          id: "sb3-trashFull",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.5 2.5 L 5 0.5 L 9.5 2.5 L 9.5 7.5 L 5 9.5 L 0.5 7.5 Z
              M 5 4.5 L 0.5 2.5 M 5 4.5L 9.5 2.5 M 5 4.5 L 5 9.5`,
        }),
        {
          id: "sb3-cube",
          fill: "none",
          "stroke-width": 1,
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("use", {
            href: "#sb3-cube",
          }),
          SVG.el("path", {
            d: "M 5 4.5 L 9.5 2.5 L 9.5 7.5 L 5 9.5 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-cubeSolid",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 6.875 8.247595264191645 A 3.75 3.75 0 1 1 8.75 5 M 10.625 1.752404735808355 A 3.75 3.75 0 1 1 8.75 5.000000000000001`,
        }),
        {
          id: "sb3-infinity",
          fill: "none",
          "stroke-width": 2.5,
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M12.63 12.637a.886.886 0 0 1-.755-1.333 2.569 2.569 0 0 0 0-2.6.888.888 0 0 1 .31-1.213.878.878 0 0 1 1.204.311 4.346 4.346 0 0 1 0 4.401.875.875 0 0 1-.758.434zm2.627 1.418a.886.886 0 0 1-.755-1.333 5.367 5.367 0 0 0 0-5.437.888.888 0 0 1 .309-1.212.88.88 0 0 1 1.204.31 7.138 7.138 0 0 1 0 7.238.877.877 0 0 1-.758.434zM10.379 5.68v8.641c0 1.024-1.207 1.56-1.96.87l-1.624-1.492a3.112 3.112 0 0 0-2.104-.82h-.284A1.41 1.41 0 0 1 3 11.464V8.55c0-.781.63-1.414 1.407-1.414h.268c.78 0 1.529-.293 2.104-.82L8.42 4.81c.753-.69 1.96-.154 1.96.869Z`,
          stroke: "none",
          transform: "translate(-3, -5)",
        }),
        {
          id: "sb3-speaker",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M15 13.51a.5.5 0 0 1-.5.5H9.197a.495.495 0 0 0-.353.146l-.698.698a.5.5 0 0 1-.353.146H6.207a.5.5 0 0 1-.353-.146l-.698-.698a.497.497 0 0 0-.353-.146H3.5a.5.5 0 0 1-.5-.5V10.5a.5.5 0 0 1 .5-.5h1.293a.5.5 0 0 1 .353.146l.708.708a.5.5 0 0 0 .353.146h1.586a.5.5 0 0 0 .353-.146l.708-.708A.5.5 0 0 1 9.207 10H14.5a.5.5 0 0 1 .5.5zm2-5a.5.5 0 0 1-.5.5H9.197a.495.495 0 0 0-.353.146l-.698.698a.5.5 0 0 1-.353.146H6.207a.5.5 0 0 1-.353-.146l-.698-.698a.497.497 0 0 0-.353-.146H3.5a.5.5 0 0 1-.5-.5V5.5a.5.5 0 0 1 .5-.5h1.293a.5.5 0 0 1 .353.146l.708.708A.5.5 0 0 0 6.207 6h1.586a.5.5 0 0 0 .353-.146l.708-.708A.5.5 0 0 1 9.207 5H16.5a.5.5 0 0 1 .5.5Z`,
          "clip-path": "evenodd",
        }),
        {
          id: "sb3-blocks",
          transform: "scale(0.7, 0.7), translate(1, -3)",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("use", {
            href: "#sb3-turtle",
            width: 13,
            height: 10,
            transform: "scale(0.8) translate(0, 1.9999999999999996)",
            stroke: "none",
          }),
          SVG.el("path", {
            d: `M 10.791666666666668 0.5416666666666666 L 10.791666666666668 3.875 M 9.125 2.2083333333333335 L 12.458333333333334 2.2083333333333335`,
            "stroke-width": 1.0833333333333333,
          }),
        ]),
        {
          id: "sb3-turtlePlus",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: `M 2 16.8 L 14.8 16.8 M 8.4 10.4 L 8.4 23.2`,
        }),
        {
          id: "sb3-plusSign",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M32.179206,25.8739208 C32.6367303,28.1567449 30.5131455,29.9998773 27.4339971,29.9998773 C24.3647303,29.9998773 21.5108854,28.1567449 21.0622546,25.8739208 C20.6037421,23.5891115 22.7273269,21.7380389 25.8054872,21.7380389 C26.4517526,21.7380389 27.0881363,21.8224042 27.695863,21.9722765 C28.0328302,22.0576343 28.3322467,22.1519249 28.6326515,22.2740063 C29.5022441,22.2541557 28.5288932,19.9802643 26.7976133,10.0450167 C24.6641469,-2.25841293 29.8579865,8.17508593 35.5656764,7.29173224 C41.2743545,6.40738602 35.6417658,12.1124613 31.9163518,11.1358096 C28.1919261,10.1492325 27.2660076,3.98262977 32.179206,25.8739208 Z M15.1819287,31.8640908 C15.6303634,34.1479226 13.5067189,36 10.4387935,36 C7.37086801,36 4.51827022,34.1479226 4.05995811,31.8640908 C3.61152342,29.580259 5.73418015,27.7291742 8.81099529,27.7291742 C9.81256529,27.7291742 10.784503,27.9256968 11.6645808,28.2730854 C12.4873696,28.2175032 11.5154318,25.895955 9.80268788,16.0450074 C7.67015372,3.74248891 12.8617237,14.1740717 18.5669193,13.2917047 C24.2731026,12.3984198 18.6429754,18.1134582 14.9191895,17.1258821 C11.1963913,16.1392986 10.2708774,9.97364751 15.1819287,31.8640908 Z",
            fill: "#FFFFFF",
            "fill-rule": "evenodd",
          }),
          SVG.el("path", {
            d: "M28.4556415,21.6745421 C28.4474055,21.3634794 28.369363,20.8496307 28.1995784,19.9728414 C28.1037431,19.4779354 27.5879591,16.9509031 27.4466594,16.2422025 C27.0518671,14.2620888 26.6870914,12.323342 26.3049652,10.1304439 C25.5725555,5.90673049 25.6122037,4.07922905 26.648684,3.60349339 C27.1506216,3.37310831 27.7097758,3.52166387 28.4906566,3.95241253 C28.9041424,4.18049917 30.6720146,5.31826586 30.5601951,5.24852558 C32.5537086,6.49185204 34.0240028,7.02437753 35.4891331,6.79762586 C37.0155215,6.56116905 37.9944288,6.73774774 38.3662137,7.41639935 C38.7139096,8.0510791 38.381158,8.83164591 37.6373333,9.59688636 C36.1644488,11.1121773 33.6607258,12.1100097 31.7883207,11.6191397 C30.9659276,11.4012929 30.5502283,11.1552429 29.4079363,10.3531635 C29.3743484,10.3295792 29.3427713,10.3076886 29.3131966,10.2874416 C29.3597256,10.8802721 29.5768269,12.0269787 30.0299858,14.0896776 C30.3236231,15.4262624 32.1088669,23.2772929 32.6670697,25.7644265 L32.6694567,25.7756646 C33.1980454,28.4130656 30.7966941,30.4998773 27.4339971,30.4998773 C24.1430884,30.4998773 21.0712009,28.5123215 20.5720284,25.9722987 C20.0422841,23.3325351 22.4445945,21.2380389 25.8054872,21.2380389 C26.4765406,21.2380389 27.152289,21.323245 27.818641,21.4875853 C28.0470648,21.5454478 28.2557264,21.6064234 28.4556415,21.6745421 Z M11.4603834,27.6660525 C11.449493,27.3473764 11.3687107,26.8265433 11.1936814,25.9278972 C11.1041405,25.4681708 10.5986562,22.9911462 10.4414905,22.2012718 C10.0512987,20.2402689 9.68884553,18.3091587 9.31003453,16.1304045 C8.57791398,11.9068255 8.61757452,10.0794272 9.65375704,9.60365326 C10.1556415,9.37320778 10.7146942,9.52176496 11.4953768,9.95251918 C11.9087466,10.1806026 13.6762672,11.3184675 13.5642028,11.2485539 C15.5566657,12.4915907 17.0261524,13.0240555 18.4895877,12.7977211 C20.0154534,12.5588516 20.994354,12.7339691 21.366342,13.41244 C21.7140891,14.0466977 21.3813991,14.827334 20.6379048,15.592574 C19.1643383,17.1092393 16.6614771,18.1052349 14.7911052,17.6091982 C13.9690525,17.3913449 13.5538673,17.1455182 12.4116989,16.3433357 C12.3782724,16.3198592 12.3468384,16.2980617 12.3173888,16.2778937 C12.3638944,16.8707911 12.5809055,18.0175387 13.0338708,20.0802326 C13.3275254,21.4174647 15.1123026,29.2696498 15.6698018,31.754638 L15.6725603,31.7677544 C16.1904939,34.4055374 13.7886493,36.5 10.4387935,36.5 C7.15343223,36.5 4.08027866,34.5065931 3.56932659,31.9604272 C3.05115654,29.3214405 5.4536949,27.2291742 8.81099529,27.2291742 C9.71504274,27.2291742 10.6128764,27.3796016 11.4603834,27.6660525 Z",
            "stroke-opacity": 0.1,
            stroke: "#000000",
            "stroke-width": 1,
          }),
        ]),
        {
          id: "sb3-musicBlock",
          fill: "none",
        },
      ),

      SVG.el("image", {
        id: "sb3-microbitBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAACmlBMVEUAAAArKysrIB8lJCNBRlY2O0U9X48sKCvOoBQzKzMnJyfrswi/xdDRoxN2dnbToxPosgnmsAq/lxo6MSq0kCLOoRXKnhbEmhc7LRooJCTcqQ7OoBXstAjpsgi9lhuvjCCPdSd4Zyg2NjZMi+Slhyq8lR5CR1fZqBG+lh3ttQjFnBnLnhbDmhqZore3kh5ARlW2kR6qiCGcfyU6QEtyYyd4ZSDSoxOGdDedgizLnhfgrA25kx9YXWqbgCxMUWDfqwzcqg/VphBBR1ecpLmcgSzHmxijq77BmRprYkOOlKZARlVGdbabo7m3kRxGcrKwjB9ARVSIjaCZobuVeyahgh+VdyE8XIOLayBIOydBR1f/vwBMl//m5+g+Q1JlanY6P0uCiJjj5OU9QVBARVQ/RFP9vgBFZpjk5ebwtgbzuAR0eotARlZITl3d3+KNlKRQVmRNUmGxs7mRlJtUW2nLnhfInRfpsQn1uQS/wsa0t7qlp62doKeKjpeBg41YXmxCSlvGyMtHb6xCUGlCTGBJgdJDSFVobXlMlPhLhtq/wchIesFGbqpDVXRXXGxCTGNiXEe+lh1LjuzP0dRJg9RIfslJfMW9v8RGbKRFY5Jzd4NdYm88QE1+bjrQpCHQohTxtwVLkPDa3OHd3t9If826vMCusLZHcrGIj6F6gpaDho9ESlpITFOQeTLcqhnEmhnqsw34uwVKkfNNhdi6vMRLUWBPUFC7lzDWpx31uQjutQj6vAP5+frZ29zZ2dvW2NtHc7JGbKVFaJx/hpl/hpdxd4hzd4JDWHpDUm5UWWiZhEh3aT6WfC/EnSqtiyW/lxzBmRpKi+VQgMhRermqq7BSdrCLjpVEXYVEW4A/SFtOT1BaV0pxZUCpjT2xkTcYNOUYAAAAWXRSTlMADBgV5DRLEdcIE+3Z2QLt6unOI/zp1dEcDf7z7eu9qVtFBPv7+/fx7u3p3NnOzcq0lXZENzD6+fj39vTm5uXk4t3c2tbS0c/NvrCopKKcm4yLbGpiTUA3JzDAPbYAAAQqSURBVFjD7dX1fxJhHMDxE+MIRRFrdnd3d3fr9ziwhsVsmC2K6HRTtzlb0ens2uzu7m79X3z4HufdwTNvj/qbfPYaPDe+vMf23AEXL168/6bBTfoWx5r0GskxVMhsoDfg3Lb12LlzIwz0zKZYzzy0lkPVKtXdutXw++o2a5UQ7SUMcqibGpA8kD09slX0azRkazwISB5Inn4D+ShwrNYjIHpQQA96mqPAYlqPgOhBAT0oUpgGyh6C6EHYWz11e7jbO9hAxUMQPezR6+wtW0nBlJzV7CB62nIyN/mB5H/ouM0G0j3ITIXsAMDUVMjcygbSPQgqrzCNDaR7sCEzO2cLKSvlLNP/ED1qgbRbh0m37viBAUSPvU/BYFZWcAMFRI+9HW/fOFLSgAaixw6erZWS5qeBVG+XKwlghWsuwALXHIA5rgUAc10r1KADvViwKNDaLO4EWCQuA5gnLgVYKs4DWCYuUoPoFRhcKa4FWCwuB1gizgeYLy4BWC4uBqWPq9Cjg55EJ5bogUi7J0wBmDwhMXzjBHBOmAyQSG4wnPd4cJ4Kejbem4gdTQL9NPN00Hlk0jRs//0p+puinaeDs0XxwMFtk8RZM6fob4pmPl/wxtqkOcemIai7Kco8HTx/88Ns8dBxgMcrEdTfFKcyP/9m1xhwwbV30sBGCdTPqczPu9Y5BoTzZODAg6S5kT9Zf1PU8+fz25TrTJuizOd32kjtL9CmaOfpJ/Zd5UTV3RTtfP6X3mfl0tNNuVSpILYp5xHL25ccFUQv9cwGhrcvPZB4jgiovyn6IHrrZFB/U/RBf6rD8f4sgqzRwTtZQfKZGPiXm4Kxb8rff6awgf9sU5jTB9O79G63BqTW1C5baQ9geNSwvnIEJ8s2PCkPXqhTtlM6HUxvWpiv3h6kyozmDY2egnzUkjc3/3X0bAjPt3gW+VWVxvFtSn6hgi9acxzfeI001yiBs46pI7/AkjzHVSgjg5XIkwvXB+xbcxNnGraHCmZUr8nxJS/g3AlC1KzujQgnOpo5axufDFasYLUa2gK2p2ohzlTtJB2sV6NCNSECCtUq1Kj3CxSq2luXlY8gufF4e9PkCLiwpWFULg38+qKiILgFYe9Lr++07zSur4SXr7zeV5Gj0z5vxt69GVcFt1vI874kS6/0pDIZsWB6crLgzhNI+wRhOrm7Sr5n4HIhWeW5yRJ/EBYuS4+5yUN5Vy9fuewT6GDouQq8qAFDITX4/XmuDF788eTJRQpoD4PTT6nAXA14KVcNhshgBDx16VTokk9oZo4Czf0JiEkgpoCYApJkEPMJwxOiQFONDn8DlrRbuWjRXrWEzWKzlOhnLNfHWN5S2Va5cndjufLG8uWMpRs0sFmqdMNliRKlS1nIlw2Xxh5kWaVKC0NNLiarqdAfZ+LixYsX77f9BFJt17cXqnnkAAAAAElFTkSuQmCC",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M23.513 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M24.91 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M9.54 11.17h-.728c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M10.938 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479z",
          }),
          SVG.el("path", {
            d: "M26.305 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M27.702 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M29.101 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M30.498 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M17.925 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M19.322 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M20.717 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M22.114 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M15.129 11.17H14.4c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M16.526 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M12.335 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.882v-1.08c0-.265-.26-.479-.577-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M13.732 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M31.893 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M33.29 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
            stroke: "#3D79CC",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            "stroke-width": ".893",
            d: "M4.47 20.474h27.961l2.157 2.974",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993",
            fill: "#E6E7E8",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
            fill: "#E6E7E8",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            fill: "#E6E7E8",
            d: "M19.53 24.438h11.294V20.47H19.529z",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            "stroke-width": ".893",
            d: "M19.53 24.438h11.294V20.47H19.529zm12.902-3.964l2.157-2.794",
          }),
        ]),
        {
          id: "sb3-wedoBlock",
          fill: "none",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            stroke: "#7C87A5",
            fill: "#FFF",
            x: ".5",
            y: "3.59",
            width: "28",
            height: "25.81",
            rx: "1",
          }),
          SVG.el("rect", {
            stroke: "#7C87A5",
            fill: "#E6E7E8",
            x: "2.5",
            y: ".5",
            width: "24",
            height: "32",
            rx: "1",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            fill: "#FFF",
            d: "M2.5 14.5h24v13h-24z",
          }),
          SVG.el("path", {
            d: "M14.5 10.5v4",
            stroke: "#7C87A5",
            fill: "#E6E7E8",
          }),
          SVG.el("rect", {
            fill: "#414757",
            x: "4.5",
            y: "2.5",
            width: "20",
            height: "10",
            rx: "1",
          }),
          SVG.el("rect", {
            fill: "#7C87A5",
            opacity: ".5",
            x: "13.5",
            y: "20.13",
            width: "2",
            height: "2",
            rx: ".5",
          }),
          SVG.el("path", {
            d: "M9.06 20.13h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1.5a1 1 0 0 1 0-2zM19.93 22.13h-1.51a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1.5a1 1 0 0 1 .01 2zM8.23 17.5H5a.5.5 0 0 1-.5-.5v-2.5h6l-1.85 2.78a.51.51 0 0 1-.42.22zM18.15 18.85l-.5.5a.49.49 0 0 0-.15.36V20a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5v-.29a.49.49 0 0 0-.15-.36l-.5-.5a.51.51 0 0 1 0-.71l1.51-1.49a.47.47 0 0 1 .35-.15h3.58a.47.47 0 0 1 .35.15l1.51 1.49a.51.51 0 0 1 0 .71zM10.85 23.45l.5-.5a.49.49 0 0 0 .15-.36v-.29a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v.29a.49.49 0 0 0 .15.36l.5.5a.5.5 0 0 1 0 .7l-1.51 1.5a.47.47 0 0 1-.35.15h-3.58a.47.47 0 0 1-.35-.15l-1.51-1.5a.5.5 0 0 1 0-.7z",
            fill: "#7C87A5",
            opacity: ".5",
          }),
          SVG.el("path", {
            d: "M21.5 27.5h5v4a1 1 0 0 1-1 1h-4v-5z",
            stroke: "#CC4C23",
            fill: "#F15A29",
          }),
        ]),
        {
          transform: "translate(5.5 3.5)",
          id: "sb3-ev3Block",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M35 28H5a1 1 0 0 1-1-1V12c0-.6.4-1 1-1h30c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1z",
            fill: "#fff",
          }),
          SVG.el("path", {
            fill: "red",
            d: "M4 25h32v2.7H4zm9-1h-2.2a1 1 0 0 1-1-1v-9.7c0-.6.4-1 1-1H13c.6 0 1 .4 1 1V23c0 .6-.5 1-1 1z",
          }),
          SVG.el("path", {
            fill: "red",
            d: "M6.1 19.3v-2.2c0-.5.4-1 1-1h9.7c.5 0 1 .5 1 1v2.2c0 .5-.5 1-1 1H7.1a1 1 0 0 1-1-1z",
          }),
          SVG.el("circle", { fill: "red", cx: "22.8", cy: "18.2", r: "3.4" }),
          SVG.el("circle", { fill: "red", cx: "30.6", cy: "18.2", r: "3.4" }),
          SVG.el("path", { fill: "red", d: "M4.2 27h31.9v.7H4.2z" }),
          SVG.el("circle", {
            fill: "#e0e0e0",
            cx: "22.8",
            cy: "18.2",
            r: "2.3",
          }),
          SVG.el("circle", {
            fill: "#e0e0e0",
            cx: "30.6",
            cy: "18.2",
            r: "2.3",
          }),
          SVG.el("path", {
            fill: "#e0e0e0",
            d: "M12.5 22.9h-1.2c-.3 0-.5-.2-.5-.5V14c0-.3.2-.5.5-.5h1.2c.3 0 .5.2.5.5v8.4c0 .3-.2.5-.5.5z",
          }),
          SVG.el("path", {
            fill: "#e0e0e0",
            d: "M7.2 18.7v-1.2c0-.3.2-.5.5-.5h8.4c.3 0 .5.2.5.5v1.2c0 .3-.2.5-.5.5H7.7c-.3 0-.5-.2-.5-.5zM4 26h32v2H4z",
          }),
          SVG.el("path", {
            stroke: "#666",
            "stroke-width": ".5",
            d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
          }),
          SVG.el("path", {
            stroke: "#666",
            "stroke-width": ".5",
            d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
          }),
        ]),
        {
          id: "sb3-makeymakeyBlock",
          fill: "none",
        },
      ),
      SVG.el("image", {
        id: "sb3-gdxforBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABAlBMVEUAAAABAQEAAAB9h6YAAAAAAAAAAAB8iKZ7iKaAjKvm5+h+iqhcXFxGR0d8iKbj5OV9iKZ8h6be3+Db3d19h6acnJ0AAAB7nrDh4uPh4uN9iabZ2tt9iKbX19nJycnExsZ8iKe+wMC7vL2Eka/g4ePU1dV8iKZ9iKZ9iKd+iKitra2RkZGLjo5wcHCLi7l0oqJV//9csdZ8h6WFkq//vwDm5+iEka79vgJ6iql9iaaHk6tgq9Btm71+iadmo8dzk7OCj6yAjKp/iqhiqc1qnsB4jKtgrNFwl7d1tLTgtCxpocN0krJ2j65ossWNtZSbt4LAulHWsDnasTTuvhXzvg9zk7TzqAfaAAAAMXRSTlMAJiLoFBwI8q4a+0c4M/nr3tnQwKxYDAnk2726tbGMh4J9dinXq56ddG9nT01ACwsDk/+seAAAAidJREFUWMPt2Olu2kAUhuE5NvuaBAhZm7TpvufgMXaBbmAghOzp/d9KD7RW6yaqPeL7YVV9/471aBgfCXnUH7ULNhtkF96qv1dgwwoxoM08cDsJcwfMdgwonoiJPRFjQXkscQM3Adhxk4NuJwkoDx0nSp5NDTiae958NEaBwzkvC4YYcOxx7fCoeJhnrwcBv7H9TklFm08R4JD5SEkiMg8B4IjXwsV1HgHAPu+EizsQcMbr2B0OufZz7X0NcIZSwC9+rD3nADI2/fCtrHEfAvZ8Liqp6PuIwZZO+ZmSnspcY8AZ55WU5xkElDwuK1Vm7xgFTjhfLud5AgPHAUvBGARKvYnnTXpp/gvAg9PLyykSPLt1nNszIHjuSOdAcNp1nO4UeYYXNzcX0UH62P+0AnjH8lgCgL8s/+uXzwZgrOV2JAMwxpIMwRjLHIyxzMEYyxyMWgAwYiHAzm99iLQ6eOJEul4d7Ea6WhG8W7rAE+fertHgVXp+clpB9Oet64M/wH2TKwI/FrRFTH6JIZ6NvmZpxoDtptlFULOtzGPWy+4/r//gvwKGgcC90NtTqIg2dIuyClaWDvTjKlDMLba4UaUMcIuVbd0gyiGwjGVlFuKWfkQZhEfSQnypd8mCvOHGvkA5quo6EQSs6yrlNumN3obs0KKGHJ70QD+hLOQMW7r0sFI5KJVeY+bGkr1JopKlEG0StXbrW/uvQGMookXLLPFAZYTMJju/7z6rRW1MZcnIAAAAAElFTkSuQmCC",
      }),
      SVG.el("image", {
        id: "sb3-boostBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAKlBMVEUAAAD///98h6Xm5+iVnrb/Zhq+w9L5hk73+Pnf4eSQmbLr7Ozo39vp184hSCf6AAAAAXRSTlMAQObYZgAAAOFJREFUSMftlDEOgjAUhonhAi1sLvIk7NDJDTYu0LhzBzcXruHoDTyFB/BCNi30KU3InzioSb++hAS+vPfKa5pEIpHvk7a8gpf8ISWINtlg4i7ZFOKVTBlqsUR+ItYZJG7VzQQgMqGYd7zWRArpULEAe5Q/J9JMj4rluC7uleNw7TFRXcoREDnlinjX57eUsvRTn8+AE0/6OKV0g5buYTTyWFFr/XAp3aDzed4yFJWnKbhPbtaXXohDNYlDJWz4zSxEokkkEjb496AiVtqAbIYgYNGWBmhgES+NX6SRSORfeAJMWajr95DdqQAAAABJRU5ErkJggg==",
      }),
    ]
  }
  static makeOriginalIcons() {
    return [
      ...Style.makeCommonIcons(),
      SVG.setProps(
        SVG.el("path", {
          d: "M6,9 C5.72520708,9 5.45163006,8.89695045 5.24127973,8.68965311 L2.31461357,5.80666227 C1.89512881,5.39326583 1.89512881,4.72464202 2.31461357,4.31004733 C2.73288244,3.89665089 9.26711756,3.89665089 9.68538643,4.31004733 C10.1048712,4.72344377 10.1048712,5.39326583 9.68538643,5.80666227 L6.75993617,8.68965311 C6.54958583,8.89695045 6.27600882,9 6,9",
          stroke: "none",
          fill: "#575e75",
        }),
        {
          id: "sb3-commentArrowDown",
        },
      ),

      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-commentArrowDown",
          transform:
            "translate(6.000000, 6.500000) scale(1, -1) translate(-6.000000, -6.500000)",
        }),
        {
          id: "sb3-commentArrowUp",
        },
      ),
      // TODO: Make the outlines match the block outlines
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M22.68,12.2a1.6,1.6,0,0,1-1.27.63H13.72a1.59,1.59,0,0,1-1.16-2.58l1.12-1.41a4.82,4.82,0,0,0-3.14-.77,4.31,4.31,0,0,0-2,.8,4.25,4.25,0,0,0-1.34,1.73,5.06,5.06,0,0,0,.54,4.62A5.58,5.58,0,0,0,12,17.74h0a2.26,2.26,0,0,1-.16,4.52A10.25,10.25,0,0,1,3.74,18,10.14,10.14,0,0,1,2.25,8.78,9.7,9.7,0,0,1,5.08,4.64,9.92,9.92,0,0,1,9.66,2.5a10.66,10.66,0,0,1,7.72,1.68l1.08-1.35a1.57,1.57,0,0,1,1.24-.6,1.6,1.6,0,0,1,1.54,1.21l1.7,7.37A1.57,1.57,0,0,1,22.68,12.2Z",
            fill: "#3d79cc",
          }),
          SVG.el("path", {
            d: "M21.38,11.83H13.77a.59.59,0,0,1-.43-1l1.75-2.19a5.9,5.9,0,0,0-4.7-1.58,5.07,5.07,0,0,0-4.11,3.17A6,6,0,0,0,7,15.77a6.51,6.51,0,0,0,5,2.92,1.31,1.31,0,0,1-.08,2.62,9.3,9.3,0,0,1-7.35-3.82A9.16,9.16,0,0,1,3.17,9.12,8.51,8.51,0,0,1,5.71,5.4,8.76,8.76,0,0,1,9.82,3.48a9.71,9.71,0,0,1,7.75,2.07l1.67-2.1a.59.59,0,0,1,1,.21L22,11.08A.59.59,0,0,1,21.38,11.83Z",
          }),
        ]),
        {
          id: "sb3-turnRight",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.34,18.21a10.24,10.24,0,0,1-8.1,4.22,2.26,2.26,0,0,1-.16-4.52h0a5.58,5.58,0,0,0,4.25-2.53,5.06,5.06,0,0,0,.54-4.62A4.25,4.25,0,0,0,15.55,9a4.31,4.31,0,0,0-2-.8A4.82,4.82,0,0,0,10.4,9l1.12,1.41A1.59,1.59,0,0,1,10.36,13H2.67a1.56,1.56,0,0,1-1.26-.63A1.54,1.54,0,0,1,1.13,11L2.85,3.57A1.59,1.59,0,0,1,4.38,2.4,1.57,1.57,0,0,1,5.62,3L6.7,4.35a10.66,10.66,0,0,1,7.72-1.68A9.88,9.88,0,0,1,19,4.81,9.61,9.61,0,0,1,21.83,9,10.08,10.08,0,0,1,20.34,18.21Z",
            fill: "#3d79cc",
          }),
          SVG.el("path", {
            d: "M19.56,17.65a9.29,9.29,0,0,1-7.35,3.83,1.31,1.31,0,0,1-.08-2.62,6.53,6.53,0,0,0,5-2.92,6.05,6.05,0,0,0,.67-5.51,5.32,5.32,0,0,0-1.64-2.16,5.21,5.21,0,0,0-2.48-1A5.86,5.86,0,0,0,9,8.84L10.74,11a.59.59,0,0,1-.43,1H2.7a.6.6,0,0,1-.6-.75L3.81,3.83a.59.59,0,0,1,1-.21l1.67,2.1a9.71,9.71,0,0,1,7.75-2.07,8.84,8.84,0,0,1,4.12,1.92,8.68,8.68,0,0,1,2.54,3.72A9.14,9.14,0,0,1,19.56,17.65Z",
          }),
        ]),
        {
          id: "sb3-turnLeft",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el(
            "path",
            {
              d: "M11.1795886,5.69863689 C10.0344146,5.50396503 8.8909358,5.87638076 8.11109855,6.59582023 L9.1028481,7.58526111 C9.48429024,7.97460483 9.2130425,8.63564275 8.66207052,8.63564275 L4.61878391,8.63564275 C4.27972423,8.63564275 4,8.35633095 4,8.0169248 L4,3.98044614 C4,3.42944014 4.66116637,3.15943873 5.05108499,3.53947206 L5.89873418,4.38587144 C6.67009494,3.78492788 7.56860307,3.35326419 8.50949367,3.15012834 C9.60296112,2.91398291 10.7379634,2.95630288 11.7814195,3.27793465 C13.8835895,3.91273418 15.5110759,5.6732449 15.977283,7.68767544 C16.0874774,8.17012309 15.7823237,8.66103473 15.2991637,8.77106665 C14.8499096,8.88109857 14.409132,8.62717876 14.2480787,8.21244306 L14.2480787,8.20397906 C13.7310127,6.85735764 12.4849684,5.89246235 11.1795886,5.69863689 Z M8.82041139,14.3015249 C9.96473779,14.4953503 11.1090642,14.123781 11.8889014,13.4043415 L10.8971519,12.4140542 C10.5157098,12.0247105 10.7861099,11.364519 11.3379295,11.364519 L15.3803684,11.364519 C15.7202758,11.364519 16,11.6438308 16,11.9823906 L16,16.0197156 C16,16.5698752 15.337986,16.840723 14.9480674,16.4598433 L14.1004182,15.6134439 C13.3290574,16.2143875 12.4313969,16.6460512 11.4896587,16.849187 C10.3961912,17.0861788 9.26118897,17.0438589 8.21858047,16.7222271 C6.11641049,16.0874276 4.48892405,14.3269169 4.022717,12.3124863 C3.9125226,11.8300387 4.21682866,11.339127 4.70083635,11.2290951 C5.15009042,11.1190632 5.59002034,11.372983 5.75192134,11.7877187 L5.75192134,11.7961827 C6.26813969,13.1419577 7.51503165,14.106853 8.82041139,14.3015249 Z",
              transform:
                "translate(10.000000, 10.000000) rotate(90.000000) translate(-12.000000, -15.000000) scale(1.4, 1.4)",
              stroke: "#000",
              "stroke-opacity": 0.1,
              "stroke-width": 2,
            },
            {
              paintOrder: "stroke",
            },
          ),
        ]),
        {
          id: "sb3-turnAround",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M23.3,11c-0.3,0.6-0.9,1-1.5,1h-1.6c-0.1,1.3-0.5,2.5-1.1,3.6c-0.9,1.7-2.3,3.2-4.1,4.1  c-1.7,0.9-3.6,1.2-5.5,0.9c-1.8-0.3-3.5-1.1-4.9-2.3c-0.7-0.7-0.7-1.9,0-2.6c0.6-0.6,1.6-0.7,2.3-0.2H7c0.9,0.6,1.9,0.9,2.9,0.9  s1.9-0.3,2.7-0.9c1.1-0.8,1.8-2.1,1.8-3.5h-1.5c-0.9,0-1.7-0.7-1.7-1.7c0-0.4,0.2-0.9,0.5-1.2l4.4-4.4c0.7-0.6,1.7-0.6,2.4,0L23,9.2  C23.5,9.7,23.6,10.4,23.3,11z",
            fill: "#cf8b17",
          }),
          SVG.el("path", {
            d: "M21.8,11h-2.6c0,1.5-0.3,2.9-1,4.2c-0.8,1.6-2.1,2.8-3.7,3.6c-1.5,0.8-3.3,1.1-4.9,0.8c-1.6-0.2-3.2-1-4.4-2.1  c-0.4-0.3-0.4-0.9-0.1-1.2c0.3-0.4,0.9-0.4,1.2-0.1l0,0c1,0.7,2.2,1.1,3.4,1.1s2.3-0.3,3.3-1c0.9-0.6,1.6-1.5,2-2.6  c0.3-0.9,0.4-1.8,0.2-2.8h-2.4c-0.4,0-0.7-0.3-0.7-0.7c0-0.2,0.1-0.3,0.2-0.4l4.4-4.4c0.3-0.3,0.7-0.3,0.9,0L22,9.8  c0.3,0.3,0.4,0.6,0.3,0.9S22,11,21.8,11z",
          }),
        ]),
        {
          id: "sb3-loop",
        },
      ),
      SVG.setProps(
        SVG.el("polygon", {
          points:
            "6.6,0.5 13.12,0.5 19.5,6.6 19.5,13.12 13.12,19.5 6.6,19.5 0.5,13.12 0.5,6.6 ",
          fill: "none",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
        }),
        {
          id: "sb3-polygon",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546",
          }),
          SVG.el("path", {
            d: "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
            fill: "#575E75",
            opacity: ".15",
          }),
          SVG.el("path", {
            d: "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
            fill: "#575E75",
          }),
        ]),
        {
          id: "sb3-penBlock",
          stroke: "#575E75",
          fill: "none",
          "stroke-linejoin": "round",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            opacity: 0.25,
            cx: 32,
            cy: 16,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.5,
            cx: 32,
            cy: 12,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.75,
            cx: 32,
            cy: 8,
            r: 4.5,
          }),
          SVG.el("circle", {
            cx: 32,
            cy: 4,
            r: 4.5,
          }),
          SVG.el("path", {
            d: "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
            fill: "#4D4D4D",
            "stroke-linejoin": "round",
          }),
        ]),
        {
          id: "sb3-videoBlock",
          stroke: "#000",
          fill: "#FFF",
          "stroke-opacity": 0.15,
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            cx: 8.35,
            cy: 9.65,
            r: 0.97,
            fill: "#FFF",
          }),
          SVG.el("circle", {
            cx: 14.19,
            cy: 9.65,
            r: 0.97,
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M11.27 4.14c-3.94 0-7.13 3.19-7.13 7.13s3.19 7.13 7.13 7.13 7.13-3.19 7.13-7.13-3.19-7.13-7.13-7.13m0 1.3c3.22 0 5.84 2.61 5.84 5.84s-2.61 5.84-5.84 5.84-5.84-2.61-5.84-5.84 2.61-5.84 5.84-5.84",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M17.57 13.88c.57-.15 1.02-.6 1.17-1.17l.35-1.3c.16-.61 1.04-.61 1.2 0l.35 1.3c.15.57.6 1.02 1.18 1.17l1.3.35c.61.16.61 1.04 0 1.2l-1.3.35c-.57.15-1.02.6-1.18 1.17l-.35 1.3c-.17.62-1.04.62-1.2 0l-.35-1.3c-.15-.57-.6-1.02-1.17-1.17l-1.3-.35c-.61-.17-.61-1.04 0-1.2l1.3-.35Zm-16-11.43c.43-.12.76-.45.88-.88l.26-.98c.12-.46.78-.46.9 0l.26.98c.12.43.45.76.88.88l.98.26c.46.12.46.78 0 .9l-.98.26c-.43.11-.77.45-.88.88l-.26.98c-.12.46-.78.46-.9 0l-.26-.98a1.26 1.26 0 0 0-.88-.88l-.98-.26c-.46-.12-.46-.78 0-.9z",
            fill: "#ffbf00",
            "fill-rule": "evenodd",
            stroke: "#0b8e69",
            "stroke-miterlimit": "2",
            "stroke-width": ".5",
          }),
          SVG.el("path", {
            d: "M12.68 12.53c.2-.3.6-.38.9-.18s.38.6.18.9c-.56.83-1.41 1.26-2.48 1.26s-1.93-.43-2.48-1.26c-.2-.3-.12-.7.18-.9s.7-.12.9.18c.31.46.75.68 1.41.68s1.1-.22 1.41-.68Z",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M20.89 6.06a.57.57 0 0 1-.57-.57V2.2h-3.31c-.31 0-.57-.25-.57-.57s.25-.57.57-.57h3.88c.31 0 .57.25.57.57v3.86c0 .31-.25.57-.57.57M5.44 21.46H1.59a.57.57 0 0 1-.57-.57v-3.82c0-.31.25-.57.57-.57s.57.25.57.57v3.25h3.28c.31 0 .57.25.57.57s-.25.57-.57.57",
            fill: "#0b8e69",
          }),
        ]),
        {
          id: "sb3-facesensingBlock",
          transform: "scale(1.67785234899 1.67785234899)", // 40 / 23.84
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
            fill: "#4D4D4D",
          }),
        ]),
        {
          id: "sb3-ttsBlock",
          stroke: "#000",
          "stroke-opacity": 0.15,
        },
      ),

      SVG.el("image", {
        id: "sb3-translateBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA21BMVEUAAAAAAAAAAAAAAADS0tIAAABHR0cAAADX19cAAAAAAACkpKRqamq2traurq6WlpbV1dWEhITHx8fPz8/Ly8vDw8O9vb0AAABMTEz////Z2dlXXnVMl//g4ODu7u7m5ub4+PhPmf/x8fH09PT6+vri4uNRmv/r6+1uqv/0+P9Ynv/p8v+rrrphZ33S5f+51v9ho/+1uMKBhpfH3v+Wmqhrcoacxf+Pvv/KzNSgpLGLkKDd6/+rzf9npv/AwsuDtv98s/90rv9jpP9GieeOrtm5ubl2fI7Z4u56otk5hEFfAAAAGXRSTlMAJhgM1wYyHvIkEWpBhXhc5U+uybyhk0YvleQYgwAABDpJREFUWMPtmNl6mzAQhQMCBAYbvLX1GIwxi7e2TtosTdKk+/L+T1QBVoQtJHDby5yLROYTPzOagSM4e9az6oVUrDgKxh39//Bwb+QBkTZ2VL3hypYilKWicpY6gmWcTCbxIoSh0xHjOkZXA4m0rlGcrcBsslcSmrYq4qm2GczmE6Hms6A8W4GQHZ1BTxXweuTCErGz1TEEaTpLymML6HVq87VhIWPRs21yNu679guNXn9hOnWVMUwanzxG0yCTdYQQts195umwJmnUDSatFHQRPaVvljkl4CAuRlWrCfD9uiZEbR+ObrnjfRDhwHUtdAi0gK/vLtts+VqDVfIMjZSmLEycBuD1D4kK8MHc+Ju3/FFQaHdXc4rBU/8NiCE+OJyAIQKuz32qjA7O1xzwqMtiUETAXeRzinZcyoPgsPpDcco3q9WD729WhTI/e1itbriUzwwtqPI0Q5et4ZoA6SDj1pCWOeB44qJ88aOiIB8j/xMH5IiUJwG+jfyHPMCNH20FQEpkPGnbnBeFuI78Fd82VWJCeTyQCzHb3pMCb8VAQhxBCkPKkzf2Z9J9mR9dCxqb3tBO17EoTw4ky0f0VXSnUCGE6LDp1tvlwK0cyNQMJA1DlL3Px8TenvTjpcAN5cD7VVSsoR992c4oS+aGcuDbzxFBfVqvv5L/375DCzeUAXfnOW5TJHudffvdzg3FwPdZvnbX6/LXr+9t3ZCzAAaMNh/X9BdAWzcUm9T2vnrpk91QbqOhLEDeDZuNHkBSX94Nm7ciAJOWAkW8WZIDl1MikAD57ZwceJsDL0VAfsPJwgzzO5cHvsmBb2IJkAlhB5InntlXlJcc8MO00GMzsHTbsMJDdU+hOxIeCfKuXYQu7ZJ5oDmExwPjfAEvyZ9lGyDW9tOWMH6l1z4nLwjrQ572RRugAvMS57mq4MH7czq9Kgpz1QZoDcI4DsHrWUjw4E1JbLeTSZ5z2gLYMTTwBnaOEwBvS1Ke86UUyF7isKpLrIHkSvVGBORdUQx8nFb0KAUy38aSCO8I510hMrhrBOrGEFIYGToPZM+Fn+XwiraiAMh2Uwnb+3DAC9Z/t3TIA2W7MwZkYbH+uZIC+f0jD3z9+vXF05hIAJTtcK3TLIDnMSLnhqeZlDo8eksYqH/3UskWPz7aCuDTX3urMiA5ejHCp7+YV4W9gxBnMFJP/XRwKNT3IEhLZpIGQMp86seNY6LlutRQgrFr6dLPLyELjm44eemIWt6C+JP0A1HffCIm4GDEw2jvpNTxbIwQ0kUTUYUYkgYTSXfMBU1Ee+G6fSwkOlpA/RFcJCR2erRHkllKSjNWhdd+NQbqkJrgunyPhKBIprpeiZyLZtEeCRNWQdlUZPU8yF1yYJ1J1HGGEC5iknS8pN0tRtoDDzTSNDLpqjMu2s4b9fBZg/TcJVHjrA7GSl/JZz7rWbX6A0ZzUfwVEqfrAAAAAElFTkSuQmCC",
      }),
    ]
  }

  static makeHighContrastIcons() {
    // Make sure to update the highContrastIcons set above!
    return [
      ...Style.makeCommonIcons(),
      SVG.el("path", {
        d: "M 1 1 L 5 5 L 1 9 Z",
        id: "sb3-addInput",
      }),
      SVG.el("path", {
        d: "M 1 5 L 5 1 L 5 9 Z",
        id: "sb3-delInput",
      }),

      SVG.setProps(
        SVG.el("path", {
          d: "M6,9 C5.72520708,9 5.45163006,8.89695045 5.24127973,8.68965311 L2.31461357,5.80666227 C1.89512881,5.39326583 1.89512881,4.72464202 2.31461357,4.31004733 C2.73288244,3.89665089 9.26711756,3.89665089 9.68538643,4.31004733 C10.1048712,4.72344377 10.1048712,5.39326583 9.68538643,5.80666227 L6.75993617,8.68965311 C6.54958583,8.89695045 6.27600882,9 6,9",
          stroke: "none",
          fill: "#000",
        }),
        {
          id: "sb3-commentArrowDown-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-commentArrowDown-high-contrast",
          transform:
            "translate(6.000000, 6.500000) scale(1, -1) translate(-6.000000, -6.500000)",
        }),
        {
          id: "sb3-commentArrowUp-high-contrast",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M21.38,11.83H13.77a.59.59,0,0,1-.43-1l1.75-2.19a5.9,5.9,0,0,0-4.7-1.58,5.07,5.07,0,0,0-4.11,3.17A6,6,0,0,0,7,15.77a6.51,6.51,0,0,0,5,2.92,1.31,1.31,0,0,1-.08,2.62,9.3,9.3,0,0,1-7.35-3.82A9.16,9.16,0,0,1,3.17,9.12,8.51,8.51,0,0,1,5.71,5.4,8.76,8.76,0,0,1,9.82,3.48a9.71,9.71,0,0,1,7.75,2.07l1.67-2.1a.59.59,0,0,1,1,.21L22,11.08A.59.59,0,0,1,21.38,11.83Z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-turnRight-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M19.56,17.65a9.29,9.29,0,0,1-7.35,3.83,1.31,1.31,0,0,1-.08-2.62,6.53,6.53,0,0,0,5-2.92,6.05,6.05,0,0,0,.67-5.51,5.32,5.32,0,0,0-1.64-2.16,5.21,5.21,0,0,0-2.48-1A5.86,5.86,0,0,0,9,8.84L10.74,11a.59.59,0,0,1-.43,1H2.7a.6.6,0,0,1-.6-.75L3.81,3.83a.59.59,0,0,1,1-.21l1.67,2.1a9.71,9.71,0,0,1,7.75-2.07,8.84,8.84,0,0,1,4.12,1.92,8.68,8.68,0,0,1,2.54,3.72A9.14,9.14,0,0,1,19.56,17.65Z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-turnLeft-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M11.1795886,5.69863689 C10.0344146,5.50396503 8.8909358,5.87638076 8.11109855,6.59582023 L9.1028481,7.58526111 C9.48429024,7.97460483 9.2130425,8.63564275 8.66207052,8.63564275 L4.61878391,8.63564275 C4.27972423,8.63564275 4,8.35633095 4,8.0169248 L4,3.98044614 C4,3.42944014 4.66116637,3.15943873 5.05108499,3.53947206 L5.89873418,4.38587144 C6.67009494,3.78492788 7.56860307,3.35326419 8.50949367,3.15012834 C9.60296112,2.91398291 10.7379634,2.95630288 11.7814195,3.27793465 C13.8835895,3.91273418 15.5110759,5.6732449 15.977283,7.68767544 C16.0874774,8.17012309 15.7823237,8.66103473 15.2991637,8.77106665 C14.8499096,8.88109857 14.409132,8.62717876 14.2480787,8.21244306 L14.2480787,8.20397906 C13.7310127,6.85735764 12.4849684,5.89246235 11.1795886,5.69863689 Z M8.82041139,14.3015249 C9.96473779,14.4953503 11.1090642,14.123781 11.8889014,13.4043415 L10.8971519,12.4140542 C10.5157098,12.0247105 10.7861099,11.364519 11.3379295,11.364519 L15.3803684,11.364519 C15.7202758,11.364519 16,11.6438308 16,11.9823906 L16,16.0197156 C16,16.5698752 15.337986,16.840723 14.9480674,16.4598433 L14.1004182,15.6134439 C13.3290574,16.2143875 12.4313969,16.6460512 11.4896587,16.849187 C10.3961912,17.0861788 9.26118897,17.0438589 8.21858047,16.7222271 C6.11641049,16.0874276 4.48892405,14.3269169 4.022717,12.3124863 C3.9125226,11.8300387 4.21682866,11.339127 4.70083635,11.2290951 C5.15009042,11.1190632 5.59002034,11.372983 5.75192134,11.7877187 L5.75192134,11.7961827 C6.26813969,13.1419577 7.51503165,14.106853 8.82041139,14.3015249 Z",
            transform:
              "translate(10.000000, 10.000000) rotate(90.000000) translate(-12.000000, -15.000000) scale(1.4, 1.4)",
          }),
        ]),
        {
          id: "sb3-turnAround-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M21.8,11h-2.6c0,1.5-0.3,2.9-1,4.2c-0.8,1.6-2.1,2.8-3.7,3.6c-1.5,0.8-3.3,1.1-4.9,0.8c-1.6-0.2-3.2-1-4.4-2.1
                c-0.4-0.3-0.4-0.9-0.1-1.2c0.3-0.4,0.9-0.4,1.2-0.1l0,0c1,0.7,2.2,1.1,3.4,1.1s2.3-0.3,3.3-1c0.9-0.6,1.6-1.5,2-2.6
                c0.3-0.9,0.4-1.8,0.2-2.8h-2.4c-0.4,0-0.7-0.3-0.7-0.7c0-0.2,0.1-0.3,0.2-0.4l4.4-4.4c0.3-0.3,0.7-0.3,0.9,0L22,9.8
                c0.3,0.3,0.4,0.6,0.3,0.9S22,11,21.8,11z`,
          }),
        ]),
        {
          id: "sb3-loop-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("polygon", {
          points:
            "6.6,0.5 13.12,0.5 19.5,6.6 19.5,13.12 13.12,19.5 6.6,19.5 0.5,13.12 0.5,6.6 ",
          fill: "none",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
        }),
        {
          id: "sb3-polygon-high-contrast",
        },
      ),

      // https://github.com/scratchfoundation/scratch-gui/tree/beta/src/lib/themes/high-contrast/extensions
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M26.4338 30C29.513 30 31.6366 28.1569 31.179 25.874C28.2994 13.0436 27.4256 9.85134 27.9454 9.60547C28.3125 9.43183 29.3746 10.7276 30.9162 11.1359C34.6416 12.1126 40.2742 6.40751 34.5655 7.29186C32.3224 7.639 30.1587 6.23836 28.4879 5.15679C25.9072 3.4862 24.5024 2.57684 25.7974 10.0451C26.4349 13.7035 26.9697 16.3231 27.3475 18.1739C27.9957 21.3494 28.1819 22.2616 27.6325 22.2741C27.3321 22.152 27.0327 22.0578 26.6957 21.9724C26.088 21.8225 25.4516 21.7382 24.8053 21.7382C21.7271 21.7382 19.6036 23.5892 20.0621 25.874C20.5107 28.1569 23.3646 30 26.4338 30Z",
            fill: "#000",
          }),
          SVG.el("path", {
            d: "M9.43861 36.0001C12.5065 36.0001 14.6302 34.148 14.1817 31.8642C11.3032 19.0336 10.4299 15.8416 10.9496 15.5958C11.3166 15.4222 12.3783 16.7177 13.919 17.126C17.6428 18.1136 23.2729 12.3985 17.5667 13.2918C15.3248 13.6386 13.1623 12.2382 11.4922 11.1569C8.91237 9.48636 7.50797 8.57698 8.80251 16.0451C9.44294 19.7286 9.9798 22.3594 10.358 24.2125C10.9912 27.3154 11.1795 28.2384 10.6644 28.2732C9.78432 27.9258 8.81239 27.7293 7.81082 27.7293C4.734 27.7293 2.61134 29.5804 3.05978 31.8642C3.51809 34.148 6.37069 36.0001 9.43861 36.0001Z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-musicBlock-high-contrast",
          fill: "none",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546",
          }),
          SVG.el("path", {
            d: "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
            fill: "#0b8e69",
            opacity: ".15",
          }),
          SVG.el("path", {
            d: "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
            fill: "#0b8e69",
          }),
        ]),
        {
          id: "sb3-penBlock-high-contrast",
          stroke: "#0b8e69",
          fill: "none",
          "stroke-linejoin": "round",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            opacity: 0.25,
            cx: 32,
            cy: 16,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.5,
            cx: 32,
            cy: 12,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.75,
            cx: 32,
            cy: 8,
            r: 4.5,
          }),
          SVG.el("circle", {
            cx: 32,
            cy: 4,
            r: 4.5,
          }),
          SVG.el("path", {
            d: "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
            fill: "#000",
            "stroke-linejoin": "round",
          }),
        ]),
        {
          id: "sb3-videoBlock-high-contrast",
          stroke: "#0b8e69",
          fill: "#FFF",
          "stroke-opacity": 0.15,
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            fill: "#231f20",
            cx: 8.35,
            cy: 9.65,
            r: 0.97,
          }),
          SVG.el("circle", {
            fill: "#231f20",
            cx: 14.19,
            cy: 9.65,
            r: 0.97,
          }),
          SVG.el("path", {
            d: "M11.27 4.14c-3.94 0-7.13 3.19-7.13 7.13s3.19 7.13 7.13 7.13 7.13-3.19 7.13-7.13-3.19-7.13-7.13-7.13m0 1.3c3.22 0 5.84 2.61 5.84 5.84s-2.61 5.84-5.84 5.84-5.84-2.61-5.84-5.84 2.61-5.84 5.84-5.84",
            fill: "#231f20",
          }),
          SVG.el("path", {
            d: "M17.57 13.88c.57-.15 1.02-.6 1.17-1.17l.35-1.3c.16-.61 1.04-.61 1.2 0l.35 1.3c.15.57.6 1.02 1.18 1.17l1.3.35c.61.16.61 1.04 0 1.2l-1.3.35c-.57.15-1.02.6-1.18 1.17l-.35 1.3c-.17.62-1.04.62-1.2 0l-.35-1.3c-.15-.57-.6-1.02-1.17-1.17l-1.3-.35c-.61-.17-.61-1.04 0-1.2l1.3-.35Zm-16-11.43c.43-.12.76-.45.88-.88l.26-.98c.12-.46.78-.46.9 0l.26.98c.12.43.45.76.88.88l.98.26c.46.12.46.78 0 .9l-.98.26c-.43.11-.77.45-.88.88l-.26.98c-.12.46-.78.46-.9 0l-.26-.98a1.26 1.26 0 0 0-.88-.88l-.98-.26c-.46-.12-.46-.78 0-.9z",
            fill: "#ffbf00",
            "fill-rule": "evenodd",
            stroke: "#0b8e69",
            "stroke-miterlimit": "2",
            "stroke-width": ".5",
          }),
          SVG.el("path", {
            d: "M12.68 12.53c.2-.3.6-.38.9-.18s.38.6.18.9c-.56.83-1.41 1.26-2.48 1.26s-1.93-.43-2.48-1.26c-.2-.3-.12-.7.18-.9s.7-.12.9.18c.31.46.75.68 1.41.68s1.1-.22 1.41-.68Z",
            fill: "#231f20",
          }),
          SVG.el("path", {
            d: "M20.89 6.06a.57.57 0 0 1-.57-.57V2.2h-3.31c-.31 0-.57-.25-.57-.57s.25-.57.57-.57h3.88c.31 0 .57.25.57.57v3.86c0 .31-.25.57-.57.57M5.44 21.46H1.59a.57.57 0 0 1-.57-.57v-3.82c0-.31.25-.57.57-.57s.57.25.57.57v3.25h3.28c.31 0 .57.25.57.57s-.25.57-.57.57",
            fill: "#0b8e69",
          }),
        ]),
        {
          id: "sb3-facesensingBlock-high-contrast",
          transform: "scale(1.67785234899 1.67785234899)", // 40 / 23.84
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
            fill: "#FFF",
            stroke: "#0b8e69",
          }),
          SVG.el("path", {
            d: "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-ttsBlock-high-contrast",
          "stroke-opacity": 0.15,
        },
      ),

      // The original icon is in PNG, but the high contrast version uses SVG.
      // For consistency we use PNG in both places.
      // https://github.com/scratchfoundation/scratch-gui/blob/beta/src/lib/themes/high-contrast/extensions/translateIcon.svg
      // Exported via Inkscape and compressed
      SVG.el("image", {
        id: "sb3-translateBlock-high-contrast",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxoAAARjCAMAAADfFKLnAAABhlBMVEUAAAALjWkOj2oLjmkAAAAQj2wkmnkYlHILj2kLjmkAAAAAAABsu6VouaIJjmgimncAAAAAAAALjml0v6kAAAAAAAAAAAAATzhjt6A9pogVk28XlHAVk28ZlHEAAAAAAAAAAAANj2oAAAAJj2oAAAAAAAByvahsu6VVsZcqnXwAAAAAAAAAAAAMj2oQkWsAAAAPkGwAAABHqo4AAAAclnMcl3MKj2kXlHIXk3EAAAALj2gAAAD///8AAAB9w6+ExrONyrmHyLWrzv/3+/r8/v6Fx7VpqP/0+fh7s/9Ml//4/PvK59/4+//u9f/l8P/V5v9vrP9an/9Smv/o6OjMzMwrKysDAwPp8//e7P+w0f+axf9xrf9kpf9jpP9ho/9Nl//e3t7E5Nu+4dfT09OUzb2QzLuZmZlMrJKGhoYpnHxlZWVgYGBCQkINDQ30+P/J4P/D3P+11P+Nvf90rv9Jlvby8vLc3Nyl1cik1ce+vr6DxrKlpaWfn58xnJZBpJWJiYl+fn4fHx9PedmHAAAAPHRSTlMAd4OAxg/0wohyDv78+Tj16Ik6+ux+WAb79e7mvbCemW1rZDYXC/n39PTw39u8t7RVNvX11NLDm5qOWx0x5AFdAAAGd0lEQVR42uzbV3faQBCG4XGChMEU4wLujntv6WXXIUAwxd3Gvfea3nv+eQaBcgS5ztV8zwWMfsB7js7uiAAAAAAAAP6fgKfCwRMg1l49OBzqJgC5DLfZO+nQa7oNovq2Ia2rJwhArFZ/QpVI+Fspr57b8BKAUAEzrgpmXhSHjBmgvDGtQwQglKdWFaU27KnWQ0TekEvruvYwAYh08ym3ML0ei8V2NvlnfZofn98gorC2DBKASFYaq8md9MLW1kJ6O7lqp9Hj0qzqFgGIxGlYtjeUepPkwU6D20AZIJidRmxhZnbxtTMN8rpQBshlpzGdTL2dTzjSYJEnBCCVnYaaS++uqb9pAEhnpzGXXFycn1PZo2g0ejpiL410EYBQhTRepnZTs2vz776f+yYd/EG3QQAiWVd+s+nNV/yX+NEQVyXiDS0EIFKNmeAEZlRe9jyuysSDNQQgkrsvo4qOfOofvgoCEMloNWs/cgNTx9FT+7RqaUV/KI7PcFoFYgVG+7iMxpbK+19UwU+tfyENEC/SvK+yAw8cdxy5XO53AmmAdI8bD/qbxh13HMv67Ex/RhogXVfzvQ6DHGlc6L09fYk0AJgjjalrza7fIw2QrjtSksZXfXFycqm/IQ0QrrPK5XWmcbWylD+/vUIaIFtnldaFNjx+lbd8qNjhMq78QDQug7l6eAwE46pMxsSiCAhVpy1hYu7y9cKM300AMoXbOQ5XyEvMaAn6opbjKQ7jkw9L6SBZSOsxe66pqLSMNnIb/hG8TYFk3mqt66nMw4Gs2m+OEIBgE9zGcFtZHeNN/Qe3OwhAsu5HQ3fq2qiU0XG3Cd+GAwAAAAD8YQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2IMDAQAAAAAg/9dGUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUV9uBAAAAAAADI/7URVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWFPTgQAAAAAADyf20EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRX24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYU9OBAAAAAAAPJ/bQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWEPDgQAAAAAgPxfG0FVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdiDAwEAAAAAIP/XRlBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFfbgQAAAAAAAyP+1EVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2oNDAgAAAABB/1/7wgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMArKwCvdMdAc1YAAAAASUVORK5CYII=",
      }),
    ]
  }

  /**
   * @return the icon name with suffix, if a high contrast icon is defined
   */
  static iconName(name, options) {
    if (options.isHighContrast && highContrastIcons.has(name)) {
      if (snapIcons.has(name)) {
        return name
      } else {
        return `${name}-high-contrast`
      }
    }

    return name
  }

  static makeStyle() {
    const style = SVG.el("style")
    style.appendChild(SVG.cdata(Style.cssContent))
    return style
  }

  static get defaultFont() {
    return "Helvetica Neue, Helvetica, sans-serif"
  }
  static get commentFont() {
    return "Helvetica Neue, Helvetica, sans-serif"
  }

  static zebraFilter(id, isDark) {
    const f = new Filter(id)

    f.merge([
      "SourceGraphic",
      f.comp("in", f.flood(isDark ? "#000" : "#fff", 0.3), "SourceAlpha"),
    ])

    return f.el
  }
}
