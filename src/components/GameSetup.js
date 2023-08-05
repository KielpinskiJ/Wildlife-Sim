import React from 'react';
import { GameSetupPropTypes } from '../prop-types/GameSetupPropTypes';

function GameSetup({
  onBoardSizeChange,
  onPopulationSizeChange,
  onMaxTurnsWithoutEatingChange,
  onGameStart,
  defaultBoardSize,
  defaultPopulationSize,
  defaultMaxTurnsWithoutEating,
}) {
  const handleBoardSizeChange = (event) => {
    onBoardSizeChange(event.target.value);
  };

  const handlePopulationSizeChange = (event) => {
    onPopulationSizeChange(event.target.value);
  };

  const handleMaxTurnsWithoutEatingChange = (event) => {
    onMaxTurnsWithoutEatingChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGameStart();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Wielkość planszy:
        <input
          type="number"
          onChange={handleBoardSizeChange}
          defaultValue={defaultBoardSize}
        />
      </label>
      <br />
      <label>
        Wielkość populacji:
        <input
          type="number"
          onChange={handlePopulationSizeChange}
          defaultValue={defaultPopulationSize}
        />
      </label>
      <br />
      <label>
        Ilość tur, które mięsożerca wytrzyma bez jedzenia:
        <input
          type="number"
          onChange={handleMaxTurnsWithoutEatingChange}
          defaultValue={defaultMaxTurnsWithoutEating}
        />
      </label>
      <br />
      <button type="submit">Rozpocznij grę</button>
    </form>
  );
}

GameSetup.propTypes = GameSetupPropTypes;

export default GameSetup;
