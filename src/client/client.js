import "babel-polyfill"
import fastClick from "react-fastclick"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, browserHistory } from "react-router"
import routes from "./routes"
import AuthGate from "./auth/AuthGate"
import Fetch from "./data/Fetch"
import makeStore from "./data/store/make-store"
import LocalStorage from "./data/LocalStorage"

fastClick()

let intialState = LocalStorage.get("fridgy-store")
let store = makeStore(intialState)

// initialize Fetch auth token from exisiting
Fetch.authorize(intialState.auth.data.token)  

// set token on change + save state
store.subscribe(() => {
    let state = store.getState()  
    
    LocalStorage.set("fridgy-store", state)
    Fetch.authorize(state.auth.data.token)  
})

ReactDOM.render(
    <Provider store={store}>
        <AuthGate>
            <Router history={browserHistory} routes={routes} />
        </AuthGate>
    </Provider>,
    document.getElementById("root")
)