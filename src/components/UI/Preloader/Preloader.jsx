import React from "react";
import Loader from "react-loader-spinner";
import './Preloader.sass'

function Preloader({
  title = "Загрузка данных",
  type = "Bars",
  color = "#00BFFF",
  width = "60px",
}) {
  return (
    <div className="preloader-wrap">
      <h2>{title}</h2>
      <Loader type={type} color={color} width={width} />
    </div>
  );
}

export default Preloader;
