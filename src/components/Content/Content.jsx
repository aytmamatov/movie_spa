import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from 'src/components/Content/Card/Card';
import 'src/components/Content/Content.sass';
import Preloader from 'src/components/UI/Preloader/Preloader';
import { API_KEY } from 'src/config';

function Content() {
  const state = useSelector((currentState) => currentState);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    setMovie(state.movie);
    setMovieList(state.movie.results);
  }, [state]);

  const loadMore = () => {
    const currentPage = movie.page + 1;
    if (state.movie.genresLoadMore) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${state.movie.genresIds}`
      )
        .then((r) => r.json())
        .then((r) => {
          r.results.map((item) => movieList.push(item));
          setMovie(r);
        });
    } else {
      fetch(
        `https://api.themoviedb.org/4/search/movie?api_key=${API_KEY}&query=${state.movie.searchInfo}&page=${currentPage}`
      )
        .then((r) => r.json())
        .then((r) => {
          r.results.map((item) => movieList.push(item));
          setMovie(r);
        });
    }
  };
  return (
    <div className="container films">
      {state.movie.isLoading ? (
        <Preloader />
      ) : movieList !== undefined ? (
        <>
          <div className="films__cards">
            {movieList.map((currentMovie) => {
              return <Card key={currentMovie.id} movieData={currentMovie} />;
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
