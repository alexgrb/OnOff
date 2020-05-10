/********************************************************
 Variables : defining variables, drawing context, controller, hero and the loop
 ********************************************************/
let context, controller, monster;
var score = 0;
var lives = 3;
var colorOne = "#202830";
var colorTwo = "#A9A9A9";
var backgroundColor = "#ffffff";
var blackMode = true;
var whiteMode = false;
var sound = document.getElementById('sound');
var levels = JSON.parse('{ "levels":' +
    '[' +
    '{"level": {"platforms": [{ "onMode":"blackMode", "startX":0, "endX":650, "y":700 }, { "onMode":"blackMode", "startX": 900, "endX":1500, "y":700 }], "star":{"x" : 1450, "y" : 650}, "scoringStar": [{"x" : 750, "y" : 500, "status":1}] }}, ' +
    '{"level": {"platforms": [{ "onMode":"blackMode", "startX":0, "endX":550, "y":700 }, { "onMode":"whiteMode", "startX":620, "endX":870, "y":550 },{ "onMode":"blackMode", "startX":950, "endX":1500, "y":700 }], "star":{"x" : 1450, "y" : 650}, "scoringStar": [{"x" : 1050, "y" : 600, "status":1}, {"x" : 400, "y" : 350, "status":1}, {"x" : 730, "y" : 450, "status":1}] }}, ' +
    '{"level": { "platforms": [{ "onMode":"blackMode", "startX":0, "endX":1500, "y":100 },{ "onMode":"whiteMode", "startX":0, "endX":1500, "y":300 }, { "onMode":"blackMode", "startX":0, "endX":1500, "y":500 }, { "onMode":"whiteMode", "startX":0, "endX":1500, "y":700 }] , "star":{"x" : 1450, "y" : 850}, "scoringStar": [{"x" : 200, "y" : 340, "status":1}, {"x" : 400, "y": 50, "status":1},  {"x" : 1230, "y": 700, "status":1}, {"x" : 730, "y" : 450, "status":1}] }},' +
    '{"level": {"platforms": [{ "onMode":"whiteMode", "startX":0, "endX":300, "y":520 }, { "onMode":"blackMode", "startX": 400, "endX":700, "y":700 },  { "onMode":"whiteMode", "startX": 800, "endX":1100, "y":520 }, { "onMode":"blackMode", "startX": 1200, "endX":1500, "y":700 }], "star":{"x" : 1450, "y" : 650}, "scoringStar": [{"x" : 100, "y" : 350, "status":1}, {"x" : 660, "y" : 500, "status":1}, {"x" : 1300, "y" : 300, "status":1}] }}, ' +
    '{"level": {"platforms": [{ "onMode":"blackMode", "startX":0, "endX":200, "y":800 }, { "onMode":"whiteMode", "startX": 260, "endX":360, "y":650 }, { "onMode":"blackMode", "startX": 400, "endX":500, "y":490 }, { "onMode":"whiteMode", "startX": 220, "endX":320, "y":350 }, { "onMode":"blackMode", "startX": 500, "endX":680, "y":200 }, { "onMode":"blackMode", "startX": 850, "endX":950, "y":370 }, { "onMode":"whiteMode", "startX": 850, "endX":950, "y":600 }, { "onMode":"whiteMode", "startX": 1100, "endX":1200, "y":250 } , { "onMode":"blackMode", "startX": 1300, "endX":1500, "y":150 }], "star":{"x" : 1450, "y" : 100}, "scoringStar": [{"x" : 100, "y" : 450, "status":1}, {"x" : 75, "y" : 550, "status":1}, {"x" : 550, "y" : 720, "status":1},  {"x" : 550, "y" : 50, "status":1},  {"x" : 1000, "y" : 320, "status":1}, {"x" : 880, "y" : 550, "status":1}] }} ' +
    ']}');
var i = 0;
var level = levels.levels[i].level;
var star = level.star;
var scoringStar = level.scoringStar;

//Is local storage available?
const isStorage = 'undefined' !== typeof localStorage;
/********************************************************
 Setup the canvas
 ********************************************************/
let canvas = document.getElementById("game");
context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 900;
context.canvas.width = 1500;

/********************************************************
 Elements appearing on the screen
 ********************************************************/
sun = {
    x: 34,
    y: 122
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

function DrawLines (){
    for (let index = level.platforms.length - 1; index > -1; -- index) {
        let pf = level.platforms[index];
        if(pf.onMode == "blackMode") {
            base1 = new LineDrawer(blackMode, pf.startX, pf.endX, pf.y);
        }
        else{
            base1 = new LineDrawer(whiteMode, pf.startX, pf.endX, pf.y);
        }
    }
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
    if (onMode && monster.y > y - 64 && monster.y < y+10 && monster.x > startX - 32 && monster.x < endX) {
        //set jumping to false so we can jump again
        monster.jumping = false;
        monster.y = y - 64;
        monster.y_velocity = 0;
    }

}
function drawImages() {
    starIMG = new ImageDrawer(star.x, star.y, "images/star_d.png");
    sunIMG = new ImageDrawer(sun.x, sun.y, "images/sunvf.png");
    monsterIMG = new ImageDrawer(monster.x, monster.y, "images/ghost_b.png");

    for (let index = level.scoringStar.length - 1; index > -1; -- index) {
        let scoredStar = level.scoringStar[index];
        if (scoredStar.status == 1) {
            jscoringStarIMG = new ImageDrawer(scoredStar.x, scoredStar.y, "images/starvf.png");
            //managing score
            if (monster.x <= (scoredStar.x + 50) && scoredStar.x <= (monster.x + 32)
                && monster.y <= (scoredStar.y + 50) && scoredStar.y <= (monster.y + 32)
                && scoredStar.status == 1) {
                score++;
                scoredStar.status = 0;
            }
        }
    }
}

function drawLives() {
    context.font = "30px Courier New";
    context.fillStyle = colorTwo;
    context.fillText("Lives: " + lives, context.canvas.width - 149, 40);
}

function drawScore() {
    context.font = "30px Courier New";
    context.fillStyle = colorTwo;
    context.fillText("Score: " + score, 8, 40);
}

function draw() {
    sound.play();

    /********************************************************
                        Physics
     ********************************************************/
    //loadPlatforms("levels/level0.json");
    if (controller.up && monster.jumping == false) {
        monster.y_velocity -= 40;
        monster.jumping = true;
    }
    //easing motion when you add and build the velocity frame by frame
    if (controller.left) {
        monster.x_velocity -= 1;
    }
    if (controller.right) {
        monster.x_velocity += 1;
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

    /********************************************************
                Constraints on the canvas
     ********************************************************/
    // if hero is going off the left of the screen
    if (monster.x < 0) {
        monster.x = 0;
    } else if (monster.x > 1500 - 32) {// if hero goes past right boundary
        //return;
        monster.x = 1500 - 32;
    }

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 1500, 900);// x, y, width, height
    drawImages();
    drawScore();
    drawLives();
    DrawLines ();

    //managing lives
    if (monster.y > 870) {
        lives--;
        monster.x = 50;
        monster.y = 0;
    }

    //managing star
    if (monster.x <= (star.x + 50) && star.x <= (monster.x + 32)
        && monster.y <= (star.y + 50) && star.y <= (monster.y + 32)) {
        i++;
        level = levels.levels[i].level;
        monster.x = 50;
        monster.y = 0;
        star = level.star;
        scoringStar = level.scoringStar;
    }
    if (lives<1) {
        var name = prompt("Please enter your name", "lastPlayer");

        sound.pause();
        sound.currentTime=0;
        isStorage && localStorage.setItem(name, score);

        window.location.replace("gameover.html");
        clearInterval(interval);
        //document.location.reload();

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
