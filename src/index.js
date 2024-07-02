import "./style.css";
import { createComputerPlayer, createPlayer } from "./player";
import { createGameboard } from "./gameboard";
import { createShip } from "./ship";

const userBoard = document.querySelector("#user-board");
const computerBoard = document.querySelector("#computer-board");
const shipPlacementForm = document.querySelector("#ship-placement-form");
const newGameButton = document.querySelector("#new-game-button");

let userGameBoard, computerGameBoard, userPlayer, computerPlayer;

const initializeGame = () => {
  userGameBoard = createGameboard();
  computerGameBoard = createGameboard();
  userPlayer = createPlayer(userGameBoard);
  computerPlayer = createComputerPlayer(
    computerGameBoard,
    createComputerShips(),
  );

  generateBoard(userBoard, "user-board");
  generateBoard(computerBoard, "computer-board", handleCellClick);
  document.querySelector(".setup-container").style.display = "block";
  document.querySelector("#game-result").style.display = "none";
};

const createComputerShips = () => {
  return [
    createShip(5),
    createShip(4),
    createShip(3),
    createShip(3),
    createShip(2),
  ];
};

const generateBoard = (boardElement, boardType, clickHandler) => {
  boardElement.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      if (clickHandler && boardType === "computer-board") {
        cell.addEventListener("click", () => clickHandler(i, j));
      }
      boardElement.appendChild(cell);
    }
  }
};

const handleCellClick = (row, col) => {
  if (userPlayer.hasLost() || computerPlayer.hasLost()) {
    return;
  }

  if (!computerGameBoard.receiveAttack(row, col)) {
    return;
  }
  updateBoard(computerBoard, computerGameBoard.board);

  if (computerGameBoard.allShipsSunk()) {
    let gameResult = document.querySelector("#game-result");
    let winner = document.querySelector("#game-result > h2");
    gameResult.style.display = "block";
    winner.innerText = "You Win";
  } else {
    computerAttack();
  }
};

const computerAttack = () => {
  const { i: row, j: col } = computerPlayer.attack();
  userGameBoard.receiveAttack(row, col);
  updateBoard(userBoard, userGameBoard.board);

  if (userGameBoard.allShipsSunk()) {
    let gameResult = document.querySelector("#game-result");
    let winner = document.querySelector("#game-result > h2");
    gameResult.style.display = "block";
    winner.innerText = "Computer Wins";
  }
};

const updateBoard = (boardElement, board) => {
  const cells = boardElement.children;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = cells[i * 10 + j];
      if (board[i][j] === "hit") {
        cell.className = "hit";
      } else if (board[i][j] === "miss") {
        cell.className = "miss";
      } else {
        cell.className = "";
      }
    }
  }
};

shipPlacementForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(shipPlacementForm);
  for (let i = 1; i <= 5; i++) {
    const startRow = parseInt(formData.get(`ship${i}-start-row`), 10);
    const endRow = parseInt(formData.get(`ship${i}-end-row`), 10);
    const startCol = parseInt(formData.get(`ship${i}-start-col`), 10);
    const endCol = parseInt(formData.get(`ship${i}-end-col`), 10);

    const shipLength =
      Math.abs(startRow - endRow) + 1 || Math.abs(startCol - endCol) + 1;
    const ship = createShip(shipLength);

    if (!userGameBoard.placeShip(startRow, endRow, startCol, endCol, ship)) {
      alert("Invalid ship placement");
      return;
    }
    document.querySelector(".setup-container").style.display = "none";
  }

  // Ships placed, update the boards to reflect initial state
  updateBoard(userBoard, userGameBoard.board);
  updateBoard(computerBoard, computerGameBoard.board);
});

newGameButton.addEventListener("click", initializeGame);

initializeGame();
