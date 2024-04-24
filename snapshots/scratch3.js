import { test } from "./runner.js"

/*****************************************************************************/

// Scratch 3, English

test(
  "scratch3",
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
  
  go to (random position V)
  go to x: (0) y: (0)
  glide (1) secs to (random position V)
  glide (1) secs to x: (0) y: (0)
  
  point in direction (90)
  point towards (mouse-pointer V)
  
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
  "scratch3",
  "en-looks",
  `
  // Looks

  say [Hello!] for (2) secs
  say [Hello!]
  think [Hmm...] for (2) secs
  think [Hmm...]
  
  switch costume to (costume1 V)
  next costume
  switch backdrop to (backdrop1 V)
  switch backdrop to (backdrop1 V) and wait
  next backdrop
  
  change size by (10)
  set size to (100) %
  
  change [color V] effect by (25)
  set [color V] effect to (0)
  clear graphic effects
  
  show
  hide
  
  go to [front V] layer
  go [forward V] (1) layers
  
  (costume [number V])
  (backdrop [number V])
  (size)
  `,
)

test(
  "scratch3",
  "en-sound",
  `
  // Sound

  play sound (meow V) until done
  play sound ( V)
  stop all sounds
  
  change [pitch V] effect by (10)
  set [pitch V] effect to (100)
  clear sound effects
  
  change volume by (-10)
  set volume to (100) %
  (volume)
  `,
)

test(
  "scratch3",
  "en-events",
  `
  // Events

  when gf clicked
  when green flag clicked
  when flag clicked
  when ⚑ clicked
  when [space V] key pressed
  when this sprite clicked
  when stage clicked
  when backdrop switches to [backdrop1 V]
  
  when [loudness V] > (10)
  
  when I receive [message1 V]
  broadcast [message1 V]
  broadcast [message1 V] and wait
  
  // hidden blocks
  
  when sprite touches (mouse-pointer V)
  `,
)

test(
  "scratch3",
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
  
  // hidden blocks
  
  while <> {
      
  }
  
  for each [i V] in (10) {
  
  }

  all at once {

  }
  
  (counter)
  increment counter
  clear counter
  `,
)

test(
  "scratch3",
  "en-sensing",
  `
  // Sensing

  <touching (mouse-pointer V) ?>
  <touching color [#911a44] ?>
  <color [#911a44] is touching [#911a44]?>
  (distance to [mouse-pointer])

  ask [What's your name?] and wait
  (answer)

  <key (space V) pressed?>
  <mouse down?>
  (mouse x)
  (mouse y)

  set drag mode [draggable V]

  (loudness)

  (timer)
  reset timer

  ([backdrop # V] of [stage V])

  (current (year V))
  (days since 2000)
  (username)

  // hidden blocks

  (user id)
  `,
)

test(
  "scratch3",
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
  
  (join [apple ] [banana])
  (letter (1) of [apple])
  (length of [apple])
  <[apple] contains [a] ?>
  
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
  "scratch3",
  "en-variables",
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
  
  delete (1) of [list V]
  delete all of [list V]
  insert [thing] at (1) of [list V]
  replace item (1) of [list V] with [thing]
  
  (item (1) of [list V])
  (item # of [thing] in [list V])
  (length of [list V])
  <[list V] contains [thing] ?>
  
  show list [list V]
  hide list [list V]
  `,
)

test(
  "scratch3",
  "en-custom",
  `
  // Custom

  block (var) [string] <[] = []>

  define {block (reporter) [string] <boolean>}
  block (reporter) (string) <boolean>
  `,
)

test(
  "scratch3",
  "en-music",
  `
  // Music
  play drum ((1) Snare Drum V) for (0.25) beats
  rest for (0.25) beats
  play note (60) for (0.25) beats
  set instrument to ((1) Piano V)
  set tempo to (60)
  change tempo by (20)
  (tempo)
`,
)

test(
  "scratch3",
  "en-pen",
  `
  // Pen
  erase all
  stamp
  pen down
  pen up
  set pen color to [#FF0000]
  change pen (color V) by (10)
  set pen (color V) to (50)
  change pen size by (1)
  set pen size to (1)
  `,
)

test(
  "scratch3",
  "en-video",
  `
  // Video Sensing
  when video motion > (10)
  video (motion V) on (sprite V)
  turn video (on V)
  set video transparency to (50)
  `,
)

test(
  "scratch3",
  "en-extensions",
  `
  // Text-to-Sppech
  speak [hello]
  set voice to (alto V)
  set language to (English V)

  // Translate
  (translate [hello] to (Zulu V))
  (language)

  // Makey Makey
  // NOTE: disambiguation may apply from now on
  // disambig'd to event
  when (space V) key pressed
  when (left up right V) pressed in order

  // micro:bit
  when (A V) button pressed
  <(A V) button pressed?>

  when (moved V)

  display (heart V) // TODO: add microbit pattern input
  display text [Hello!]
  clear display

  when tilted (any V)
  <tilted (any V) ?>
  (tilt angle (front V))
  when pin (0 V) connected

  // EV3
  motor (A V) turn this way for (1) seconds
  motor (A V) turn that way for (1) seconds
  motor (A V) set power (100) %
  (motor (A V) position)
  when button (1 V) pressed
  when distance \\< (5)
  when brightness \\< (50)
  <button (1 V) pressed?>
  // disambig'd to wedo2
  (distance)
  (brightness)
  beep note (60) for (0.5) secs

  // BOOST
  turn motor (A V) for (1) seconds
  turn motor (A V) for (1) rotations
  turn motor (A V) on
  turn motor (A V) off
  set motor (ABCD V) speed to (100) %
  set motor (A V) direction (this way V)
  // disambig'd to ev3
  (motor (A V) position)
  when (any color V) brick seen
  <seeing (any color V) brick?>
  // these two are disambig'd to microbit
  when tilted (any V)
  (tilt angle (up V))
  // disambig'd to wedo2
  set light color to (50)

  // WeDo 2.0
  turn (motor V) on for (1) seconds
  turn (motor V) on
  turn (motor V) off
  set (motor V) power to (100)
  set (motor V) direction to (this way V)
  set light color to (50)
  when distance (\\< V) (50)
  // disambig'd to microbit
  when tilted (any V)
  (distance)
  // these two are disambig'd to microbit
  <tilted (any V) ?>
  (tilt angle (up V))

  // Force and Acceleration
  // disambig'd to microbit
  when (shaken V)
  when (started falling V)
  when force sensor (pushed V)
  (force)

  // these three are disambig'd to microbit

  when tilted (any V)
  <tilted (any V) ?>
  (tilt angle (front V))
  <falling?>
  (spin speed (z V))
  (acceleration (x V))
  `,
)

test(
  "scratch3",
  "en-cat",
  `
  when flag clicked :: cat
  move (10) steps
  `,
)

// Scratch 3, color regression testing
// See #472, #473

test(
  "scratch3",
  "en-color-regression",
  `
  test <> [item V] () :: motion
  test <> [item V] () :: looks
  test <> [item V] () :: sound
  test <> [item V] () :: control
  test <> [item V] () :: events
  test <> [item V] () :: sensing
  test <> [item V] () :: operators
  test <> [item V] () :: variables
  test <> [item V] () :: list
  test <> [item V] () :: custom
  test <> [item V] () :: extension
  test <> [item V] () :: obsolete
  test <> [item V] () :: other
  `,
)

/*****************************************************************************/

// Scratch 3, German

test(
  "scratch3",
  "de-motion",
  `

// Bewegung

gehe (10) er Schritt
drehe dich nach rechts um (15) Grad
drehe dich nach links um (15) Grad

gehe zu (Zufallsposition v)
gehe zu x: (10) y: (0)
gleite in (1) Sek. zu (Zufallsposition v)
gleite in (1) Sek. zu x: (0) y: (0)

setze Richtung auf (90) Grad
drehe dich zu (Mauszeiger v)
ändere x um (10)
setze x auf (10)
ändere y um (10)
setze y auf (0)

pralle vom Rand ab

setze Drehtyp auf [links-rechts V]

(x-Position)

(y-Position)

(Richtung)

`,
  "de",
)

test(
  "scratch3",
  "de-looks",
  `

// Aussehen

sage [Hallo!] für (2) Sekunden
sage [Hallo!]
denke [Hmm...] für (2) Sekunden
denke [Hmm...]

wechsle zu Kostüm (costume1 v)
wechsle zum nächsten Kostüm
wechsle zu Bühnenbild (backdrop1 v)
wechsle zum nächsten Bühnenbild

ändere Größe um (10)
setze Größe auf (100)

ändere Effekt [Farbe V] um (25)
setze Effekt [Farbe V] auf (0)
schalte Grafikeffekte aus

zeige dich
verstecke dich

gehe zu [vorderster V] Ebene
gehe (1) Ebenen [nach vorne V]

(Kostüm [Nummer V])

(Bühnenbild [Nummer V])

(Größe)

`,
  "de",
)
// "gehe Ebenen nach vorne" appears differently in the Scratch editor than in
// the translation files, wut

test(
  "scratch3",
  "de-sound",
  `

// Klang

spiele Klang (Meow v) ganz
spiele Klang (Meow v)
stoppe alle Klänge

ändere Effekt [Höhe V] um (10)
setze Effekt [Höhe V] auf (100)
schalte Klangeffekte aus

ändere Lautstärke um (-10)
setze Lautstärke auf (100) %

(Lautstärke)


`,
  "de",
)

test(
  "scratch3",
  "de-events",
  `

// Ereignisse

Wenn die grüne Flagge angeklickt
Wenn Taste [Leertaste V] gedrückt wird
Wenn diese Figur angeklickt wird
Wenn das Bühnenbild zu [backdrop1 V] wechselt

Wenn [Lautstärke V] > (10)

Wenn ich [Nachricht1 V] empfange
sende (Nachricht1 v) an alle
sende (Nachricht1 v) an alle und warte

`,
  "de",
)

test(
  "scratch3",
  "de-control",
  `

// Steuerung

warte (1) Sekunden

wiederhole (10) mal {

}

wiederhole fortlaufend {

}

falls <>, dann {

}

falls <>, dann {

}

warte bis <>

wiederhole bis <> {

}

stoppe [andere Skripte der Figur V]
stoppe [alles V]

Wenn ich als Klon entstehe
erzeuge Klon von (mir selbst v)
lösche diesen Klon

`,
  "de",
)

test(
  "scratch3",
  "de-sensing",
  `

// Fühlen

<wird (Mauszeiger v) berührt?>
<wird Farbe [#555] berührt?>
<Farbe [#0f0] berührt [#f0f] ?>
(Entfernung von (Mauszeiger v))

frage [Wie heißt du?] und warte

(Antwort)

<Taste (Leertaste v) gedrückt?>
<Maustaste gedrückt?>
(Maus x-Position)
(Maus y-Position)

setze Ziehbarkeit auf [ziehbar V]

(Stoppuhr)
setze Stoppuhr zurück

([x-Position V] von (Buehne v))
([x-Position V] von (foo))

([Jahr V] im Moment)
(Tage seit 2000)
(Benutzername)

`,
  "de",
)

test(
  "scratch3",
  "de-operators",
  `

// Operatoren

(() + ())
(() - ())
(() * ())
(() / ())

(Zufallszahl von (1) bis (10))

<() > (50)>
<() < (50)>
<() = (50)>

<<> und <>>
<<> oder <>>
<nicht <>>

(verbinde [Apfel] und [Banane])
(Zeichen (1) von [Apfel])
(Länge von [Apfel])
<[apple] enthält [a]?>

(() mod ())
(() gerundet)

([Betrag V] von (10))
([Betrag V] von (foo))

`,
  "de",
)

test(
  "scratch3",
  "de-variables",
  `

// Variablen

(foo)

setze [foo V] auf (0)
ändere [foo V] um (1)
zeige Variable [foo V]
verstecke variable [foo V]

// Liste

(list)

füge [Ding] zu [list V] hinzu
lösche (1) aus [list V]
lösche alles aus [list V]
füge (1) bei (1) in [list V] ein
ersetze Element (1) von [list V] durch (1)

(Element (1) von [list V])
(Nummer von [Ding] in [list V])
(Länge von [list V])
<[list V] enthält [Ding] ?>

zeige Liste [list V]
verstecke Liste [list V]

`,
  "de",
)

test(
  "scratch3",
  "de-custom",
  `

// Meine Blöcke

foo () if <>

Definiere {foo (num) if <bool>}

`,
  "de",
)

test(
  "scratch3",
  "de-pen",
  `

// Malstift

lösche alles

hinterlasse Abdruck

schalte Stift ein
schalte Stift aus

setze Stiftfarbe auf [#f696e6]

ändere Stift (Farbe v) um (10)
setze Stift (Farbe v) auf (50)

ändere Stiftdicke um (1)
setze Stiftdicke auf (1)

`,
  "de",
)

test(
  "scratch3",
  "de-music",
  `

// Musik

spiele Schlaginstrument (\\\\(1\\\\) Snare-Drum v) für (0.5) Schläge
pausiere (0.25) Schläge
spiele Ton (60) für (0.25) Schläge
setze Instrument auf (\\\\(1\\\\) Klavier v)
setze tempo auf (60)
ändere Tempo um (20)

(Tempo)

`,
  "de",
)

test(
  "scratch3",
  "de-video",
  `

// Video-Erfassung

Wenn Video-Bewegung > (10)

(Video- (Bewegung v) von (Figur v))

schalte Video (an v)
setze Video-Transparenz auf (50)

`,
  "de",
)

test(
  "scratch3",
  "de-extensions",
  `
// Text zu Sprache

ändere die Stimme zu (Alt v)
setze Sprache auf (English v)

// Übersetzung

(übersetze [Hallo] nach (Malaysisch v))
(Sprache)

// Makey Makey
Wenn [nach links nach oben nach rechts V] der Reihe nach gedrückt

// micro:bit
Wenn Knopf [A V]gedrückt wird
<Knopf [A V] gedrückt? >
Wenn [bewegt V]
zeige [heart V] an
zeige Text [Hallo!] an
zeige nichts an
Wenn [beliebiger V] geneigt
<[beliebig V] geneigt?>
(Neigungswinkel [nach vorne V])
Wenn Pin [0 V] angeschlossen ist

// EV3
drehe Motor [A V] für (1)Sekunden rechtsherum
drehe Motor [A V]für (1)Sekunden linksherum
setze Leistung von Motor [A V] auf (100)%

(Position von Motor [A V])
Wenn der Knopf [a V] gedrückt wird
Wenn Abstand \\\\< (5)
Wenn Helligkeit \\\\< (50)
<Knopf [1 V] gedrückt?>
(Helligkeit)
piepse Note (60) für (0.5) Sek.

// BOOST
Schalte Motor [A V] für (1) Sekunden ein
Schalte Motor [A V] für (1) Umdrehungen ein
Schalte Motor [A V] ein
Schalte Motor [A V] aus
Setze von Motor [A V] die Geschwindigkeit auf (100)%
Setze Richtung von Motor [A V] auf [linksherum V]
Wenn [Irgendeine Farbe V] gesehen wird
<Sehe Farbe [Irgendeine Farbe V]?>

// WeDo
schalte [Motor V] für (1) Sekunden an
schalte [Motor V] an
schalte [Motor V] aus
setze Leistung von [Motor V] auf (100)
setze Richtung von [Motor V] auf [linksherum V]
setze Lichtfarbe auf (50)
Wenn Abstand [< V] (50)

// Force and Acceleration
Wenn [begonnen zu fallen V]
Wenn Kraftsensor [gedrückt V]
(Kraft)
<fallend?>
(Rotationsgeschwindigkeit [z V])
(Beschleunigung [x V])
`,
  "de",
)
