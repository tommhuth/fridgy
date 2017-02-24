import fetch from "isomorphic-fetch"
import * as categories from "./creators/categories"

export function fetchCategories() {
    return async (dispatch) => {
        dispatch(categories.loading())

        try {
            let list = await fetch("/api/categories").then(response => response.json())

            dispatch(categories.receive(list))
        } catch (e) {
            dispatch(categories.error(e))
        } finally {
            categories.loaded()
        }
    }
}




