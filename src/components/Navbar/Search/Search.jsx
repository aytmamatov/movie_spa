import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API_KEY } from '../../../config';
import Preloader from '../../UI/Preloader/Preloader';
import Chip from './Chip/Chip';
import './Search.sass';

const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

function Search() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userEmpty = {
    search: '',
    films: '',
    currentPage: ''
  };
  const [state, setState] = useState(userEmpty);
  const [genresState, setGenresState] = useState({});
  const [genresIsLoading, setGenresIsLoading] = useState(true);
  const inputHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  function showGenres() {
    fetch(GENRE_URL)
      .then((r) => r.json())
      .then((r) => {
        const transformedGenres = r.genres.map((item) => {
          return {
            ...item,
            active: false
          };
        });
        setGenresState(transformedGenres);
        setGenresIsLoading(false);
      });
  }

  useEffect(() => {
    showGenres();
  }, []);

  const requestGenres = () => {
    dispatch({ type: 'SEARCH-IS-LOADING', isLoading: true });
    const ids = [];
    [...genresState].forEach((g) => {
      if (g.active) {
        ids.push(g.id);
      }
    });
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${ids}`;
    fetch(apiUrl)
      .then((r) => r.json())
      .then((r) => {
        dispatch({
          type: 'GET-MOVIES',
          movie: r,
          search: state.search,
          genresLoadMore: true,
          genresIds: [...ids]
        });
        dispatch({ type: 'SEARCH-IS-LOADING', isLoading: false });
      });
  };

  const submitForm = (e) => {
    dispatch({ type: 'SEARCH-IS-LOADING', isLoading: true });
    history.push('/');
    e.preventDefault();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${state.search}`)
      .then((r) => r.json())
      .then((r) => {
        setState((prev) => ({ ...prev, films: r, currentPage: r.page }));
        dispatch({
          type: 'GET-MOVIES',
          movie: r,
          search: state.search,
          genresLoadMore: false
        });
        dispatch({ type: 'SEARCH-IS-LOADING', isLoading: false });
      });
  };
  const handleAdd = (genre) => {
    const copyArr = genresState.map((item) => {
      if (item.id === genre.id) {
        const copyGenre = { ...item };
        copyGenre.active = !copyGenre.active;
        return copyGenre;
      }
      return item;
    });
    setGenresState(copyArr);
  };
  return (
    <div>
      <div className="container">
        <form className="search" onSubmit={submitForm}>
          <input
            type="text"
            name="search"
            placeholder="Find movies"
            onChange={inputHandler}
            className="form-control search__input"
          />
        </form>

        <div className="genres">
          {genresIsLoading ? (
            <Preloader />
          ) : (
            <>
              <div className="genres__wrap">
                {genresState.map((item, index) => (
                  <Chip
                    label={item.name}
                    key={item.id}
                    active={item.active}
                    handleAdd={() => handleAdd(item, index)}
                  />
                ))}
              </div>
              <Link to="/" className="btn genres__find" onClick={requestGenres}>
                Find
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
