import { GameBoard } from "./gameboard.js";

function Player() {
    let playerName;
    let playerSymbol;

    const createPlayer = (playName, playSymbol) => {
        playerName = playName;
        playerSymbol = playSymbol;
    };
    const getName = () => playerName;
    const getSymbol = () => playerSymbol;

    return {
        createPlayer,
        getName,
        getSymbol
    };
}

export function Game() {
    const gameboard = GameBoard();
    const playerOne = Player();
    const playerTwo = Player();
    const players = [];
    let currentPlayer;
    let winner;

    const getCurrentPlayer = () => currentPlayer;
    const getWinner = () => {
        return {
            currentPlayer,
            winner
        };
    };
    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    const printNewRound = () => {
        gameboard.printSpots();
        console.log(`${currentPlayer.getName()}'s turn.`);
    };
    const playRound = (row, column) => {
        console.log(`Putting ${currentPlayer.getName()}'s token in spot ${row}/${column}`);
        if (gameboard.markPlayerTurn(row, column, currentPlayer)) {
            // validation logic
            if (gameboard.checkWinner(currentPlayer.getSymbol())) {
                winner = true;
                return;
            }
            switchCurrentPlayer();
        }
        printNewRound();
    };
    const initialize = (playerOneName = "Player 1", playerTwoName = "Player 2") => {
        playerOne.createPlayer(playerOneName, "X");
        players.push(playerOne);
        playerTwo.createPlayer(playerTwoName, "O");
        players.push(playerTwo);

        console.log(`Starting the game with two players
            Player 1 is ${playerOne.getName()} with symbol ${playerOne.getSymbol()}
            Player 2 is ${playerTwo.getName()} with symbol ${playerTwo.getSymbol()}`);
        
        currentPlayer = players[0];
        console.log(`Starting game.`);
        printNewRound();
    };

    return {
        initialize,
        getWinner,
        getCurrentPlayer,
        playRound
    };
}