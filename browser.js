import init from "./index.js"

const snapblocks = (window.snapblocks = init(window))

// add our CSS to the page
snapblocks.appendStyles()

export default snapblocks
