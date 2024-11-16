const GameBoard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const updateBoard = (index, marker) => {
        if (board[index] === "") board[index] = marker;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };
    return {getBoard, updateBoard, resetBoard};
})();


const GameController = (() => {

    let currentPlayerMarker = "X";

    const currentPlayer = () => {
        return currentPlayerMarker;
    }
    const switchPlayer = () => {
        currentPlayerMarker = currentPlayerMarker === "X" ? "O" : "X";
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ]
        let board = GameBoard.getBoard()
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && (board[a] === board[b]) && board[a] === board[c]) {
                return board[a];
            }
        }

        if (board.every(cell => cell !== ''))
            return "Tie";

        return null;
    };
    return {switchPlayer, checkWinner, currentPlayer};
})();

function DisplayGame() {
    let results = document.querySelector(".results")
    const cells = document.querySelectorAll('.cell');
    const startButton = document.querySelector(".reset");

    const renderBoard = () => {
        const board = GameBoard.getBoard();

        board.forEach((marker, index) => {
            cells[index].textContent = marker;
        });
    };

    const cellClick = (index) => {
        if (GameBoard.getBoard()[index] !== "") return;

        const currentPlayer = GameController.currentPlayer();
        GameBoard.updateBoard(index, currentPlayer);
        renderBoard();

        const winner = GameController.checkWinner();
        if (winner) {
            results.textContent = (winner === "Tie" ? "It's a tie" : `${winner} is the winner!`);
            startButton.style.display = "inline-block";
            return;
        }
        GameController.switchPlayer();
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => cellClick(index));
    });

    startButton.addEventListener("click", () => {
        GameBoard.resetBoard();
        results.textContent = "";
        renderBoard();
        startButton.style.display = "none";
    });
    renderBoard();
}

DisplayGame();
