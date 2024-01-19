import SVG from "./draw.js"
import Filter from "./filter.js"
import cssContent from "./style.css.js"

export default class Style {
  static get cssContent() {
    return cssContent
  }

  static makeIcons() {
    return [
      SVG.el("path", {
        d: "M 1.0027 14 L 0 12.9953 L 3.0447 0 h 1.2987 l -0.3333 1.612 s 0.668 -0.3347 2.004 0 c 1.3373 0.3353 2.0053 1.34 4.3447 1.34 c 2.3387 0 2.9753 -0.3633 2.9753 -0.3633 l -0.5487 6.5947 s -1.4247 0.67 -3.4293 0.464 c -2.0047 -0.2047 -2.0047 -1.338 -4.0093 -1.6733 c -2.0053 -0.3347 -3.008 0.3353 -3.008 0.3353 L 1.0027 14 z",
        id: "greenFlag",
      }),
      SVG.el("polygon", {
        points:
          "6.3,0.4725 12.516,0.4725 18.585,6.3 18.585,12.495 12.495,18.585 6.3,18.585 0.483,12.495 0.483,6.3  ",
        id: "stopSign",
      }),
      SVG.el("path", {
        d: "M6.724 0C3.01 0 0 2.91 0 6.5c0 2.316 1.253 4.35 3.14 5.5H5.17v-1.256C3.364 10.126 2.07 8.46 2.07 6.5 2.07 4.015 4.152 2 6.723 2c1.14 0 2.184.396 2.993 1.053L8.31 4.13c-.45.344-.398.826.11 1.08L15 8.5 13.858.992c-.083-.547-.514-.714-.963-.37l-1.532 1.172A6.825 6.825 0 0 0 6.723 0z",
        fill: "#fff",
        id: "turnRight",
      }),
      SVG.el("path", {
        d: "M3.637 1.794A6.825 6.825 0 0 1 8.277 0C11.99 0 15 2.91 15 6.5c0 2.316-1.253 4.35-3.14 5.5H9.83v-1.256c1.808-.618 3.103-2.285 3.103-4.244 0-2.485-2.083-4.5-4.654-4.5-1.14 0-2.184.396-2.993 1.053L6.69 4.13c.45.344.398.826-.11 1.08L0 8.5 1.142.992c.083-.547.514-.714.963-.37l1.532 1.172z",
        fill: "#fff",
        id: "turnLeft",
      }),
      SVG.el("path", {
        d: "M 0 0 L 6 6 L 0 12 Z",
        id: "addInput",
      }),
      SVG.el("path", {
        d: "M 0 6 L 6 0 L 6 12 Z",
        id: "delInput",
      }),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2.4000000000000004 1.2000000000000002 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 1.1988000001999994 Z
              M 2.4000000000000004 6.000000000000001 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 5.9988000002 Z
              M 2.4000000000000004 10.8 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 10.7988000002 Z`
        }),
        {
          id: "verticalEllipsis"
        }
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 16 20 l 4 -4 l 0 -6 l 6 0 l -8 -10 l -8 10 l 6 0 l 0 6 l -16 0 l 0 4",
            fill: "#000",
            opacity: "0.3",
          }),
          SVG.move(
            -1,
            -1,
            SVG.el("path", {
              d: "M 16 20 l 4 -4 l 0 -6 l 6 0 l -8 -10 l -8 10 l 6 0 l 0 6 l -16 0 l 0 4",
              opacity: "0.9",
            }),
          ),
        ]),
        {
          id: "loopArrow",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            x: "0",
            y: "0",
            width: "12",
            height: "14",
            fill: "#000",
            opacity: "0.25",
          }),
          SVG.el("rect", {
            x: "1",
            y: "1",
            width: "1",
            height: "13",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "11",
            y: "1",
            width: "1",
            height: "13",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "1",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "5",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "9",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "13",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "2",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "2",
            y: "6",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "2",
            y: "10",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "11",
            y: "0",
            width: "1",
            height: "1",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "0",
            y: "13",
            width: "1",
            height: "1",
            fill: "#ea8d1c",
          }),
        ]),
        {
          id: "list",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 10.392304845413264 6 L 0 12 Z",
        }),
        {
          id: "pointRight",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
        }),
        {
          id: "turtle",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "turtleOutline",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            width: (12 / 5) * 2,
            height: 12,
          }),
          SVG.el("rect", {
            width: (12 / 5) * 2,
            height: 12,
            x: (12 / 5) * 3,
          }),
        ]),
        {
          id: "pause",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 3 12
            A 3 3 0 0 1 2.4275730138703637 6.055118449657009
            A 2.4 2.4 0 0 1 6.000000000000001 3.2548723642506805
            A 4.8 4.8 0 0 1 15.353421766821956 4.548787410033867
            A 3.6 3.6 0 1 1 15.600000000000003 12
            Z`,
        }),
        {
          id: "cloud",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 4 0 L 0 4 L 3.2 4 L 0 8 L 3.2 8 L 0 12 L 9.6 6.6667 L 6.4 6.6667 L 9.6 2.6667 L 6.4 2.6667 L 9.6 0 Z",
        }),
        {
          id: "flash",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
        }),
        {
          id: "arrowUp",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
          fill: "none",
        }),
        {
          id: "arrowUpOutline",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 6 1.2 L 6 11.4",
          fill: "none",
        }),
        {
          id: "arrowUpThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUp",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "arrowDown",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUpOutline",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "arrowDownOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUpThin",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "arrowDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUp",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "arrowLeft",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUpOutline",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "arrowLeftOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUpThin",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "arrowLeftThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUp",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "arrowRight",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUpOutline",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "arrowRightOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUpThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "arrowRightThin",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 8 8 L 6 10.8 L 4 8 M 6 1.2 L 6 10.8",
          fill: "none",
        }),
        {
          id: "arrowUpDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#arrowUpDownThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "arrowLeftRightThin",
        },
      ),
    ]
  }

  static makeStyle() {
    const style = SVG.el("style")
    style.appendChild(SVG.cdata(Style.cssContent))
    return style
  }

  static bevelFilter(id, inset) {
    const f = new Filter(id)

    const alpha = "SourceAlpha"
    const s = inset ? -1 : 1
    const blur = f.blur(1, alpha)

    f.merge([
      "SourceGraphic",
      f.comp(
        "in",
        f.flood("#fff", 0.15),
        f.subtract(alpha, f.offset(+s, +s, blur)),
      ),
      f.comp(
        "in",
        f.flood("#000", 0.7),
        f.subtract(alpha, f.offset(-s, -s, blur)),
      ),
    ])

    return f.el
  }

  static darkFilter(id) {
    const f = new Filter(id)

    f.merge([
      "SourceGraphic",
      f.comp("in", f.flood("#000", 0.2), "SourceAlpha"),
    ])

    return f.el
  }

  static darkRect(w, h, category, el) {
    return SVG.setProps(
      SVG.group([
        SVG.setProps(el, {
          class: `sb-${category} sb-darker`,
        }),
      ]),
      { width: w, height: h },
    )
  }

  static get defaultFontFamily() {
    return "Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif"
  }
}
