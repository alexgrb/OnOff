/********************************************************
 Variables : defining variables, drawing context, controller, hero and the loop
 ********************************************************/
var context, controller, monster;
var score = 0;
var lives = 3;
var colorOne = "#202830";
var colorTwo = "#A9A9A9";
var backgroundColor = "#ffffff";
var blackMode = true;
var whiteMode = false;


/********************************************************
 Setup the canvas
 ********************************************************/
let canvas = document.getElementById("game");
context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 500;
context.canvas.width = 500;

/********************************************************
 Elements appearing on the screen
 ********************************************************/
sun = {
    x: 34,
    y: 122
};
star = {
    x: 300,
    y: 300
};

monster = {
    height: 32,
    jumping: true, //is it in the air?
    width: 32,
    x: 50, // left on the canvas
    y: 0,
    x_velocity: 0, //speed the avatar
    y_velocity: 0
};

controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.code) {
            case "ArrowLeft":
                controller.left = key_state;
                break;
            case "ArrowUp":
                controller.up = key_state;
                break;
            case "ArrowRight":
                controller.right = key_state;
                break;
            case "Space":
                changeColor(key_state);
                break;
        }
    },

};

/********************************************************
 Drawings
 ********************************************************/
function ImageDrawer (x, y, path){
    img = new Image();
    img.src = path;
    context.drawImage(img, x, y);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawLine() {
    context.strokeStyle = colorOne;
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 400);
    context.lineTo(220, 400);
    context.stroke();
}

function DrawLines (){
    plateform1 = new LineDrawer(blackMode, 123, 178, 355 );
    plateform2 = new LineDrawer(whiteMode, 234, 433, 200 );
}

function LineDrawer (onMode, startX, endX, y){
    //choosing the color
    if (onMode){
        context.strokeStyle = "#202830" ;
    } else context.strokeStyle = "#A9A9A9";
    //actually drawing
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(startX, y);
    context.lineTo(endX, y);
    context.stroke();
    // managing collisions
    if (onMode && monster.y > y - 32 && monster.x > startX - 32 && monster.x < endX) {
        //set jumping to false so we can jump again
        monster.jumping = false;
        monster.y = y - 32;
        monster.y_velocity = 0;
    }


}

function drawLine2() {
    context.strokeStyle = colorOne;
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(300, 400);
    context.lineTo(500, 400);
    context.stroke();
}


function drawPlateform1() {
    context.strokeStyle = colorOne;
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(250, 350);
    context.lineTo(330, 350);
    context.stroke();
}


function drawPlateform2() {
    context.strokeStyle = colorTwo;
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(50, 330);
    context.lineTo(130, 330);
    context.stroke();
}

function drawImages() {
    starIMG = new ImageDrawer(star.x, star.y, "images/starvf.png");
    sunIMG = new ImageDrawer(sun.x, sun.y, "images/sunvf.png");
    monsterIMG = new ImageDrawer(monster.x, monster.y, "images/monster.png");
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
    if (controller.up && monster.jumping == false) {
        monster.y_velocity -= 20;
        monster.jumping = true;
    }
    //easing motion when you add and build the velocity frame by frame
    if (controller.left) {
        monster.x_velocity -= 0.5;
    }
    if (controller.right) {
        monster.x_velocity += 0.5;
    }

    //adding 1.5 on any frame of animation (basically until it hits the blue line)
    // if you were to put 0, the hero would never fall
    monster.y_velocity += 1.5;// gravity
    monster.x += monster.x_velocity;
    monster.y += monster.y_velocity;

    //reducing the x and y velocity very gradually
    // it gives you the effect that you are gradually coming to a stop
    monster.x_velocity *= 0.9;// friction
    monster.y_velocity *= 0.9;// friction

    // if hero is falling below floor line
    //180 = bottom of the screen - 16 la ligne, 32 le haut du hero
    if (blackMode && monster.y > 500 - 100 - 32 && monster.x < 220) {
        //set jumping to false so we can jump again
        monster.jumping = false;
        monster.y = 500 - 100 - 32;
        monster.y_velocity = 0;
    }
    //Second part of the main platform
    if (blackMode && monster.y > 500 - 100 - 32 && monster.x > 300) {
        //set jumping to false so we can jump again
        monster.jumping = false;
        monster.y = 500 - 100 - 32;
        monster.y_velocity = 0;
    }
    //Platform1 restrictions
    if (blackMode && monster.y > 500 - 150 - 32 && monster.y < 500 - 140 - 32 && monster.x > 250 - 32 && monster.x < 330) {
        //set jumping to false so we can jump again
        monster.jumping = false;
        monster.y = 500 - 150 - 32;
        monster.y_velocity = 0;
    }
    //Platform2 restrictions
    if (whiteMode && monster.y > 500 - 170 - 32 && monster.y < 500 - 160 - 32 && monster.x > 50 -32 && monster.x < 130) {
        //set jumping to false so we can jump again
        monster.jumping = false;
        monster.y = 500 - 170 - 32;
        monster.y_velocity = 0;
    }
    // if hero is going off the left of the screen
    if (monster.x < 0) {
        monster.x = 0;
    } else if (monster.x > 500 - 32) {// if hero goes past right boundary
        //return;
        monster.x = 500 - 32;
    }

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 500, 500);// x, y, width, height
    drawLine();
    drawLine2();
    drawPlateform1();
    drawPlateform2();
    drawImages();
    drawScore();
    drawLives();
    DrawLines ();



    if (monster.y > 430) {
        lives--;
        monster.x = 250;
        monster.y = 0;
    } else if (!lives) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }
    if (monster.x <= (star.x + 50) && star.x <= (monster.x + 32)
        && monster.y <= (star.y + 50) && star.y <= (monster.y + 32)) {
        lives--;
        monster.x = 250;
        monster.y = 0;
    } else if (!lives) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }
    requestAnimationFrame(draw);

};

function changeColor(down) {

    if(down) {
        if (colorOne === "#ffffff") {
            colorOne = "#202830";
            colorTwo = "#A9A9A9";
            backgroundColor = "#ffffff";
            blackMode = true;
            whiteMode = false;
        } else {
            colorOne = "#A9A9A9";
            colorTwo =	"#ffffff"
            backgroundColor = "#202830";
            blackMode = false;
            whiteMode = true;
        }
    }
}

//adding the listeners to the specific objects
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(draw);