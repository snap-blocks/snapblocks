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
      return new Color()
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
            d: "M 0.5 0 L 0.5 10 Z",
            "stroke-width": 1,
          }),
          SVG.el("path", {
            d: "M 0 3 C 9.6 3 1.2 6 12 6",
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
        SVG.el("path", {
          d: `M 1 8.400000000000006 L 7.399999999999977 8.400000000000006 M 4.199999999999989 5.200000000000017 L 4.199999999999989 11.599999999999994`,
        }),
        {
          id: "snap-plusSign",
        },
      ),
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
    let offset = f.offset(-0.5, -0.5, f.blur(0, "SourceAlpha"))
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
