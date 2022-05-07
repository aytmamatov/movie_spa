import PropTypes from 'prop-types';
import React from 'react';

function Chip({ label, handleAdd, active }) {
  return (
    <div
      role="button"
      tabIndex="0"
      className={`genres__item ${active ? 'genres__item-active' : ''}`}
      onClick={handleAdd}>
      {label}
    </div>
  );
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default Chip;
