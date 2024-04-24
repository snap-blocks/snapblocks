import { test } from "./runner.js"

// Scratch 2, English

test(
  "scratch2",
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
  go to [mouse-pointer V]
  glide (1) secs to x: (0) y: (0)

  change x by (10)
  set x to (0)
  change y by (10)
  set y to (0)

  if on edge, bounce

  set rotation style [left-right V]

  (x position)
  (y position)
  (direction)
  `,
)

test(
  "scratch2",
  "en-looks",
  `
  // Looks

  say [Hello!] for (2) secs
  say [Hello!]
  think [Hmm...] for (2) secs
  think [Hmm...]

  show
  hide

  switch costume to [costume2 V]
  next costume
  switch backdrop to [backdrop1]
  next backdrop

  change [color V] effect by (25)
  set [color V] effect to (0)
  clear graphic effects

  change size by (10)
  set size to (100) %
  (size)

  go to front
  go back (1) layers

  (costume #)
  (backdrop name)
  (size)
  `,
)

test(
  "scratch2",
  "en-sound",
  `
  // Sound

  play sound [meow V]
  play sound [meow V] until done
  stop all sounds

  play drum (1 v) for (0.25) beats
  rest for (0.2) beats

  play note (60 v) for (0.5) beats
  set instrument to (1 v)

  change volume by (-10)
  set volume to (100) %
  (volume)

  change tempo by (20)
  set tempo to (60) bpm
  (tempo)
  `,
)

test(
  "scratch2",
  "en-pen",
  `
  // Pen

  clear

  stamp

  pen down
  pen up

  set pen color to [#911a44]
  change pen color by (10)
  set pen color to (0)

  change pen shade by (10)
  set pen shade to (50)

  change pen size by (1)
  set pen size to (1)
  `,
)

test(
  "scratch2",
  "en-data",
  `
  // Variables
  (var)

  set [var V] to [0]
  change [var V] by (1)
  show variable [var V]
  hide variable [var V]



  // List
  (list)

  add [thing] to [list V]

  delete (1 v) of [list V]
  insert [thing] at (1 v) of [list V]
  replace item (1 v) of [list V] with [thing]

  (item (1 v) of [list V])
  (length of [list V])
  <[list V] contains [thing] ?>

  show list [list V]
  hide list [list V]
  `,
)

test(
  "scratch2",
  "en-events",
  `
  // Events

  when gf clicked
  when green flag clicked
  when flag clicked
  when ⚑ clicked
  when [space V] key pressed
  when this sprite clicked
  when backdrop switches to [backdrop1 V]
  
  when [loudness V] > (10)
  
  when I receive [message1 V]
  broadcast [message1 V]
  broadcast [message1 V] and wait
  `,
)

test(
  "scratch2",
  "en-control",
  `
  // Control

  wait (1) secs
  
  repeat (10) {
  
  }
  
  forever {
  
  }
  
  if <> then {
  
  }
  
  if <> then {
  
  } else {
  
  }
  
  wait until <>
  
  repeat until <> {
  
  }
  
  // stop caps
  
  stop [all V]
  stop [all scenes V]
  stop [this script V]
  stop [this block V]
  
  // stop stack
  
  stop [all but this script V]
  stop [other scripts in sprite V]
  stop [other scripts in stage V]
  
  when I start as a clone
  create clone of [myself V]
  delete this clone
  `,
)

test(
  "scratch2",
  "en-sensing",
  `
  // Sensing

  <touching [mouse-pointer V]?>
  <touching color [#911a44]?>
  <color [#911a44] is touching [#911a44]?>
  (distance to [mouse-pointer])
  
  ask [What's your name?] and wait
  (answer)
  
  <key [space V] pressed?>
  <mouse down?>
  (mouse x)
  (mouse y)
  
  (loudness)
  
  (video [motion V] on [myself V])
  turn video [on V]
  set video transparency to (50) %
  
  (timer)
  reset timer
  ([x position V] of [Sprite1 V])
  
  (current [minute V])
  (days since 2000)
  (username)
  (user id)
  `,
)

test(
  "scratch2",
  "en-operators",
  `
  // Operators

  (() + ())
  (() - ())
  (() * ())
  (() / ())
  
  (pick random (1) to (10))
  
  <[] < []>
  <[] = []>
  <[] > []>
  
  <<> and <>>
  <<> or <>>
  <not <>>
  
  (join [hello ] [world])
  (letter (1) of [world])
  (length of [world])
  
  (() mod ())
  (round ())
  
  ([abs V] of (10))
  ([floor V] of (10))
  ([ceiling V] of (10))
  ([sqrt V] of (10))
  ([sin V] of (10))
  ([cos V] of (10))
  ([tan V] of (10))
  ([asin V] of (10))
  ([acos V] of (10))
  ([atan V] of (10))
  ([ln V] of (10))
  ([log V] of (10))
  ([e ^ V] of (10))
  ([10 ^ V] of (10))
  `,
)

test(
  "scratch2",
  "en-custom",
  `
  // Custom

  block (var) [string] <[] = []>

  define {block (reporter) [string] <boolean>}
  block (reporter) (string) <boolean>
  `,
)

test(
  "scratch2",
  "en-extensions",
  `
  // PicoBoard

  when [button pressed V]
  
  when [slider V] [> V] (50)
  
  <sensor [button pressed V]?>
  ([slider V] sensor value)
  
  // Lego WeDo 1.0
  
  turn [motor V] on for (1) secs
  turn [motor V] on
  turn [motor V] off
  
  set [motor V] power to (100)
  set [motor V] direction to [this way V]
  
  when distance [< V] (20)
  
  when tilt [= V] (20)
  
  (distance)
  (tilt)
  
  // Lego WeDo 2.0
  
  turn [motor V] on for (1) seconds
  turn [motor V] on
  turn [motor V] off
  set [motor V] power to (100)
  set [motor V] direction to [this way V]
  set light color to (50)
  play note (60 v) for (0.5) seconds
  
  when distance [< V] (50)
  when tilted [any V]
  
  (distance)
  <tilted [any V] ?>
  (tilt angle [up-down V])
  `,
)
