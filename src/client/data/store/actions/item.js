import * as item from "./creators/item"

import Fetch from "../../../data/Fetch"
export function fetchItem(slug) {
    return async (dispatch) => {
        dispatch(item.loading())

        try {
            let result = await Fetch.get(`/api/items/${slug}`)

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