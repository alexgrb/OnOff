// Frank Poth 08/13/2017


//defining variables, drawing context, controller, rectangle and the loop
var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width = 320;

rectangle = {

    height:32,
    //is it in the air?
    jumping:true,
    width:32,
    x:144, // center of the canvas
    y:0,
    //speed the rectyngle is going
    x_velocity:0,
    y_velocity:0

};

controller = {

    left:false,
    right:false,
    up:false,

    keyListener:function(event) {

        var key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                break;
            case 38:// up key
                controller.up = key_state;
                break;
            case 39:// right key
                controller.right = key_state;
                break;

        }

    }

};

loop = function() {

    if (controller.up && rectangle.jumping == false) {

        rectangle.y_velocity -= 20;
        rectangle.jumping = true;

    }

    //easing motion when you add and build the velocity frame by frame
    if (controller.left) {

        rectangle.x_velocity -= 0.5;

    }

    if (controller.right) {

        rectangle.x_velocity += 0.5;

    }

    /*
    physics
     */

    //adding 1.5 on any frame of annimation (basically until it hits the blue line)
    // if you were to put 0, the rectangle would never fall
    rectangle.y_velocity += 1.5;// gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;

    //reducing the x and y velocity very gradually
    // it gives you the effect that you are gradually coming to a stop
    rectangle.x_velocity *= 0.9;// friction
    rectangle.y_velocity *= 0.9;// friction

    // if rectangle is falling below floor line
    //180 = bottom of the screen - 16 la ligne, 32 le haut du rectangle
    if (rectangle.y > 180 - 16 - 32) {

        //set jumping to false so we can jump again
        rectangle.jumping = false;
        rectangle.y = 180 - 16 - 32;
        rectangle.y_velocity = 0;

    }

    // if rectangle is going off the left of the screen
    if (rectangle.x < 0) {

        rectangle.x = 0;

    } else if (rectangle.x > 320 - 32) {// if rectangle goes past right boundary

        rectangle.x = 320 - 32;

    }

    context.fillStyle = "#202020";
    context.fillRect(0, 0, 320, 180);// x, y, width, height
    context.fillStyle = "#ff0000";// hex for red
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.fill();
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 164);
    context.lineTo(320, 164);
    context.stroke();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

//adding the listeners to the specific objects
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);