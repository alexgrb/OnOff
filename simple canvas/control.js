//defining variables, drawing context, controller, hero and the loop
var context, controller, hero;
var score = 0;
var lives = 3;
const timeElem = document.querySelector("#time");
var requestId;
context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 500;

var sun = {
    x: 34,
    y: 122
};

var star = {
    x: 450,
    y: 350
};

hero = {

    height: 32,
    //is it in the air?
    jumping: true,
    width: 32,
    x: 250, // center of the canvas
    y: 0,
    //speed the rectyngle is going
    x_velocity: 0,
    y_velocity: 0

};

var sunImage = new Image();
sunImage.src = "images/sunvf.png";

var monsterImage = new Image();
monsterImage.src = "images/monster.png";

var starImage = new Image();
starImage.src = "images/starvf.png";

controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        var key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
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

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawLine() {
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 400);
    context.lineTo(500, 400);
    context.stroke();
}

function drawImages() {
    context.drawImage(monsterImage, hero.x, hero.y)
    context.drawImage(sunImage, sun.x, sun.y);
    context.drawImage(starImage, star.x, star.y);
}

function drawLives() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Lives: " + lives, context.canvas.width - 65, 20);
}

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: " + score, 8, 20);

}

function draw() {
    requestId = undefined;
    if (controller.up && hero.jumping == false) {
        hero.y_velocity -= 20;
        hero.jumping = true;
    }
    //easing motion when you add and build the velocity frame by frame
    if (controller.left) {
        hero.x_velocity -= 0.5;
    }
    if (controller.right) {
        hero.x_velocity += 0.5;
    }

    //adding 1.5 on any frame of annimation (basically until it hits the blue line)
    // if you were to put 0, the hero would never fall
    hero.y_velocity += 1.5;// gravity
    hero.x += hero.x_velocity;
    hero.y += hero.y_velocity;

    //reducing the x and y velocity very gradually
    // it gives you the effect that you are gradually coming to a stop
    hero.x_velocity *= 0.9;// friction
    hero.y_velocity *= 0.9;// friction

    // if hero is falling below floor line
    //180 = bottom of the screen - 16 la ligne, 32 le haut du hero
    if (hero.y > 500 - 100 - 32) {
        //set jumping to false so we can jump again
        hero.jumping = false;
        hero.y = 500 - 100 - 32;
        hero.y_velocity = 0;
    }
    // if hero is going off the left of the screen
    if (hero.x < 0) {
        hero.x = 0;
    } else if (hero.x > 500 - 32) {// if hero goes past right boundary
        //return;
        hero.x = 500 - 32;
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 500, 500);// x, y, width, height
    drawLine();
    drawImages();
    drawScore();
    drawLives();


    if (hero.x <= (star.x + 50) && star.x <= (hero.x + 32)
        && hero.y <= (star.y + 50) && star.y <= (hero.y + 32)) {
        lives--;
    } else if (!lives) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    } else {

    }


    requestAnimationFrame(draw);

};
//adding the listeners to the specific objects
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(draw);