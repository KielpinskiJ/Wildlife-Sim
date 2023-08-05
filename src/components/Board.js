import React from 'react';
import { BoardPropTypes } from '../prop-types/BoardPropTypes';
import Herbivore from './Herbivore';
import Carnivore from './Carnivore';

function Board({
  size,
  animals,
  onNextTurn,
  currentTurn,
  herbivoreCount,
  carnivoreCount,
  eatenHerbivoresCount,
  gameOver,
}) {
  const rows = Array.from({ length: size }, (_, i) => i);
  const columns = Array.from({ length: size }, (_, i) => i);

  return (
    <div>
      <h2>Tura: {currentTurn}</h2>
      <div>
        {rows.map((row) => (
          <div key={row} style={{ display: 'flex' }}>
            {columns.map((column) => (
              <div
                key={column}
                style={{
                  width: 20,
                  height: 20,
                  border: '1px solid black',
                }}
              >
                {animals.map((animal) =>
                  animal.x === column && animal.y === row ? (
                    animal.type === 'herbivore' ? (
                      <Herbivore key={animal.id} id={animal.id} />
                    ) : (
                      <Carnivore key={animal.id} id={animal.id} />
                    )
                  ) : null,
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Liczba roślinożerców: {herbivoreCount}</p>
        <p>Liczba mięsożerców: {carnivoreCount}</p>
        <p>Liczba zjedzonych roślinożerców: {eatenHerbivoresCount}</p>
      </div>
      {!gameOver && <button onClick={onNextTurn}>Następna tura</button>}
    </div>
  );
}

Board.propTypes = BoardPropTypes;

export default Board;
