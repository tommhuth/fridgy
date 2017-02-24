import { ItemsAction } from "../actions/creators/items"

export default (state = [], action) => {
    switch (action.type) {
        case ItemsAction.Receive:
            return [...action.payload]
        default:
            return state
    }
}