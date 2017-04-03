import { combineReducers } from "redux"
import items from "./items"
import item from "./item"
import app from "./app"
import categories from "./categories"
import filter from "./filter"
import auth from "./auth"
 
export default combineReducers({
    items,
    item,
    categories,
    app,
    filter,
    auth
})
