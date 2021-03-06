import PropTypes from 'prop-types';
import React from 'react';
import 'src/components/UI/Preloader/Preloader.sass';

function Preloader({ title }) {
  return (
    <div className="preloader-wrap">
      <h2>{title}</h2>
    </div>
  );
}

Preloader.propTypes = {
  title: PropTypes.string
};

Preloader.defaultProps = {
  title: 'Loading...'
};

export default Preloader;
