const boardBtns = document.getElementsByClassName("container");
let playerTurn = true;
let isRunning = true;
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [2, 4, 6]       ,     [0, 4, 8] 
]
function Game() {
    for (let i = 0; i < boardBtns[0].children.length; i++) {
        boardBtns[0].children[i].addEventListener("click", () => {
            if (playerTurn) {
                if (boardBtns[0].children[i].textContent == 'X') {
                    alert("Already Taken");
                } else {
                    boardBtns[0].children[i].textContent = 'X';
                    playerTurn = false;
                    setTimeout(() => {
                        computerTurn();
                    }, 1000);
                }
            }
        });
    }
}

function computerTurn() {
    let computerMove = Math.floor(Math.random() * 8);
    if (boardBtns[0].children[computerMove].textContent != '') {
        computerMove = Math.floor(Math.random() * 8);
        let index = 0;
        for (let j = 0; j < 8; j++) {
            if (boardBtns[0].children[j].textContent != '') {
                index++;
            }
        }
        if (index == 8) {
            checkWinner();
            alert("Tie Game");
            isRunning = false;
        } else {
            computerTurn();
        }
    } else {
        boardBtns[0].children[computerMove].textContent = 'O';
        playerTurn = true;
        checkWinner();
    }
}

function checkWinner() {
    for (let combo of winningCombos) {
        if (boardBtns[0].children[combo[0]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[1]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[2]].textContent && boardBtns[0].children[combo[2]].textContent == 'X') {
                alert("You Won");
                isRunning = false;
        }
        else if (boardBtns[0].children[combo[0]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[1]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[2]].textContent && boardBtns[0].children[combo[2]].textContent == 'O')
            {
                alert("Computer Won!");
                isRunning = false;
            }
    }
}

Game();