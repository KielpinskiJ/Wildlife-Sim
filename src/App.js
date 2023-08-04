import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import Board from './components/Board';
import { Herbivore, Carnivore } from './models/Animal';

function App() {
  const [boardSize, setBoardSize] = useState(20);
  const [populationSize, setPopulationSize] = useState(60);
  const [maxTurnsWithoutEating, setMaxTurnsWithoutEating] = useState(8);
  const [gameStarted, setGameStarted] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [turn, setTurn] = useState(0);
  const [herbivoreCount, setHerbivoreCount] = useState(0);
  const [carnivoreCount, setCarnivoreCount] = useState(0);
  const [eatenHerbivoresCount, setEatenHerbivoresCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);



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

    // Update statistics
    setHerbivoreCount(newAnimals.filter((animal) => animal.type === 'herbivore').length);
    setCarnivoreCount(newAnimals.filter((animal) => animal.type === 'carnivore').length);
  };

  const handleEating = (animals) => {
    // Create a new array to store the updated list of animals
    const newAnimals = [...animals];
  
    // Loop through all carnivores
    animals.forEach((carnivore) => {

      if (carnivore.type === 'carnivore') {
        if (carnivore.hasEatenThisTurn) {
          // Skip this animal if it has already eaten in this turn
          return;
        }
        
        // Check if there is a herbivore on the same square
        const herbivore = newAnimals.find(
          (herbivore) =>
            herbivore.type === 'herbivore' &&
            herbivore.x === carnivore.x &&
            herbivore.y === carnivore.y
        );
  
        // If there is a herbivore on the same square, remove it from the array and reset turnsSinceEating
        if (herbivore) {
          const herbivoreIndex = newAnimals.findIndex(animal => animal.id === herbivore.id);
          newAnimals.splice(herbivoreIndex, 1);
          carnivore.turnsSinceEating = 0;
          carnivore.setHasEatenThisTurn();
        } else {
          // If the carnivore didn't eat, increment turnsSinceEating
          carnivore.turnsSinceEating++;
        }
      }
    });
  
    // Update the state with the new list of animals
    setAnimals(newAnimals);

    // Update statistics
    setEatenHerbivoresCount(
      (prevCount) => prevCount + (animals.length - newAnimals.length)
    );

    return newAnimals;
  };
  

  const handleReproduction = (animals) => {
    // Create a new array to store the updated list of animals
    const newAnimals = [...animals];
  
    // Loop through all animals
    animals.forEach((animal1) => {
      if (animal1.reproducedThisTurn) {
        // Skip this animal if it has already reproduced in this turn
        return;
      }
  
      // Check if there is another animal of the same type but different gender on the same square
      const animal2 = newAnimals.find(
        (animal2) =>
          animal2.type === animal1.type &&
          animal2.gender !== animal1.gender &&
          animal2.x === animal1.x &&
          animal2.y === animal1.y &&
          !animal2.reproducedThisTurn
      );
  
      // If there is another animal on the same square, create a new animal on a random empty square
      if (animal2) {
        const emptySquares = [];
        for (let x = 0; x < boardSize; x++) {
          for (let y = 0; y < boardSize; y++) {
            if (!newAnimals.some((animal) => animal.x === x && animal.y === y)) {
              emptySquares.push({ x, y });
            }
          }
        }
        if (emptySquares.length > 0) {
          const randomSquare =
            emptySquares[Math.floor(Math.random() * emptySquares.length)];
          const newAnimal =
            animal1.type === 'herbivore'
              ? new Herbivore(randomSquare.x, randomSquare.y)
              : new Carnivore(randomSquare.x, randomSquare.y);
          newAnimals.push(newAnimal);

          animal1.setReproducedThisTurn();
          animal2.setReproducedThisTurn();
        }
      }
    });
  
    // Update the state with the new list of animals
    setAnimals(newAnimals);

    return newAnimals;
  };
  
  const handleDeath = (animals) => {
    // Create a new array to store the updated list of animals
    const newAnimals = animals.filter(
      (animal) =>
        animal.type !== 'carnivore' || animal.turnsSinceEating < 10
    );
  
    // Update the state with the new list of animals
    setAnimals(newAnimals);

    return newAnimals;
  };

  const handleUpdateStatistics = (newAnimals) => {
    setHerbivoreCount(newAnimals.filter((animal) => animal.type === 'herbivore').length);
    setCarnivoreCount(newAnimals.filter((animal) => animal.type === 'carnivore').length);
  }

  const handleEndGame = (animals, turn) => {
    // Check if all herbivores or all carnivores have died
    const herbivoresAlive = animals.some(animal => animal.type === 'herbivore');
    const carnivoresAlive = animals.some(animal => animal.type === 'carnivore');
  
    // Check if the game has reached the maximum number of turns
    const maxTurns = 80;
    const reachedMaxTurns = turn >= maxTurns-1;
  
    if (!herbivoresAlive) {
      // Display end game message for herbivores extinction
      alert('Koniec gry! Wszyscy roślinożercy zginęli.');
      setGameOver(true);
    } else if (!carnivoresAlive) {
      // Display end game message for carnivores extinction
      alert('Koniec gry! Wszyscy mięsożercy zginęli.');
      setGameOver(true);
    } else if (reachedMaxTurns) {
      // Display end game message for reaching maximum number of turns
      alert(`Koniec gry! Osiągnąłeś maksymalną liczbę tur (${maxTurns}).`);
      setGameOver(true);
    }
  };
  
  

  const handleNextTurn = () => {
    // Update turn counter
    setTurn((prevTurn) => prevTurn + 1);
  
    // Make animals move
    const newAnimals = animals.map((animal) => {
      animal.move(boardSize);
      return animal;
    });

  // Call handleEating after animals have moved
  const animalsAfterEating = handleEating(newAnimals);

  // Call handleReproduction after animals have eaten
  const animalsAfterReproduction = handleReproduction(animalsAfterEating);

  // Call handleDeath after animals have reproduced
  const animalsAfterDeath = handleDeath(animalsAfterReproduction);

  // Reset hasEatenThisTurn and reproducedThisTurn for all animals
  animalsAfterDeath.forEach((animal) => {
    if (animal.type === 'carnivore') {
      animal.resetHasEatenThisTurn();
    }
    animal.resetReproducedThisTurn();
  });
  

  // Update statistics
  handleUpdateStatistics(animalsAfterDeath);

  // Call handleEndGame after all other actions have been performed
  handleEndGame(animalsAfterDeath, turn);

  };

  return (
    <div>
      <h1>Wildlife Simulator</h1>
      {!gameStarted && (
        <GameSetup 
          onBoardSizeChange={setBoardSize} 
          onPopulationSizeChange={setPopulationSize} 
          onMaxTurnsWithoutEatingChange={setMaxTurnsWithoutEating}
          onGameStart={handleGameStart} 
          defaultBoardSize={boardSize}
          defaultPopulationSize={populationSize}
          defaultMaxTurnsWithoutEating={maxTurnsWithoutEating}
        />
      )}
      {gameStarted && 
      <Board 
        size={boardSize} 
        animals={animals} 
        onNextTurn={handleNextTurn} 
        currentTurn={turn}
        herbivoreCount={herbivoreCount}
        carnivoreCount={carnivoreCount}
        eatenHerbivoresCount={eatenHerbivoresCount}
        gameOver={gameOver}
        />}
    </div>
  );
}

export default App;