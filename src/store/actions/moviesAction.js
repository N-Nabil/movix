import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "../types";
import { movies$ } from "../../data/movies";

//GET MOVIES
export function getAllMovies() {
  return async (dispatch) => {
    await dispatch({ type: GET_MOVIES_REQUEST });
    try {
      movies$.then((data) =>
        dispatch({ type: GET_MOVIES_SUCCESS, payload: data })
      );
    } catch (e) {
      dispatch({ type: GET_MOVIES_FAILURE });
      console.log("ERROR GETTING MOVIES", e);
    }
  };
}
//DELETE MOVIE
export function deleteMovie(id) {
  return async (dispatch) => {
    await dispatch({ type: DELETE_MOVIE_REQUEST });
    try {
      dispatch({ type: DELETE_MOVIE_SUCCESS, payload: id });
    } catch (e) {
      dispatch({ type: DELETE_MOVIE_FAILURE });
      console.log("ERROR GETTING MOVIES", e, id);
    }
  };
}

//GET CATEGORIES
export function getCategories() {
  return async (dispatch) => {
    await dispatch({ type: GET_CATEGORIES_REQUEST });
    try {
      dispatch({ type: GET_CATEGORIES_SUCCESS });
    } catch (e) {
      dispatch({ type: GET_CATEGORIES_FAILURE });
      console.log("ERROR GETTING CATEGORIES", e);
    }
  };
}
