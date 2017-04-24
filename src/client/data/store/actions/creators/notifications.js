export const NotificationsAction = {
    Add: "notifications:add",
    Remove: "notifications:remove"
}

export function add(notification) {
    return {
        type: NotificationsAction.Add,
        payload: notification
    }
}

export function remove(notification) {
    return {
        type: NotificationsAction.Remove,
        payload: notification
    }
}
