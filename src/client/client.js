import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, browserHistory } from "react-router"
import routes from "./routes"
import AuthGate from "./auth/AuthGate"
import Fetch from "./data/Fetch"
import { makeStore, getPersistedStore, persistStore } from "./data/store/make-store"
import { cloneDeep } from "lodash"
import DocumentTitle from "react-document-title"

let intialStore = getPersistedStore()
let store = makeStore(intialStore)

// initialize Fetch auth token from exisiting
Fetch.authorize(intialStore && intialStore.auth.data.token)  

// set token on change + save state
store.subscribe(() => {
    let state = cloneDeep(store.getState())

    // lets not persist everything
    state.app.menuVisible = false
    state.notifications.data = []
    
    persistStore(state)
    Fetch.authorize(state.auth.data.token)  
})

ReactDOM.render(
    <DocumentTitle title="The Fridge">
        <Provider store={store}>
            <AuthGate>
                <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0,0)}/>
            </AuthGate>
        </Provider>
    </DocumentTitle>,
    document.getElementById("root")
)