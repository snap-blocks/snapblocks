import languages from "../locales/all.js"
export default function init(snapblocks) {
  snapblocks.loadLanguages(languages)
}
init.languages = languages
