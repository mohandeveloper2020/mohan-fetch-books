import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import promise from 'redux-promise';

import reducers from "reducers/";

let middleware = (compose)(applyMiddleware(promise));

export default createStore(reducers, middleware);