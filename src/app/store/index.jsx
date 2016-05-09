/**
 * Created by Tomm on 26.04.2016.
 */
import { combineReducers } from 'redux'
import items from '../reducers/items'
import menuVisibility from '../reducers/menuVisibility'
import status from "../reducers/status";

const fridgeApp = combineReducers({
    items,
    menuVisibility,
    status
});

export default fridgeApp;
