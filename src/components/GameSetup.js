import React from 'react';

function GameSetup({ 
  onBoardSizeChange, 
  onPopulationSizeChange, 
  onGameStart,
  defaultBoardSize,
  defaultPopulationSize,
}) {

  const handleBoardSizeChange = (event) => {
    onBoardSizeChange(event.target.value);
  };

  const handlePopulationSizeChange = (event) => {
    onPopulationSizeChange(event.target.value);
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
      <button type="submit">Rozpocznij grę</button>
    </form>
  );
}

export default GameSetup;