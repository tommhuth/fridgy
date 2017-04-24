import * as itemActions from "./creators/item"
import * as notificationsActions from "./notifications"
import Fetch from "../../../data/Fetch"
import moment from "moment"

export function adjustAmount(item, adjustAmount) {
    return async (dispatch) => { 
        dispatch(updateItem({...item, amount: item.amount + adjustAmount > -1 ? item.amount + adjustAmount : 0 }, true))
    }
}

export function checklistItem(item) {
    return async (dispatch) => {  
        let title = item.title.toLowerCase()

        dispatch(
            updateItem(
                { ...item, checklist: moment().format("YYYY-MM-DD") }, 
                false, 
                `Added ${title} to the checklist.`,
                `Failed to add ${title} to the checklist.`
            )
        )
    }
}

export function dechecklistItem(item) {
    return async (dispatch) => {   
        let title = item.title.toLowerCase()

        dispatch(
            updateItem(
                { ...item, checklist: null }, 
                false, 
                `Removed ${title} from the checklist.`, 
                `Failed to remove ${title} from the checklist.`
            )
        )
    }
}

export function updateItem(item, silent = false, successMessage, errorMessage = `Failed to update ${item.title.toLowerCase()}.`) {
    return async (dispatch) => {
        if (!silent) {
            dispatch(itemActions.loading())
        }

        dispatch(itemActions.updateItem(item))

        try {
            await Fetch.put(`/api/items/${item.slug}`, item)
            
            if (successMessage) {
                dispatch(notificationsActions.add(successMessage))
            } 
        } catch (e) { 
            dispatch(itemActions.error(e))
            dispatch(notificationsActions.add(errorMessage, true))
        } finally {
            dispatch(itemActions.loaded())
        }
    }
}

export function fetchItem(slug) {
    return async (dispatch, getState) => { 
        if (getState().item.data.slug === slug) { 
            return
        } 
        
        dispatch(itemActions.loading())

        try {
            let result = await Fetch.get(`/api/items/${slug}`)

            dispatch(itemActions.receive(result))
        } catch (e) {
            dispatch(itemActions.error(e))
            dispatch(notificationsActions.add("Failed to get item.", true))
        } finally {
            dispatch(itemActions.loaded())
        } 
    }
}

export function clearItem() {
    return (dispatch) => {
        dispatch(itemActions.clear())
    }
}
