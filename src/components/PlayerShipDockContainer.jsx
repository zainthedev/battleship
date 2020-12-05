import DisplayPlayerShipDock from './DisplayPlayerShipDock';

const PlayerShipDockContainer = (props) => {
  return (
    <DisplayPlayerShipDock
      player={props.player}
      setX={props.setX}
      setY={props.setY}
      chooseShip={props.chooseShip}
      rotateShip={props.rotateShip}
      mouseMove={props.mouseMove}
    />
  );
};

export default PlayerShipDockContainer;