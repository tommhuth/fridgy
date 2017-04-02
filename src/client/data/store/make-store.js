import rootReducer from "./reducers"
import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

export default function makeStore(initialState) {
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