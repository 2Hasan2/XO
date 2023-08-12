# XO Game

This is a simple implementation of the classic XO game (also known as Tic-Tac-Toe) using HTML, CSS, and JavaScript.

## Gameplay

The game is played on a 3x3 grid, where two players take turns marking a cell with their respective symbols, "X" and "O". The objective of the game is to get three of your own symbols in a row, either horizontally, vertically, or diagonally, before your opponent does.

## Features

- Two players: "X" and "O"
- Player "X" starts the game
- The game highlights the winning cells when a player wins
- There is a "Restart" button to reset the game

## How to Play

1. Open the `index.html` file in your web browser.
2. The game starts with player "X" taking the first turn.
3. Players take turns clicking on empty cells to place their symbols.
4. The game ends when a player gets three symbols in a row or if all cells are filled.
5. You can restart the game at any time by clicking the "Restart" button.

## AI Moves

The game includes a simple AI opponent that plays as "O". The AI opponent's strategy is to block the human player from winning while attempting to secure its own victory.

## Preventing Player from Winning

The code provided in this repository includes an implementation that prevents the player ("X") from winning by using an AI move that ensures the opponent ("O") can always secure a win or draw.

## Credits

- Developed by Eng\ Hasan Mohamed 
- AI strategy inspired by various Tic-Tac-Toe strategies

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify and use this code for your own projects.

Enjoy the game and have fun!
