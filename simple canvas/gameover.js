//Is local storage available?
const isStorage = 'undefined' !== typeof localStorage;

var gameOverSound = document.getElementById('gameoversound');
var winSound = document.getElementById('winsound');
const elements = {
    scoresList: document.querySelector('#scoresList'),

}

const params = new URLSearchParams(document.location.search);
const win = params.get("win");
console.log(win);
if(win === "true" ){
    winSound.play();
    document.getElementById("congrats").style.display = "block";
    document.getElementById("theHead").style.display = "none";

}
else{
    gameOverSound.play();
    document.getElementById("theHead").style.display = "block";
    document.getElementById("congrats").style.display = "none";

}

//Get score item from the local storage
if (isStorage) {
     openScores(true);
};

function openScores(gameOver) {

    let htmlTemplate = '';
    for (let i = 0; i < localStorage.length; i++) {

        htmlTemplate += `<li class="scores__item" style="color:red">${localStorage.key(i) + " : " + localStorage.getItem(localStorage.key(i))}</li>`;
    }
    scoresList.innerHTML = htmlTemplate;

}
