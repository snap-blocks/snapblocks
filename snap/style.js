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
        d: "M 0 0 V 21 H 2 V 0 M 2 0 c 16 0 2 5 17 5 V 16 c -20 0 -6 -5 -17 -5",
        fill: "rgb(0 200 0)",
        id: "snap-greenFlag",
      }),
      SVG.el("path", {
        d:
          "M 6.17 0 L 13.83 0 L 20 6.14 L 20 13.83 L 13.83 20 L 6.17 20 L 0 13.83 L 0 6.17 Z",
        fill: "rgb(200 0 0)",
        id: "snap-stopSign",
      }),
      SVG.el("path", {
        d: "M 5 3 a 5 5 0 1 0 5 5 L 9 8 A 4 4 0 1 1 5 4 M 10 3 L 5 -2 L 5 8 Z",
        fill: "#fff",
        id: "snap-turnRight",
      }),
      SVG.el("path", {
        d: "M 5 3 a 5 5 90 1 1 -5 5 L 1 8 A 4 4 90 1 0 5 4 M 0 3 L 5 -2 L 5 8 Z",
        fill: "#fff",
        id: "snap-turnLeft",
      }),
      SVG.el("path", {
        d: "M 0 2 L 7 8 L 0 14 Z",
        fill: "#111",
        id: "snap-addInput",
      }),
      SVG.el("path", {
        d: "M 7 2 L 7 14 L 0 8 Z",
        fill: "#111",
        id: "snap-delInput",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
            fill: "#000",
            opacity: "0.3",
          }),
          SVG.move(
            -1,
            -1,
            SVG.el("path", {
              d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
              fill: "#fff",
              opacity: "0.9",
            }),
          ),
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
        SVG.el("polygon", {
          points: "0.483,0.4725 " + "16.585,9.2925 " + "0.483,18.585 ",
          fill: "black",
        }),
        {
          id: "snap-play",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
          fill: "white",
        }),
        {
          id: "snap-turtle",
        }
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
          fill: "none",
          stroke: "white",
          "stroke-width": 1,
        }),
        {
          id: "snap-turtleOutline",
        }
      ),
      SVG.setProps(
        SVG.group([
          SVG.el('rect', {
              width: (12 / 5) * 2,
              height: 12,
              fill: "rgb(255 220 0)",
          }),
          SVG.el("rect", {
            width: (12 / 5) * 2,
            height: 12,
            x: (12 / 5) * 3,
            fill: "rgb(255 220 0)",
          })
        ]),
        {
          id: "snap-pause"
        }
      ),
      SVG.setProps(
        SVG.el('path', {
          d: `M 3 12
            A 3 3 0 0 1 2.4275730138703637 6.055118449657009
            A 2.4 2.4 0 0 1 6.000000000000001 3.2548723642506805
            A 4.8 4.8 0 0 1 15.353421766821956 4.548787410033867
            A 3.6 3.6 0 1 1 15.600000000000003 12
            Z`,
          fill: 'white',
        }),
        {
          id: 'snap-cloud'
        },
      ),
      SVG.setProps(
        SVG.el('path', {
          d: `M 3 12
            A 3 3 0 0 1 2.4275730138703637 6.055118449657009
            A 2.4 2.4 0 0 1 6.000000000000001 3.2548723642506805
            A 4.8 4.8 0 0 1 15.353421766821956 4.548787410033867
            A 3.6 3.6 0 1 1 15.600000000000003 12
            Z`,
          fill: 'none',
          stroke: "white",
        }),
        {
          id: 'snap-cloudOutline'
        },
      ),
      SVG.setProps(
        SVG.el('path', {
          d: `M 3 12
            A 3 3 0 0 1 2.4275730138703637 6.055118449657009
            A 2.4 2.4 0 0 1 6.000000000000001 3.2548723642506805
            A 4.8 4.8 0 0 1 15.353421766821956 4.548787410033867
            A 3.6 3.6 0 1 1 15.600000000000003 12
            Z`,
          fill: 'white',
        }),
        {
          id: 'snap-cloud'
        },
      ),
      SVG.setProps(
        SVG.el('path', {
          d: "M 4 0 L 0 4 L 3.2 4 L 0 8 L 3.2 8 L 0 12 L 9.6 6.6667 L 6.4 6.6667 L 9.6 2.6667 L 6.4 2.6667 L 9.6 0 Z",
          fill: "white",
        }),
        {
          id: "snap-flash"
        }
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
    f.dropShadow(-0.5, -0.5, 0, 'black', 0.2)
    return f.el
  }

  static bevelFilter(id, inset) {
    const f = new Filter(id)

    const alpha = "SourceAlpha"
    const s = inset ? -0.4 : 0.2
    const blur = f.blur(0.5, alpha)

    f.merge([
      "SourceGraphic",
      f.comp(
        "in",
        f.flood("#fff", 0.7),
        f.subtract(alpha, f.offset(+s, +s, blur)),
      ),
      f.comp(
        "in",
        f.flood("#000", 0.9),
        f.subtract(alpha, f.offset(-(s * 3), -(s * 3), blur)),
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
