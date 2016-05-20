/**
 * Created by Tomm on 26.04.2016.
 */
import { combineReducers } from 'redux';
import items from '../reducers/items';
import item from '../reducers/item';
import menuVisibility from '../reducers/menuVisibility';
import status from "../reducers/status";
import categories from "../reducers/categories";

const fridgeApp = combineReducers({
    items,
    item,
    categories,
    menuVisibility,
    status
});

export default fridgeApp;
