import thunkMiddleware from 'redux-thunk'
import React, {Component } from "react";
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from "redux";
import { connect, Provider } from "react-redux";
import fridgeApp from "./store";
import { Router, browserHistory } from 'react-router'
import routes from "./routes";  

let store = createStore(fridgeApp, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById("root")
);