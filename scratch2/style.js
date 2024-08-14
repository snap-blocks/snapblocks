import SVG from "./draw.js"
import Color from "../shared/color.js"
import Filter from "./filter.js"
import cssContent from "./style.css.js"

export default class Style {
  static get cssContent() {
    return cssContent
  }

  static colors = {
    comment: {
      body: Color.fromString("#FFFFD2"),
      titleBar: Color.fromString("#FFFFA5"),
      border: Color.fromString("#D0D1D2"),
    },

    categories: {
      obsolete: new Color(212, 40, 40),
      motion: new Color(74, 108, 212),
      looks: new Color(138, 85, 215),
      sound: new Color(187, 66, 195),
      pen: new Color(14, 154, 108),
      events: new Color(200, 131, 48),
      control: new Color(225, 169, 26),
      sensing: new Color(44, 165, 226),
      operators: new Color(92, 183, 18),
      variables: new Color(238, 125, 22),
      lists: new Color(204, 91, 34),
      custom: new Color(99, 45, 153),
      "custom-arg": new Color(89, 71, 177),
      extension: new Color(75, 74, 96),
      other: new Color(150, 150, 150),
    },
  }

  static categoryColor(category) {
    if (Style.colors.categories[category]) {
      return Style.colors.categories[category]
    } else if (category instanceof Color) {
      return category
    } else {
      return new Color()
    }
  }

  static makeIcons() {
    return [
      SVG.el("path", {
        d: "M 0 2 L 5.5 8 L 11 2 Z",
        id: "sb-commentArrowDown",
        fill: "#808080",
      }),
      SVG.el("path", {
        d: "M 2 0 L 8 5.5 L 2 11 Z",
        id: "sb-commentArrowRight",
        fill: "#808080",
      }),

      SVG.el("path", {
        d: "M1.504 21L0 19.493 4.567 0h1.948l-.5 2.418s1.002-.502 3.006 0c2.006.503 3.008 2.01 6.517 2.01 3.508 0 4.463-.545 4.463-.545l-.823 9.892s-2.137 1.005-5.144.696c-3.007-.307-3.007-2.007-6.014-2.51-3.008-.502-4.512.503-4.512.503L1.504 21z",
        id: "sb-flag",
      }),
      SVG.el("polygon", {
        points:
          "6.3,0.4725 12.516,0.4725 18.585,6.3 18.585,12.495 12.495,18.585 6.3,18.585 0.483,12.495 0.483,6.3  ",
        id: "sb-octagon",
      }),
      SVG.el("path", {
        d: "M6.724 0C3.01 0 0 2.91 0 6.5c0 2.316 1.253 4.35 3.14 5.5H5.17v-1.256C3.364 10.126 2.07 8.46 2.07 6.5 2.07 4.015 4.152 2 6.723 2c1.14 0 2.184.396 2.993 1.053L8.31 4.13c-.45.344-.398.826.11 1.08L15 8.5 13.858.992c-.083-.547-.514-.714-.963-.37l-1.532 1.172A6.825 6.825 0 0 0 6.723 0z",
        id: "sb-turnRight",
      }),
      SVG.el("path", {
        d: "M3.637 1.794A6.825 6.825 0 0 1 8.277 0C11.99 0 15 2.91 15 6.5c0 2.316-1.253 4.35-3.14 5.5H9.83v-1.256c1.808-.618 3.103-2.285 3.103-4.244 0-2.485-2.083-4.5-4.654-4.5-1.14 0-2.184.396-2.993 1.053L6.69 4.13c.45.344.398.826-.11 1.08L0 8.5 1.142.992c.083-.547.514-.714.963-.37l1.532 1.172z",
        id: "sb-turnLeft",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 8 10 l 2 -2 l 0 -3 l 3 0 l -4 -5 l -4 5 l 3 0 l 0 3 l -8 0 l 0 2 Z",
            fill: "#000",
            opacity: "0.3",
          }),
          SVG.move(
            -1,
            -1,
            SVG.el("path", {
              d: "M 8 10 l 2 -2 l 0 -3 l 3 0 l -4 -5 l -4 5 l 3 0 l 0 3 l -8 0 l 0 2 Z",
              opacity: "0.9",
            }),
          ),
        ]),
        {
          id: "sb-loop",
        },
      ),
      SVG.el("path", {
        d: "M 1 1 L 5 5 L 1 9 Z",
        id: "sb-addInput",
      }),
      SVG.el("path", {
        d: "M 1 5 L 5 1 L 5 9 Z",
        id: "sb-delInput",
      }),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2 1 A 1 1 0 1 1 1.9999995000000417 0.9990000001666661
              M 2 5 A 1 1 0 1 1 1.9999995000000417 4.999000000166666
              M 2 9 A 1 1 0 1 1 1.9999995000000417 8.999000000166665`,
        }),
        {
          id: "sb-verticalEllipsis",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.withChildren(
            SVG.el("mask", {
              id: "sb-list-holes",
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
              x: 0.5,
              y: 0.5,
              width: "6",
              height: "2",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: 0.5,
              y: 3.5,
              width: "6",
              height: "2",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: 0.5,
              y: 6.5,
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
            mask: "url(#sb-list-holes)",
          }),
        ]),
        {
          id: "sb-list",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 8.660254037844387 5 L 0 10 Z",
        }),
        {
          id: "sb-pointRight",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 13 5 L 0 10 L 5 5 Z",
        }),
        {
          id: "sb-turtle",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 13 5 L 0 10 L 5 5 Z",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb-turtleOutline",
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
          id: "sb-pause",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 2.6666666666666665 0 L 0 3.3333333333333335 L 2.6666666666666665 3.3333333333333335 L 0 6.666666666666667 L 2.6666666666666665 6.666666666666667 L 0 10 L 8 5.555555555555555 L 5.333333333333333 5.555555555555555 L 8 2.2222222222222223 L 5.333333333333333 2.2222222222222223 L 8 0 Z",
        }),
        {
          id: "sb-flash",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.5 8.333333333333334 L 9.5 8.333333333333334 L 9.5 2.5 L 7.5 2.5 L 6.25 0.5 L 3.75 0.5 L 2.5 2.5 L 0.5 2.5 L 0.5 8.333333333333334 Z
              M 6.6 5 A 1.6 1.6 0 1 1 6.599999200000067 4.998400000266666 Z`,
        }),
        {
          id: "sb-camera",
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
          id: "sb-circleSolid",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 4.5,
          cx: 4.75,
          cy: 5,
        }),
        {
          id: "sb-circle",
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
          id: "sb-notes",
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
          id: "sb-storage",
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
          id: "sb-brush",
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
          id: "sb-pipette",
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
          id: "sb-paintbucket",
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
          id: "sb-eraser",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 3 M 0 2.9999999999999996 A 3 3 0 0 1 6 3 L 3 10 L 0 3 M 4.5 3 A 1.5 1.5 0 1 1 4.499999250000062 2.998500000249999",
          "fill-rule": "evenodd",
        }),
        {
          id: "sb-location",
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
          id: "sb-gears",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 10 7.5 L 10 10 L 0.5 10 A 7.5 7.5 0 0 1 0.2389 9.3779 L 2.3298 8.4117 A 5.25 5.25 0 0 1 2.3298 6.5883 L 0.2389 5.6221 A 7.5 7.5 0 0 1 0.5709 4.6299 L 0.5709 4.6299 A 7.5 7.5 0 0 1 1.0378 3.6935 L 3.1995 4.4887 A 5.25 5.25 0 0 1 4.4887 3.1995 L 3.6935 1.0378 A 7.5 7.5 0 0 1 4.6299 0.5709 L 4.6299 0.5709 A 7.5 7.5 0 0 1 5.6221 0.2389 L 6.5883 2.3298 A 5.25 5.25 0 0 1 8.4117 2.3298 L 9.3779 0.2389 A 7.5 7.5 0 0 1 10 0.5 L 10 7.5 L 9.75 7.5 A 2.25 2.25 0 1 1 9.75 7.4978`,
          "fill-rule": "evenodd",
        }),
        {
          id: "sb-gearPartial",
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
          id: "sb-gearBig",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 9.5 5 A 4.5 4.5 0 1 1 9.5 4.9955 M 0.5 5 L 9.5 5 M 4.6332 0.5127 A 7.5 7.5 0 0 0 4.6332 9.4826 M 5.3668 0.5127 A 7.5 7.5 0 0 1 5.3668 9.4826",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb-globe",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 9.5 5 A 4.5 4.5 0 1 1 9.5 4.9955 M 0.5 5 L 9.5 5 M 4.6332 0.5127 A 7.5 7.5 0 0 0 4.6332 9.4826 M 5.3668 0.5127 A 7.5 7.5 0 0 1 5.3668 9.4826 M 1 3 L 9 3 M 1 7 L 9 7`,
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb-globeBig",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 10,
          height: 10,
        }),
        {
          id: "sb-square",
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
          id: "sb-robot",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 5 0.5 L 9.5 5 L 6.5 5 L 6.5 9.5 L 3.5 9.5 L 3.5 5 Z",
        }),
        {
          id: "sb-arrowUp",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.5 5 L 5 0.5 L 9.5 5 L 6.5 5 L 6.5 9.5 L 3.5 9.5 L 3.5 5 Z",
        }),
        {
          id: "sb-arrowUpOutline",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.666666666666666 3.3333333333333335 L 5 1 L 3.3333333333333335 3.3333333333333335 M 5 1 L 5 9.5",
          fill: "none",
        }),
        {
          id: "sb-arrowUpThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUp",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb-arrowDown",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUpOutline",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb-arrowDownOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUpThin",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb-arrowDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUp",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb-arrowLeft",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUpOutline",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb-arrowLeftOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUpThin",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb-arrowLeftThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUp",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb-arrowRight",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUpOutline",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb-arrowRightOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUpThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb-arrowRightThin",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.666666666666666 3.3333333333333335 L 5 1 L 3.3333333333333335 3.3333333333333335 M 6.666666666666666 6.666666666666666 L 5 9 L 3.3333333333333335 6.666666666666666 M 5 1 L 5 9",
          fill: "none",
        }),
        {
          id: "sb-arrowUpDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb-arrowUpDownThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb-arrowLeftRightThin",
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
          id: "sb-stepForward",
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
          id: "sb-file",
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
          id: "sb-fullScreen",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.group([
            SVG.el("path", {
              d: `M 3.5 6.5 L 1 9 M 6.5 3.5 L 9 1`,
              "stroke-width": 2,
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
                "stroke-width": 2,
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
          id: "sb-grow",
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
          id: "sb-normalScreen",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: `M 1 8.400000000000006 L 7.399999999999977 8.400000000000006 M 4.199999999999989 5.200000000000017 L 4.199999999999989 11.599999999999994`,
        }),
        {
          id: "sb-plusSign",
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
          class: `sb-dark-input`,
          fill:
            color instanceof Color
              ? color.darker(20).toHexString()
              : color
                ? Color.fromString(color)?.toHexString()
                : "white",
        }),
      ]),
      { width: w, height: h },
    )
  }

  static get defaultFontFamily() {
    return "Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif"
  }
}
