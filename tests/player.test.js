const { createGameboard } = require("../src/gameboard");

describe("tests player behavior", () => {
  describe("tests base player behavior", () => {
    let gameboard = createGameboard();
    let player = createPlayer(gameboard);
    test("should contain board", () => {
      expect(player.gameboard.board).toEqual([
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
      ]);
    });
    test("should output if player has not lost yet", () => {
      player.gameboard.placeShipe(0, 0, 0, 1, createShip(2));
      expect(player.hasLost()).toBeFalsy();
    });
    test("should output if player has lost", () => {
      player.gameboard.receiveAttack(0, 0);
      player.gameboard.receiveAttack(0, 1);
      expect(player.hasLost()).toBeTruthy();
    });
  });
  describe("tests computer player behavior", () => {
    let gameboard = createGameboard();
    let computer = new createComputerPlayer(gameboard);
    test("should auto place ships", () => {
        expect(computer.gameboard.board).not.toEqual([
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
          ]);
    });
    test("should auto attack", () => {
      expect(computer.attack()).toBeTruthy();
    });
  });
});
