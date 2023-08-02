import React from 'react';
import Herbivore from './Herbivore';
import Carnivore from './Carnivore';

function Board({ size, animals }) {
  const rows = Array.from({ length: size }, (_, i) => i);
  const columns = Array.from({ length: size }, (_, i) => i);

  return (
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
                    <Herbivore id={animal.id}/>
                  ) : (
                    <Carnivore id={animal.id}/>
                  )
                ) : null
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
