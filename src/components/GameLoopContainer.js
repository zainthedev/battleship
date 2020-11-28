import playerFactory from './playerFactory';
import DisplayGame from './DisplayGame';
import { useEffect, useState } from 'react';

const GameLoopContainer = (props) => {
  const [player, setPlayer] = useState(playerFactory('Player'));
  const [computer, setComputer] = useState(playerFactory('PC'));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [hitPlayerBlocks, setHitPlayerBlocks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [preparing, setPreparing] = useState(true);
  const [placingShip, setPlacingShip] = useState(false);
  const [chosenShip, setChosenShip] = useState();

  function placeTestShip() {
    setComputer((prevState) => {
      prevState.playerBoard.placeShip(3, 5, 3, 'horizontal');
      return { ...prevState };
    });
  }

  function playerAttackHandler(e) {
    if (playerTurn === true) {
      setComputer((prevState) => {
        prevState.playerBoard.receiveAttack(
          e.target.id,
          parseInt(e.target.getAttribute('data-x')),
          parseInt(e.target.getAttribute('data-y'))
        );
        return { ...prevState };
      });
      setPlayerTurn(false);
    }
  }

  function computerAttack() {
    let position = 0;
    function getPosition() {
      return (position = Math.floor(Math.random() * 100));
    }
    setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);

    while (hitPlayerBlocks.includes(position) && hitPlayerBlocks.length < 100) {
      setHitPlayerBlocks([...hitPlayerBlocks, getPosition()]);
    }

    setPlayer((prevState) => {
      prevState.playerBoard.receiveAttack(position);
      return { ...prevState };
    });
    setPlayerTurn(true);
  }

  //Used to set data values in the JSX of <DisplayGame>
  function setX(index) {
    let x = index;
    if (index > 9) {
      return (x = index % 10);
    } else {
      return x;
    }
  }

  //Same as above
  //Thanks to 'cyborg/human#5133' on TOP Discord for the way cleaner version of this function!
  function setY(index) {
    let y = 9;
    if (index > 89) {
      return (y = 0);
    } else {
      const val = Math.floor(index / 10);
      return (y = 9 - val);
    }
  }

  function chooseShip(e) {
    const chosenShip = {};
    chosenShip.shipLength = parseInt(e.target.getAttribute('data-length'));
    chosenShip.orientation = e.target.getAttribute('data-orientation');
    setPlacingShip(true);
    setChosenShip(chosenShip);
  }

  function rotateShip(e) {
    const targetShipNumber = e.target.parentNode.getAttribute(
      'data-shipnumber'
    );
    console.log('input ^^^^ orientation');
    setPlayer((prevState) => {
      prevState.rotateShip(targetShipNumber);
      return { ...prevState };
    });

    // orientation === 'horizontal'
    //   ? setPlayer((prevState) => {
    //       console.log(prevState.playerShips[targetShipNumber]);
    //       prevState.rotateHorizontalShip(targetShipNumber);
    //       return { ...prevState };
    //     })
    //   : setPlayer((prevState) => {
    //       console.log(prevState.playerShips[targetShipNumber]);
    //       prevState.rotateVerticalShip(targetShipNumber);
    //       return { ...prevState };
    //     });
  }

  function placeChosenShip(e) {
    console.log(chosenShip);
    console.log(chosenShip.shipLength);
    const targetBlockX = parseInt(e.target.getAttribute('data-x'));
    const targetBlockY = parseInt(e.target.getAttribute('data-y'));
    setPlayer((prevState) => {
      prevState.playerBoard.placeShip(
        targetBlockX,
        targetBlockY,
        chosenShip.shipLength,
        chosenShip.orientation
      );
      return { ...prevState };
    });
  }

  //The computer takes a turn whenever playerTurn changes (ie. whenever attacked)
  useEffect(() => {
    if (playerTurn === false) {
      //     //Timeout used to give the computer some fake thinking time
      setTimeout(function () {
        computerAttack();
      }, 0);
    }
    //   // eslint-disable-next-line
  }, [playerTurn]);

  //Checks for game over
  useEffect(() => {
    if (!preparing) {
      const computerShips = [];
      const playerShips = [];
      computer.playerBoard.gameBoardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !computerShips.includes(arrayItem.ship)) {
          computerShips.push(arrayItem.ship);
        }
      });

      player.playerBoard.gameBoardArray.forEach((arrayItem) => {
        if (arrayItem.ship && !playerShips.includes(arrayItem.ship)) {
          playerShips.push(arrayItem.ship);
        }
      });

      if (computerShips.every((ship) => ship.isSunk())) {
        console.log('all sunk! winner!');
        setGameOver(true);
      }

      if (playerShips.every((ship) => ship.isSunk())) {
        console.log('all sunk! loser!');
        setGameOver(true);
      }
    }
    // eslint-disable-next-line
  }, [computer]);

  return (
    <DisplayGame
      player={player}
      computer={computer}
      placeTestShip={placeTestShip}
      playerAttackHandler={playerAttackHandler}
      setX={setX}
      setY={setY}
      computerAttack={computerAttack}
      chooseShip={chooseShip}
      placeChosenShip={placeChosenShip}
      rotateShip={rotateShip}
    />
  );
};

export default GameLoopContainer;
