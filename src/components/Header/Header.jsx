import React from "react";
import { Link } from "react-router-dom";
import "./Header.sass";

function Header() {
  return (
    <div className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">themoviedb</Link>
        <Link to='/favorites' className="header__link">Favorites</Link>
      </div>
    </div>
  );
}

export default Header;
