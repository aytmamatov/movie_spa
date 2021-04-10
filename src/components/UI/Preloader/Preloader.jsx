import React from "react";
import Loader from "react-loader-spinner";

function Preloader({ type = "Bars", color = "#00BFFF", width = "75px" }) {
  return (
    <div>
      <Loader type={type} color={color} width={width} />
    </div>
  );
}

export default Preloader;
