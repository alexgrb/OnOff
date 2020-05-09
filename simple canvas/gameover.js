//Is local storage available?
const isStorage = 'undefined' !== typeof localStorage;
const elements = {
    scoresList: document.querySelector('#scoresList'),

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
