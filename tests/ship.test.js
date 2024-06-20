describe("tests ship behavior", () => {
  let ship = new Ship(4);
  test("should hit the ship", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("should show the ship is not sunk", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test("should show the ship is sunk", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
