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
import NotificationSystem from "./app/NotificationSystem"

let intialStore = getPersistedStore()
let store = makeStore(intialStore)

// initialize Fetch auth token from exisiting
if (intialStore) {
    Fetch.authorize(intialStore.auth.data.token)      
}

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
            <div>
                <AuthGate>
                    <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0,0)}/>
                </AuthGate>

                <NotificationSystem />
            </div>
        </Provider>
    </DocumentTitle>,
    document.getElementById("root")
)