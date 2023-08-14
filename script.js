const cells = document.querySelectorAll("[data-cell]");
const game = document.querySelector('.game')
const restart_btn = document.querySelector('.restart')
const divLose = document.getElementById("lose");
const divWin = document.getElementById("win");
divLose.innerHTML = localStorage.getItem("Lose") || 0;
divWin.innerHTML = localStorage.getItem("Win") || 0;
let Player = "X"
let gameboard = [
    '', '', '',
    '', '', '',
    '', '', ''
];
let gameboard2D = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// make random start for computer or player
if (Math.floor(Math.random() * 2) == 1) {
    switchPlayer()
    computerMove()
}



function updateGameboard(cells) {
    cells.forEach((cell, i) => {
        gameboard[i] = cell.innerHTML
        gameboard2D[Math.floor(i / 3)][(i >= 3 ? i % 3 : i)] = cell.innerHTML;
    });
};


cells.forEach((cell) => [
    cell.addEventListener("click", () => {

        if (!checkWin() && cell.innerHTML == '') {
            cell.innerHTML = Player
            switchPlayer()
            updateGameboard(cells);
            game.style.pointerEvents = "none"
            setTimeout(() => {
                computerMove()
                game.style.pointerEvents = "auto"
            }, Math.ceil(Math.random() * 200) + 300)

        }
    })
])

function switchPlayer() {
    Player = Player == "X" ? "O" : "X";
}


function checkWin() {

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            let wincolor = "#6def4c";
            if (gameboard[a] == "X") {
                // local store win and save it if exist else set it to 0 and add 1 and create a new one
                let win = localStorage.getItem("Win") ? localStorage.getItem("Win") : 0;
                win++;
                localStorage.setItem("Win", win);
                divWin.innerHTML = win;
                wincolor = "#00ff00";
            } else {
                // local store lose and save it if exist else set it to 0 and add 1 and create a new one
                let lose = localStorage.getItem("Lose") ? localStorage.getItem("Lose") : 0;
                lose++;
                localStorage.setItem("Lose", lose);
                divLose.innerHTML = lose;
                wincolor = "#ff0000";
            }

            cells[a].style.backgroundColor = wincolor;
            cells[b].style.backgroundColor = wincolor;
            cells[c].style.backgroundColor = wincolor;
            return true;
        }
    }

    return false;
}

function computerMove() {
    if (checkToBlock(gameboard) != null) {
        computerClick(checkToBlock(gameboard))
    } else if (gameboard[4] == "") {
        computerClick(4)
    } else if (nextStep(gameboard2D).len == 2) {
        let cells = [...checkEmptyRows_2(gameboard), ...checkEmptyCols_2(gameboard)];
        console.log(cells);
        computerClick(cells[Math.floor(Math.random() * cells.length)])
    } else if (nextStep(gameboard2D) == false && gameboard[4] == 'O') {
        let cells = [...checkEmpty(gameboard).Corners, ...checkEmpty(gameboard).Sides];
        computerClick(cells[Math.floor(Math.random() * cells.length)])
    } else if (typeof nextStep(gameboard2D) == 'object') {
        computerClick(nextStep(gameboard2D).row * 3 + nextStep(gameboard2D).cell)
    } else if (gameboard[4] == 'X' && checkEmpty(gameboard).num == 8) {
        computerClick(checkEmpty(gameboard).Corners[Math.floor(Math.random() * checkEmpty(gameboard).Corners.length)]);
    } else {
        let cells = [...checkEmpty(gameboard).Corners, ...checkEmpty(gameboard).Sides];
        computerClick(cells[Math.floor(Math.random() * cells.length)])
    }
    checkWin()
}

function nextStep(gameboard2D) {
    let connection = []
    function checkRows(board) {
        let rows = [];
        board.forEach((row, i) => {
            row.join("") == 'X' ? rows.push({ i, row }) : null
        })
        return rows;
    }
    function checkColumns(board) {
        let columns = [];
        board.forEach((column, i) => {

            column.join("") == 'X' ? columns.push({ i, column }) : null
        })
        return columns;

    };
    // create prototype method name "rotate()" rotating 90 to right 
    Array.prototype.rotate = function () {
        const numRows = this.length;
        const numCols = this[0].length;

        const rotatedMatrix = []
        this[0].forEach((_, col) => {
            const newRow = []
            this.forEach(row => {
                newRow.push(row[col])
            });
            rotatedMatrix.push(newRow)
        })

        return rotatedMatrix;
    }
    let rows = checkRows(gameboard2D)
    let cols = checkColumns(gameboard2D.rotate())
    rows.forEach(row => {
        cols.forEach(col => {
            col.column[row.i] == "X" ? false : connection.push({ row, col })
        })
    })

    if (connection.length == 1) {
        return { row: connection[0].row.i, cell: connection[0].col.i }
    } else if (connection.length == 2) {
        return { len: connection.length, connection }
    } else {

        return false
    }
}

// check empty cells
function checkEmpty(gameBoard) {
    let Sides = [1, 3, 5, 7].filter((cell) => {
        return gameBoard[cell] == ""
    })
    let Corners = [0, 2, 6, 8].filter((cell) => {
        return gameBoard[cell] == ""

    })
    return { Corners, Sides, num: [...Sides, ...Corners].length };
}

function checkEmptyRows_2(gameBoard) {
    let Array = [];
    [[0, 1, 2], [3, 4, 5], [6, 7, 8],].forEach((row) => {
        let rows = [gameBoard[row[0]], gameBoard[row[1]], gameBoard[row[2]]];
        if (rows.includes("") && rows.includes("O") && !rows.includes('X')) {
            if ([0, 2, 6, 8].includes(row[rows.indexOf('')])) {
                Array.push(row[rows.indexOf("")])
            } else {
                Array.push(row[rows.lastIndexOf("")])
            }
        }
    })
    return Array;
}

function checkEmptyCols_2(gameBoard) {
    let Array = [];
    [[0, 3, 6], [1, 4, 7], [2, 5, 8],].forEach((col) => {
        let cols = [gameBoard[col[0]], gameBoard[col[1]], gameBoard[col[2]]];
        if (cols.includes("") && cols.includes("O") && !cols.includes('X')) {
            if ([0, 2, 6, 8].includes(col[cols.indexOf('')])) {
                Array.push(col[cols.indexOf("")])
            } else {
                Array.push(col[cols.lastIndexOf("")])
            }

        }
    })
    return Array;
}

function checkToBlock(gameBoard) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if ((gameBoard[a] != '' && gameBoard[a] == gameBoard[b] != '' && gameBoard[c] == '') || (gameBoard[a] != '' && gameBoard[a] == gameBoard[c] != '' && gameBoard[b] == '') || (gameBoard[b] != '' && gameBoard[b] == gameBoard[c] && gameBoard[a] == '')) {
            return pattern[[gameBoard[a], gameBoard[b], gameBoard[c]].indexOf('')];
        }
    }
    return null;
}

function computerClick(num) {
    cells.forEach((cell, i) => {
        if (i == num) {

            cell.innerHTML = Player
            switchPlayer()
            updateGameboard(cells);
        }
    })
}

function restart() {
    cells.forEach((cell) => {
        cell.innerHTML = ''
        Player = "X"
        cell.style.backgroundColor = "#7dbb6d";
        updateGameboard(cells)
    })

}

restart_btn.addEventListener('click', () => {
    if (isFullBoard() || checkWin()) {
        restart()
        if (Math.floor(Math.random() * 2) == 1) {
            Player = "O"
            computerMove()
        }
    }
})

function isFullBoard() {
    return [...cells].map(cell => { return cell.innerHTML }).includes('') ? false : true;
} 