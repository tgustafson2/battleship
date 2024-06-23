function createGameboard() {
  let board = [];
  let ships = [];

  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push("");
    }
    board.push(row);
  }

  function placeShip(startRow, endRow, startCol, endCol, ship) {
    if (
      Math.abs(startRow - endRow) >= ship.length ||
      Math.abs(startCol - endCol) >= ship.length ||
      (startRow == endRow && startCol == endCol) ||
      (startRow != endRow && startCol != endCol)
    ) {
      return false;
    }
    if (startRow != endRow) {
      for (let i = startRow; i <= endRow; i++) {
        if(board[i][startCol]!==""){
          return false;
        }
      }
      for (; startRow <= endRow; startRow++) {
        board[startRow][startCol] = ship;
      }
    } else {
      for (let i = startCol; i <= endCol; i++) {
        if(board[startRow][i]!==""){
          return false;
        }
      }
      for (; startCol <= endCol; startCol++) {
        board[startRow][startCol] = ship;
      }
    }
    ships.push(ship);
    return true;
  }

  function allShipsSunk() {
    if (ships.length === 0) return true;
    for (let ship of ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  function receiveAttack(row, col) {
    if (typeof board[row][col] !== "object") {
      if (board[row][col] === "") {
        board[row][col] = "miss";
      }
      return false;
    }
    board[row][col].hit();
    board[row][col] = "hit";
    return true;
  }
  return { receiveAttack, allShipsSunk, placeShip, board };
}

module.exports = {
  createGameboard,
};
