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
point towards [ V]

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

switch costume to [costume1 V]
next costume
switch backdrop to [backdrop1 V]

change [color V] effect by (25)
set [color V] effect to (0)
clear graphic effects

change size by (10)
set size to (100)%

go to front
go back (1) layers

(costume #)
(backdrop name)
(size)

// (Stage-specific)

switch backdrop to [backdrop1 V] and wait
next backdrop

(backdrop #)

`,
)

test(
  "scratch2",
  "en-sound",
  `

// Sound

play sound [pop V]
play sound [pop V] until done
stop all sounds

play drum (1 v) for (0.2) beats
rest for (0.2) beats

play note (60 v) for (0.5) beats
set instrument to (1 v)

change volume by (-10)
set volume to (100)%
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

set pen color to [#f0f]
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

set [var V] to [0]
change [var V] by (1)
show variable [var V]
hide variable [var V]

// List

add [thing] to [list V]

delete (1 v) of [list V]
insert [thing] at (1 v) of [list V]
replace item (1 v) of [list V] with [thing]

(item (1 v) of [list V])
(length of [list V])
<[list V] contains [thing]>

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

// caps!

stop [all V]

stop [this script V]

// stack

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

<touching [ V]?>
<touching color [#f0f]?>
<color [#f0f] is touching [#0f0]?>
(distance to [ V])

ask [What's your name?] and wait
(answer)

<key [space V] pressed?>
<mouse down?>
(mouse x)
(mouse y)

(loudness)

(video [motion V] on [this sprite V])
turn video [on V]
set video transparency to (50)%

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
&lt;[] &lt; []&gt;
&lt;[] &gt; []&gt;

<<> and <>>
<<> or <>>
<not <>>

(join [hello ] [world])
(letter (1) of [world])
(length of [world])

(() mod ())
(round ())

([sqrt V] of (9))

`,
)
/* Scratch 2.0 extension support is not good
test(
  "scratch2",
  "en-extensions",
  `

// PicoBoard

when [button pressed V]

when [slider V] [> V] (50)

<sensor [button pressed V]?

([slider V] sensor value)

// Lego WeDo 1.0

turn [motor V] on for (1) secs

turn [motor V] on

turn [motor V] off

set [motor V] power to (100)

set [motor V] direction to [this way V]

when distance [< V] (20)

when tilt [= V] (20)

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

when tilted

(distance)

(tilt [up-down V])

`
)
*/

test(
  "scratch2",
  "en-obsolete",
  `

// Obsolete Scratch 1.4 blocks:


// Looks

switch to costume [costume1 V]

switch to background [background1 V]
next background
(background #)



// Control

if <> {
  
}

forever if <> {

}

stop script
stop all



// Events

when Sprite1 clicked



// Sensing

<loud?>



// Grey

. . .
...
…

(. . .)
(...)

<. . .>
<...>
<…>


`,
)

/*****************************************************************************/

// Scratch 3, English

test(
  "scratch3",
  "en-motion",
  `

// Motion

move (10) steps
turn cw (15) degrees
turn ccw (15) degrees

go to (random position v)
go to x: (10) y: (0)
glide (1) secs to (random position v)
glide (1) secs to x: (10) y: (0)

point in direction (90)
point towards (mouse-pointer v)
change x by (10)
set x to (10)
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

say [Hello!] for (2) seconds
say [Hello!]
think [Hmm...] for (2) seconds
think [Hmm...]

switch costume to (costume1 v)
next costume
switch backdrop to (backdrop1 v)
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

play sound (Meow v) until done
start sound (Meow v)
stop all sounds

change [pitch V] effect by (10)
set [pitch V] effect to (100)
clear sound effects

change volume by (-10)
set volume to (100) %

volume

`,
)

test(
  "scratch3",
  "en-events",
  `

// Events

when flag clicked
when [space V] key pressed
when this sprite clicked
when backdrop switches to [backdrop1 V]

when [loudness V] > (10)

when i receive [message1 V]
broadcast (message1 v)
broadcast (message1 v) and wait

`,
)

test(
  "scratch3",
  "en-control",
  `

// Control

wait (1) seconds

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

stop [all V]

when I start as a clone
create clone of (myself v)
delete this clone 

`,
)

test(
  "scratch3",
  "en-sensing",
  `

// Sensing

<touching (mouse-pointer v)?>
<touching color [#555]?>
<touching color (#555)?>
<color [#0f0] is touching [#f0f]?>
<color (#0f0) is touching (#f0f)?>
(distance to (mouse-pointer v))

ask [What's your name?] and wait

(answer)

<key (space v) pressed?>
<mouse down?>
(mouse x)
(mouse y)

set drag mode [draggable V]

(loudness)

(timer)
reset timer

([x position V] of (Stage v))

(current [year V])
(days since 2000)
(username)

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

<() > (50)>
<() < (50)>
<() = (50)>

<<> and <>>
<<> or <>>
<not <>>

(join [apple] [banana])
(letter (1) of [apple])
(length of [apple])
<[apple] contains [a]?>

(() mod ())
(round ())

([abs V] of ())

`,
)

test(
  "scratch3",
  "en-variables",
  `

// Variables

(foo)

set [foo V] to (0)
change [foo V] by (1)
show variable [foo V]
hide variable [foo V]

// Lists

(list)

add [thing] to [list V]
delete (1) of [list V]
delete all of [list V]
insert (1) at (1) of [list V]
replace item (1) of [list V] with (1)

(item (1) of [list V])
(item # of [thing] in [list V])
(length of [list V])
<[list V] contains [thing]?>

show list [list V]
hide list [list V]

`,
)

test(
  "scratch3",
  "en-custom",
  `

// Custom

foo () if <>

define {foo (num) if <bool>}

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

set pen color to [#f696e6]

change pen (color v) by (10)
set pen (color v) to (50)

change pen size by (1)
set pen size to (1)

`,
)

test(
  "scratch3",
  "en-music",
  `

// Music

play drum (\\(1\\) Snare drum v) for (0.5) beats
rest for (0.25) beats
play note (60) for (0.25) beats
set instrument to (\\(1\\) Piano v)
set tempo to (60)
change tempo by (20)
(tempo)

`,
)

test(
  "scratch3",
  "en-video",
  `

// Video

when video motion > (10)
(video (motion v) on (sprite v))
turn video (on v)
set video transparency to (50)

`,
)

test(
  "scratch3",
  "en-extensions",
  `  
// Text-to-Sppech
speak [hello]
set voice to [alto V]

// Translate
(translate [hello] to [Thai V])
(language)

// Makey Makey
when (left up right v) pressed in order
when (space v) key pressed

// micro:bit
when [A V] button pressed
<[A V] button pressed?>
when [moved V]
display [heart V]
display text [Hello!]
clear display
when tilted [any V]
<tilted [any V]?>
(tilt angle [front V])
when pin [0 V] connected

// EV3
motor [A V] turn this way for (1) seconds
motor [A V] turn that way for (1) seconds
motor [A V] set power (100) %
(motor [A V] position)
when button [1 V] pressed
when distance \\< (5)
when brightness \\< (50)
<button [1 V] pressed?>
(brightness)
beep note (60) for (0.5) secs

// BOOST
turn motor [A V] for (1) seconds
turn motor [A V] for (1) rotations
turn motor [A V] on
turn motor [A V] off
set motor [ABCD V] speed to (100) %
set motor [A V] direction [this way V]
when [any color V] brick seen
<seeing [any color V] brick?>

// WeDo
turn [motor V] on for (1) seconds
turn [motor V] on
turn [motor V] off
set [motor V] power to (100)
set [motor V] direction to [this way V]
set light color to (50)
when distance [< V] (50)
(distance)

// Force and Acceleration
when [started falling V]
when force sensor [pushed V]
(force)
<falling?>
(spin speed [z V])
(acceleration [x V])
`,
)

test(
  "scratch3",
  "en-cat",
  `
move (10) steps

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
test <> [item V] ()::motion
test <> [item V] ()::looks
test <> [item V] ()::sound
test <> [item V] ()::control
test <> [item V] ()::events
test <> [item V] ()::sensing
test <> [item V] ()::operators
test <> [item V] ()::variables
test <> [item V] ()::list
test <> [item V] ()::custom
test <> [item V] ()::extension
test <> [item V] ()::obsolete
test <> [item V] ()::grey
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

spiele Schlaginstrument (\\(1\\) Snare-Drum v) für (0.5) Schläge
pausiere (0.25) Schläge
spiele Ton (60) für (0.25) Schläge
setze Instrument auf (\\(1\\) Klavier v)
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
Wenn Abstand \\< (5)
Wenn Helligkeit \\< (50)
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
