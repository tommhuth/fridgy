import * as items from "../actions/creators/items"
import Fetch from "../../../data/Fetch"

export function fetchItems() {
    return async (dispatch) => {
        dispatch(items.loading())

        try {
            let result = await Fetch.get("/api/items")

            dispatch(items.receive(result))
        } catch (e) {
            dispatch(items.error(e))
        } finally {
            dispatch(items.loaded())
        }
    }
}
