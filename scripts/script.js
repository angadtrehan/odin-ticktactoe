import { Game } from "./game.js";

let newGame = Game();
// newGame.initialize(playerOneName, playerTwoName);

const { currentPlayer, winner} = newGame.getWinner();
if (winner) {
    console.log(`${currentPlayer.getName()} wins!`);
} else {
    console.log("No winner, game either drew or y'all cancelled it.");
}
