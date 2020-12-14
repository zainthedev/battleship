function createGameBoardArray() {
  let gameBoardArray = [];
  let loopCounter = 0;
  for (let i = 0; i < 100; i++) {
    let x = i;
    let y = 9;

    function setX() {
      if (i > 9) {
        return (x = i % 10);
      } else {
        return x;
      }
    }

    function setY() {
      if (i % 10 === 0 && i > 9) {
        loopCounter += 1;
      }
      return y - loopCounter;
    }

    let emptyBlock = { empty: true, x: setX(), y: setY() };

    gameBoardArray.push(emptyBlock);
  }
  return gameBoardArray;
}

export default createGameBoardArray;
