import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import Board from './components/Board';
import { Herbivore, Carnivore } from './models/Animal';

function App() {
  const [boardSize, setBoardSize] = useState(20);
  const [populationSize, setPopulationSize] = useState(50);
  const [gameStarted, setGameStarted] = useState(false);
  const [animals, setAnimals] = useState([]);

  const handleGameStart = () => {
    // Create initial animal objects with random positions
    const newAnimals = [];
    for (let i = 0; i < populationSize; i++) {
      const x = Math.floor(Math.random() * boardSize);
      const y = Math.floor(Math.random() * boardSize);
      const animal =
        Math.random() < 0.5 ? new Herbivore(x, y) : new Carnivore(x, y);
      newAnimals.push(animal);
    }
    setAnimals(newAnimals);
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
      {gameStarted && <Board size={boardSize} animals={animals} />}
    </div>
  );
}

export default App;