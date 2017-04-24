import { NotificationsAction } from "../actions/creators/notifications"

const init = {
    data: []
}

export default (state = init, action) => {
    switch (action.type) {
        case NotificationsAction.Add:
            return { ...state, data: [...state.data, action.payload] }
        case NotificationsAction.Remove:
            return { ...state, data: state.data.filter(i => i.id !== action.payload) }
        default:
            return state
    }
}
