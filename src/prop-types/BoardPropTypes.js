import PropTypes from 'prop-types';

export const BoardPropTypes = {
  size: PropTypes.number.isRequired,
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['herbivore', 'carnivore']).isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onNextTurn: PropTypes.func.isRequired,
  currentTurn: PropTypes.number.isRequired,
  herbivoreCount: PropTypes.number.isRequired,
  carnivoreCount: PropTypes.number.isRequired,
  eatenHerbivoresCount: PropTypes.number.isRequired,
  gameOver: PropTypes.bool.isRequired,
};
