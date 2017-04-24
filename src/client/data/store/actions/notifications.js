import * as notificationsActions from "./creators/notifications"
import uuid from "node-uuid"

export function add(message, isError = false, duration = 4000) {
    return (dispatch) => {
        let id = uuid.v4()
        let notification = {
            message,
            isError,
            duration,
            createdAt: new Date().toISOString(),
            id
        }

        dispatch(notificationsActions.add(notification))
        
        if (duration > 0) {
            setTimeout(dispatch.bind(null, remove(id)), duration)
        }
    }
}

export function remove(id) {
    return (dispatch) => {
        dispatch(notificationsActions.remove(id))
    }
}