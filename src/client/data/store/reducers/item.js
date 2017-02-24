import { ItemAction } from "../actions/creators/item"

export default (state = {}, action) => {
    switch (action.type) {
        case ItemAction.Receive:
            return { ...action.payload }
        case ItemAction.Clear:
            return {}
        default:
            return state
    }
}