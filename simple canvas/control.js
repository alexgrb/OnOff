// Frank Poth 08/13/2017


//defining variables, drawing context, controller, rectangle and the loop
var context, controller, rectangle, loop;
const timeElem = document.querySelector("#time");
var requestId;
context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 500;

var hero = {
    speed: 256, // movement in pixels per second
    x: 34,
    y: 122
};

var star = {
    x: 450,
    y: 350
};
rectangle = {

    height:32,
    //is it in the air?
    jumping:true,
    width:32,
    x:250, // center of the canvas
    y:0,
    //speed the rectyngle is going
    x_velocity:0,
    y_velocity:0

};

var heroImage = new Image();
heroImage.onload = function () {
};
heroImage.src = "images/sunvf.png";

var monsterImage = new Image();
monsterImage.onload = function () {
};
monsterImage.src = "images/monster.png";


var starReady = false;
var starImage = new Image();
starImage.onload = function () {
    starReady = true;
};
starImage.src = "images/starvf.png";

if (starReady) {
    context.drawImage(starImage, star.x, star.y);
}


/*
x.fillStyle = "rgb(250, 250, 250)";
ctx.font = "24px Helvetica";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);

 */


controller = {

    left:false,
    right:false,
    up:false,

    keyListener:function(event) {

        var key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                //hero.x -= hero.speed * event;
                break;
            case 38:// up key
                controller.up = key_state;
                //hero.y -= hero.speed * event;
                break;
            case 39:// right key
                controller.right = key_state;
                //hero.x += hero.speed * event;
                break;
        }
    }
};

loop = function() {
    requestId = undefined;
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
    if (rectangle.y > 500 - 100 - 32) {

        //set jumping to false so we can jump again
        rectangle.jumping = false;
        rectangle.y = 500 - 100 - 32;
        rectangle.y_velocity = 0;

    }

    // if rectangle is going off the left of the screen
    if (rectangle.x < 0) {

        rectangle.x = 0;

    } else if (rectangle.x > 500 - 32) {// if rectangle goes past right boundary

        //return;
        rectangle.x = 500 - 32;

    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 500, 500);// x, y, width, height
    /*context.fillStyle = "#ff0000";// hex for red */
    context.beginPath();
    context.drawImage(monsterImage, rectangle.x, rectangle.y)
    /*context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);*/
    context.fill();
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 400);
    context.lineTo(500, 400);
    context.stroke();
    context.drawImage(heroImage, hero.x, hero.y);
    context.drawImage(starImage, star.x, star.y);


    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);


};

//adding the listeners to the specific objects
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

/*
function start() {
    if (!requestId) {
        requestId = window.requestAnimationFrame(loop);
    }
}

function stop() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}
document.querySelector("#start").addEventListener('click', function() {
    start();
});

document.querySelector("#stop").addEventListener('click', function() {
    stop();
});*/