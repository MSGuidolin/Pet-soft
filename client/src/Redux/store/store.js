import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import appReducer from "../reducer/reducer.js";
import { composeWithDevTools } from 'redux-devtools-extension';


// const initialState = {};
// const reducer = combineReducers({
//   appReducer,
// });

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
