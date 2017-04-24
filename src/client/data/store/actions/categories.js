import * as categoriesActions from "./creators/categories"
import Fetch from "../../../data/Fetch"

export function fetchCategories(silent) {
    return async (dispatch) => {
        if (silent) {
            dispatch(categoriesActions.loading())
        }

        try {
            let list = await Fetch.get("/api/categories")

            dispatch(categoriesActions.receive(list))
        } catch (e) {
            dispatch(categoriesActions.error(e))
        } finally { 
            categoriesActions.loaded() 
        }
    }
}




