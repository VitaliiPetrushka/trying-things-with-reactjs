import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

// ONLY in dev purposes,
// potential bug if extensions not installed in browser
//
// const enhanced = compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default createStore(reducers, applyMiddleware(thunk));
