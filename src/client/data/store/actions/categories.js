import * as categories from "./creators/categories"
import Fetch from "../../../data/Fetch"

export function fetchCategories() {
    return async (dispatch) => {
        dispatch(categories.loading())

        try {
            let list = await Fetch.get("/api/categories")

            dispatch(categories.receive(list))
        } catch (e) {
            dispatch(categories.error(e))
        } finally {
            categories.loaded()
        }
    }
}




