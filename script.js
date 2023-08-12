document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById('board')
    const cells = document.querySelectorAll("[data-cell]");
    const restartBtn = document.getElementById("restartBtn");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameEnded = false;

    // check win
    function checkWin(board) {
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

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    // check empty cells
    function checkEmpty(gameBoard) {
        let Sides = [1, 3, 5, 7].filter((cell) => {
            return gameBoard[cell] == ""
        })
        let Corners = [0, 2, 6, 8].filter((cell) => {
            return gameBoard[cell] == ""

        })
        return { Corners, Sides };
    }

    // check empty rows
    function checkEmptyRows(gameBoard) {
        let Array = [];
        [[0, 3, 6], [1, 4, 7], [2, 5, 8],].forEach((row) => {
            let rows = [gameBoard[row[0]], gameBoard[row[1]], gameBoard[row[2]]];
            if (rows.includes("") && rows.includes("O") && !rows.includes('X')) {
                Array.push(row[0], row[2])
            }
        })
        return Array;
    }

    // check empty cols
    function checkEmptyCols(gameBoard) {
        let Array = [];
        [[0, 3, 6], [1, 4, 7], [2, 5, 8],].forEach((col) => {
            let cols = [gameBoard[col[0]], gameBoard[col[1]], gameBoard[col[2]]];
            if (cols.includes("") && cols.includes("O") && !cols.includes('X')) {
                Array.push(col[0], col[2])
            }
        })
        return Array;
    }

    // player handle move
    function handleClick(event) {
        if (gameEnded) return;
        const cellIndex = Array.from(cells).indexOf(event.target);
        if (gameBoard[cellIndex] === "") {
            gameBoard[cellIndex] = currentPlayer;
            event.target.innerText = currentPlayer;
            if (checkWin(gameBoard)) {
                gameEnded = true;
                highlightWinningCells(gameBoard);
                return;
            }
            if (currentPlayer === "X") {
                currentPlayer = "O";
                game.style.pointerEvents = "none"
                setTimeout(computerMove, 200); // Introduce a delay for a better user experience
            } else {
                currentPlayer = "X";
            }
        }
    }


    // computer move
    function computerMove() {
        const emptyCells = gameBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        if (gameEnded) {
            return;
        } else {
            for (const cellIndex of emptyCells) {
                const tempBoard = [...gameBoard];
                tempBoard[cellIndex] = currentPlayer;
                if (checkWin(tempBoard)) {
                    gameBoard[cellIndex] = currentPlayer;
                    cells[cellIndex].innerText = currentPlayer;
                    gameEnded = true;
                    highlightWinningCells(gameBoard);
                    return;
                }
            }

        }
        const opponent = currentPlayer === "X" ? "O" : "X";
        for (const cellIndex of emptyCells) {
            const tempBoard = [...gameBoard];
            tempBoard[cellIndex] = opponent;
            if (checkWin(tempBoard)) {
                gameBoard[cellIndex] = currentPlayer;
                cells[cellIndex].innerText = currentPlayer;
                if (checkWin(gameBoard)) {
                    gameEnded = true;
                    highlightWinningCells(gameBoard);
                    return;
                }
                switchPlayers()
                return;
            }
        }

        if (gameBoard[4] == "") {
            gameBoard[4] = cells[4].innerHTML = currentPlayer;
            switchPlayers()
            return;
        } else if (checkEmptyCols(gameBoard).length || checkEmptyRows(gameBoard).length) {
            let cell = checkEmptyCols(gameBoard)[Math.floor(Math.random() * 2)] || checkEmptyRows(gameBoard)[Math.floor(Math.random() * 2)]
            gameBoard[cell] = cells[cell].innerHTML = currentPlayer;
            switchPlayers()
            return;

        } else if (gameBoard[0] == "" || gameBoard[2] == "" || gameBoard[6] == "" || gameBoard[8] == "") {
            let cell = checkEmpty(gameBoard).Corners[Math.floor(Math.random() * checkEmpty(gameBoard).Corners.length)]
            gameBoard[cell] = cells[cell].innerHTML = currentPlayer;
            switchPlayers()
            return;
        }
    }


    // switch Player
    function switchPlayers() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        game.style.pointerEvents = "auto"
    }


    // color the winer red or green
    function highlightWinningCells(board) {
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

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                let wincolor = "#6def4c";
                if (board[a] === "X") {
                    wincolor = "#00ff00";
                } else {
                    wincolor = "#ff0000";
                }


                cells[a].style.backgroundColor = wincolor;
                cells[b].style.backgroundColor = wincolor;
                cells[c].style.backgroundColor = wincolor;
            }
        }
    }

    // restart
    function handleRestart() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.innerText = "";
            cell.style.backgroundColor = "#7dbb6d";
        });
        currentPlayer = "X";
        gameEnded = false;
        game.style.pointerEvents = "auto"

    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartBtn.addEventListener("click", handleRestart);

});