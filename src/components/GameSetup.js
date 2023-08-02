import React, { useState } from 'react';

function GameSetup() {
  const [boardSize, setBoardSize] = useState(20);
  const [populationSize, setPopulationSize] = useState(50);

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO Create the game start logic.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Wielkość planszy:
        <input
          type="number"
          value={boardSize}
          onChange={(event) => setBoardSize(event.target.value)}
        />
      </label>
      <br />
      <label>
        Wielkość populacji:
        <input
          type="number"
          value={populationSize}
          onChange={(event) => setPopulationSize(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Rozpocznij grę</button>
    </form>
  );
}

export default GameSetup;
