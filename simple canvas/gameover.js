//Is local storage available?
const isStorage = 'undefined' !== typeof localStorage;
window.onload = function() {
    sortTable();
};
var backMenu = function () {
    window.location.replace("index.html");
}

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
        htmlTemplate += ` <tr class="scores__item">
            <td>${localStorage.key(i)}</td>
            <td>${localStorage.getItem(localStorage.key(i))}</td>
        </tr>`;
    }
    scoresList.innerHTML = htmlTemplate;
}
function sortTable() {
    var table, i, x, y;
    table = document.getElementById("orderedScores");
    var switching = true;

    // Run loop until no switching is needed
    while (switching) {
        switching = false;
        var rows = table.rows;

        // Loop to go through all rows
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;

            // Fetch 2 elements that need to be compared
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];

            // Check if 2 rows need to be switched
            if (Number(x.innerHTML) < Number(y.innerHTML))
            {
                // If yes, mark Switch as needed and break loop
                Switch = true;
                break;
            }
        }
        if (Switch) {
            // Function to switch rows and mark switch as completed
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
