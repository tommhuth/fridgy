import rootReducer from "./reducers"
import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import LocalStorage from "../LocalStorage"

const key = "fridgy-store"

export function getPersistedStore() { 
    let state = LocalStorage.get(key)

    if (state && state.app && state.app.version === process.env.APP_VERSION) {
        // app version hasnt changed and state can be reused
        return state
    } else {
        // new version exists, discard old state
        LocalStorage.remove(key)
        
        return null
    }
}

export function persistStore(store) { 
    LocalStorage.set(key, store)
}

export function makeStore(initialState) {
    if (initialState) {
        return createStore(
            rootReducer, 
            initialState, 
            applyMiddleware(thunkMiddleware)
        )
    } else {
        return createStore(
            rootReducer,  
            applyMiddleware(thunkMiddleware)
        )
    } 
}