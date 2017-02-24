import fetch from "isomorphic-fetch"
import * as items from "../actions/creators/items"

export function fetchItems() {
    return async (dispatch) => {
        dispatch(items.loading())

        try {
            let result = await fetch("/api/items").then(response => response.json())

            dispatch(items.receive(result))
        } catch (e) {
            dispatch(items.error(e))
        } finally {
            dispatch(items.loaded())
        }
    }
}
