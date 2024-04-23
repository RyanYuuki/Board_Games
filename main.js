// Elements Initialization
const boardBtns = document.getElementsByClassName("container");
const pointsElmt = document.getElementById("Points");
const resetElmt = document.getElementById("resetBtn");
const remarkElmt = document.getElementById("Remark");
const deciderElmt = document.getElementById("Decider");
const msgElmt = document.getElementById("msg");
const timeElmt = document.getElementById("timeCard");
const containerElmt = document.getElementsByClassName("container");
const imageElmt = document.getElementsByClassName("Images");
const pointerElmt = document.getElementById("Pointer");
// End

// Game-Related Vars
let playerTurn = true;
let isRunning = true;
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [0, 4, 8]
];
let userWon = false;
let compWon = false;
let userPoints = 0;
let computerPoints = 0;
const themesQuantity = 6;
let temp;
let prevNum = 0;
let index = 0;
// End

// Time Fetch Logic
function Time() {
    const date = new Date();
    const Hour = String(date.getHours()).padStart(2, '0');
    const Minutes = String(date.getMinutes()).padStart(2, '0');
    const Seconds = String(date.getSeconds()).padStart(2, '0');
    timeElmt.textContent = `${Hour}:${Minutes}:${Seconds}`;
}
 
// End

// Interval for Time Refresh
setInterval(Time, 1000);
// End

// Main Game Logic

// 1. Players Turn
function Game() {
    resetElmt.addEventListener("click", () => {
        resetGame();
    });
    for (let i = 0; i < boardBtns[0].children.length; i++) {
        boardBtns[0].children[i].addEventListener("click", () => {
            if (playerTurn) {
                if (boardBtns[0].children[i].textContent != '') {
                    alert("Already Taken");
                } else {
                    boardBtns[0].children[i].textContent = 'X';
                    playerTurn = false;
                    setTimeout(() => {
                        computerTurn();
                    }, 600);
                }
            }
        });
    }
}
// End

// 2. Computers Turn
function computerTurn() {
    let computerMove = Math.floor(Math.random() * 8);
    if (boardBtns[0].children[computerMove].textContent != '') {
        computerMove = Math.floor(Math.random() * 8);
        let Index = 0;
        for (let j = 0; j < 8; j++) {
            if (boardBtns[0].children[j].textContent != '') {
                Index++;
            }
        }
        if (Index == 8) {
            checkWinner();
            checkDraw();
        }
        else {
            computerTurn();
        }
    }
    else {
        boardBtns[0].children[computerMove].textContent = 'O';
        playerTurn = true;
        checkWinner();
    }
}
// End

// 3. Deciding the Winner
function checkWinner() {
    for (let combo of winningCombos) {
        if (
            boardBtns[0].children[combo[0]].textContent !== '' &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[1]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[2]].textContent
        ) {
            if (boardBtns[0].children[combo[2]].textContent === 'X') {
                userWon = true;
                userPoints++;
                msgElmt.style.display = "grid";
                remarkElmt.textContent = "Damn, You're Good!";
                deciderElmt.textContent = "You Won!";
                isRunning = false;
                draw = false;
            } else if (boardBtns[0].children[combo[2]].textContent === 'O') {
                compWon = true;
                computerPoints++;
                msgElmt.style.display = "grid";
                remarkElmt.textContent = "You Suck at this!";
                deciderElmt.textContent = "You Lost!";
                isRunning = false;
            }
        }
    }
    pointsElmt.children[0].textContent = `User Points: ${userPoints}`;
    pointsElmt.children[1].textContent = `Computer Points: ${computerPoints}`;
}
// End

// 4. Checking Draw
function checkDraw() {
    if (userWon == false && compWon == false) {
        msgElmt.style.display = "grid";
        remarkElmt.textContent = "Try Harder!";
        deciderElmt.textContent = "Draw!";
        isRunning = false;
    }
}
// End

// 5. Restart the Game
function resetGame() {
    for (let i = 0; i < boardBtns[0].children.length; i++) {
        boardBtns[0].children[i].textContent = '';
    }
    playerTurn = true;
    isRunning = true;
    compWon = false;
    userWon = false;
    msgElmt.style.display = "none";
}
// End

// Extra: Themes for Better UI Experience

// Extra : 1. Showing Themes
function Themes()
{
    containerElmt[0].style.display = "none";
    imageElmt[0].style.display = "flex";
    temp = pointsElmt.innerHTML;
    pointsElmt.textContent = "Pick Your Favourite Theme!";
    for(let i = 2; i < 8; i++)
    {
        imageElmt[0].children[i].addEventListener("click", (event) => {
            document.body.style.backgroundImage = `url("./Assets/Backgrounds/${event.originalTarget.alt}")`;
        });
    }
}

// Extra: 2. Back Out Button
function revertTheme() {
    containerElmt[0].style.display = "grid";
    imageElmt[0].style.display = "none";
    pointsElmt.textContent = "";
    pointsElmt.innerHTML = temp;
}

// Extra: 3. For Applying Random Theme 
function randomTheme() {
    let randNum = Math.floor(Math.random() * 6) + 1;
    
    while(randNum == prevNum) {
        randNum = Math.floor(Math.random() * 6) + 1;
    }
    if(randNum == 6) {
        document.body.style.backgroundImage = 'url("./Assets/Backgrounds/6.png")';
    }
    else {
        document.body.style.backgroundImage = `url("./Assets/Backgrounds/${randNum}.svg")`;
    }
    prevNum = randNum;
}
// End

Game();