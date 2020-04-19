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
var sound = document.getElementById('sound');


/********************************************************
 Setup the canvas
 ********************************************************/
let canvas = document.getElementById("game");
context = document.querySelector("canvas").getContext("2d");
context.canvas.height = document.body.clientHeight - 100;
context.canvas.width = document.body.clientWidth - 100;

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

function DrawLines (){
    base1 = new LineDrawer(blackMode, 0, 220, 400 );
    base2 = new LineDrawer(blackMode, 300, 500, 400 );
    plateform1 = new LineDrawer(blackMode, 123, 178, 355 );
    plateform2 = new LineDrawer(whiteMode, 234, 433, 200 );
    plateform3 = new LineDrawer(whiteMode, 50, 130, 330 );
}

function LineDrawer (onMode, startX, endX, y){
    //choosing the color
    if (onMode){
        context.strokeStyle = colorOne ;
    } else context.strokeStyle = colorTwo;
    //actually drawing
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(startX, y);
    context.lineTo(endX, y);
    context.stroke();
    // managing collisions
    if (onMode && monster.y > y - 32 && monster.y < y+10 && monster.x > startX - 32 && monster.x < endX) {
        //set jumping to false so we can jump again
        monster.jumping = false;
        monster.y = y - 32;
        monster.y_velocity = 0;
    }


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
    sound.play();
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
    monster.y_velocity *= 0.9; // friction



    // if hero is going off the left of the screen
    if (monster.x < 0) {
        monster.x = 0;
    } else if (monster.x > 500 - 32) {// if hero goes past right boundary
        //return;
        monster.x = 500 - 32;
    }

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 500, 500);// x, y, width, height
    drawImages();
    drawScore();
    drawLives();
    DrawLines ();



    if (monster.y > 470) {
        lives--;
        monster.x = 50;
        monster.y = 0;
    } else if (!lives) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }
    if (monster.x <= (star.x + 50) && star.x <= (monster.x + 32)
        && monster.y <= (star.y + 50) && star.y <= (monster.y + 32)) {
        lives--;
        monster.x = 50;
        monster.y = 0;
    } else if (!lives) {
        alert("GAME OVER");
        sound.pause();
        sound.currentTime=0;
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
            colorTwo = "#A9A9A9";
            colorOne =	"#ffffff"
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
