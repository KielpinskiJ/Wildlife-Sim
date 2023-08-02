import React from 'react';

function Board({ size }) {
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
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
