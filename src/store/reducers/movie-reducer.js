import { creatStore } from "redux";
let initialState = {
  movies: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return state;
    default:
      return state;
  }
};
