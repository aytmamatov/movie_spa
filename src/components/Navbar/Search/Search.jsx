import React from "react";
import "./Search.sass";

function Search({inputHandler, submitForm}) {
  return (
    <div className="container">
      <form className="search" onSubmit={submitForm}>
        <input
          type="text"
          name="search"
          placeholder="Поиск фильмов"
          onChange={inputHandler}
          className="form-control search__input"
        />
      </form>
    </div>
  );
}

export default Search;
