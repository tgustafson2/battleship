const { createShip } = require("../src/ship");

describe("tests gameboard behavior", () => {
  let ship = createShip(2);
  let gameboard = createGameboard();
  test("should receive attack and miss", () => {
    expect(gameboard.receiveAttack(0, 0)).toBeFalsy();
  });
  test("should receive attack and hit", () => {
    gameboard.placeShip(0, 0, 0, 2);
    expect(gameboard.receiveAttack(0, 0)).toBeTruthy();
  });
  test("should keep track of shots", () => {
    expect(gameboard.board).toEqual([
      [ship, ship, "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });
  test("should report not all ships sunk", () => {
    expect(gameboard.allShipsSunk()).toBeFalsy();
  });
  test("should report all ships sunk", () => {
    gameboard.receiveAttack(0, 1);
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });
});
