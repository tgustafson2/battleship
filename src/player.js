function createPlayer(gameboard) {
  function hasLost() {
    if (
      gameboard.allShipsSunk() &&
      gameboard.board !=
        [
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", ""],
        ]
    ) {
      return true;
    }
    return false;
  }
  return { gameboard, hasLost };
}

function createComputerPlayer(gameboard, ships) {
  let player = createPlayer(gameboard);
  let moves = new Set();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      moves.add({ i, j });
    }
  }
  ships.sort((a, b) => b.length - a.length);
  let potentialPlacements = [
    [
      [1, 1, 2, 6],
      [3, 3, 1, 4],
      [5, 5, 2, 4],
      [7, 7, 5, 7],
      [9, 9, 3, 4],
    ],
    [
      [0, 4, 6, 6],
      [2, 2, 1, 4],
      [5, 5, 2, 4],
      [7, 9, 3, 3],
      [8, 8, 5, 6],
    ],
    [
      [0, 0, 3, 7],
      [2, 5, 1, 1],
      [3, 3, 5, 7],
      [7, 7, 0, 2],
      [9, 9, 3, 4],
    ],
    [
      [0, 0, 1, 5],
      [3, 3, 3, 6],
      [5, 5, 0, 2],
      [7, 7, 3, 5],
      [8, 8, 6, 7],
    ],
    [
      [0, 0, 3, 7],
      [2, 2, 0, 3],
      [4, 4, 1, 3],
      [6, 9, 2, 2],
      [7, 7, 7, 8],
    ],
  ];
  let placementChoice = Math.floor(Math.random() * potentialPlacements.length);
  for (let i = 0; i < potentialPlacements[placementChoice].length; i++) {
    player.gameboard.placeShip(
      potentialPlacements[placementChoice][i][0],
      potentialPlacements[placementChoice][i][1],
      potentialPlacements[placementChoice][i][2],
      potentialPlacements[placementChoice][i][3],
      ships[i],
    );
  }
  function attack() {
    let movArr = Array.from(moves);
    let move = movArr[Math.floor(Math.random() * movArr.length)];
    moves.delete(move);
    return move;
  }
  return { ...player, attack };
}

module.exports = {
  createPlayer,
  createComputerPlayer,
};
