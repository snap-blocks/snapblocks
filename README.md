Make pictures of Snap<i>!</i> blocks from text.

[![Screenshot](./readme-assets/images/screenshot.png)](https://snap-blocks.github.io/?style=snap&zebraColoring=&wrap=&showSpaces=&script=when%2520flag%2520clicked%250Aclear%250Aforever%2520%257B%250A%2520%2520pen%2520down%250A%2520%2520if%2520%253C%253Cmouse%2520down%3F%253E%2520and%2520%253Ctouching%2520%255Bmouse-pointer%2520V%255D%2520%3F%253E%253E%2520%257B%250A%2520%2520%2520%2520switch%2520to%2520costume%2520%255Bbutton%2520V%255D%250A%2520%2520%257D%2520else%2520%257B%250A%2520%2520%2520%2520add%2520%28x%2520position%29%2520to%2520%28list%29%250A%2520%2520%257D%250A%2520%2520move%2520%28foo%29%2520steps%250A%2520%2520turn%2520ccw%2520%289%29%2520degrees%250A%257D)


**[Try it out!](https://snap-blocks.github.io/)**

[Dev version](https://snap-blocks.github.io/snapblocks)

[Documentation](https://snap-blocks.github.io/docs) (needs work)

[Style guide](https://snapwiki.miraheze.org/wiki/Snapblocks_Style_Guide)

---

**snapblocks** is a fork of **scratchblocks** which aims to be more catered towards Snap<i>!</i>. These changes include, adding Snap<i>!</i> blocks, inputs, icons, and more.

---

**snapblocks** is used to write Snap scripts:

- in [Snap Wiki](https://snapwiki.miraheze.org/) articles
- in [Snap Forum](https://forum.snap.berkeley.edu/) posts

It's MIT licensed, so you can use it in your projects.

For the full guide to the syntax, see the [snapblocks docs](https://snap-blocks.github.io/docs/syntax).

# Usage

## MediaWiki

Use [the MediaWiki plugin](https://github.com/snap-blocks/mw-snapblocks).

## Discourse

Use the [discourse plugin](https://github.com/snap-blocks/snapblocks-discourse) to add snapblocks to your discourse forum (the forum software used by the Snap<i>!</i> forum).

## WordPress

@tjvr found [a scratchblocks WordPress plugin](https://github.com/tkc49/scratchblocks-for-wp).
It might work for you; I haven't tried it (and you'd have to replace scratchblocks with snapblocks).

## React

Use the [snapblocks-react](https://github.com/snap-blocks/snapblocks-react) library to render snapblocks in react.

## HTML

You'll need to include a copy of the snapblocks JS file on your webpage.
There are a few ways of getting one:

* Download it from the <https://github.com/snap-blocks/snapblocks/releases> page
* If you have a fancy JS build system, you might like to include the `snapblocks` package from NPM.
* You could clone this repository and build it yourself using Node 22+ (`npm run build`).

```html
<script src="snapblocks-min.js"></script>
```

In order to use translations, include the `translations-all.js` file.

```html
<script src="snapblocks.min.js"></script>
<script src="translations-all.js"></script>
```

The convention is to write snapblocks inside `pre` tags with the class `blocks`:
```html
<pre class="blocks">
when flag clicked
move (10) steps
</pre>
```

You then need to call `snapblocks.renderMatching` after the page has loaded.
Make sure this appears at the end of the page (just before the closing `</body>` tag):
```js
<script>
snapblocks.renderMatching('pre.blocks', {
  style:     'snap',       // Optional, defaults to 'snap'.
  languages: ['en'], // Optional, defaults to ['en'].
  scale:     1,                // Optional, defaults to 1
});
</script>
```

The `renderMatching()` function takes a CSS-style selector for the elements that contain snapblocks code: we use `pre.blocks` to target `pre` tags with the class `blocks`.

The `style` option controls how the blocks appear, either the Snap, Scratch 2, or Scratch 3 style is supported.

### Inline blocks

You might also want to use blocks "inline", inside a paragraph:
```html
I'm rather fond of the <code class="b">cut from [ V]</code> block in Snap.
```

To allow this, make a second call to `renderMatching` using the `inline` argument.
```js
<script>
snapblocks.renderMatching("pre.blocks", ...)

snapblocks.renderMatching("code.b", {
  inline: true,
  // Repeat `style` and `languages` options here.
});
</script>
```
This time we use `code.b` to target `code` blocks with the class `b`.

### Other `renderMatching` options

There are more options for `renderMatching` that you can use.

```js
snapblocks.renderMatching('pre.blocks', {
  style:         'snap',       // Optional, defaults to 'scratch2'.
  languages:     ['en'],       // Optional, defaults to ['en'].
  scale:         1,                // Optional, defaults to 1
  wrap:          true,              // Optional, defaults to false. This enabled block wrapping
  wrapSize:      200,           // Optional, defaults to null. This sets the minimum width for block wrapping
  zebraColoring: true,     // Optional, defaults to false. Enabled zebra coloring
  showSpaces:    true,        // Optional, defaults to false. Shows spaces in inputs
});
```

### Translations

Note: currently translations are partially broken, but I hope to get them fixed in a future version.

If you want to use languages other than English, you'll need to include a second JS file that contains translations.
The releases page includes two options; you can pick one:

* `translations.js` includes a limited set of languages, as seen on the Scratch Forums
* `translations-all.js` includes every language that Scratch supports.

The translations files are hundreds of kilobytes in size, so to keep your page bundle size down you might like to build your own file with just the languages you need.

For example, a translations file that just loads the German language (ISO code `de`) would look something like this:
```js
window.snapblocks.loadLanguages({
    de: <contents of locales/de.json>
})
```

If you're using a JavaScript bundler you should be able to build your own translations file by calling `require()` with the path to the locale JSON file.
This requires your bundler to allow importing JSON files as JavaScript.
```js
window.snapblocks.loadLanguages({
    de: require('snapblocks/locales/de.json'),
})
```

## NPM

The `snapblocks` package is published on NPM, and you can use it with browserify and other bundlers, if you're into that sort of thing.

Once you've got browserify set up to build a client-side bundle from your app
code, you can just add `snapblocks` to your dependencies, and everything
should Just Work™.

```js
var snapblocks = require('snapblocks');
snapblocks.renderMatching('pre.blocks');
```

Please note, snapblocks is a client-side library, which means that you will get errors if the `window` object does not exist (e.g. when ran on the server).

## ESM Support
Since version 3.6.0 of scratchblocks (and subsequently snapblocks) can be properly loaded as an ESM module. The ESM version, instead of defining `window.snapblocks`, default-exports the `snapblocks` object. Similarly, the JavaScript translation files default-exports a function to load the translations.

```js
import snapblocks from "./snapblocks.min.es.js";
import loadTranslations from "./translations-all-es.js";
loadTranslations(snapblocks);

// window.snapblocks is NOT available!
```

# Languages

To update the translations:
```sh
npm upgrade scratch-l10n@latest
npm run locales
```

## Adding a language

Each language **requires** some [additional words](https://github.com/snap-blocks/snapblocks/blob/master/locales-src/extra_aliases.js) which aren't in Scratch itself (mainly the words used for the flag and arrow images).
I'd be happy to accept pull requests for those! You'll need to rebuild the translations with `npm run locales` after editing the aliases.

# Development

This should set you up and start a http-server for development:

```
npm install
npm start
```

Then open <http://localhost:8000/> :-)

For more details, see [`CONTRIBUTING.md`](https://github.com/snap-blocks/snapblocks/blob/master/.github/CONTRIBUTING.md).


# Credits

Many, many thanks to the [contributors](https://github.com/snap-blocks/snapblocks/graphs/contributors)!

* Maintained by [ego-lay-atman-bay](https://github.com/ego-lay-atman-bay)
* This is a fork of [scratchblocks](https://github.com/scratchblocks/scratchblocks), so all the credit there still applies here.
* Original scratchblocks library by [tjvr](https://github.com/tjvr)
* Icons derived from [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks) (Apache License 2.0) and [Snap<i>!</i>](https://github.com/jmoenig/Snap/blob/master/src/symbols.js)
* Snap santa hats were designed by [Jens Mönig](https://github.com/jmoenig/), I just converted them from JavaScript canvas commands to svg.
* Scratch 2 SVG proof-of-concept, shapes & filters by [as-com](https://github.com/as-com)
* Anna helped with a formula, and pointed out that tjvr can't read graphs
* JSO designed the original syntax and wrote the original [Block Plugin](https://en.scratch-wiki.info/wiki/Block_Plugin_\(1.4\))
* The syntax changes (and additions) within snapblocks were made by me, ego-lay-atman-bay
* Help with translation code from [joooni](https://scratch.mit.edu/users/joooni/)
* Block translations from the [scratch-l10n repository](https://github.com/scratchfoundation/scratch-l10n/)
* Ported to node by [arve0](https://github.com/arve0)
