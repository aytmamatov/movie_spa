let initialState = {
  favoritesMovies: []
};
const favoritesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD-TO-FAVORITES':
      const favorites_copy = [];
      favorites_copy.push(action.favorites);
      return {
        ...state,
        favoritesMovies: [...state.favoritesMovies, ...favorites_copy]
      };
    case 'REMOVE-CARD':
      const favoritesRemoveCard = [...state.favoritesMovies];
      favoritesRemoveCard.splice(action.index, 1);
      return {
        ...state,
        favoritesMovies: [...favoritesRemoveCard]
      };
    default:
      return state;
  }
};
export default favoritesReducers;
