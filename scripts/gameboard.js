export function GameBoard() {
    const dimension = 3;
    const spots = [];

    for (let i = 0; i < dimension; i++) {
        spots[i] = [];
        for (let j = 0; j < dimension; j++) {
            spots[i].push(Cell());
        }
    }
    // Setup done

    const getSpots = () => spots;
    const markPlayerTurn = (row, column, player) => {
        if (row >= dimension || row < 0 || column >= dimension || column < 0) {
            console.error("Selected cell is off the game board. This isn't chess, no bishop sniping.");
            return false;
        }
        return spots[row][column].addSymbol(player.getSymbol());
    };
    const printSpots = () => {
        let gb = ":-:-:-:\n";
        for (let i = 0; i < dimension; i++) {
            gb = gb + "|";
            for (let j = 0; j < dimension; j++) {
                gb = gb + `${spots[i][j].getValue() === null ? " " : spots[i][j].getValue()}|`;
            }
            gb = gb + "\n:-:-:-:\n";
        }
        console.log(gb);
    };
    const checkWinner = (token) => {
        if (
            // three matching in a row
            (token === spots[0][0].getValue() && (spots[0][0].getValue() === spots[0][1].getValue() && spots[0][1].getValue() === spots[0][2].getValue())) ||
            (token === spots[1][0].getValue() && (spots[1][0].getValue() === spots[1][1].getValue() && spots[1][1].getValue() === spots[1][2].getValue())) ||
            (token === spots[2][0].getValue() && (spots[2][0].getValue() === spots[2][1].getValue() && spots[2][1].getValue() === spots[2][2].getValue())) ||
            // three matching in a column
            (token === spots[0][0].getValue() && (spots[0][0].getValue() === spots[1][0].getValue() && spots[1][0].getValue() === spots[2][0].getValue())) ||
            (token === spots[0][1].getValue() && (spots[0][1].getValue() === spots[1][1].getValue() && spots[1][1].getValue() === spots[2][1].getValue())) ||
            (token === spots[0][2].getValue() && (spots[0][2].getValue() === spots[1][2].getValue() && spots[1][2].getValue() === spots[2][2].getValue())) ||
            // three matching in diagonals
            (token === spots[0][0].getValue() && (spots[0][0].getValue() === spots[1][1].getValue() && spots[1][1].getValue() === spots[2][2].getValue())) ||
            (token === spots[0][2].getValue() && (spots[0][2].getValue() === spots[1][1].getValue() && spots[1][1].getValue() === spots[2][0].getValue()))
        ) {
            return true;
        } else {
            return false;
        }
    };

    return {
        getSpots, 
        markPlayerTurn, 
        printSpots,
        checkWinner
    };
}

function Cell() {
    let value = null;

    const addSymbol = (playerToken) => {
        if (value != null) {
            console.log("Selected spot already has a value");
            return false;
        }
        value = playerToken;
        return true;
    };
    const getValue = () => value;

    return {
        addSymbol, 
        getValue
    };
}