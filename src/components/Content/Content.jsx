import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDataFromServer } from 'src/adapters/xhr';
import Card from 'src/components/Content/Card/Card';
import 'src/components/Content/Content.sass';
import Preloader from 'src/components/UI/Preloader/Preloader';

const returnSearchUrl = (search, page) => `search/movie?query=${search}&page=${page}`;
const returnPopularMoviesUrl = (page, genresIds) =>
  `discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresIds}`;

function Content() {
  const state = useSelector((currentState) => currentState);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie(state.movie);
    setMovieList(state.movie.results);
  }, [state]);

  async function loadMore() {
    const currentPage = movie.page + 1;
    const loadMoreUrl = state.movie.genresLoadMore
      ? returnPopularMoviesUrl(currentPage, state.movie.genresLoadMore)
      : returnSearchUrl(state.movie.searchInfo, currentPage);

    const { data: movies } = await getDataFromServer(loadMoreUrl);

    setMovieList(movies.results);
    setMovie(movies);
  }

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
