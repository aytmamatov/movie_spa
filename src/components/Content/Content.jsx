import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Preloader from "../UI/Preloader/Preloader";
import Card from "./Card/Card";
import "./Content.sass";

function Content() {
  const state = useSelector((state) => state);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    setMovie(state.movie);
    setMovieList(state.movie.results);
  }, [state]);

  let loadMore = () => {
    let currentPage = movie.page + 1;
    fetch(
      `https://api.themoviedb.org/4/search/movie?api_key=c81dbb52630c695069ceb9c73e137dc2&query=${state.movie.searchInfo}&page=${currentPage}`
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
            Load more
          </button>
        </>
      ) : (
        <span>No movies</span>
      )}
    </div>
  );
}

export default Content;
