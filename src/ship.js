function createShip(shipLength) {
  let length = shipLength;
  let hits = 0;
  let hit = () => {
    if (hits < length) hits++;
    return hits;
  };
  let isSunk = () => {
    return hits === length;
  };
  return { hit, isSunk, length };
}

module.exports = {
  createShip,
};
