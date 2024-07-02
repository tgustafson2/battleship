import "./style.css";
import { createComputerPlayer, createPlayer } from "./player";
import { createGameboard } from "./gameboard";
import { createShip } from "./ship";

const userBoard = document.querySelector("#user-board");
const computerBoard = document.querySelector("#computer-board");
const newGameButton = document.querySelector("#new-game-button");

let userGameBoard, computerGameBoard, userPlayer, computerPlayer;
let selectedShip = null;
let isHorizontal = true;

const initializeGame = () => {
  userGameBoard = createGameboard();
  computerGameBoard = createGameboard();
  userPlayer = createPlayer(userGameBoard);
  computerPlayer = createComputerPlayer(computerGameBoard, createComputerShips());

  generateBoard(userBoard, "user-board");
  generateBoard(computerBoard, "computer-board", handleCellClick);
  document.querySelector(".setup-container").style.display = "block";
  document.querySelector("#game-result").style.display = "none";
  document.querySelectorAll(".ship").forEach(ship =>{
    ship.style.display = "flex";
  })
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
      cell.addEventListener("dragover", (event) => event.preventDefault());
      cell.addEventListener("drop", (event) => handleDrop(event, i, j));
      boardElement.appendChild(cell);
    }
  }
};

const handleDrop = (event, row, col) => {
  event.preventDefault();
  if (!selectedShip) return;

  const length = parseInt(selectedShip.dataset.length, 10);
  const endRow = isHorizontal ? row : row + length - 1;
  const endCol = isHorizontal ? col + length - 1 : col;

  const ship = createShip(length);
  if (userGameBoard.placeShip(row, endRow, col, endCol, ship)) {
    updateBoard(userBoard, userGameBoard.board);
    selectedShip.style.display = "none";
    selectedShip = null;
  } else {
    alert("Invalid ship placement");
  }
};

const handleCellClick = (row, col) => {
  if (userPlayer.hasLost() || computerPlayer.hasLost()) {
    return;
  }
  let ships = document.querySelectorAll(".ship");
  console.log(ships);
  for(let i=0; i<5; i++){
    if(ships[i].style.display !== "none"){
        return;
    }
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

document.querySelectorAll(".ship").forEach((ship) => {
  ship.style.setProperty('--length', ship.dataset.length);
  ship.classList.add("horizontal");

  ship.addEventListener("dragstart", (event) => {
    selectedShip = event.target;
  });

  ship.addEventListener("click", (event) => {
    if (ship.classList.contains("horizontal")) {
      ship.classList.remove("horizontal");
      ship.classList.add("vertical");
      isHorizontal = false;
    } else {
      ship.classList.remove("vertical");
      ship.classList.add("horizontal");
      isHorizontal = true;
    }
  });
});

newGameButton.addEventListener("click", initializeGame);

initializeGame();
