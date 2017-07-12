import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import {routerReducer, routerMiddleware} from "react-router-redux";
import {hashHistory} from "react-router";
import promise from "redux-promise";

import commentInfo from "./_reducers-and-actions/commentInfoReducer";
import userInfo from "./_reducers-and-actions/userInfoReducer";

let initialState = {};

const Store = createStore(
    combineReducers({
        commentInfo,
        userInfo,
        routing: routerReducer
    }),
    initialState,
    compose(
        applyMiddleware(
            routerMiddleware(hashHistory),
            promise
        )
    )
);


export default Store;
