import PropTypes from 'prop-types';

export const GameSetupPropTypes = {
  onBoardSizeChange: PropTypes.func.isRequired,
  onPopulationSizeChange: PropTypes.func.isRequired,
  onMaxTurnsWithoutEatingChange: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
  defaultBoardSize: PropTypes.number.isRequired,
  defaultPopulationSize: PropTypes.number.isRequired,
  defaultMaxTurnsWithoutEating: PropTypes.number.isRequired,
};