import React from 'react';
import { CarnivorePropTypes } from '../prop-types/CarnivorePropTypes';

function Carnivore({ id }) {
  return (
    <div style={{ backgroundColor: 'red', width: 20, height: 20 }}> {id} </div>
  );
}

Carnivore.propTypes = CarnivorePropTypes;

export default Carnivore;
