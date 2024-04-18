import path from "path"

const tests = []

export function test(style, name, source, lang) {
  tests.push({
    style,
    name,
    source,
    lang: lang || "en",
  })

  if (style === "scratch3") {
    tests.push({
      style: "scratch3-high-contrast",
      name,
      source,
      lang: lang || "en",
    })
  }

  if (style === "snap") {
    tests.push({
      style: "snap-flat",
      name,
      source,
      lang: lang || "en",
    })
  }
}

export function runTests(r) {
  return Promise.all(
    tests.map(tc => {
      const outputPath = path.join(
        "snapshots",
        tc.style,
        tc.name.replace(/ /g, "-") + ".png",
      )
      console.log("running", tc.style, tc.name)
      return (async () => {
        const options = {
          lang: tc.lang,
          style: tc.style,
          zebra: true,
          showSpaces: true,
          wrap: true,
          scale: 1,
        }
        await r.snapshotToFile(tc.source, options, outputPath)
        console.log("✓ wrote", outputPath)
      })()
    }),
  )
}
