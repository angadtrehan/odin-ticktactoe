import { Game } from "./game.js";

const gameBoard = Game();
const gameInteraction = GameInteraction();
const gameDisplay = GameDisplay();
const playerOneName = document.querySelector("#player-one-name");
const playerTwoName = document.querySelector("#player-two-name");
const startButton = document.querySelector(".player-names > button");
const cells = document.querySelectorAll(".cell");
const resultDisplay = document.querySelector("dialog .winner-text > h1");
const dialog = document.querySelector("dialog");
const cancelButton = document.querySelector(".lhs > button");

const dialogClose = document.querySelector("#dialog-close");
const dialogCloseBtn = document.querySelector("#dialog-close-btn");


startButton.addEventListener('click', () => {
    console.log(`Players: ${playerOneName.value} || ${playerTwoName.value}`);
    const pOne = playerOneName.value || 'Player 1';
    const pTwo = playerTwoName.value || 'Player 2';
    gameInteraction.init(pOne, pTwo);
    gameDisplay.init();
    gameDisplay.showCurrentPlayer(gameInteraction.getCurrentPlayer());
});

for (const cell of cells) {
    cell.addEventListener('click', () => {
        console.log(`Cell ${cell.id} clicked`);
        const currPlayer = gameInteraction.getCurrentPlayer();
        gameInteraction.addSymbol(cell.id);
        gameDisplay.addSymbol(cell, currPlayer);

        // if game has winner, then stop and display winner
        const { currentPlayer, winner } = gameInteraction.checkWinner();
        if (winner) {
            gameDisplay.showWinner(currentPlayer);
        } else {
            if (gameBoard.isDraw()) {
                gameDisplay.endGame(false);
            } else {
                gameDisplay.showCurrentPlayer(currentPlayer);
            }
        }
    });
}

cancelButton.addEventListener('click', () => {
    gameDisplay.endGame(true);
});

dialogClose.addEventListener('click', () => {
    gameDisplay.closeDialog(false);
    gameInteraction.resetBoard();
});

dialogCloseBtn.addEventListener('click', () => {
    gameDisplay.closeDialog(true);
    gameInteraction.resetBoard();
});

function GameInteraction() {
    // Clicking start button
    const init = (playerOneName, playerTwoName) => {
        gameBoard.initialize(playerOneName, playerTwoName);
    };
    // Clicking a square
    const addSymbol = (cellId) => {
        const row = Number.parseInt(cellId.replace('t','').split('-')[0]) - 1;
        const column = Number.parseInt(cellId.replace('t','').split('-')[1]) - 1;
        gameBoard.playRound(row, column);
    };
    // Checking player turn
    const getCurrentPlayer = () => {
        return gameBoard.getCurrentPlayer();
    };
    // Checking winner
    const checkWinner = () => {
        return gameBoard.getWinner();
    }
    // Reset game
    const resetBoard = () => {
        gameBoard.reset();
    };

    return {
        init,
        addSymbol,
        getCurrentPlayer,
        checkWinner,
        resetBoard
    };
}

const lhs = document.querySelector(".lhs");
const game = document.querySelector(".game");
const rhs = document.querySelector(".rhs");
const playerTurn = document.querySelector(".lhs > .player-turn > h2"); 

function GameDisplay() {
    // Showing initialized game
    const init = () => {
        lhs.style.visibility = "visible";
        game.style.visibility = "visible";
        rhs.style.visibility = "hidden";
    };
    // Clicked square display with player token
    const addSymbol = (cell, player) => {
        if (cell.textContent === "") {
            cell.appendChild(document.createTextNode(`${player.getSymbol()}`));
        }
    }
    // Showing player turn
    const showCurrentPlayer = (player) => {
        playerTurn.textContent = `It's ${player.getName()}'s turn!`;
    };
    // Winner popup
    const showWinner = (currentPlayer) => {
        resultDisplay.textContent = `${currentPlayer.getName()} won!`;
        dialog.showModal();
    };
    const endGame = (isCancel) => {
        resultDisplay.textContent = `${isCancel ? 'Game cancelled, try again!' : 'Draw game, try again!'}`;
        dialog.showModal();
    };
    // Winner popup closing behaviour
    const closeDialog = (isReplay) => {
        dialog.close();
        resetBoard();
        if (isReplay) {
            playerOneName.focus({ focusVisible : false });
        }
    };
    // reset everything
    const resetBoard = () => {
        lhs.style.visibility = "hidden";
        game.style.visibility = "hidden";
        rhs.style.visibility = "visible";

        // reset inputs
        playerOneName.value = "";
        playerTwoName.value = "";

        // reset board
        for (const cell of cells) {
            while (cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        }
    };

    return {
        init,
        addSymbol,
        showCurrentPlayer,
        showWinner,
        endGame,
        closeDialog
    };
}