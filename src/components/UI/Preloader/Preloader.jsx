import React from 'react';
import './Preloader.sass';

function Preloader({ title = 'Loading Data', type = 'Bars', color = '#00BFFF', width = '60px' }) {
  return (
    <div className="preloader-wrap">
      Загружается
      <h2>{title}</h2>
    </div>
  );
}

export default Preloader;
