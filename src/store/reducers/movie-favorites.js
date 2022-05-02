const initialState = {
  favoritesMovies: []
};

const favoritesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD-TO-FAVORITES': {
      const favoritesCopy = [];
      favoritesCopy.push(action.favorites);
      return {
        ...state,
        favoritesMovies: [...state.favoritesMovies, ...favoritesCopy]
      };
    }

    case 'REMOVE-CARD': {
      const favoritesRemoveCard = [...state.favoritesMovies];
      favoritesRemoveCard.splice(action.index, 1);
      return {
        ...state,
        favoritesMovies: [...favoritesRemoveCard]
      };
    }

    default:
      return state;
  }
};
export default favoritesReducers;
