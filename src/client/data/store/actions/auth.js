
import * as auth from "../actions/creators/auth"
import Fetch from "../../../data/Fetch"

export function attemptAuth(token) {
    return async (dispatch) => {
        dispatch(auth.loading())

        try {  
            let accessLevel = await Fetch.post("/api/auth/login", {token})

            dispatch(auth.success(accessLevel))
        } catch (e) {
            dispatch(auth.error(e))
        } finally {
            dispatch(auth.loaded())
        }
    }
}
