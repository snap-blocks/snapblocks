# History (and todo list)

# 1.9.0
## Added
- [x] Add new Snap<i>!</i> v11 blocks
## Fixed
- [x]Fix `@verticalEllipsis` position in `@delInput @verticalEllipsis` pattern
- [x] Automatic version injection so I can just edit the version in `package.json`
- [ ] Reporters in upvars not always being in the variables category

# 1.8.2
## Fixed
- [x] Block prototypes in Japanese translation
- [x] Block highlighting
- [x] Fix viewport height on single scratch 3 define block (pulled from scratchblocks).
- [x] Default icon color is not affected by zebra coloring
- [x] Block wrapping in scratch 3 block prototype
- [x] Stacked comments breaking
- [x] Multiline comment with // is bolded

# 1.8.1
## Additions
- Allow the use of `@<:>` (each can be used in any order) as a shortcut for `@delInput @verticalEllipsis @addInput`
## Changes
- Make scratch3 `@delInput`, `@verticalEllipsis` and `@addInput` bigger.
## Fixes
- Fixed Scratch translations (I haven't gotten to adding snap translations yet)
- Fix snap round input padding
- Fix unknown santa hats
- Add "compiled" `(@blitz find first item (() @>) in @list)

## 1.8.0
### Additions
    [x] Santa hats
        [x] hat
        [x] trumpet
        [x] star
        [x] candles
        [x] gift
        [x] pretzel
        [x] letter
        [x] train
        [x] house
    [x] Add `santa` option
### Fixes
    [x] Fix upvar
    [x] Fix snap spacing
    [x] Fix scratch2 rings
    [x] Make snap rings look better
    [x] Allow icons to be in variable names
    [x] Fix arrow icons in scratch2 and scratch3 styles
    [x] Make loop icon respect zebra coloring

## 1.7.1
    [x] Remove background from c-shapes hat blocks

## 1.7.0
### Additions
    [x] Infinity icon
    [x] Cube icons
    [x] Icon alpha
    [x] Condition hat blocks
    [x] Background for c-slots in hats
### Fixes
    [x] Rename "gets" to "signals"
    [x] Fix snap flag icon
    [x] Fix scratch3 input roundness
    [x] Fix snap input width
    [x] Fix empty rings
    [x] Fix rings in rings
    [x] Fix reporter x position in upvars and rings in scratch2
    [x] C-slots in hat blocks
    [x] Update snap local pin position
    [x] Set flat design contrast to new contrast in snap 10.3.0
