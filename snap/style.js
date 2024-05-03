import SVG from "./draw.js"
import Color from "../shared/color.js"
import Filter from "./filter.js"
import cssContent from "./style.css.js"

export default class Style {
  static get cssContent() {
    return cssContent
  }

  static colors = {
    label: new Color(255, 255, 255),
    zebraLabel: new Color(),

    commentLabel: new Color(),

    literal: new Color(),

    booleanLiteral: new Color(255, 255, 255),

    readonlyLiteral: new Color(255, 255, 255),
    zebraReadonlyLiteral: new Color(),

    categories: {
      comment: new Color(255, 255, 180),
      commentLine: new Color(255, 255, 180),
      obsolete: new Color(200, 0, 20),
      motion: new Color(74, 108, 212),
      looks: new Color(143, 86, 227),
      sound: new Color(207, 74, 217),
      pen: new Color(0, 161, 120),
      events: new Color(230, 168, 34),
      control: new Color(230, 168, 34),
      sensing: new Color(4, 148, 220),
      operators: new Color(98, 194, 19),
      variables: new Color(243, 118, 29),
      lists: new Color(217, 77, 17),
      other: new Color(150, 150, 150),
      true: new Color(0, 200, 0),
      false: new Color(200, 0, 0),
    },
  }

  static categoryColor(category) {
    if (Style.colors.categories[category]) {
      return Style.colors.categories[category]
    } else {
      return new Color()
    }
  }

  static makeIcons(isFlat) {
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
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 8 4 L 4 0 L 4 8 Z",
            "stroke-width": 0,
          }),
          SVG.el("path", {
            d: "M 7.5 8 A 3.5 3.5 0 1 1 4 4.5",
            "stroke-width": 1,
            "fill": "none",
          }),
        ]),
      {
        id: "snap-turnRight",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0 4 L 4 0 L 4 8 Z",
            "stroke-width": 0,
          }),
          SVG.el("path", {
            d: "M 0.5 8 A 3.5 3.5 0 1 0 4 4.5",
            "stroke-width": 1,
            fill: "none",
          }),
        ]),
        {
          id: "snap-turnLeft",
      }),
      SVG.el("path", {
        d: "M 0 1 L 5 6 L 0 11 Z",
        id: "snap-addInput",
      }),
      SVG.el("path", {
        d: "M 5 1 L 0 6 L 5 11 Z",
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
          SVG.withChildren(
            SVG.el("mask", {
              id: "snap-list-holes",
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
              x: 1 - !isFlat * 0.5,
              y: 1 - !isFlat * 0.5,
              width: "6",
              height: "2",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: 1 - !isFlat * 0.5,
              y: 4 - !isFlat * 0.5,
              width: "6",
              height: "2",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: 1 - !isFlat * 0.5,
              y: 7 - !isFlat * 0.5,
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
            mask: "url(#snap-list-holes)",
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
          d: `M 4 10 A 2 2 0 1 1 3.9999990000000833 9.998000000333333 Z
              M 12 8 A 2 2 0 1 1 11.999999000000084 7.998000000333332 Z
              M 3 2 L 12 0 L 12 2 L 3 4 Z
              M 3 10 L 3 3 L 4 3 L 4 10 Z
              M 11 8 L 11 1 L 12 1 L 12 8 Z`,
        }),
        {
          id: "snap-notes",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 12 10.3923 A 12 12 0 0 1 0 10.3923 L 0 9.8182 L 0 8.2105 A 12 12 0 0 0 12 8.2105 Z M 12 7.1196 A 12 12 0 0 1 0 7.1196 L 0 6.5455 L 0 4.9378 A 12 12 0 0 0 12 4.9378 Z M 12 3.8469 A 12 12 0 0 1 0 3.8469 L 0 3.2727 L 0 1.665 A 12 12 0 0 0 12 1.665 Z`,
            stroke: "none",
          }),
          SVG.el("path", {
            d: `M 0 8.5531 A 12 12 0 0 1 12 8.5531 M 0 5.2804 A 12 12 0 0 1 12 5.2804 M 0 2.0077 A 12 12 0 0 1 12 2.0077`,
            "stroke-width": 0.5,
            fill: "none",
          }),
        ]),
        {
          id: "snap-storage",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 4.5 6 Q 0 6 0.5 11.5 Q 6 12 6 7.5 Z",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 4.5 6 L 9 0.5 Q 12 0 11.5 3 L 6 7.5",
            "stroke-width": 1,
            fill: "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
          }),
        ]),
        {
          id: "snap-brush",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 0.6 11.4 Q 1.5 10.5 1.5 9 L 6 4.5
            M 0.6 11.4 Q 1.5 10.5 3 10.5 L 7.5 6
            M 6 3 L 9 6`,
            "stroke-width": 1.2,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 11.4 3 A 2.4 2.4 0 1 1 11.3999988000001 2.9976000003999985",
            stroke: "none",
          }),
        ]),
        {
          id: "snap-pipette",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 4.8 2.4 L 9.6 7.2 L 7.2 9.6 Q 4.8 12 2.4 9.6 Q 0 7.2 2.4 4.8 Z",
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: `M 4.8 6 L 5.3 6 A 0.5 0.5 0 1 1 5.299999750000021 5.999500000083333 M 4.8 6 L 4.8 1.7
            M 4.8 1.7 A 1.2 1.2 0 1 0 2.3999999999999995 1.7000000000000002 L 2.4 4.8`,
            "stroke-width": 0.5,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 8.4 8.4 Q 12 8.4 11.5 12 L 12 12 Q 12 4.8 6 3.5999999999999996 L 9.6 7.199999999999999 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "snap-paintBucket",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 9 0.6 L 0.6 9 Q 3 12 6 9 L 11.4 3 Z",
            "stroke-width": 1.2,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 9 0 L 4.5 4.5 L 7.5 7.5 L 12 3 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "snap-eraser",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 3.6 A 3.6 3.6 0 0 1 7.2 3.6 L 3.6 12 L 0 3.6 M 1.85 3.6 A 1.8 1.8 0 1 0 1.85 3.5982",
        }),
        {
          id: "snap-location",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 4.2 6 A 1.8 1.8 0 1 0 4.2 5.9982 M 11.5433 8.2961 A 6 6 0 0 1 11.1698 9.0452 L 9.4404 8.409 A 4.2 4.2 0 0 1 8.409 9.4404 L 9.0452 11.1698 A 6 6 0 0 1 8.2961 11.5433 L 8.2961 11.5433 A 6 6 0 0 1 7.5023 11.8089 L 6.7293 10.1362 A 4.2 4.2 0 0 1 5.2707 10.1362 L 4.4977 11.8089 A 6 6 0 0 1 3.7039 11.5433 L 3.7039 11.5433 A 6 6 0 0 1 2.9548 11.1698 L 3.591 9.4404 A 4.2 4.2 0 0 1 2.5596 8.409 L 0.8302 9.0452 A 6 6 0 0 1 0.4567 8.2961 L 0.4567 8.2961 A 6 6 0 0 1 0.1911 7.5023 L 1.8638 6.7293 A 4.2 4.2 0 0 1 1.8638 5.2707 L 0.1911 4.4977 A 6 6 0 0 1 0.4567 3.7039 L 0.4567 3.7039 A 6 6 0 0 1 0.8302 2.9548 L 2.5596 3.591 A 4.2 4.2 0 0 1 3.591 2.5596 L 2.9548 0.8302 A 6 6 0 0 1 3.7039 0.4567 L 3.7039 0.4567 A 6 6 0 0 1 4.4977 0.1911 L 5.2707 1.8638 A 4.2 4.2 0 0 1 6.7293 1.8638 L 7.5023 0.1911 A 6 6 0 0 1 8.2961 0.4567 L 8.2961 0.4567 A 6 6 0 0 1 9.0452 0.8302 L 8.409 2.5596 A 4.2 4.2 0 0 1 9.4404 3.591 L 11.1698 2.9548 A 6 6 0 0 1 11.5433 3.7039 L 11.5433 3.7039 A 6 6 0 0 1 11.8089 4.4977 L 10.1362 5.2707 A 4.2 4.2 0 0 1 10.1362 6.7293 L 11.8089 7.5023 A 6 6 0 0 1 11.5433 8.2961",
        }),
        {
          id: "snap-gears",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.2 9 A 2.7 2.7 0 1 0 6.2 8.9973 M 12 12 L 0.5 12 A 9 9 0 0 1 0.2867 11.2534 L 2.7957 10.094 A 6.3 6.3 0 0 1 2.7957 7.906 L 0.2867 6.7466 A 9 9 0 0 1 0.6851 5.5558 L 0.6851 5.5558 A 9 9 0 0 1 1.2453 4.4322 L 3.8393 5.3865 A 6.3 6.3 0 0 1 5.3865 3.8393 L 4.4322 1.2453 A 9 9 0 0 1 5.5558 0.6851 L 5.5558 0.6851 A 9 9 0 0 1 6.7466 0.2867 L 7.906 2.7957 A 6.3 6.3 0 0 1 10.094 2.7957 L 11.2534 0.2867 A 9 9 0 0 1 12 0.5 Z",
        }),
        {
          id: "snap-gearPartial",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 12 6 L 12 6 A 6 6 0 0 1 11.9553 6.7312 L 10.1362 6.7293 A 4.2 4.2 0 0 1 9.7749 7.8412 L 11.2477 8.9089 A 6 6 0 0 1 10.8541 9.5267 L 10.8541 9.5267 A 6 6 0 0 1 10.3881 10.092 L 8.9176 9.0212 A 4.2 4.2 0 0 1 7.9718 9.7084 L 8.5357 11.4378 A 6 6 0 0 1 7.8541 11.7063 L 7.8541 11.7063 A 6 6 0 0 1 7.1449 11.8898 L 6.5845 10.1591 A 4.2 4.2 0 0 1 5.4155 10.1591 L 4.8551 11.8898 A 6 6 0 0 1 4.1459 11.7063 L 4.1459 11.7063 A 6 6 0 0 1 3.4643 11.4378 L 4.0282 9.7084 A 4.2 4.2 0 0 1 3.0824 9.0212 L 1.6119 10.092 A 6 6 0 0 1 1.1459 9.5267 L 1.1459 9.5267 A 6 6 0 0 1 0.7523 8.9089 L 2.2251 7.8412 A 4.2 4.2 0 0 1 1.8638 6.7293 L 0.0447 6.7312 A 6 6 0 0 1 0 6 L 0 6 A 6 6 0 0 1 0.0447 5.2688 L 1.8638 5.2707 A 4.2 4.2 0 0 1 2.2251 4.1588 L 0.7523 3.0911 A 6 6 0 0 1 1.1459 2.4733 L 1.1459 2.4733 A 6 6 0 0 1 1.6119 1.908 L 3.0824 2.9788 A 4.2 4.2 0 0 1 4.0282 2.2916 L 3.4643 0.5622 A 6 6 0 0 1 4.1459 0.2937 L 4.1459 0.2937 A 6 6 0 0 1 4.8551 0.1102 L 5.4155 1.8409 A 4.2 4.2 0 0 1 6.5845 1.8409 L 7.1449 0.1102 A 6 6 0 0 1 7.8541 0.2937 L 7.8541 0.2937 A 6 6 0 0 1 8.5357 0.5622 L 7.9718 2.2916 A 4.2 4.2 0 0 1 8.9176 2.9788 L 10.3881 1.908 A 6 6 0 0 1 10.8541 2.4733 L 10.8541 2.4733 A 6 6 0 0 1 11.2477 3.0911 L 9.7749 4.1588 A 4.2 4.2 0 0 1 10.1362 5.2707 L 11.9553 5.2688 A 6 6 0 0 1 12 6 M 2.4 6 A 3.6 3.6 0 1 0 2.4 5.9964 M 7.2 6 A 1.2 1.2 0 1 1 7.2 5.9988",
        }),
        {
          id: "snap-gearBig",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 11.5 6 A 5.5 5.5 0 1 1 11.5 5.9945 M 0.5 6 L 11.5 6 M 5.6255 0.51 A 9 9 0 0 0 5.6255 11.4842 M 6.3745 0.51 A 9 9 0 0 1 6.3745 11.4842",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "snap-globe",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 11.5 6 A 5.5 5.5 0 1 1 11.5 5.9945 M 1.05 3.6 L 10.95 3.6 M 1.05 8.4 L 10.95 8.4 M 0.5 6 L 11.5 6 M 5.6255 0.51 A 9 9 0 0 0 5.6255 11.4842 M 6.3745 0.51 A 9 9 0 0 1 6.3745 11.4842",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "snap-globeBig",
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
      SVG.text(0, 0, "+", {
        id: "snap-plusSign",
        style: `font-size: 14px;
                font-family: sans-serif;`,
        fill: "#2d2d2d",
      }),
    ]
  }

  static makeStyle() {
    const style = SVG.el("style")
    style.appendChild(SVG.cdata(Style.cssContent))
    return style
  }

  static dropShadowFilter(id) {
    const f = new Filter(id)
    f.dropShadow(-0.5, -0.5, 0, "black", 0.3)
    return f.el
  }

  static bevelFilter(id, inset) {
    const f = new Filter(id)

    const alpha = "SourceAlpha"
    const s = inset ? -0.4 : 0.2
    const blur = f.blur(0.3, alpha)

    f.merge([
      "SourceGraphic",
      f.comp(
        "in",
        f.flood("#fff", 0.4),
        f.subtract(
          alpha,
          f.offset(inset ? -0.3 : 0.4, inset ? -0.3 : 0.4, blur),
        ),
      ),
      f.comp(
        "in",
        f.flood("#000", 0.8),
        f.subtract(
          alpha,
          f.offset(inset ? 0.9 : -0.7, inset ? 0.9 : -0.7, blur),
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

  static darkRect(w, h, color, el) {
    return SVG.setProps(
      SVG.group([
        SVG.setProps(el, {
          class: `snap-dark-input`,
          fill:
            color instanceof Color
              ? color.darker().toHexString()
              : color
                ? Color.fromString(color)?.toHexString()
                : "white",
        }),
      ]),
      {
        width: w,
        height: h,
      },
    )
  }

  static get defaultFontFamily() {
    return "Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif"
  }
}
