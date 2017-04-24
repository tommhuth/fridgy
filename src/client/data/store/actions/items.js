import * as itemsActions from "./creators/items"
import * as notificationsActions from "./notifications"
import Fetch from "../../../data/Fetch"

export function fetchItems(silent = false) {
    return async (dispatch) => {
        if (!silent) {
            dispatch(itemsActions.loading())
        }

        try {
            let result = await Fetch.get("/api/items")

            dispatch(itemsActions.receive(result))
        } catch (e) {
            dispatch(itemsActions.error(e))
            dispatch(notificationsActions.add("Failed to get list of items.", true))
        } finally {
            if (!silent) {
                dispatch(itemsActions.loaded())
            }
        }
    }
}
