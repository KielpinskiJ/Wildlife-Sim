import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import Board from './components/Board';

function App() {
  const [boardSize, setBoardSize] = useState(20);
  const [populationSize, setPopulationSize] = useState(50);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  return (
    <div>
      <h1>Wildlife Simulator</h1>
      {!gameStarted && (
        <GameSetup 
          onBoardSizeChange={setBoardSize} 
          onPopulationSizeChange={setPopulationSize} 
          onGameStart={handleGameStart} 
          defaultBoardSize={boardSize}
          defaultPopulationSize={populationSize}
        />
      )}
      {gameStarted && <Board size={boardSize} />}
    </div>
  );
}

export default App;