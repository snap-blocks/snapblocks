import languages from "../locales/forums.js"
export default function init(snapblocks) {
  snapblocks.loadLanguages(languages)
}
init.languages = languages
