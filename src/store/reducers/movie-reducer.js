let initialState = {
  isLoading: false,
};
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-MOVIES":
      return {
        ...state,
        ...action.movie,
        searchInfo: action.search,
        genresLoadMore: action.genresLoadMore,
        genresIds: action.genresIds
      };
    case "SEARCH-IS-LOADING":
      return { ...state, isLoading: action.isLoading };
    case "CURRENT-MOVIE":
      return { ...state, current_movie: action.current_movie };
    default:
      return state;
  }
};

export default searchReducer;
