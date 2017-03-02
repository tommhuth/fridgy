import { combineReducers } from "redux"
import items from "./reducers/items"
import item from "./reducers/item"
import menu from "./reducers/menu"
import categories from "./reducers/categories"
import filter from "./reducers/filter"
import auth from "./reducers/auth"

const fridgeStore = combineReducers({
    items,
    item,
    categories,
    menu,
    filter,
    auth
})
 

export default fridgeStore
