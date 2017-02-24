import fetch from "isomorphic-fetch"
import * as item from "./creators/item"

export function fetchItem(slug) {
    return async (dispatch) => {
        dispatch(item.loading())

        try {
            let result = await fetch(`/api/items/${slug}`).then(response => response.json())

            dispatch(item.receive(result))
        } catch (e) {
            dispatch(item.error(e))
        } finally {
            dispatch(item.loaded())
        }
    }
}

export function clearItem() {
    return (dispatch) => {
        dispatch(item.clear())
    }
}