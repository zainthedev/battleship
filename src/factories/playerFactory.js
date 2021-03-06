import createShipPositionsArray from '../helper_functions/createShipPositionsArray';

const playerFactory = (name, playerShipsArray) => {
  let playerShips = [];

  const shipFactory = (length) => {
    return {
      x: undefined,
      y: undefined,
      shipLength: length,
      orientation: 'horizontal',
      placed: false,
      positionsArray: [],
      highlighted: false,
    };
  };

  if (playerShipsArray) {
    playerShips = playerShipsArray;
  } else {
    //Create the initial ships that the player can place
    if (name === 'Player') {
      const newShip = shipFactory(5);
      const newShip2 = shipFactory(4);
      const newShip3 = shipFactory(3);
      const newShip4 = shipFactory(3);
      const newShip5 = shipFactory(2);

      playerShips.push(newShip, newShip2, newShip3, newShip4, newShip5);
      playerShips.forEach((ship) => {
        createShipPositionsArray(
          ship.x,
          ship.y,
          ship.orientation,
          ship.shipLength,
          ship.positions,
          ship.positionsArray
        );
      });
    }
  }

  function getInitialState() {
    return [...playerShips];
  }

  function highlightShip(shipIndex) {
    const newShips = [...playerShips];
    newShips.forEach((ship) => {
      ship.highlighted = false;
    });
    const newShip = {
      x: playerShips[shipIndex].x,
      y: playerShips[shipIndex].y,
      shipLength: playerShips[shipIndex].shipLength,
      orientation: playerShips[shipIndex].orientation,
      placed: false,
      positionsArray: playerShips[shipIndex].positionsArray,
      highlighted: true,
    };
    newShips.splice(shipIndex, 1, newShip);
    return (playerShips = newShips);
  }

  function rotateShip(shipIndex) {
    const orientation =
      playerShips[shipIndex].orientation === 'horizontal'
        ? 'vertical'
        : 'horizontal';
    const newShip = {
      x: playerShips[shipIndex].x,
      y: playerShips[shipIndex].y,
      shipLength: playerShips[shipIndex].shipLength,
      orientation: orientation,
      placed: false,
      positionsArray: playerShips[shipIndex].positionsArray,
      highlighted: playerShips[shipIndex].highlighted,
    };
    return playerShips.splice(shipIndex, 1, newShip);
  }

  function switchShipPlacement(shipIndex) {
    const placed = playerShips[shipIndex].placed === true ? false : true;
    const newShip = {
      x: playerShips[shipIndex].x,
      y: playerShips[shipIndex].y,
      shipLength: playerShips[shipIndex].shipLength,
      orientation: playerShips[shipIndex].orientation,
      placed: placed,
      positionsArray: playerShips[shipIndex].positionsArray,
      highlighted: false,
    };
    return playerShips.splice(shipIndex, 1, newShip);
  }

  return {
    getInitialState,
    highlightShip,
    rotateShip,
    switchShipPlacement,
  };
};

export default playerFactory;
