import React from "react";
import Preloader from "../UI/Preloader/Preloader";
import Card from "./Card/Card";
import "./Content.sass";

function Content({ loadMore, results, resultsIsLoading }) {
  return (
    <div className="container films">
      {results.length > 0 ? (
        <>
          <div className="films__cards">
            {resultsIsLoading ? (
              <Preloader />
            ) : (
              results.map((movie) => {
                return <Card key={movie.id} movieData={movie} />;
              })
            )}
          </div>
          <button className="btn btn-primary" onClick={loadMore}>
            Загрузить еще
          </button>
        </>
      ) : (
        <span>Фильмы отсутствуют</span>
      )}
    </div>
  );
}

export default Content;
