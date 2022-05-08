import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataFromServer } from 'src/adapters/xhr';
import Chip from 'src/components/Navbar/Search/Chip/Chip';
import 'src/components/Navbar/Search/Search.sass';
import Preloader from 'src/components/UI/Preloader/Preloader';

const GENRE_URL = 'genre/movie/list';

const returnSearchUrl = (search) => `search/movie?query=${search}`;
const returnGenresUrl = (genresIds) =>
  `discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genresIds}`;

function Search() {
  const dispatch = useDispatch();
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

  async function showGenres() {
    try {
      const {
        data: { genres }
      } = await getDataFromServer(GENRE_URL);

      const transformedGenres = genres.map((genre) => ({ ...genre, active: false }));
      setGenresState(transformedGenres);
    } finally {
      setGenresIsLoading(false);
    }
  }

  useEffect(() => {
    showGenres();
  }, []);

  async function requestGenres() {
    dispatch({ type: 'SEARCH-IS-LOADING', isLoading: true });

    const genresIds = [...genresState]
      .map(({ active, id }) => (active ? id : null))
      .filter(Boolean);

    try {
      const genresRequest = returnGenresUrl(genresIds);
      const { data: movies } = await getDataFromServer(genresRequest);
      dispatch({
        type: 'GET-MOVIES',
        movie: movies,
        search: state.search,
        genresLoadMore: true,
        genresIds: [...genresIds]
      });
    } finally {
      dispatch({ type: 'SEARCH-IS-LOADING', isLoading: false });
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    dispatch({ type: 'SEARCH-IS-LOADING', isLoading: true });

    try {
      const { data: movies } = await getDataFromServer(returnSearchUrl(state.search));
      setState((prev) => ({ ...prev, films: movies.results, currentPage: movies.page }));
      dispatch({
        type: 'GET-MOVIES',
        movie: movies,
        search: state.search,
        genresLoadMore: false
      });
    } finally {
      dispatch({ type: 'SEARCH-IS-LOADING', isLoading: false });
    }
  }

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
