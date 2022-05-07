import PropTypes from 'prop-types';
import React from 'react';
import './Preloader.sass';

function Preloader({ title = 'Loading Data' }) {
  return (
    <div className="preloader-wrap">
      Загружается
      <h2>{title}</h2>
    </div>
  );
}

Preloader.propTypes = {
  title: PropTypes.string.isRequired
};

export default Preloader;
