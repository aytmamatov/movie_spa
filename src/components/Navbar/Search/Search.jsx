import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getDataFromServer } from 'src/adapters/xhr';
import 'src/components/Navbar/Search/Search.sass';

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmpty = {
    search: '',
    films: '',
    currentPage: ''
  };

  const [state, setState] = useState(userEmpty);

  const searchHandler = (e) => {
    navigate(`?search=${e.target.value}`);
    localStorage.setItem('search', e.target.value);
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function submitForm(e) {
    e.preventDefault();

    const searchRequest = `search/movie?query=${state.search}`;

    if (state.search) {
      dispatch({ type: 'SEARCH-IS-LOADING', isLoading: true });
      try {
        const { data: movies } = await getDataFromServer(searchRequest);
        setState((prev) => ({ ...prev, films: movies.results, currentPage: movies.page }));
        dispatch({
          type: 'GET-MOVIES',
          movie: movies,
          search: state.search
        });
      } finally {
        dispatch({ type: 'SEARCH-IS-LOADING', isLoading: false });
      }
    }
  }

  return (
    <div>
      <div className="container">
        <form className="search" onSubmit={submitForm}>
          <input
            type="text"
            name="search"
            placeholder="Find movies"
            onChange={searchHandler}
            className="form-control search__input"
          />
        </form>
      </div>
    </div>
  );
}

export default Search;
