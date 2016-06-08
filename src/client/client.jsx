import reactFastClick from "react-fastclick";
import thunkMiddleware from 'redux-thunk'
import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import fridgeStore from "./app/store";
import { Router, browserHistory } from 'react-router'
import routes from "./routes";

let store = createStore(fridgeStore, applyMiddleware(thunkMiddleware));
  
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById("root")
);