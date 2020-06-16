# Online Build

https://mnzaki.github.io/processpace/dist/

# Overview

A MIDI controlled live coding environment based on [p5.js](https://p5js.org) and webpack hot module reloading (HMR).

Changes to a sketch cause it to be reloaded and executed on the same canvas and
same data.

Look at `src/sketches/sketch1.js` for a simple example. Any values stored on
`p.live` will remain unchanged accross live reloads, which allows you to
maintain a "scene" and manipulate it by changing the drawing code.

Calling `p.live.$setDefaults()` also creates range controls for those variables.

If you have a MIDI controller, plug it in and reload the page. To assign a
control you must click on the `midi input` button of the control, then wiggle
one of the knobs on your MIDI controller.

## Usage

Install dependencies
```
npm install
```

Start the server
```
npm start
```
Visit the URL that the server spits out, which is normally http://localhost:8080/

Edit `src/sketches/sketch1.js`. Try changing some of the numbers in the draw
function.

## Work In Progress

The core basics of live coding (persistent canvas and data) and basic midi
controls work. The UI is a bit, erm, _lacking_ though.
