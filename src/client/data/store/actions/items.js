import * as items from "../actions/creators/items"
import Fetch from "../../../data/Fetch"
import moment from "moment"

export function fetchItems(silent = false) {
    return async (dispatch) => {
        if (!silent) {
            dispatch(items.loading())
        }

        try {
            let result = await Fetch.get("/api/items")

            dispatch(items.receive(result))
        } catch (e) {
            dispatch(items.error(e))
        } finally {
            if (!silent) {
                dispatch(items.loaded())
            }
        }
    }
}

export function checklistItem(slug) {
    return async (dispatch) => {
        let date = moment().format("YYYY-MM-DD")

        dispatch(items.checklist(slug, date))

        try {
            await Fetch.put(`/api/items/${slug}`, { checklist: date })
        } catch (e) {
            dispatch(items.error(e))
        }
    }
}

export function dechecklistItem(slug) {
    return async (dispatch) => { 
        dispatch(items.dechecklist(slug))

        try {
            await Fetch.put(`/api/items/${slug}`, { checklist: null })
        } catch (e) {
            dispatch(items.error(e))
        }
    }
}