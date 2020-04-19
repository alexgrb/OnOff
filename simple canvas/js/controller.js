/* In this example, the controller only alerts the user whenever they press a key,
but it also defines the ButtonInput class, which is used for tracking button states. */

const Controller = function() {

    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
    this.space    = new Controller.ButtonInput();

    this.keyDownUp = function(event) {

        let down = (event.type == "keydown") ? true : false;

        switch (event.code) {
            case "ArrowLeft":
                this.left.getInput(down);
                break;
            case "ArrowUp":
                this.up.getInput(down);
                break;
            case "ArrowRight":
                this.right.getInput(down);
                break;
            case "Space":
                this.space.getInput(down);
                changeColor(down);
                break;
        }
    };

    /*this.handleKeyDownUp = (event) => {
        this.keyDownUp(event);
    };
*/
};

Controller.prototype = {

    constructor : Controller

};

Controller.ButtonInput = function() {

    this.active = this.down = false;

};

Controller.ButtonInput.prototype = {

    constructor : Controller.ButtonInput,

    getInput : function(down) {

        if (this.down != down) {
            this.active = down;
        }
        this.down = down;

    }

};