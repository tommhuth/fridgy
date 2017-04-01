import * as itemActions from "./creators/item"
import Fetch from "../../../data/Fetch"

export function adjustAmount(item, adjustAmount) {
    return async (dispatch) => {
        item.amount = item.amount + adjustAmount > -1 ? item.amount + adjustAmount : 0

        dispatch(updateItem(item, true))
    }
}

export function updateItem(item, silent = false) {
    return async (dispatch) => {
        if (!silent) {
            dispatch(itemActions.loading())
        }

        dispatch(itemActions.updateItem(item))

        try {
            await Fetch.put(`/api/items/${item.slug}`, item)
        } catch (e) {
            dispatch(itemActions.error(e))
        } finally {
            dispatch(itemActions.loaded())
        }
    }
}

export function fetchItem(slug) {
    return async (dispatch, getState) => { 
        if (getState().item.data.slug === slug) { 
            return
        } 
        
        dispatch(itemActions.loading())

        try {
            let result = await Fetch.get(`/api/items/${slug}`)

            dispatch(itemActions.receive(result))
        } catch (e) {
            dispatch(itemActions.error(e))
        } finally {
            dispatch(itemActions.loaded())
        } 
    }
}

export function clearItem() {
    return (dispatch) => {
        dispatch(itemActions.clear())
    }
}
