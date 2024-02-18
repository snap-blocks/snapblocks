import SVG from "./draw.js"
import Filter from "./filter.js"
import cssContent from "./style.css.js"

export default class Style {
  static get cssContent() {
    return cssContent
  }

  static makeIcons() {
    return [
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0.5 0 L 0.5 12",
            "stroke-width": 1,
          }),
          SVG.el("path", {
            d: "M 0 3 C 9.6 3 1.2 6 12 6",
            "stroke-width": 6,
          }),
        ]),
        {
          id: "snap-greenFlag",
        },
      ),
      SVG.el("path", {
        d: "M 6.17 0 L 13.83 0 L 20 6.14 L 20 13.83 L 13.83 20 L 6.17 20 L 0 13.83 L 0 6.17 Z",
        id: "snap-stopSign",
      }),
      SVG.el("path", {
        d: "M 5 3 a 5 5 0 1 0 5 5 L 9 8 A 4 4 0 1 1 5 4 M 10 3 L 5 -2 L 5 8 Z",
        id: "snap-turnRight",
      }),
      SVG.el("path", {
        d: "M 5 3 a 5 5 90 1 1 -5 5 L 1 8 A 4 4 90 1 0 5 4 M 0 3 L 5 -2 L 5 8 Z",
        id: "snap-turnLeft",
      }),
      SVG.el("path", {
        d: "M 0 0 L 6 6 L 0 12 Z",
        id: "snap-addInput",
      }),
      SVG.el("path", {
        d: "M 0 6 L 6 0 L 6 12 Z",
        id: "snap-delInput",
      }),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2.4000000000000004 1.2000000000000002 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 1.1988000001999994 Z
              M 2.4000000000000004 6.000000000000001 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 5.9988000002 Z
              M 2.4000000000000004 10.8 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 10.7988000002 Z`,
        }),
        {
          id: "snap-verticalEllipsis",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0 10.8 L 12 10.8 L 12 10.8 A 4.8 4.8 0 0 0 16.8 6 A 4.8 4.8 0 0 1 12 10.8 Z",
            "stroke-width": 2.4,
          }),
          SVG.el("path", {
            d: "M 16.8 0 L 10.8 6 L 24 6 Z",
            "stroke-width": 0,
          }),
        ]),
        {
          id: "snap-loopArrow",
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
          id: "snap-list",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 10.392304845413264 6 L 0 12 Z",
        }),
        {
          id: "snap-pointRight",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
        }),
        {
          id: "snap-turtle",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "snap-turtleOutline",
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
          id: "snap-pause",
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
          id: "snap-cloud",
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
          fill: "none",
        }),
        {
          id: "snap-cloudOutline",
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
          id: "snap-cloudGradient",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 4 0 L 0 4 L 3.2 4 L 0 8 L 3.2 8 L 0 12 L 9.6 6.6667 L 6.4 6.6667 L 9.6 2.6667 L 6.4 2.6667 L 9.6 0 Z",
        }),
        {
          id: "snap-flash",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.6 10 L 11.4 10 L 11.4 3 L 9 3 L 7.5 0.6 L 4.5 0.6 L 3 3 L 0.6 3 Z
          M 7.92 6 A 1.92 1.92 0 1 1 7.91999904000008 5.998080000319999 Z`,
        }),
        {
          id: "snap-camera",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 6,
          cx: 6,
          cy: 5,
        }),
        {
          id: "snap-circle",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
        }),
        {
          id: "snap-arrowUp",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
          fill: "none",
        }),
        {
          id: "snap-arrowUpOutline",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 6 1.2 L 6 11.4",
          fill: "none",
        }),
        {
          id: "snap-arrowUpThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUp",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "snap-arrowDown",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpOutline",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "snap-arrowDownOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpThin",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "snap-arrowDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUp",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "snap-arrowLeft",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpOutline",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "snap-arrowLeftOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpThin",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "snap-arrowLeftThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUp",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "snap-arrowRight",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpOutline",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "snap-arrowRightOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "snap-arrowRightThin",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 8 8 L 6 10.8 L 4 8 M 6 1.2 L 6 10.8",
          fill: "none",
        }),
        {
          id: "snap-arrowUpDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpDownThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "snap-arrowLeftRightThin",
        },
      ),
    ]
  }

  static makeStyle() {
    const style = SVG.el("style")
    style.appendChild(SVG.cdata(Style.cssContent))
    return style
  }

  static dropShadowFilter(id) {
    const f = new Filter(id)
    f.dropShadow(-0.5, -0.5, 0, "black", 0.2)
    return f.el
  }

  static bevelFilter(id, inset) {
    const f = new Filter(id)

    const alpha = "SourceAlpha"
    const s = inset ? -0.4 : 0.2
    const blur = f.blur(0.4, alpha)

    f.merge([
      "SourceGraphic",
      f.comp(
        "in",
        f.flood("#fff", 0.7),
        f.subtract(
          alpha,
          f.offset(inset ? -0.3 : 0.3, inset ? -0.3 : 0.3, blur),
        ),
      ),
      f.comp(
        "in",
        f.flood("#000", 0.9),
        f.subtract(
          alpha,
          f.offset(inset ? 0.9 : -0.8, inset ? 0.9 : -0.8, blur),
        ),
      ),
    ])

    return f.el
  }

  static darkFilter(id) {
    const f = new Filter(id)

    f.merge([
      "SourceGraphic",
      f.comp("in", f.flood("#000", 0.4), "SourceAlpha"),
    ])

    return f.el
  }

  static lightFilter(id) {
    const f = new Filter(id)

    f.merge([
      "SourceGraphic",
      f.comp("in", f.flood("#fff", 0.4), "SourceAlpha"),
    ])

    return f.el
  }

  static darkRect(w, h, category, el) {
    return SVG.setProps(
      SVG.group([
        SVG.setProps(el, {
          class: `snap-${category} snap-darker`,
        }),
      ]),
      { width: w, height: h },
    )
  }

  static get defaultFontFamily() {
    return "Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif"
  }
}
