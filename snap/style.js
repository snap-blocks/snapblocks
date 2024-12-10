import SVG from "./draw.js"
import Color from "../shared/color.js"
import Filter from "./filter.js"
import cssContent from "./style.css.js"

export default class Style {
  /**
   * Style stuff
   *
   * @static
   * @readonly
   * @type {string}
   */
  static get cssContent() {
    return cssContent
  }

  /**
   * colors
   *
   * @static
   * @type {{ label: Color; zebraLabel: Color; literal: Color; booleanLiteral: Color; readonlyLiteral: Color; zebraReadonlyLiteral: Color; comment: { label: Color; titleBar: Color; body: Color; outline: Color; line: Color; }; categories: {}; }}
   */
  static colors = {
    label: new Color(255, 255, 255),
    zebraLabel: new Color(),

    space: Color.fromString("#b48c8c"),

    literal: new Color(),

    booleanLiteral: new Color(255, 255, 255),

    readonlyLiteral: new Color(255, 255, 255),
    zebraReadonlyLiteral: new Color(),

    comment: {
      label: new Color(),
      titleBar: new Color(255, 255, 180),
      body: new Color(255, 255, 220),
      outline: new Color(255, 255, 180),
      line: new Color(255, 255, 180),
    },

    categories: {
      obsolete: new Color(150, 150, 150),
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

  /**
   * Get category color
   *
   * @static
   * @param {string} category
   * @returns {Color}
   */
  static categoryColor(category) {
    if (Style.colors.categories[category]) {
      return Style.colors.categories[category]
    } else if (category instanceof Color) {
      return category
    } else {
      return Style.colors.obsolete
    }
  }

  /**
   * Create icons
   *
   * @static
   * @param {boolean} isFlat
   * @returns {list[SVGElement]}
   */
  static makeIcons(isFlat) {
    return [
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0.5 0 L 0.5 10",
            "stroke-width": 1,
          }),
          SVG.el("path", {
            d: "M 0 2.5 C 8 2.5 1 5 10 5",
            "stroke-width": 5,
          }),
        ]),
        {
          id: "snap-flag",
        },
      ),
      SVG.el("path", {
        d: "M 3.085 0 L 6.915 0 L 10 3.085 L 10 6.915 L 6.915 10 L 3.085 10 L 0 6.915 L 0 3.085 Z",
        id: "snap-octagon",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 6.166666666666667 6.666666666666667 A 2.8333333333333335 2.8333333333333335 0 1 1 3.3333333333333335 3.8333333333333335",
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 6.666666666666667 3.3333333333333335 L 3.3333333333333335 0 L 3.3333333333333335 6.666666666666667 Z",
            "stroke-width": 0,
          }),
        ]),
        {
          id: "snap-turnRight",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0.5 6.666666666666667 A 2.8333333333333335 2.8333333333333335 0 1 0 3.3333333333333335 3.8333333333333335",
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 0 3.3333333333333335 L 3.3333333333333335 0 L 3.3333333333333335 6.666666666666667 Z",
            "stroke-width": 0,
          }),
        ]),
        {
          id: "snap-turnLeft",
        },
      ),
      SVG.el("path", {
        d: "M 1 1 L 5 5 L 1 9 Z",
        id: "snap-addInput",
      }),
      SVG.el("path", {
        d: "M 1 5 L 5 1 L 5 9 Z",
        id: "snap-delInput",
      }),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2 1 A 1 1 0 1 1 1.9999995000000417 0.9990000001666661
              M 2 5 A 1 1 0 1 1 1.9999995000000417 4.999000000166666
              M 2 9 A 1 1 0 1 1 1.9999995000000417 8.999000000166665`,
        }),
        {
          id: "snap-verticalEllipsis",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0 9 L 10 9 L 10 9 A 4 4 0 0 0 14 5",
            "stroke-width": 2,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 14 0 L 9 5 L 20 5 Z",
            "stroke-width": 0,
          }),
        ]),
        {
          id: "snap-loop",
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
          d: "M 0 0 L 8.660254037844387 5 L 0 10 Z",
        }),
        {
          id: "snap-pointRight",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 13 5 L 0 10 L 5 5 Z",
        }),
        {
          id: "snap-turtle",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 13 5 L 0 10 L 5 5 Z",
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
          id: "snap-pause",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2.5 10 A 2.5 2.5 0 0 1 2.0229775115586364 5.045932041380841
              L 2.0681483474218636 4.962082534649487 A 2 2 0 0 1 5 2.7123936368755674
              L 5.041229516856367 2.6319194266973254 A 4 4 0 0 1 12.794518139018296 3.7906561750282224
              L 12.947642780688149 4.000456914530826 A 3 3 0 1 1 13 10 Z`,
        }),
        {
          id: "snap-cloud",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("radialGradient", {
              id: "snap-cloudGradient-fill",
              cx: 0,
              cy: 0,
              r: 1,
              fx: 0,
              fy: 0,
            }),
            [
              SVG.el("stop", {
                offset: "0%",
                "stop-color": "rgba(0, 0, 0, 0)",
              }),
              SVG.el("stop", {
                offset: "100%",
                "stop-color": "rgba(0, 0, 0, 0.25)",
              }),
            ],
          ),
          SVG.el("path", {
            d: `M 2.5 10 A 2.5 2.5 0 0 1 2.0229775115586364 5.045932041380841
                L 2.0681483474218636 4.962082534649487 A 2 2 0 0 1 5 2.7123936368755674
                L 5.041229516856367 2.6319194266973254 A 4 4 0 0 1 12.794518139018296 3.7906561750282224
                L 12.947642780688149 4.000456914530826 A 3 3 0 1 1 13 10 Z`,
          }),
          SVG.el("path", {
            d: `M 2.5 10 A 2.5 2.5 0 0 1 2.0229775115586364 5.045932041380841
                L 2.0681483474218636 4.962082534649487 A 2 2 0 0 1 5 2.7123936368755674
                L 5.041229516856367 2.6319194266973254 A 4 4 0 0 1 12.794518139018296 3.7906561750282224
                L 12.947642780688149 4.000456914530826 A 3 3 0 1 1 13 10 Z`,
            fill: "url(#snap-cloudGradient-fill)",
          }),
        ]),
        {
          id: "snap-cloudGradient",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2.5 10 A 2.5 2.5 0 0 1 2.0229775115586364 5.045932041380841
              L 2.0681483474218636 4.962082534649487 A 2 2 0 0 1 5 2.7123936368755674
              L 5.041229516856367 2.6319194266973254 A 4 4 0 0 1 12.794518139018296 3.7906561750282224
              L 12.947642780688149 4.000456914530826 A 3 3 0 1 1 13 10 Z`,
          fill: "none",
        }),
        {
          id: "snap-cloudOutline",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 2.6666666666666665 0 L 0 3.3333333333333335 L 2.6666666666666665 3.3333333333333335 L 0 6.666666666666667 L 2.6666666666666665 6.666666666666667 L 0 10 L 8 5.555555555555555 L 5.333333333333333 5.555555555555555 L 8 2.2222222222222223 L 5.333333333333333 2.2222222222222223 L 8 0 Z",
        }),
        {
          id: "snap-flash",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.5 8.333333333333334 L 9.5 8.333333333333334 L 9.5 2.5 L 7.5 2.5 L 6.25 0.5 L 3.75 0.5 L 2.5 2.5 L 0.5 2.5 L 0.5 8.333333333333334 Z
              M 6.6 5 A 1.6 1.6 0 1 1 6.599999200000067 4.998400000266666 Z`,
        }),
        {
          id: "snap-camera",
          "stroke-width": 1,
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 5,
          cx: 5,
          cy: 5,
        }),
        {
          id: "snap-circleSolid",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 4.5,
          cx: 4.75,
          cy: 5,
        }),
        {
          id: "snap-circle",
          fill: "none",
          "stroke-width": 1,
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 3.3333333333333335 8.333333333333334 A 1.6666666666666667 1.6666666666666667 0 1 1 3.3333325000000693 8.331666666944445 Z
                M 10 6.666666666666666 A 1.6666666666666667 1.6666666666666667 0 1 1 9.999999166666736 6.665000000277776 Z
                M 2.3333333333333335 1.6666666666666667 L 10 0 L 10 1.6666666666666667 L 2.3333333333333335 3.3333333333333335  Z`,
            stroke: "none",
          }),
          SVG.el("path", {
            d: `M 2.8333333333333335 8.333333333333334 L 2.8333333333333335 2.666666666666667 Z
                M 9.5 6.666666666666666 L 9.5 1 Z`,
            fill: "none",
            "stroke-width": 1,
          }),
        ]),
        {
          id: "snap-notes",
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
          id: "snap-storage",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 3.75 5 Q 0 5 0.5 9.5 Q 5 10 5 6.25 Z",
            "stroke-width": 1,
          }),
          SVG.el("path", {
            d: "M 3.75 5 L 7.5 0.5 Q 10 0 9.5 2.5 L 5 6.25",
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
            d: `M 0.5 9.5 Q 1.25 8.75 1.25 7.5 L 5 3.75
                M 0.5 9.5 Q 1.25 8.75 2.5 8.75 L 6.25 5
                M 5 2.5 L 7.5 5`,
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 9.5 2.5 A 2 2 0 1 1 9.499999000000084 2.4980000003333322",
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
            d: "M 4 2 L 8 6 L 6 8 Q 4 10 2 8 Q 0 6 2 4 Z",
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: `M 4.5 5 A 0.5 0.5 0 1 1 4.499999750000021 4.999500000083333
                M 4 5 L 4 1.5
                M 4 1.5 A 1 1 0 1 0 2 1.5000000000000002
                M 2 1.5 L 2 4`,
            "stroke-width": 0.5,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 7 7 Q 10 7 9.5 10 L 10 10 Q 10 4 5 3 L 8 6 Z",
            "stroke-width": 0.5,
            // stroke: "none",
          }),
        ]),
        {
          id: "snap-paintbucket",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 7.5 0.5 L 0.5 7.5 Q 2.5 10 5 7.5 L 9.5 2.5 Z",
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 7.5 0 L 3.75 3.75 L 6.25 6.25 L 10 2.5 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "snap-eraser",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 3 M 0 2.9999999999999996 A 3 3 0 0 1 6 3 L 3 10 L 0 3 M 4.5 3 A 1.5 1.5 0 1 1 4.499999250000062 2.998500000249999",
          "fill-rule": "evenodd",
        }),
        {
          id: "snap-location",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 10 5
              L 9.619397662556434 6.913417161825449 A 5 5 0 0 1 9.30814580220763 7.53769181480352
              L 7.867032155011471 7.007517527228661 A 3.5 3.5 0 0 1 7.007517527228661 7.867032155011471
              L 7.537691814803521 9.30814580220763 A 5 5 0 0 1 6.913417161825449 9.619397662556434
              L 6.913417161825449 9.619397662556434 A 5 5 0 0 1 6.251900020272208 9.840738201890538
              L 5.607768621834256 8.446827135542728 A 3.5 3.5 0 0 1 4.392231378165744 8.446827135542728
              L 3.748099979727793 9.840738201890538 A 5 5 0 0 1 3.0865828381745515 9.619397662556434
              L 3.0865828381745515 9.619397662556434 A 5 5 0 0 1 2.4623081851964783 9.30814580220763
              L 2.9924824727713397 7.867032155011472 A 3.5 3.5 0 0 1 2.1329678449885296 7.0075175272286625
              L 0.691854197792372 7.537691814803522 A 5 5 0 0 1 0.3806023374435661 6.91341716182545
              L 0.3806023374435661 6.91341716182545 A 5 5 0 0 1 0.15926179810946106 6.251900020272206
              L 1.553172864457272 5.607768621834256 A 3.5 3.5 0 0 1 1.553172864457272 4.392231378165743
              L 0.15926179810946106 3.748099979727792 A 5 5 0 0 1 0.3806023374435652 3.0865828381745537
              L 0.3806023374435652 3.0865828381745537 A 5 5 0 0 1 0.6918541977923702 2.4623081851964805
              L 2.132967844988528 2.9924824727713397 A 3.5 3.5 0 0 1 2.9924824727713375 2.1329678449885296
              L 2.4623081851964796 0.6918541977923711 A 5 5 0 0 1 3.0865828381745524 0.3806023374435661
              L 3.0865828381745524 0.3806023374435661 A 5 5 0 0 1 3.7480999797277907 0.15926179810946195
              L 4.392231378165744 1.553172864457272 A 3.5 3.5 0 0 1 5.607768621834255 1.5531728644572715
              L 6.251900020272207 0.15926179810946106 A 5 5 0 0 1 6.91341716182545 0.380602337443567
              L 6.91341716182545 0.380602337443567 A 5 5 0 0 1 7.537691814803523 0.6918541977923729
              L 7.007517527228661 2.1329678449885288 A 3.5 3.5 0 0 1 7.86703215501147 2.9924824727713375
              L 9.308145802207626 2.4623081851964757 A 5 5 0 0 1 9.619397662556434 3.086582838174552
              L 9.619397662556434 3.086582838174552 A 5 5 0 0 1 9.840738201890538 3.7480999797277903
              L 8.446827135542728 4.39223137816574 A 3.5 3.5 0 0 1 8.446827135542728 5.607768621834255
              L 9.840738201890538 6.251900020272208 A 5 5 0 0 1 9.619397662556434 6.913417161825446
              L 10 5
              L 6.5 5 A 1.5 1.5 0 1 1 6.499999250000062 4.998500000249999`,
          "fill-rule": "evenodd",
        }),
        {
          id: "snap-gears",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 10 7.5 L 10 10 L 0.5 10 A 7.5 7.5 0 0 1 0.2389 9.3779 L 2.3298 8.4117 A 5.25 5.25 0 0 1 2.3298 6.5883 L 0.2389 5.6221 A 7.5 7.5 0 0 1 0.5709 4.6299 L 0.5709 4.6299 A 7.5 7.5 0 0 1 1.0378 3.6935 L 3.1995 4.4887 A 5.25 5.25 0 0 1 4.4887 3.1995 L 3.6935 1.0378 A 7.5 7.5 0 0 1 4.6299 0.5709 L 4.6299 0.5709 A 7.5 7.5 0 0 1 5.6221 0.2389 L 6.5883 2.3298 A 5.25 5.25 0 0 1 8.4117 2.3298 L 9.3779 0.2389 A 7.5 7.5 0 0 1 10 0.5 L 10 7.5 L 9.75 7.5 A 2.25 2.25 0 1 1 9.75 7.4978`,
          "fill-rule": "evenodd",
        }),
        {
          id: "snap-gearPartial",
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
          id: "snap-gearBig",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 9.5 5 A 4.5 4.5 0 1 1 9.5 4.9955 M 0.5 5 L 9.5 5 M 4.6332 0.5127 A 7.5 7.5 0 0 0 4.6332 9.4826 M 5.3668 0.5127 A 7.5 7.5 0 0 1 5.3668 9.4826",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "snap-globe",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 9.5 5 A 4.5 4.5 0 1 1 9.5 4.9955 M 0.5 5 L 9.5 5 M 4.6332 0.5127 A 7.5 7.5 0 0 0 4.6332 9.4826 M 5.3668 0.5127 A 7.5 7.5 0 0 1 5.3668 9.4826 M 1 3 L 9 3 M 1 7 L 9 7`,
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "snap-globeBig",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 10,
          height: 10,
        }),
        {
          id: "snap-square",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2.166666666666667 1.6666666666666667 L 3.3333333333333335 1.6666666666666667 L 4.166666666666667 2.5 L 5.833333333333334 2.5 L 6.666666666666667 1.6666666666666667 L 7.833333333333334 1.6666666666666667 L 6.666666666666667 5 L 6.666666666666667 6.166666666666667 L 3.3333333333333335 6.166666666666667 L 3.3333333333333335 5 Z
              M 4.583333333333334 2.166666666666667 L 4 1.6666666666666667 L 3.666666666666667 0 L 6.333333333333333 0 L 6 1.6666666666666667 L 5.416666666666667 2.166666666666667 Z
              M 4.166666666666667 6.666666666666667 L 1.6666666666666667 6.666666666666667 L 1.3333333333333335 10 L 3.3333333333333335 10 Z
              M 5.833333333333334 6.666666666666667 L 8.333333333333334 6.666666666666667 L 8.666666666666666 10 L 6.666666666666667 10 Z
              M 1.6666666666666667 1.6666666666666667 L 0.5 2.5 L 0.5 5.416666666666667 L 2.5 5.833333333333334 Z
              M 8.333333333333334 1.6666666666666667 L 9.5 2.5 L 9.5 5.416666666666667 L 7.5 5.833333333333334 Z`,
        }),
        {
          id: "snap-robot",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 5 0.5 L 9.5 5 L 6.5 5 L 6.5 9.5 L 3.5 9.5 L 3.5 5 Z",
        }),
        {
          id: "snap-arrowUp",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 5 0.5 L 9.5 5 L 6.5 5 L 6.5 9.5 L 3.5 9.5 L 3.5 5 Z",
          fill: "none",
        }),
        {
          id: "snap-arrowUpOutline",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.666666666666666 3.3333333333333335 L 5 1 L 3.3333333333333335 3.3333333333333335 M 5 1 L 5 9.5",
          fill: "none",
        }),
        {
          id: "snap-arrowUpThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUp",
          transform: "rotate(180 5 5)",
        }),
        {
          id: "snap-arrowDown",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpOutline",
          transform: "rotate(180 5 5)",
        }),
        {
          id: "snap-arrowDownOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpThin",
          transform: "rotate(180 5 5)",
        }),
        {
          id: "snap-arrowDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUp",
          transform: "rotate(-90 5 5)",
        }),
        {
          id: "snap-arrowLeft",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpOutline",
          transform: "rotate(-90 5 5)",
        }),
        {
          id: "snap-arrowLeftOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpThin",
          transform: "rotate(-90 5 5)",
        }),
        {
          id: "snap-arrowLeftThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUp",
          transform: "rotate(90 5 5)",
        }),
        {
          id: "snap-arrowRight",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpOutline",
          transform: "rotate(90 5 5)",
        }),
        {
          id: "snap-arrowRightOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpThin",
          transform: "rotate(90 5 5)",
        }),
        {
          id: "snap-arrowRightThin",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.666666666666666 3.3333333333333335 L 5 1 L 3.3333333333333335 3.3333333333333335 M 6.666666666666666 6.666666666666666 L 5 9 L 3.3333333333333335 6.666666666666666 M 5 1 L 5 9",
          fill: "none",
        }),
        {
          id: "snap-arrowUpDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-arrowUpDownThin",
          transform: "rotate(90 5 5)",
        }),
        {
          id: "snap-arrowLeftRightThin",
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
          id: "snap-stepForward",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0 0 L 4 0 L 4 4 L 8 4 L 8 10 L 0 10 Z",
          }),
          SVG.el("path", {
            d: "M 4 0 L 8 4 L 4 4 L 4 0 Z",
            filter: "brightness(0.75)",
          }),
        ]),
        {
          id: "snap-file",
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
          id: "snap-fullScreen",
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
          id: "snap-grow",
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
          id: "snap-normalScreen",
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
          id: "snap-shrink",
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
          id: "snap-smallStage",
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
          id: "snap-normalStage",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 13,
          height: 10,
        }),
        {
          id: "snap-stage",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 8.181980515339465 1.8180194846605362 A 4.5 4.5 0 1 1 1.8180194846605353 1.8180194846605362`,
            fill: "none",
            "stroke-width": 1,
          }),
          SVG.el("path", {
            d: `M 0 0.5 L 4 0 L 3.5 3.5 Z`,
            stroke: "none",
          }),
        ]),
        {
          id: "snap-turnAround",
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
          id: "snap-poster",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 2 5 L 5 10 L 8 3 L 10 0 L 6.5 2 L 5 6.5 Z",
          stroke: "none",
        }),
        {
          id: "snap-tick",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("use", {
            href: "#snap-rectangle",
          }),
          SVG.el("use", {
            href: "#snap-tick",
          }),
        ]),
        {
          id: "snap-checkedBox",
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
          id: "snap-rectangle",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 10,
          height: 10,
        }),
        {
          id: "snap-rectangleSolid",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 2,
          cx: 2,
          cy: 5,
        }),
        {
          id: "snap-dot",
        },
      ),
      SVG.setProps(
        SVG.el("line", {
          x1: 0.5,
          y1: 0.5,
          x2: 9.5,
          y2: 9.5,
          "stroke-width": 1,
          "stroke-linecap": "round",
        }),
        {
          id: "snap-line",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 9.5 5 M 5 0.5 L 5 9.5",
          "stroke-linecap": "round",
          "stroke-width": 1,
        }),
        {
          id: "snap-cross",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 9.5 5 M 5 0.5 L 5 9.5 M 7.833333333333334 5 A 2.8333333333333335 2.8333333333333335 0 1 1 7.8333319166667845 4.997166667138887",
          "stroke-width": 1,
          fill: "none",
        }),
        {
          id: "snap-crosshairs",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 3.3333333333333335 6.666666666666667 Q 0.5 6.666666666666667 0.5 3.3333333333333335 Q 0.5 0.5 3.3333333333333335 0.5 L 6.666666666666667 0.5 Q 9.5 0.5 9.5 3.3333333333333335 Q 9.5 6.666666666666667 6.666666666666667 6.666666666666667 L 1.6666666666666667 9.5 Z",
        }),
        {
          id: "snap-speechBubble",
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
        SVG.group([
          SVG.el("path", {
            d: "M 0 5 L 8 0 L 8 10 Z",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 13 10 A 5 5 0 0 0 8 5",
            fill: "none",
            "stroke-width": 2.4,
          }),
        ]),
        {
          id: "snap-turnBack",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 16 5 L 8 0 L 8 10 Z",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 3 10 A 5 5 0 0 1 8 5",
            fill: "none",
            "stroke-width": 2.4,
          }),
        ]),
        {
          id: "snap-turnForward",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("radialGradient", {
              id: "snap-magnifyingGlass-fill",
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
            fill: "url(#snap-magnifyingGlass-fill)",
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
          id: "snap-magnifyingGlass",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 7.934615859097789 5.065384140902211 A 3 3 0 1 1 7.934614359097914 5.062384141402209
              M 1 9 L 2.6985478815979995 7.3014521184020005`,
          fill: "none",
        }),
        {
          id: "snap-magnifierOutline",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("use", {
            href: "#snap-rectangle",
            "stroke-dasharray": 3,
          }),
          SVG.el("use", {
            href: "#snap-arrowDown",
            transform: "translate(7, 4) scale(0.5) rotate(135)",
          }),
        ]),
        {
          id: "snap-selection",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 3.085 0.5 L 6.915 0.5 L 9.5 3.085 L 9.5 6.915 L 6.915 9.5 L 3.085 9.5 L 0.5 6.915 L 0.5 3.085 Z",
          fill: "none",
        }),
        {
          id: "snap-polygon",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 3.5 9 A 2.5 2.5 0 0 1 1 6.5 L 0.7679491924311226 5.444444444444445 A 2 2 0 0 1 3.5 2.7123936368755674 L 2.0358983848622456 2.9999999999999996 A 4 4 0 0 1 9.125231148146598 3.3095269530372002 L 6.52094453300079 3.0455767409633756 A 3 3 0 0 1 6 9 Z",
          fill: "none",
        }),
        {
          id: "snap-closedBrush",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.09046106882113736 2.013030214988503 A 1.5 1.5 0 1 1 3 1.5 L 3 5.5 L 1 6 Z M 3.016044443118978 6.10721239031346 A 1 1 0 1 1 1.2651922469877919 6.57635182233307 Z
              M 7 4.5 A 1.5 1.5 0 1 1 9.909538931178863 5.013030214988503 L 9 8.5 L 7 8 Z M 8.75 9 A 1 1 0 1 1 6.883974596215562 8.5 Z`,
        }),
        {
          id: "snap-footprints",
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
          id: "snap-keyboard",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("mask", {
              id: "snap-keyboard-holes",
            }),
            [
              SVG.el("rect", {
                width: 16,
                height: 10,
                fill: "white",
              }),
              SVG.el("use", {
                href: "#snap-keyboard",
                fill: "black",
              }),
            ],
          ),
          SVG.el("rect", {
            width: 16,
            height: 10,
            mask: "url(#snap-keyboard-holes)",
          }),
        ]),
        {
          id: "snap-keyboardFilled",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("mask", {
              id: "snap-listNarrow-holes",
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
            mask: "url(#snap-listNarrow-holes)",
          }),
        ]),
        {
          id: "snap-listNarrow",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#snap-flipHorizontal",
          transform: "translate(0 10) rotate(-90)",
        }),
        {
          id: "snap-flipVertical",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0.6666666666666666 9.666666666666666 L 4.2 9.666666666666666 L 4.2 1.3333333333333333 Z",
            "stroke-width": 10 / 15,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 9.333333333333334 9.666666666666666 L 5.8 9.666666666666666 L 5.8 1.3333333333333333 Z",
            "stroke-width": 10 / 15,
          }),
        ]),
        {
          id: "snap-flipHorizontal",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 1 2.5 L 1.5 9.5 L 2.5 10 L 7.5 10 L 8.5 9.5 L 9 2.5 L 1 2.5
                M 2.5 4 A 0.5 0.5 0 0 1 3.5 4 L 3.5 8.5 A 0.5 0.5 0 0 1 2.5 8.5 L 2.5 4
                M 4.5 4 A 0.5 0.5 0 0 1 5.5 4 L 5.5 8.5 A 0.5 0.5 0 0 1 4.5 8.5 L 4.5 4
                M 6.5 4 A 0.5 0.5 0 0 1 7.5 4 L 7.5 8.5 A 0.5 0.5 0 0 1 6.5 8.5 L 6.5 4`,
            stroke: "none",
          }),
          SVG.el("path", {
            d: `M 0.5 1.5 L 9.5 1.5`,
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: `M 3 1.5 L 4 0.25 L 6 0.25 L 7 1.5`,
            "stroke-width": 0.5,
            fill: "none",
          }),
        ]),
        {
          id: "snap-trash",
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
          id: "snap-trashFull",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.5 2.5 L 5 0.5 L 9.5 2.5 L 9.5 7.5 L 5 9.5 L 0.5 7.5 Z
              M 5 4.5 L 0.5 2.5 M 5 4.5L 9.5 2.5 M 5 4.5 L 5 9.5`,
        }),
        {
          id: "snap-cube",
          fill: "none",
          "stroke-width": 1,
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("use", {
            href: "#snap-cube",
          }),
          SVG.el("path", {
            d: "M 5 4.5 L 9.5 2.5 L 9.5 7.5 L 5 9.5 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "snap-cubeSolid",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 6.875 8.247595264191645 A 3.75 3.75 0 1 1 8.75 5 M 10.625 1.752404735808355 A 3.75 3.75 0 1 1 8.75 5.000000000000001`,
        }),
        {
          id: "snap-infinity",
          fill: "none",
          "stroke-width": 2.5,
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: `M 1 8.400000000000006 L 7.399999999999977 8.400000000000006 M 4.199999999999989 5.200000000000017 L 4.199999999999989 11.599999999999994`,
        }),
        {
          id: "snap-plusSign",
        },
      ),
    ]
  }

  static makeSantaHats() {
    return [
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 0 15 L -7.105427357601002e-15 12.000000000000007 A 57.041666666666664 57.041666666666664 0 0 1 49.763469697722954 1.9436476587610585 L 70.98047001093227 8.073838848328808 A 23.333333333333332 23.333333333333332 0 0 0 45.12562966055718 15.001622440647413 Z",
            fill: new Color(200, 0, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 0 15 L -7.105427357601002e-15 12.000000000000007 A 57.041666666666664 57.041666666666664 0 0 1 49.763469697722954 1.9436476587610585 L 70.98047001093227 8.073838848328808 A 23.333333333333332 23.333333333333332 0 0 0 45.12562966055718 15.001622440647413",
            fill: "none",
            stroke: new Color(255, 0, 0).toHexString(),
            "stroke-width": 0.75,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 70.98047001093227 8.073838848328808 A 23.333333333333332 23.333333333333332 0 0 0 45.12562966055718 15.001622440647413",
            fill: "none",
            stroke: new Color(100, 0, 0).toHexString(),
            "stroke-width": 0.75,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 2.25 13.5 L 45 13.5",
            fill: "none",
            stroke: new Color(150, 150, 150).toHexString(),
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 3 13.2 L 45 13.2",
            fill: "none",
            stroke: "#fff",
            "stroke-linecap": "round",
            "stroke-width": 3.9000000000000004,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 76 7.199999999999999 A 6 6 0 1 1 75.99999700000025 7.194000000999996 Z",
            fill: new Color(150, 150, 150).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 73.6 6 A 3.5999999999999996 3.5999999999999996 0 1 1 73.59999820000014 5.996400000599998 Z",
            fill: "#fff",
            stroke: "none",
          }),
        ]),
        {
          id: "snap-santa-hat",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 15 6 L 36 6 L 36 6 L 36 8.399999999999999 L 36 8.399999999999999 L 36 8.399999999999999 A 6 6 0 0 1 30 14.399999999999999 L 21 14.399999999999999 L 21 14.399999999999999 L 21 14.399999999999999 A 6 6 0 0 1 15 8.399999999999999 L 15 6 L 15 6 Z",
            fill: "none",
            stroke: new Color(150, 150, 50).toHexString(),
            "stroke-width": 6,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 6 6 L 15 6",
            fill: "none",
            stroke: new Color(150, 150, 50).toHexString(),
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 36 4.5 L 49 0 L 49 12 L 36 7.5 Z",
            fill: new Color(150, 150, 50).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 18 6 L 18 3",
            fill: "none",
            stroke: new Color(150, 150, 50).toHexString(),
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 24 6 L 24 3",
            fill: "none",
            stroke: new Color(150, 150, 50).toHexString(),
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 30 6 L 30 3",
            fill: "none",
            stroke: new Color(150, 150, 50).toHexString(),
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 15 6 L 36 6 L 36 6 L 36 8.399999999999999 L 36 8.399999999999999 L 36 8.399999999999999 A 6 6 0 0 1 30 14.399999999999999 L 21 14.399999999999999 L 21 14.399999999999999 L 21 14.399999999999999 A 6 6 0 0 1 15 8.399999999999999 L 15 6 L 15 6 Z",
            fill: "none",
            stroke: new Color(255, 255, 100).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 6 6 L 15 6",
            fill: "none",
            stroke: new Color(255, 255, 100).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 36 4.5 L 49 3 L 49 9 L 36 7.5 Z",
            fill: new Color(255, 255, 100).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 18 6 L 18 3",
            fill: "none",
            stroke: new Color(255, 255, 100).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 24 6 L 24 3",
            fill: "none",
            stroke: new Color(255, 255, 100).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 30 6 L 30 3",
            fill: "none",
            stroke: new Color(255, 255, 100).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
        ]),
        {
          id: "snap-santa-trumpet",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 23.00243366097112 9.18844449083577 A 35 35 0 0 1 67.99756633902888 9.18844449083577 L 56 7.5 L 57.49756633902888 17.588444490835776 A 35 35 0 0 0 23.029294983601595 11.510758272493213 Z",
            fill: "none",
            stroke: new Color(100, 100, 100).toHexString(),
            "stroke-width": 1,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 23.00243366097112 9.18844449083577 A 35 35 0 0 1 67.99756633902888 9.18844449083577 L 56 7.5 L 57.49756633902888 17.588444490835776 A 35 35 0 0 0 23.029294983601595 11.510758272493213 Z",
            fill: "#fff",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 1 9.600000000000001 L 9 12 L 6 15 L 15 12 L 18 15 L 21 12 L 27 15 L 24 9 L 36 6 L 24 6 L 25.5 1 L 18 4.5 L 15 1 L 13.5 6 L 4.5 1.5 L 9 7.5 Z",
            fill: "none",
            stroke: new Color(100, 100, 100).toHexString(),
            "stroke-width": 1,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 1 9.600000000000001 L 9 12 L 6 15 L 15 12 L 18 15 L 21 12 L 27 15 L 24 9 L 36 6 L 24 6 L 25.5 1 L 18 4.5 L 15 1 L 13.5 6 L 4.5 1.5 L 9 7.5 Z",
            fill: "#fff",
            stroke: "none",
          }),
        ]),
        {
          id: "snap-santa-star",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(SVG.el("defs"), [
            SVG.withChildren(
              SVG.el("radialGradient", {
                id: "snap-santa-candles-glow",
              }),
              [
                SVG.el("stop", {
                  offset: "0%",
                  "stop-color": "#fff",
                  "stop-opacity": 1,
                }),
                SVG.el("stop", {
                  offset: "100%",
                  "stop-color": "#fff",
                  "stop-opacity": 0,
                }),
              ],
            ),
          ]),
          SVG.el("path", {
            d: "M 2.25 13.5 L 45 13.5",
            fill: "none",
            stroke: new Color(0, 100, 0).toHexString(),
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 3 13.2 L 45 13.2",
            fill: "none",
            stroke: new Color(0, 200, 0),
            "stroke-width": 3.9000000000000004,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          ...(() => {
            function candle(x) {
              return [
                SVG.el("path", {
                  d: `M ${x} 12 L ${x} 3`,
                  fill: "none",
                  stroke: new Color(100, 0, 0).toHexString(),
                  "stroke-width": 6,
                  "stroke-miterlimit": 10,
                }),
                SVG.el("path", {
                  d: `M ${x} 12 L ${x} 3`,
                  fill: "none",
                  stroke: new Color(200, 0, 0).toHexString(),
                  "stroke-width": 3.9000000000000004,
                  "stroke-miterlimit": 10,
                }),
                SVG.el("circle", {
                  cx: x,
                  cy: 3,
                  r: 4,
                  fill: "url(#snap-santa-candles-glow)",
                }),
                SVG.el("circle", {
                  cx: x,
                  cy: 3,
                  r: 2.3,
                  fill: new Color(255, 255, 200).toHexString(),
                }),
                SVG.el("path", {
                  d: `M ${x} 3 L ${x} 0`,
                  stroke: new Color(255, 255, 100).toHexString(),
                  "stroke-linecap": "round",
                  "stroke-miterlimit": 10,
                  "stroke-width": 1.5,
                }),
              ]
            }

            let c = 3,
              result = []

            for (let i = 1; i < 5; i += 1) {
              result = [...result, ...candle(c * 3 * i)]
            }

            return result
          })(),
        ]),
        {
          id: "snap-santa-candles",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 6 3 L 27 3 L 27 15 L 6 15 L 6 3 Z",
            fill: new Color(0, 0, 255).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 6 3 L 9 0 L 30 0 L 27 3 Z",
            fill: new Color(100, 100, 255).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 30 0 L 27 3 L 27 15 L 30 12 Z",
            fill: new Color(0, 0, 100).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 6 9 L 27 9",
            fill: "none",
            stroke: new Color(200, 0, 0).toHexString(),
            "stroke-width": 3,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 16.5 3 L 16.5 15",
            fill: "none",
            stroke: new Color(200, 0, 0).toHexString(),
            "stroke-width": 3,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 20.25 3.3990381056766577 A 1.5 2.4000000000000004 59.99999999999999 1 1 20.252078085622706 3.3978374563576583",
            fill: "none",
            stroke: new Color(250, 0, 0),
            "stroke-width": 1.5,
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 13.760472266500395 0.6227883704816877 A 1.5 3 -80 1 1 13.757517713497638 0.6222681646412639",
            fill: "none",
            stroke: new Color(250, 0, 0).toHexString(),
            "stroke-width": 1.5,
            "stroke-miterlimit": 10,
          }),
        ]),
        {
          id: "snap-santa-gift",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 11.100505063388333 10.68 L 11.632171510975986 10.32501780550509 L 12.18951452530227 9.957733978075655 L 12.771006467905373 9.5799378875997 L 13.375053509789621 9.193470118654092 L 13.999999999999993 8.80021350336152 L 14.644133003646342 8.402083948421685 L 15.305686996938796 8.001021101006407 L 15.98284870636579 7.598978898993599 L 16.673762078750734 7.1979160515783205 L 17.37653336856471 6.799786496638484 L 18.08923632855136 6.406529881345912 L 18.809917489436764 6.020062112400305 L 19.53660151425285 5.642266021924353 L 20.267296612598777 5.274982194494916 L 20.999999999999996 4.920000000000005 L 21.732703387401216 4.579048876008499 L 22.463398485747142 4.253789902124213 L 23.19008251056323 3.9458077073729756 L 23.91076367144862 3.6566027500493723 L 24.623466631435285 3.3875840076346915 L 25.32623792124926 3.1400621124003054 L 26.017151293634193 2.915242966138986 L 26.694313003061197 2.7142218651325827 L 27.35586699635366 2.5379781639786216 L 27.99999999999999 2.3873705042731688 L 28.624946490210373 2.2631326313952824 L 29.22899353209463 2.16586981977328 L 29.810485474697714 2.0960559240485557 L 30.36782848902402 2.054031070503414 L 30.899494936611653 2.040000000000001 L 31.404027556683513 2.054031070503414 L 31.880043460397594 2.096055924048555 L 32.32623792124926 2.1658698197732793 L 32.741387951235936 2.263132631395284 L 33.124355652982146 2.387370504273168 L 33.47409133863715 2.5379781639786163 L 33.789636406996415 2.71422186513258 L 34.070125970960824 2.9152429661389885 L 34.31479122813215 3.140062112400302 L 34.52296156804695 3.3875840076346835 L 34.69406641027328 3.6566027500493687 L 34.82763676833193 3.945807707372981 L 34.923306535155824 4.253789902124209 L 34.98081348656403 4.579048876008495 L 35 4.920000000000002 L 34.98081348656403 5.274982194494911 L 34.92330653515583 5.64226602192434 L 34.82763676833193 6.020062112400302 L 34.69406641027328 6.406529881345918 L 34.52296156804696 6.799786496638481 L 34.31479122813215 7.197916051578311 L 34.070125970960824 7.598978898993584 L 33.78963640699641 8.001021101006401 L 33.474091338637145 8.402083948421685 L 33.124355652982146 8.800213503361515 L 32.74138795123594 9.193470118654078 L 32.326237921249266 9.579937887599696 L 31.880043460397594 9.957733978075648 L 31.404027556683516 10.325017805505077 L 30.89949493661166 10.679999999999996 L 30.367828489024028 11.020951123991502 L 29.81048547469773 11.346210097875796 L 29.228993532094627 11.654192292627025 L 28.62494649021038 11.943397249950628 L 27.999999999999996 12.212415992365315 L 27.355866996353647 12.459937887599697 L 26.694313003061215 12.684757033861011 L 26.017151293634214 12.885778134867419 L 25.32623792124927 13.06202183602138 L 24.623466631435292 13.21262949572683 L 23.910763671448628 13.336867368604715 L 23.19008251056325 13.43413018022672 L 22.463398485747163 13.503944075951447 L 21.732703387401223 13.545968929496588 L 21.000000000000004 13.56 L 20.267296612598788 13.545968929496588 L 19.536601514252848 13.503944075951447 L 18.809917489436785 13.434130180226724 L 18.089236328551383 13.33686736860472 L 17.376533368564694 13.212629495726834 L 16.67376207875074 13.062021836021387 L 15.982848706365797 12.885778134867417 L 15.305686996938817 12.684757033861015 L 14.64413300364636 12.4599378875997 L 13.99999999999999 12.212415992365312 L 13.375053509789629 11.943397249950632 L 12.77100646790538 11.654192292627028 L 12.189514525302275 11.346210097875794 L 11.632171510976002 11.020951123991507 L 11.100505063388328 10.680000000000009 L 10.595972443316471 10.325017805505091 L 10.119956539602413 9.957733978075662 L 9.673762078750737 9.57993788759969 L 9.258612048764078 9.193470118654083 L 8.875644347017857 8.80021350336152 L 8.525908661362847 8.40208394842168 L 8.210363593003592 8.001021101006407 L 7.929874029039176 7.5989788989936 L 7.685208771867851 7.197916051578327 L 7.477038431953044 6.799786496638486 L 7.30593358972672 6.406529881345923 L 7.172363231668072 6.020062112400317 L 7.076693464844174 5.642266021924345 L 7.019186513435965 5.274982194494917 L 7 4.919999999999997 L 7.019186513435965 4.5790488760085 L 7.076693464844174 4.253789902124213 L 7.1723632316680686 3.9458077073729774 L 7.305933589726717 3.656602750049373 L 7.477038431953041 3.3875840076346933 L 7.6852087718678455 3.1400621124003054 L 7.9298740290391745 2.915242966138991 L 8.210363593003587 2.714221865132588 L 8.525908661362852 2.537978163978619 L 8.875644347017852 2.3873705042731697 L 9.258612048764057 2.2631326313952824 L 9.673762078750732 2.16586981977328 L 10.119956539602406 2.0960559240485557 L 10.595972443316482 2.054031070503413 L 11.100505063388338 2.040000000000001 L 11.632171510975974 2.054031070503413 L 12.189514525302267 2.096055924048555 L 12.771006467905371 2.1658698197732784 L 13.37505350978962 2.2631326313952806 L 14 2.387370504273167 L 14.644133003646328 2.5379781639786243 L 15.305686996938782 2.7142218651325836 L 15.982848706365786 2.9152429661389876 L 16.67376207875073 3.140062112400302 L 17.376533368564708 3.3875840076346826 L 18.089236328551372 3.6566027500493625 L 18.80991748943675 3.94580770737298 L 19.536601514252837 4.253789902124208 L 20.267296612598777 4.579048876008494 L 20.999999999999993 4.919999999999992 L 21.732703387401212 5.274982194494919 L 22.46339848574715 5.642266021924348 L 23.19008251056321 6.0200621124003 L 23.910763671448617 6.406529881345906 L 24.62346663143528 6.799786496638469 L 25.32623792124926 7.19791605157832 L 26.0171512936342 7.598978898993593 L 26.694313003061183 8.0010211010064 L 27.355866996353637 8.402083948421675 L 27.999999999999986 8.800213503361505 L 28.62494649021037 9.193470118654087 L 29.22899353209462 9.579937887599694 L 29.81048547469772 9.957733978075646 L 30.367828489024 10.325017805505093 L 30.899494936611653 10.680000000000003",
            fill: "none",
            stroke: new Color(100, 40, 0).toHexString(),
            "stroke-width": 4.5,
            "stroke-miterlimit": 10,
          }),

          SVG.el("path", {
            d: "M 11.100505063388333 10.68 L 11.632171510975986 10.32501780550509 L 12.18951452530227 9.957733978075655 L 12.771006467905373 9.5799378875997 L 13.375053509789621 9.193470118654092 L 13.999999999999993 8.80021350336152 L 14.644133003646342 8.402083948421685 L 15.305686996938796 8.001021101006407 L 15.98284870636579 7.598978898993599 L 16.673762078750734 7.1979160515783205 L 17.37653336856471 6.799786496638484 L 18.08923632855136 6.406529881345912 L 18.809917489436764 6.020062112400305 L 19.53660151425285 5.642266021924353 L 20.267296612598777 5.274982194494916 L 20.999999999999996 4.920000000000005 L 21.732703387401216 4.579048876008499 L 22.463398485747142 4.253789902124213 L 23.19008251056323 3.9458077073729756 L 23.91076367144862 3.6566027500493723 L 24.623466631435285 3.3875840076346915 L 25.32623792124926 3.1400621124003054 L 26.017151293634193 2.915242966138986 L 26.694313003061197 2.7142218651325827 L 27.35586699635366 2.5379781639786216 L 27.99999999999999 2.3873705042731688 L 28.624946490210373 2.2631326313952824 L 29.22899353209463 2.16586981977328 L 29.810485474697714 2.0960559240485557 L 30.36782848902402 2.054031070503414 L 30.899494936611653 2.040000000000001 L 31.404027556683513 2.054031070503414 L 31.880043460397594 2.096055924048555 L 32.32623792124926 2.1658698197732793 L 32.741387951235936 2.263132631395284 L 33.124355652982146 2.387370504273168 L 33.47409133863715 2.5379781639786163 L 33.789636406996415 2.71422186513258 L 34.070125970960824 2.9152429661389885 L 34.31479122813215 3.140062112400302 L 34.52296156804695 3.3875840076346835 L 34.69406641027328 3.6566027500493687 L 34.82763676833193 3.945807707372981 L 34.923306535155824 4.253789902124209 L 34.98081348656403 4.579048876008495 L 35 4.920000000000002 L 34.98081348656403 5.274982194494911 L 34.92330653515583 5.64226602192434 L 34.82763676833193 6.020062112400302 L 34.69406641027328 6.406529881345918 L 34.52296156804696 6.799786496638481 L 34.31479122813215 7.197916051578311 L 34.070125970960824 7.598978898993584 L 33.78963640699641 8.001021101006401 L 33.474091338637145 8.402083948421685 L 33.124355652982146 8.800213503361515 L 32.74138795123594 9.193470118654078 L 32.326237921249266 9.579937887599696 L 31.880043460397594 9.957733978075648 L 31.404027556683516 10.325017805505077 L 30.89949493661166 10.679999999999996 L 30.367828489024028 11.020951123991502 L 29.81048547469773 11.346210097875796 L 29.228993532094627 11.654192292627025 L 28.62494649021038 11.943397249950628 L 27.999999999999996 12.212415992365315 L 27.355866996353647 12.459937887599697 L 26.694313003061215 12.684757033861011 L 26.017151293634214 12.885778134867419 L 25.32623792124927 13.06202183602138 L 24.623466631435292 13.21262949572683 L 23.910763671448628 13.336867368604715 L 23.19008251056325 13.43413018022672 L 22.463398485747163 13.503944075951447 L 21.732703387401223 13.545968929496588 L 21.000000000000004 13.56 L 20.267296612598788 13.545968929496588 L 19.536601514252848 13.503944075951447 L 18.809917489436785 13.434130180226724 L 18.089236328551383 13.33686736860472 L 17.376533368564694 13.212629495726834 L 16.67376207875074 13.062021836021387 L 15.982848706365797 12.885778134867417 L 15.305686996938817 12.684757033861015 L 14.64413300364636 12.4599378875997 L 13.99999999999999 12.212415992365312 L 13.375053509789629 11.943397249950632 L 12.77100646790538 11.654192292627028 L 12.189514525302275 11.346210097875794 L 11.632171510976002 11.020951123991507 L 11.100505063388328 10.680000000000009 L 10.595972443316471 10.325017805505091 L 10.119956539602413 9.957733978075662 L 9.673762078750737 9.57993788759969 L 9.258612048764078 9.193470118654083 L 8.875644347017857 8.80021350336152 L 8.525908661362847 8.40208394842168 L 8.210363593003592 8.001021101006407 L 7.929874029039176 7.5989788989936 L 7.685208771867851 7.197916051578327 L 7.477038431953044 6.799786496638486 L 7.30593358972672 6.406529881345923 L 7.172363231668072 6.020062112400317 L 7.076693464844174 5.642266021924345 L 7.019186513435965 5.274982194494917 L 7 4.919999999999997 L 7.019186513435965 4.5790488760085 L 7.076693464844174 4.253789902124213 L 7.1723632316680686 3.9458077073729774 L 7.305933589726717 3.656602750049373 L 7.477038431953041 3.3875840076346933 L 7.6852087718678455 3.1400621124003054 L 7.9298740290391745 2.915242966138991 L 8.210363593003587 2.714221865132588 L 8.525908661362852 2.537978163978619 L 8.875644347017852 2.3873705042731697 L 9.258612048764057 2.2631326313952824 L 9.673762078750732 2.16586981977328 L 10.119956539602406 2.0960559240485557 L 10.595972443316482 2.054031070503413 L 11.100505063388338 2.040000000000001 L 11.632171510975974 2.054031070503413 L 12.189514525302267 2.096055924048555 L 12.771006467905371 2.1658698197732784 L 13.37505350978962 2.2631326313952806 L 14 2.387370504273167 L 14.644133003646328 2.5379781639786243 L 15.305686996938782 2.7142218651325836 L 15.982848706365786 2.9152429661389876 L 16.67376207875073 3.140062112400302 L 17.376533368564708 3.3875840076346826 L 18.089236328551372 3.6566027500493625 L 18.80991748943675 3.94580770737298 L 19.536601514252837 4.253789902124208 L 20.267296612598777 4.579048876008494 L 20.999999999999993 4.919999999999992 L 21.732703387401212 5.274982194494919 L 22.46339848574715 5.642266021924348 L 23.19008251056321 6.0200621124003 L 23.910763671448617 6.406529881345906 L 24.62346663143528 6.799786496638469 L 25.32623792124926 7.19791605157832 L 26.0171512936342 7.598978898993593 L 26.694313003061183 8.0010211010064 L 27.355866996353637 8.402083948421675 L 27.999999999999986 8.800213503361505 L 28.62494649021037 9.193470118654087 L 29.22899353209462 9.579937887599694 L 29.81048547469772 9.957733978075646 L 30.367828489024 10.325017805505093 L 30.899494936611653 10.680000000000003",
            fill: "none",
            stroke: new Color(220, 80, 0).toHexString(),
            "stroke-width": 3,
            "stroke-miterlimit": 10,
          }),
        ]),
        {
          id: "snap-santa-pretzel",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 12 6 L 42 0.75 L 44.25 12 L 14.25 18.75 Z",
            fill: "none",
            stroke: new Color(150, 150, 150).toHexString(),
            "stroke-width": 1.5,
            "stroke-miterlimit": 10,
            "stroke-linejoin": "round",
          }),
          SVG.el("path", {
            d: "M 12 6 L 42 0.75 L 44.25 12 L 14.25 18.75 Z",
            fill: "#fff",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 36 3.75 L 40.5 3 L 41.25 6 L 36.75 7.050000000000001 Z",
            fill: new Color(200, 0, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 18 10.8 L 27 9 M 18.9 14.100000000000001 L 27.900000000000002 12",
            fill: "none",
            stroke: new Color(0, 0, 180).toHexString(),
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-dasharray": "1.5 1.5 3.6 1.5",
            "stroke-miterlimit": 10,
          }),
        ]),
        {
          id: "snap-santa-letter",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 37.125 1.5 L 40.875 1.5 L 40.875 1.5 L 40.875 1.5 A 1.125 1.125 0 0 1 42 2.625 L 42 2.625 L 42 2.625 L 42 2.625 A 1.125 1.125 0 0 1 40.875 3.75 L 37.125 3.75 L 37.125 3.75 L 37.125 3.75 A 1.125 1.125 0 0 1 36 2.625 L 36 2.625 L 36 2.625 L 36 2.625 A 1.125 1.125 0 0 1 37.125 1.5 Z M 37.5 3.75 L 40.5 3.75 L 40.5 7.5 L 37.5 7.5 L 37.5 3.75 Z",
            fill: "none",
            stroke: new Color(200, 200, 200).toHexString(),
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 15 6 L 47 6 L 47 6 L 47 6 A 3 3 0 0 1 50 9 L 50 9 L 50 9 L 50 9 A 3 3 0 0 1 47 12 L 15 12 L 15 12 L 15 6 L 15 6 Z",
            fill: "none",
            stroke: new Color(200, 200, 200).toHexString(),
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 15 1.5 L 21 1.5 L 21 6.75 L 15 6.75 L 15 1.5 Z",
            fill: "none",
            stroke: new Color(200, 200, 200).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 12 1.5 L 24 1.5",
            fill: "none",
            stroke: new Color(200, 200, 200).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 12 12 L 47 12 L 50 15 L 12 15 Z",
            fill: "none",
            stroke: new Color(200, 200, 200).toHexString(),
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 37.125 1.5 L 40.875 1.5 L 40.875 1.5 L 40.875 1.5 A 1.125 1.125 0 0 1 42 2.625 L 42 2.625 L 42 2.625 L 42 2.625 A 1.125 1.125 0 0 1 40.875 3.75 L 37.125 3.75 L 37.125 3.75 L 37.125 3.75 A 1.125 1.125 0 0 1 36 2.625 L 36 2.625 L 36 2.625 L 36 2.625 A 1.125 1.125 0 0 1 37.125 1.5 Z M 37.5 3.75 L 40.5 3.75 L 40.5 7.5 L 37.5 7.5 L 37.5 3.75 Z",
            fill: new Color(200, 0, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 38.1 15 A 3.5999999999999996 3.5999999999999996 0 1 1 38.09999820000015 14.996400000599998",
            fill: "#000",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 45.6 15 A 3.5999999999999996 3.5999999999999996 0 1 1 45.59999820000015 14.996400000599998",
            fill: "#000",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 36.9 15 A 2.4000000000000004 2.4000000000000004 0 1 1 36.8999988000001 14.997600000399999",
            fill: new Color(200, 0, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 44.4 15 A 2.4000000000000004 2.4000000000000004 0 1 1 44.3999988000001 14.997600000399999",
            fill: new Color(200, 0, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 15 6 L 47 6 L 47 6 L 47 6 A 3 3 0 0 1 50 9 L 50 9 L 50 9 L 50 9 A 3 3 0 0 1 47 12 L 15 12 L 15 12 L 15 6 L 15 6 Z",
            fill: new Color(0, 200, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 15 1.5 L 21 1.5 L 21 6.75 L 15 6.75 L 15 1.5 Z",
            fill: "none",
            stroke: new Color(200, 0, 0).toHexString(),
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 12 1.5 L 24 1.5",
            fill: "none",
            stroke: new Color(200, 0, 0).toHexString(),
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 12 12 L 47 12 L 50 15 L 12 15 Z",
            fill: new Color(0, 100, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 23.1 15 A 3.5999999999999996 3.5999999999999996 0 1 1 23.09999820000015 14.996400000599998",
            fill: "#000",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 30.6 15 A 3.5999999999999996 3.5999999999999996 0 1 1 30.59999820000015 14.996400000599998",
            fill: "#000",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 21.9 15 A 2.4000000000000004 2.4000000000000004 0 1 1 21.899998800000102 14.997600000399999",
            fill: new Color(200, 0, 0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 29.4 15 A 2.4000000000000004 2.4000000000000004 0 1 1 29.399998800000102 14.997600000399999",
            fill: new Color(200, 0, 0).toHexString(),
            stroke: "none",
          }),
        ]),
        {
          id: "snap-santa-train",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 12 7.5 L 6 7.5 L 12 1.5 L 36 1.5 L 42 7.5 L 36 7.5 L 36 13.5 L 12 13.5 Z",
            fill: "none",
            stroke: new Color(220,80,0).toHexString(),
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 12 7.5 L 6 7.5 L 12 1.5 L 36 1.5 L 42 7.5 L 36 7.5 L 36 13.5 L 12 13.5 Z",
            fill: new Color(220,80,0).toHexString(),
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 12 7.5 L 6 7.5 L 12 1.5 L 36 1.5 L 42 7.5 L 36 7.5 L 36 13.5 L 12 13.5 Z",
            fill: "none",
            stroke: "#fff",
            "stroke-width": 0.75,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 13.590461068821137 4.263030214988503 A 1.5 1.5 0 0 0 16.40953893117886 4.263030214988503 L 16.59046106882114 4.263030214988503 A 1.5 1.5 0 0 0 19.40953893117886 4.263030214988503 L 19.59046106882114 4.263030214988503 A 1.5 1.5 0 0 0 22.40953893117886 4.263030214988503 L 22.59046106882114 4.263030214988503 A 1.5 1.5 0 0 0 25.40953893117886 4.263030214988503 L 25.59046106882114 4.263030214988503 A 1.5 1.5 0 0 0 28.40953893117886 4.263030214988503 L 28.59046106882114 4.263030214988503 A 1.5 1.5 0 0 0 31.40953893117886 4.263030214988503 L 31.59046106882114 4.263030214988503 A 1.5 1.5 0 0 0 34.409538931178865 4.263030214988503",
            fill: "none",
            stroke: "#fff",
            "stroke-width": 0.75,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 15 13.5 L 15 10.5 L 15 10.5 A 3 3 0 0 1 21 10.5 L 21 13.5 M 18 13.5 L 18 10.5",
            fill: "none",
            stroke: "#fff",
            "stroke-width": 0.75,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-miterlimit": 10,
          }),
          SVG.el("path", {
            d: "M 25.5 8.100000000000001 L 31.5 8.100000000000001 L 31.5 11.700000000000001 L 25.5 11.700000000000001 L 25.5 8.100000000000001 Z",
            fill: "none",
            stroke: "#fff",
            "stroke-width": 0.75,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-miterlimit": 10,
          }),
        ]),
        {
          id: "snap-santa-house",
        }
      )
    ]
  }

  /**
   * Create css stylesheet
   *
   * @static
   * @returns {SVGStyleElement}
   */
  static makeStyle() {
    const style = SVG.el("style")
    style.appendChild(SVG.cdata(Style.cssContent))
    return style
  }

  /**
   * Create dropshadow filter
   *
   * @static
   * @param {string} id
   * @returns {SVGFilterElement}
   */
  static dropShadowFilter(id) {
    const f = new Filter(id)
    // f.dropShadow(-0.5, -0.5, 0, "black", 0.3)
    let flood = f.flood("#000", 0.3, "SourceAlpha")
    let offset = f.offset(-0.6, -0.6, f.blur(0, "SourceAlpha"))
    f.comp("over", "SourceGraphic", f.comp("in", flood, offset))
    return f.el
  }

  /**
   * Bevel effect filter
   *
   * @static
   * @param {string} id
   * @param {number} inset
   * @returns {SVGFilterElement}
   */
  static bevelFilter(id, inset) {
    const f = new Filter(id)

    const alpha = "SourceAlpha"
    const blur = f.blur(0.3, alpha)

    f.merge([
      "SourceGraphic",
      f.comp(
        "in",
        f.flood("#fff", 0.4),
        f.subtract(
          alpha,
          f.offset(inset ? -0.4 : 0.4, inset ? -0.4 : 0.4, blur),
        ),
      ),
      f.comp(
        "in",
        f.flood("#000", inset ? 0.9 : 0.8),
        f.subtract(
          alpha,
          f.offset(inset ? 0.7 : -0.7, inset ? 0.7 : -0.7, blur),
        ),
      ),
    ])

    return f.el
  }

  /**
   * Readonly input
   *
   * @static
   * @param {number} w
   * @param {number} h
   * @param {(Color | string)} [color="white"]
   * @param {SVGElement} el
   * @returns {SVGElement}
   */
  static darkRect(w, h, color, el) {
    return SVG.setProps(
      SVG.group([
        SVG.setProps(el, {
          class: `snap-dark-input`,
          fill:
            color instanceof Color
              ? color.toHexString()
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

  /**
   * Default font family
   *
   * @static
   * @readonly
   * @type {string}
   * @constant
   */
  static get defaultFontFamily() {
    return "Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif"
  }
}
