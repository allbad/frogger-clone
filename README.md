# My Frogger Clone - Bug Splat
Play the game at [http://allbad.github.io/frogger-clone](http://allbad.github.io/frogger-clone)

## Instructions

### It's simple really ...

* Get the gems.  Get them to the princess
* Beware of the enemy bugs in the way
* Don't even think of getting to the princess without a gem
* TODO - If you fall in the water you spill the gem. Back to the start with you.

* Left/right/up/down keys to move your would be bug prince

* Hitting any key during the intro or gameover sequences will restart the game

* Oh and if you hate the music, I've left you a button at the bottom to turn it off.  Don't say I don't do anything for you

## Additions from basic

* Intro screen showing instructions
* Game Over screen showing whether you won or lost
* Collection of gems and change of sprite image on collection
* Points for getting the gems to the princess
* Lives lost when colliding with bugs
* Larger playing area and customisation to allow for princess
* Use of pseudoclassical sub-classes

### TODO
This game is a work in progress so there are some additional things in the pipeline

* Add a life if you collect a key
* Show gem collection status next to princess
* Show a splat image when player collides with bug
* Reduce duplication of collision code
* Move music control code into js files

## Sources

### collision detection
* https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
* http://jsfiddle.net/knam8/

### Canvas
* http://www.html5canvastutorials.com
* http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/
* http://joshondesign.com/p/books/canvasdeepdive/chapter01.html

### Game concepts
* http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
* http://atomicrobotdesign.com/blog/htmlcss/build-a-vertical-scrolling-shooter-game-with-html5-canvas-part-1/
* http://www.gaminglogy.com/games/frogger/

### General stuff
* https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
* http://api.jquery.com/event.preventdefault/
* http://www.howtojs.org/psuedo-classical-subclasses-in-javascript/
* http://gamedev.stackexchange.com/questions/60139/play-audio-in-javascript-with-a-good-performance


