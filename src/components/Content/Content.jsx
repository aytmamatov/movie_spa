import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Preloader from "../UI/Preloader/Preloader";
import Card from "./Card/Card";
import "./Content.sass";

function Content({ movieList, setMovieList }) {
  const state = useSelector((state) => state);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie(state);
    setMovieList(state.results);
  }, [state]);
  let loadMore = () => {
    let currentPage = movie.page + 1;
    fetch(
      `https://api.themoviedb.org/4/search/movie?api_key=c81dbb52630c695069ceb9c73e137dc2&query=${state.searchInfo}&page=${currentPage}`
    )
      .then((r) => r.json())
      .then((r) => {
        r.results.map((item) => movieList.push(item));
        setMovie(r);
      });
  };
  return (
    <div className="container films">
      {state.isLoading ? (
        <Preloader />
      ) : movieList !== undefined ? (
        <>
          <div className="films__cards">
            {movieList.map((movie) => {
              return <Card key={movie.id} movieData={movie} />;
            })}
          </div>
          <button className="btn btn-primary" onClick={loadMore}>
            Загрузить еще
          </button>
        </>
      ) : (
        <span>Фильмы отсутствуют</span>
      )}
    </div>
  );
}

export default Content;
