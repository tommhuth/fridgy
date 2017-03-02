import "babel-polyfill"
import _reactFastClick from "react-fastclick"
import thunkMiddleware from "redux-thunk"
import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import fridgeStore from "./data/store"
import { Router, browserHistory } from "react-router"
import routes from "./routes"
import AuthGate from "./auth/AuthGate"
import Fetch from "./data/Fetch"

let store = createStore(fridgeStore, applyMiddleware(thunkMiddleware))

store.subscribe(() => {
    let token = store.getState().auth.data.token

    Fetch.authorize(token)  
})

ReactDOM.render(
    <Provider store={store}>
        <AuthGate>
            <Router history={browserHistory} routes={routes} />
        </AuthGate>
    </Provider>,
    document.getElementById("root")
)