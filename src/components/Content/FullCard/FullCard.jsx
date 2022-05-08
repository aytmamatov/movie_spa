import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getDataFromServer } from 'src/adapters/xhr';
import 'src/components/Content/FullCard/FullCard.sass';
import Preloader from 'src/components/UI/Preloader/Preloader';

function FullCard() {
  const state = useSelector((currentState) => currentState.favorites);
  const dispatch = useDispatch();
  const [movieState, setMovieState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const arrMoviesId = state.favoritesMovies.map((item) => item.id);
  const includesArrFavorites = arrMoviesId.includes(movieState.id);

  const { id } = useParams();
  let releaseDateYear;
  let releaseDate;
  let genres;
  let hourRuntime;
  let minuteRuntime;
  if (Object.keys(movieState).length > 0) {
    const date = movieState.release_date;
    releaseDateYear = date.slice(0, 4);
    const genresArr = movieState.genres.map((item) => item.name);
    genres = genresArr.join(', ');
    // eslint-disable-next-line radix
    const currentRuntime = parseInt(movieState.runtime);
    hourRuntime = Math.floor(currentRuntime / 60);
    minuteRuntime = currentRuntime - hourRuntime * 60;
  }

  async function getCurrentMovie() {
    const currentMovieUrl = `movie/${id}`;
    setIsLoading(true);
    try {
      const { data: movie } = await getDataFromServer(currentMovieUrl);
      setMovieState(movie);
    } finally {
      setIsLoading(false);
    }
  }

  const addToFavorites = (e) => {
    e.preventDefault();
    const sendRequest = (data) => (dispatchFavorites) => {
      dispatchFavorites({ type: 'ADD-TO-FAVORITES', favorites: data });
    };
    if (state.favoritesMovies.length) {
      if (!includesArrFavorites) {
        dispatch(sendRequest(movieState));
      }
    } else {
      dispatch(sendRequest(movieState));
    }
  };

  useEffect(() => {
    getCurrentMovie();
  }, [id]);

  return (
    <div className="fullCard">
      {isLoading ? (
        <Preloader />
      ) : (
        <div
          className={`fullCard__inner ${
            Object.keys(movieState).length > 0
              ? movieState.backdrop_path !== undefined
                ? 'fullCard-decoration'
                : ''
              : ''
          }`}
          style={
            Object.keys(movieState).length > 0
              ? {
                  background: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movieState.backdrop_path}) no-repeat 0 0 / cover`
                }
              : null
          }>
          <div className="container">
            <div className="fullCard__movie">
              <div className="fullCard__poster">
                <img
                  src={
                    movieState.poster_path !== null
                      ? `https://image.tmdb.org/t/p/w500${movieState.poster_path}`
                      : 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                  }
                  alt=""
                  className="fullCard__img"
                />
              </div>
              <div className="fullCard__inner">
                <h2 className="fullCard__heading">
                  {movieState.title}
                  <span className="fullCard__release-date"> ({releaseDateYear})</span>
                </h2>
                <div className="fullCard__facts">
                  <span className="fullCard__release">{releaseDate}</span>
                  <span className="fullCard__genres">{genres}</span>
                  <span className="fullCard__runtime">
                    {hourRuntime}h {minuteRuntime}m
                  </span>
                </div>
                <span className="fullCard__tagline">{movieState.tagline}</span>

                <div className="fullCard__group">
                  <h4 className="fullCard__overview">Overview</h4>
                  <span className="fullCard__text">{movieState.overview}</span>
                </div>
                <div className="fullCard__actions">
                  <button
                    onClick={addToFavorites}
                    className={`btn fullCard__add_to_favorites ${
                      !includesArrFavorites ? '' : 'fullCard__disabled'
                    }`}>
                    Add to favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FullCard;
