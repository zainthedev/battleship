const DisplayPlayerBoard = (props) => {
  return (
    <div id='game-wrapper'>
      <div id='game-wrapper__player-board-wrapper'>
        {props.player.playerBoard.gameBoardArray.map((block, index) => {
          if (block.ship && block.sunk) {
            return (
              <div
                key={index}
                className='enemy-ship-block'
                id={index}
                data-x={props.setX(index)}
                data-y={props.setY(index)}
              >
                Sunk Ship
              </div>
            );
          } else if (block.hit) {
            return (
              <div
                key={index}
                className='enemy-ship-block'
                id={index}
                data-x={props.setX(index)}
                data-y={props.setY(index)}
              >
                Hit
              </div>
            );
          } else if (block.ship && !block.hit) {
            return (
              <div
                key={index}
                className='enemy-ship-block'
                id={index}
                data-x={props.setX(index)}
                data-y={props.setY(index)}
              >
                Ship
              </div>
            );
          } else if (block.miss) {
            return (
              <div key={index} className='miss-block'>
                Miss
              </div>
            );
          }
          return (
            <>
              {!block.ship && (
                <div
                  key={index}
                  className='empty-block'
                  id={index}
                  data-x={props.setX(index)}
                  data-y={props.setY(index)}
                  onClick={props.placeChosenShip}
                ></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayPlayerBoard;
