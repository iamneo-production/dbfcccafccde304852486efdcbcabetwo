// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let resetButton = document.querySelector('#reset');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    // Check if the cell is empty and the game is not won
    if (cells[index] === '' && !checkWinner()) {
        // Set the current player's symbol in the cell
        cells[index] = currentPlayer;
        element.value = currentPlayer; // Set the value of the input
        element.disabled = true; // Disable the input
        element.classList.add(currentPlayer);

        // Check for a win
        if (checkWinner()) {
            result.textContent = `Player ${currentPlayer} wins!`;
            disableButtons();
            enableResetButton(); // Enable the reset button
        } else if (cells.every(cell => cell !== '')) {
            result.textContent = "It's a draw!";
            disableButtons();
            enableResetButton(); // Enable the reset button
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer} Turn`;
        }
    }
};

// Function to check for a win
const checkWinner = () => {
    for (const condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }
    return false;
};

// Function to disable all buttons
const disableButtons = () => {
    btns.forEach(btn => {
        btn.removeEventListener('click', handleButtonClick);
        btn.style.pointerEvents = 'none';
    });
};

// Function to enable the reset button
const enableResetButton = () => {
    resetButton.disabled = false;
};

// Function to reset the game
const resetGame = () => {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.textContent = "Player X Turn";
    btns.forEach(btn => {
        btn.value = '';
        btn.classList.remove('X', 'O');
        btn.disabled = false; // Enable the input
        btn.addEventListener('click', handleButtonClick);
        btn.style.pointerEvents = 'auto';
    });

    // Disable the reset button at the start of a new game
    resetButton.disabled = true;
};

// Event listener for button clicks
const handleButtonClick = (event) => {
    const index = Array.from(btns).indexOf(event.target);
    ticTacToe(event.target, index);
};

// Event listener for reset button click
resetButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();