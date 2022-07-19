import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  DELETE_MOVIE_SUCCESS,
} from "../types";
const initialState = { movies: [], categories: [] };

export default function movies(state = initialState, action) {
  const { type, payload } = action;
  const extractCategories = (arr) => {
    const uniqueValuesSet = new Set();
    const filteredArr = arr.filter((m) => {
      const isPresentInSet = uniqueValuesSet.has(m.category);
      uniqueValuesSet.add(m.category);
      return !isPresentInSet;
    });
    return filteredArr.map((a) => a.category);
  };
  switch (type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
        categories: extractCategories(payload),
      };
    case GET_MOVIES_FAILURE:
      return {
        ...state,
        movies: null,
      };
    case DELETE_MOVIE_SUCCESS:
      const newState = state.movies.filter((object) => {
        return object.id !== payload;
      });
      return {
        ...state,
        movies: newState,
        categories: extractCategories(newState),
      };

    default:
      return state;
  }
}
