import { applyMiddleware, createStore,combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import moviesReducer from "./reducers/moviesReducer";
const logger = createLogger({
  collapsed: true,
  colors: {
    title: () => "#0B698F",
    prevState: () => "#7286E9",
    action: () => "#bd2839",
    nextState: () => "#1DB954",
    error: () => "#FF534D",
  },
});
const store = createStore(combineReducers({
    movies: moviesReducer,
}), applyMiddleware(thunk, logger));

export default store;