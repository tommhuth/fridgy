import * as itemsActions from "../actions/creators/items"
import Fetch from "../../../data/Fetch"
import moment from "moment"

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
        } finally {
            if (!silent) {
                dispatch(itemsActions.loaded())
            }
        }
    }
}

export function checklistItem(slug) {
    return async (dispatch) => {
        let date = moment().format("YYYY-MM-DD")

        dispatch(itemsActions.checklist(slug, date))

        try {
            await Fetch.put(`/api/items/${slug}`, { checklist: date })
        } catch (e) {
            dispatch(itemsActions.error(e))
        }
    }
}

export function dechecklistItem(slug) {
    return async (dispatch) => { 
        dispatch(itemsActions.dechecklist(slug))

        try {
            await Fetch.put(`/api/items/${slug}`, { checklist: null })
        } catch (e) {
            dispatch(itemsActions.error(e))
        }
    }
}