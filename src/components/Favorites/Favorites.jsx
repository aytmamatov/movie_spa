import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'src/components/Favorites/Favorites.sass';

function Favorites() {
  const state = useSelector((currentState) => currentState.favorites);
  const dispatch = useDispatch();
  const removeCard = (index) => {
    dispatch({ type: 'REMOVE-CARD', index });
  };
  return (
    <div className="container">
      <h2 className="favorites__heading">Favorites</h2>
      <div className="favorites__wrap">
        {state.favoritesMovies.length > 0 ? (
          state.favoritesMovies.map((card) => {
            return (
              <div key={card.id} className="favorites__box">
                <div className="favorites__poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2${card.poster_path}`}
                    alt={card.title}
                  />
                </div>
                <div className="favorites__inner">
                  <h3 className="favorites__title">{card.title}</h3>
                  <p className="favorites__overview">{card.overview}</p>
                  <div className="favorites__details">
                    <button
                      onClick={() => removeCard(card.index)}
                      className="btn btn-danger favorites__remove">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="favorites__empty">
            <h4>No movies</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
