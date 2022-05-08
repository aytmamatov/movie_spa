import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { getDataFromServer } from 'src/adapters/xhr';
import 'src/components/Navbar/Search/Search.sass';

const searchEmpty = {
  search: ''
};

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [searchState, setSearchState] = useState(searchEmpty);

  const searchHandler = (e) => {
    navigate(`?search=${e.target.value}`);
    setSearchState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function sendRequest(search) {
    const searchRequest = `search/movie?query=${search}`;

    dispatch({ type: 'SEARCH-IS-LOADING', isLoading: true });
    try {
      const { data: movies } = await getDataFromServer(searchRequest);
      dispatch({
        type: 'GET-MOVIES',
        movie: movies,
        search
      });
    } finally {
      dispatch({ type: 'SEARCH-IS-LOADING', isLoading: false });
    }
  }

  function submitForm(e) {
    e.preventDefault();

    if (searchState.search) {
      sendRequest(searchState.search);
    }
  }

  useEffect(() => {
    const searchParam = searchParams.get('search');
    setSearchState((prev) => ({
      ...prev,
      search: searchParam
    }));

    sendRequest(searchParam);
  }, []);

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
