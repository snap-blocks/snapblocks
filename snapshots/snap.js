import { test } from "./runner.js"

test(
  "snap",
  "en-motion",
  `
  // Motion

  move (10) steps
  turn cw (15) degrees
  turn right (15) degrees
  turn ↻ (15) degrees
  turn ccw (15) degrees
  turn left (15) degrees
  turn ↺ (15) degrees

  point in direction (90 v)
  point towards [mouse-pointer V]

  go to x: (0) y: (0)
  go to [random position V]
  glide (1) secs to x: (0) y: (0)

  change x by (10)
  set x to (0)
  change y by (10)
  set y to (0)

  if on edge, bounce

  (position)
  (x position)
  (y position)
  (direction)
  `,
)

test(
  "snap",
  "en-looks",
  `
  // Looks

  switch to costume [ V]
  next costume
  (costume #)

  say [Hello!] for (2) secs
  say [Hello!]
  think [Hmm...] for (2) secs
  think [Hmm...]

  ([width V] of costume [current V])
  (stretch [current V] x: (100) y: (50) %)
  (new costume @list width ( v) height ( v))
  (new costume (costume) width ( v) height ( v))

  change [ghost V] effect by (25)
  set [ghost V] effect to (0)
  clear graphic effects
  ([ghost V] effect)

  change size by (10)
  set size to (100) %
  (size)

  show
  hide
  <shown?>

  go to [front V] layer
  go back (1) layers

  // Dev mode

  console log [] ◂⋮▸
  console log [] ◂▸
  console log [] [] ◂⋮▸
  console log [] [] ◂▸
  console log ⋮▸
  console log ▸
  console log input list: (list)
  console log (list)

  alert [] ◂⋮▸
  alert [] ◂▸
  alert [] [] ◂⋮▸
  alert [] [] ◂▸
  alert ⋮▸
  alert ▸
  alert input list: (list)
  alert (list)

  save [pen trails V] as costume named [screenshot]
  `,
)

test(
  "snap",
  "en-sound",
  `
  // Sound

  play sound [ V]
  play sound [ V] until done
  stop all sounds

  play sound [ V] at (44100 v) Hz
  ([duration V] of sound [ V])
  (new sound @list rate (44100 v) Hz)
  (new sound (list) rate (44100 v) Hz)

  rest for (0.2) beats
  play note (60 v) for (0.5) beats
  set instrument to (1 v)

  change tempo by (20)
  set tempo to (60) bpm
  (tempo)

  change volume by (10)
  set volume to (100) %
  (volume)

  change balance by (10)
  set balance to (0)
  (balance)

  play frequency (440) Hz
  stop frequency

  // Dev mode

  play (440) Hz for (2) secs
  `,
)

test(
  "snap",
  "en-pen",
  `
  // Pen

  clear

  pen down
  pen up
  <pen down?>

  set pen color to [#911a44]
  set background color to [#911a44]
  change pen [hue V] by (10)
  set pen [hue V] to (50)
  change background [hue V] by (10)
  set background [hue V] to (50)
  (pen [hue V])

  change pen size by (1)
  set pen size to (1)

  stamp
  fill
  write [Hello!] size (12)

  (pen trails)
  (pen vectors)

  paste on [ V]
  cut from [ V]
  `,
)

test(
  "snap",
  "en-control",
  `
  // Control

  when gf clicked
  when green flag clicked
  when flag clicked
  when ⚑ clicked
  when [space V] key pressed
  when [any key V] key pressed ▸
  when [any key V] key pressed ((key)) ◂
  when I am [clicked V]
  when <>
  when <[] = []>
  when (condition)

  when I receive [ V]
  when I receive [ V] ▸
  when I receive [ V] ((data)) ◂
  broadcast [ V]
  broadcast [ V] ▸
  broadcast [ V] to [all V] ◂▸
  broadcast [ V] to [all V] with data [] ◂
  broadcast [ V] and wait
  broadcast [ V] ▸ and wait
  broadcast [ V] to [all V] ◂▸ and wait
  broadcast [ V] to [all V] with data [] ◂ and wait

  warp {
      
  }

  wait (1) secs
  wait until <>

  forever {

  }

  repeat (10) {

  }

  repeat until <> {

  }

  for ((i)) = (1) to (10) {

  }

  if <> {

  }

  if <> {

  } ▸

  if <> {

  } else if <> {

  } ◂▸

  if <> {

  } else {

  }

  (if <> then [] else [])

  report []

  // stop caps

  stop [all V]
  stop [all scenes V]
  stop [this script V]
  stop [this block V]

  // stop stack

  stop [all but this script V]
  stop [other scripts in sprite V]
  stop [other scripts in stage V]

  run ({}▸) ▸
  run ({}▸) ⋮▸
  run ({}▸) with inputs [] ◂▸
  run ({}▸) with inputs [] ◂⋮▸
  run ({}▸) with inputs [] [] ◂▸
  run ({}▸) with inputs [] [] ◂⋮▸
  run ({}▸) input list: (list)
  run ({}▸) (list)

  launch ({}▸) ▸
  launch ({}▸) ⋮▸
  launch ({}▸) with inputs [] ◂▸
  launch ({}▸) with inputs [] ◂⋮▸
  launch ({}▸) with inputs [] [] ◂▸
  launch ({}▸) with inputs [] [] ◂⋮▸
  launch ({}▸) input list: (list)
  launch ({}▸) (list)

  (call (()▸) ▸)
  (call (()▸) ⋮▸)
  (call (()▸) with inputs [] ◂▸)
  (call (()▸) with inputs [] ◂⋮▸)
  (call (()▸) with inputs [] [] ◂▸)
  (call (()▸) with inputs [] [] ◂⋮▸)
  (call (()▸) input list: (list))
  (call (()▸) (list))

  (pipe [] @arrowRight ▸)
  (pipe [] @arrowRight ⋮▸)
  (pipe [] @arrowRight (()▸) ◂▸)
  (pipe [] @arrowRight (()▸) ◂⋮▸)
  (pipe [] @arrowRight (()▸) (()▸) ◂▸)
  (pipe [] @arrowRight (()▸) (()▸) ◂⋮▸)
  (pipe [] @arrowRight input list: (list))
  (pipe [] @arrowRight (list))

  tell [ V] to ({}▸) ▸
  tell [ V] to ({}▸) ⋮▸
  tell [ V] to ({}▸) with inputs [] ◂▸
  tell [ V] to ({}▸) with inputs [] ◂⋮▸
  tell [ V] to ({}▸) with inputs [] [] ◂▸
  tell [ V] to ({}▸) with inputs [] [] ◂⋮▸
  tell [ V] to ({}▸) input list: (list)
  tell [ V] to ({}▸) (list)

  (ask [ V] for (()▸) ▸)
  (ask [ V] for (()▸) ⋮▸)
  (ask [ V] for (()▸) with inputs [] ◂▸)
  (ask [ V] for (()▸) with inputs [] ◂⋮▸)
  (ask [ V] for (()▸) with inputs [] [] ◂▸)
  (ask [ V] for (()▸) with inputs [] [] ◂⋮▸)
  (ask [ V] for (()▸) input list: (list))
  (ask [ V] for (()▸) (list))

  when I start as a clone
  create clone of [myself V]
  (a new clone of [myself V])
  delete this clone

  pause all @pause
  switch to scene [next V] ▸
  switch to scene [next V] and send [ v] ◂▸
  switch to scene [next V] and send [ v] with data [] ◂

  when [anything V] is edited ▸
  when [anything V] is edited ((data)) ◂
  define ((block)) [] (()▸)
  delete block (()▸)
  set [label V] of block (()▸) to []
  ([definition V] of block (()▸))
  (this [script V])
  (this script)

  // Dev mode

  (message)
  run ({}▸) w/continuation
  (call ({}▸) w/continuation)

  // Obsolete

  send [ V] to [ V]
  `,
)

test(
  "snap",
  "en-sensing",
  `
  // Sensing

  <touching [mouse-pointer V] ?>
  <touching color [#911a44] ?>
  <color [#911a44] is touching [#911a44] ?>

  ask [What's your name?] and wait
  (answer)

  (mouse position)
  (mouse x)
  (mouse y)
  <mouse down?>

  <key [space V] pressed?>

  ([distance V] to [mouse-pointer V])
  ([hue V] at [mouse-pointer V])

  reset timer
  (timer)
  (current [date V])

  ([costume # V] of [ V])
  (my [neighbors V])
  (object [myself V])

  (url [snap.berkeley.edu])
  (microphone [volume V])
  (video [motion V] on [myself V])
  set video transparency to (50)

  <is [turbo mode V] on?>

  set [turbo mode V] to <>
  set [case sensitivity V] to <>
  set [flat line ends V] to <>
  set [log pen vectors V] to <>
  set [video capture V] to <>
  set [mirror video V] to <>
  set [turbo mode V] to (var)
  set [case sensitivity V] to (var)
  set [flat line ends V] to (var)
  set [log pen vectors V] to (var)
  set [video capture V] to (var)
  set [mirror video V] to (var)

  // Dev mode

  (processes)
  (stack size)
  (frames)
  (yields)
  `,
)

test(
  "snap",
  "en-operators",
  `
  // Operators

  ({}▸)
  (()▸)
  (<>▸)

  ({} input names: ((#1)) ◂▸)
  ({} input names: ((#1)) ((#2)) ◂▸)

  (() + ())
  (() + () ◂▸)
  (() + () ◂⋮▸)
  (() + () + () ◂▸)
  (() + () + () ◂⋮▸)
  (sum ▸)
  (sum ⋮▸)
  (sum (list))

  (() - ())

  (() * ())
  (() × ())
  (() x ())
  (() * () ◂▸)
  (() × () ◂▸)
  (() x () ◂▸)
  (() * () ◂⋮▸)
  (() × () ◂⋮▸)
  (() x () ◂⋮▸)
  (() * () * () ◂▸)
  (() × () × () ◂▸)
  (() x () x () ◂▸)
  (() * () * () ◂⋮▸)
  (() × () × () ◂⋮▸)
  (() x () x () ◂⋮▸)
  (product ▸)
  (product ⋮▸)
  (product (list))

  (() / ())
  (() ^ ())

  (() mod ())

  (() min ())
  (() min () ◂▸)
  (() min () ◂⋮▸)
  (() min () min () ◂▸)
  (() min () min () ◂⋮▸)
  (minimum ▸)
  (minimum ⋮▸)
  (minimum (list))

  (() max ())
  (() max () ◂▸)
  (() max () ◂⋮▸)
  (() max () max () ◂▸)
  (() max () max () ◂⋮▸)
  (maximum ▸)
  (maximum ⋮▸)
  (maximum (list))

  (round ())

  ([abs V] of (10))
  ([neg V] of (10))
  ([sign V] of (10))
  ([ceiling V] of (10))
  ([floor V] of (10))
  ([sqrt V] of (10))
  ([sin V] of (10))
  ([cos V] of (10))
  ([tan V] of (10))
  ([asin V] of (10))
  ([acos V] of (10))
  ([atan V] of (10))
  ([ln V] of (10))
  ([log V] of (10))
  ([lg V] of (10))
  ([e ^ V] of (10))
  ([e^ V] of (10))
  ([10 ^ V] of (10))
  ([10^ V] of (10))
  ([2 ^ V] of (10))
  ([2^ V] of (10))
  ([id V] of (10))


  (atan2 () / ())
  (atan2 () ÷ ())
  (pick random (1) to (10))

  <[] < []>
  <[] < []>
  <[] < [] ◂▸>
  <[] < [] ◂⋮▸>
  <[] \< [] \< [] ◂▸>
  <[] \< [] \< [] ◂⋮▸>
  <all \< ▸>
  <all \< ⋮▸>
  <all \< (list)>

  <[] \<= []>
  <[] ≤ []>
  <[] \<= []>
  <[] ≤ []>
  <[] \<= [] ◂▸>
  <[] ≤ [] ◂▸>
  <[] \<= [] ◂⋮▸>
  <[] ≤ [] ◂⋮▸>
  <[] \<= [] \<= [] ◂▸>
  <[] ≤ [] ≤ [] ◂▸>
  <[] \<= [] \<= [] ◂⋮▸>
  <[] ≤ [] ≤ [] ◂⋮▸>
  <all \<= ▸>
  <all ≤ ▸>
  <all \<= ⋮▸>
  <all ≤ ⋮▸>
  <all \<= (list)>
  <all ≤ (list)>

  <[] = []>
  <[] = []>
  <[] = [] ◂▸>
  <[] = [] ◂⋮▸>
  <[] = [] = [] ◂▸>
  <[] = [] = [] ◂⋮▸>
  <all = ▸>
  <all = ⋮▸>
  <all = (list)>

  <[] != []>
  <[] ≠ []>
  <[] != []>
  <[] ≠ []>
  <[] != [] ◂▸>
  <[] ≠ [] ◂▸>
  <[] != [] ◂⋮▸>
  <[] ≠ [] ◂⋮▸>
  <[] != [] ≠ [] ◂▸>
  <[] ≠ [] != [] ◂▸>
  <[] != [] != [] ◂⋮▸>
  <[] ≠ [] ≠ [] ◂⋮▸>
  <neighbors != ▸>
  <neighbors ≠ ▸>
  <neighbors != ⋮▸>
  <neighbors ≠ ⋮▸>
  <neighbors != (list)>
  <neighbors ≠ (list)>

  <[] \> []>
  <[] \> []>
  <[] \> [] ◂▸>
  <[] \> [] ◂⋮▸>
  <[] \> [] \> [] ◂▸>
  <[] \> [] \> [] ◂⋮▸>
  <all \> ▸>
  <all \> ⋮▸>
  <all \> (list)>

  <[] \>= []>
  <[] ≥ []>
  <[] \>= []>
  <[] ≥ []>
  <[] \>= [] ◂▸>
  <[] ≥ [] ◂▸>
  <[] \>= [] ◂⋮▸>
  <[] ≥ [] ◂⋮▸>
  <[] \>= [] \>= [] ◂▸>
  <[] ≥ [] ≥ [] ◂▸>
  <[] \>= [] \>= [] ◂⋮▸>
  <[] ≥ [] ≥ [] ◂⋮▸>
  <all \>= ▸>
  <all ≥ ▸>
  <all \>= ⋮▸>
  <all ≥ ⋮▸>
  <all \>= (list)>
  <all ≥ (list)>

  <<> and <>>
  <<> and <> ◂▸>
  <<> and <> ◂⋮▸>
  <<> and <> and <> ◂▸>
  <<> and <> and <> ◂⋮▸>
  <all ▸>
  <all ⋮▸>
  <all (list)>

  <<> or <>>
  <<> or <> ◂▸>
  <<> or <> ◂⋮▸>
  <<> or <> or <> ◂▸>
  <<> or <> or <> ◂⋮▸>
  <any ▸>
  <any ⋮▸>
  <any (list)>

  <not <>>

  <true> // no visual boolean icon yet
  <false> // no visual boolean icon yet

  (join [] ◂▸)
  (join [] ◂⋮▸)
  (join [] [] ◂▸)
  (join [] [] ◂⋮▸)
  (join ▸)
  (join ⋮▸)
  (join input list: (list))
  (join (list))

  (letter (1 v) of [world])
  ([length V] of text [world])
  (length of [world])
  <[apple] contains [a] ?>

  (unicode of [a])
  (unicode (65) as letter)

  <is [5] a [number V] ?>

  <is <> identical to <> ?>
  <is <> identical to <> ◂▸ ?>
  <is <> identical to <> ◂⋮▸ ?>
  <is <> identical to <> identical to <> ◂▸ ?>
  <is <> identical to <> identical to <> ◂⋮▸ ?>
  <is all identical ▸ ?>
  <is all identical ⋮▸ ?>
  <is all identical (list) ?>

  (JavaScript function \( [] ◂▸ \) \{ [] \} )
  (JavaScript function \( [] ◂⋮▸ \) \{ [] \} )
  (JavaScript function \( [] [] ◂▸ \) \{ [] \} )
  (JavaScript function \( [] [] ◂⋮▸ \) \{ [] \} )
  (JavaScript function \( ▸ \) \{ [] \} )
  (JavaScript function \( ⋮▸ \) \{ [] \} )
  (JavaScript function \( (list) \) \{ [] \} )
  (JavaScript function \( input list: (list) \) \{ [] \} )

  // Dev mode

  (type of [5])

  ([encode URI V] of [Abelson & Sussman])
  ([decode URI V] of [Abelson & Sussman])
  ([encode URI component V] of [Abelson & Sussman])
  ([decode URI component V] of [Abelson & Sussman])
  ([XML escape V] of [Abelson & Sussman])
  ([XML unescape V] of [Abelson & Sussman])
  ([JS escape V] of [Abelson & Sussman])
  ([hex sha512 hash V] of [Abelson & Sussman])
  `,
)

test(
  "snap",
  "en-variables",
  `
  // Variables

  set [var V] to [0]
  change [var V] by (1)
  show variable [var V]
  hide variable [var V]
  script variables ((a)) ▸
  script variables ((a)) ((b)) ◂▸

  inherit [var V]



  // List

  (list ▸)
  (list [] ◂▸)
  (list [] [] ◂▸)
  (numbers from (1) to (10))

  ([] in front of @list)
  ([] in front of (list))
  (item (1 v) of [list V])
  (item (1 v) of @list)
  (item (1 v) of (list))
  (all but first of @list)
  (all but first of (list))

  ([length V] of @list)
  ([rank V] of @list)
  ([dimensions V] of @list)
  ([flatten V] of @list)
  ([columns V] of @list)
  ([uniques V] of @list)
  ([distribution V] of @list)
  ([sorted V] of @list)
  ([shuffled V] of @list)
  ([text V] of @list)
  ([lines V] of @list)
  ([csv V] of @list)
  ([json V] of @list)

  ([length V] of (list))
  ([rank V] of (list))
  ([dimensions V] of (list))
  ([flatten V] of (list))
  ([columns V] of (list))
  ([uniques V] of (list))
  ([distribution V] of (list))
  ([sorted V] of (list))
  ([shuffled V] of (list))
  ([text V] of (list))
  ([lines V] of (list))
  ([csv V] of (list))
  ([json V] of (list))

  (index of [thing] in @list)
  (index of [thing] in (list))
  <@list contains [thing]>
  <(list) contains [thing]>
  <is @list empty?>
  <is (list) empty?>

  (map (()▸) over @list)
  (map (()▸) over (list))
  (keep items (<>▸) from @list)
  (keep items (<>▸) from (list))
  (find first item (<>▸) in @list)
  (find first item (<>▸) in (list))
  (combine @list using (()▸))
  (combine (list) using (()▸))

  for each ((item)) in @list {

  }
  for each ((item)) in (list) {
      
  }

  add [thing] to @list
  add [thing] to (list)
  delete (1 v) of @list
  delete (1 v) of (list)
  insert [thing] at (1 v) of @list
  insert [thing] at (1 v) of (list)
  replace item (1 v) of @list with [thing]
  replace item (1 v) of (list) with [thing]


  (append @list ◂▸)
  (append (list) ◂▸)
  (append @list ◂⋮▸)
  (append (list) ◂⋮▸)
  (append @list @list ◂▸)
  (append (list) (list) ◂▸)
  (append @list @list ◂⋮▸)
  (append (list) (list) ◂⋮▸)
  (append ▸)
  (append ⋮▸)
  (append input list: (list))
  (append (list))

  (reshape [] to () ◂▸)
  (reshape [] to () ◂⋮▸)
  (reshape [] to () () ◂▸)
  (reshape [] to () () ◂⋮▸)
  (reshape [] to ▸)
  (reshape [] to ⋮▸)
  (reshape [] to input list: (list))
  (reshape [] to (list))

  // Dev mode

  show table @list
  show table (list)
  `,
)

test(
  "snap",
  "en-other",
  `
  // other
  primitive [ V] [] ◂▸
  primitive [ V] [] ◂⋮▸
  primitive [ V] [] [] ◂▸
  primitive [ V] [] [] ◂⋮▸
  primitive [ V] ▸
  primitive [ V] ⋮▸
  primitive [ V] input list: (list)
  primitive [ V] (list)

  (primitive [ V] [] ◂▸)
  (primitive [ V] [] ◂⋮▸)
  (primitive [ V] [] [] ◂▸)
  (primitive [ V] [] [] ◂⋮▸)
  (primitive [ V] ▸)
  (primitive [ V] ⋮▸)
  (primitive [ V] input list: (list))
  (primitive [ V] (list))

  extension [ V] [] ◂▸
  extension [ V] [] ◂⋮▸
  extension [ V] [] [] ◂▸
  extension [ V] [] [] ◂⋮▸
  extension [ V] ▸
  extension [ V] ⋮▸
  extension [ V] input list: (list)
  extension [ V] (list)

  (extension [ V] [] ◂▸)
  (extension [ V] [] ◂⋮▸)
  (extension [ V] [] [] ◂▸)
  (extension [ V] [] [] ◂⋮▸)
  (extension [ V] ▸)
  (extension [ V] ⋮▸)
  (extension [ V] input list: (list))
  (extension [ V] (list))

  map ({}▸) to [code V] []
  map [String V] to code [<#1>]
  map [ V] of [ V] to code []

  (code of ({}▸))
  `,
)

test(
  "snap",
  "en-custom",
  `
  // Custom

  {custom block ((string)) ((bool ?)) ((number #))} :: define

  custom block [] <> ()

  (+ custom + block + :: motion) :: define

  (custom block)

  <custom block :: operators> :: define+

  <custom block>
  `,
)
