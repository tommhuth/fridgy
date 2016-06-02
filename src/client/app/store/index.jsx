import { combineReducers } from 'redux';
import items from './reducers/items';
import item from './reducers/item';
import menuVisibility from './reducers/menuVisibility';
import status from "./reducers/status";
import categories from "./reducers/categories";
import filter from "./reducers/filter";

const fridgeStore = combineReducers({
    items,
    item,
    categories,
    menuVisibility,
    status,
    filter
});
 

export default fridgeStore;
