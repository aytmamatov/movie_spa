import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Search.sass";

function Search({ setMovieList }) {
  const dispatch = useDispatch();
  const history = useHistory();
  let api_key = "c81dbb52630c695069ceb9c73e137dc2";
  let userEmpty = {
    search: "",
    films: "",
    currentPage: "",
  };
  const [state, setState] = useState(userEmpty);
  let inputHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let submitForm = (e) => {
    dispatch({ type: "SEARCH-IS-LOADING", isLoading: true });
    setMovieList([]);
    history.push("/");
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${state.search}`
    )
      .then((r) => r.json())
      .then((r) => {
        setState((prev) => ({ ...prev, films: r, currentPage: r.page }));
        dispatch({ type: "GET-MOVIES", movie: r, search: state.search });
        dispatch({ type: "SEARCH-IS-LOADING", isLoading: false });
      });
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
      </div>
    </div>
  );
}

export default Search;
