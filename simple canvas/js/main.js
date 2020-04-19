// Frank Poth 02/28/2018

/* Here we are going to build the basic skeleton. In order to pull out the potential of POO
in js.
So we'll have a controller, a display and the big Game object. The engine will combine
all those parts.
We hope this will help us organize our code better. */

/*This ensures that this code will not execute until the document has finished loading and we have access to all of our classes. */
window.addEventListener("load", function(event) {

    //An advice we found on internet to help write cleaner code
    //For example by preventing us from using undeclared variables.
    "use strict";

    /********************************************************
     FUNCTIONS
     ********************************************************/

    var render = function() {
        display.renderColor(game.color);
        display.render();
    };

    var update = function() {
        game.update();
    };

    /********************************************************
     OBJECTS
     ********************************************************/
    // Here is our classes
    // The controller handles user input.
    var controller = new Controller();
    // The display handles canvas.
    var display    = new Display(document.querySelector("canvas"));
    // The game is going to contain all our objects, like platforms
    var game       = new Game();
    // The engine is where the above three sections can interact.
    var engine     = new Engine(1000/30, render, update);

    /********************************************************
     INITIALIZE
     ********************************************************/
    window.addEventListener("resize",  display.handleResize);
    window.addEventListener("keydown", controller.handleKeyDownUp);
    window.addEventListener("keyup",   controller.handleKeyDownUp);

    display.resize();
    engine.start();

});