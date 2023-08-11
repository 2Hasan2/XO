document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const restartBtn = document.getElementById("restartBtn");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameEnded = false;

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
                setTimeout(computerMove, 500); // Introduce a delay for a better user experience
            } else {
                currentPlayer = "X";
            }
        }
    }

    function computerMove() {
        if (gameEnded) return;
        const emptyCells = gameBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);

        // if the player play in the center, play in the corner
        if (gameBoard[4] === "") {
            gameBoard[4] = currentPlayer;
            cells[4].innerText = currentPlayer;
            if (checkWin(gameBoard)) {
                gameEnded = true;
                highlightWinningCells(gameBoard);
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            return;
        } if (gameBoard[4] == "X" && gameBoard[0] == "" && gameBoard[2] == "" && gameBoard[6] == "" && gameBoard[8] == "") {
            // play in any corner
            const randomIndex = Math.floor(Math.random() * [0, 2, 6, 8].length);
            gameBoard[[0, 2, 6, 8][randomIndex]] = currentPlayer;
            cells[[0, 2, 6, 8][randomIndex]].innerText = currentPlayer;
            if (checkWin(gameBoard)) {
                gameEnded = true;
                highlightWinningCells(gameBoard);
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            return;
        } if ((gameBoard[0] == "X" && gameBoard[8] == "X") || (gameBoard[2] == "X" && gameBoard[6] == "X")) {
            // don't play in the corner
            if (gameBoard[1] == "" && gameBoard[3] == "" && gameBoard[5] == "" && gameBoard[7] == "") {
                // play in any side
                const randomIndex = Math.floor(Math.random() * [1, 3, 5, 7].length);
                gameBoard[[1, 3, 5, 7][randomIndex]] = currentPlayer;
                cells[[1, 3, 5, 7][randomIndex]].innerText = currentPlayer;
                if (checkWin(gameBoard)) {
                    gameEnded = true;
                    highlightWinningCells(gameBoard);
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                return;
            }
        }
        else {
            // Check for potential winning move for computer
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

        // Check for potential blocking move for human player
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
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                return;
            }
        }

        // If no winning move or blocking move, make a random move
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cellIndex = emptyCells[randomIndex];
            gameBoard[cellIndex] = currentPlayer;
            cells[cellIndex].innerText = currentPlayer;
            if (checkWin(gameBoard)) {
                gameEnded = true;
                highlightWinningCells(gameBoard);
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

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


    function handleRestart() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.innerText = "";
            cell.style.backgroundColor = "#7dbb6d";
        });
        currentPlayer = "X";
        gameEnded = false;
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartBtn.addEventListener("click", handleRestart);

});