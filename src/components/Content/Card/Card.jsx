import React from "react";
import { Link } from "react-router-dom";
import "./Card.sass";

function Card({ movieData }) {
  return (
    <div className="card">
      <div className="card__poster">
        <img
          className="card__poster-img"
          src={
            movieData.poster_path !== null
              ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
              : "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
          }
          alt="poster"
        />
      </div>
      <div className="card__inner">
        <span className="card__title">{movieData.title}</span>
        <Link to={`/fullcard/${movieData.id}`} className="btn btn-primary">
          Узнать больше
        </Link>
      </div>
    </div>
  );
}

export default Card;