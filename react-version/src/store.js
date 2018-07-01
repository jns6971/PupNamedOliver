import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import tile from "./reducer/tileReducer.js";

const middleware = applyMiddleware(logger(), promise());


export default createStore(
    combineReducers({}),
    {},
    middleware
);