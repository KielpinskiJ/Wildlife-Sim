import React from 'react';
import { HerbivorePropTypes } from '../prop-types/HerbivorePropTypes';

function Herbivore({id}) {
  return <div style={{ backgroundColor: 'green', width: 20, height: 20 }}> {id} </div>;
}

Herbivore.propTypes = HerbivorePropTypes;

export default Herbivore;