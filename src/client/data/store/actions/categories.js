import * as categories from "./creators/categories"
import Fetch from "../../../data/Fetch"

export function fetchCategories(silent) {
    return async (dispatch) => {
        if (silent) {
            dispatch(categories.loading())
        }

        try {
            let list = await Fetch.get("/api/categories")

            dispatch(categories.receive(list))
        } catch (e) {
            dispatch(categories.error(e))
        } finally {
            if (silent) {
                categories.loaded()
            }
        }
    }
}




