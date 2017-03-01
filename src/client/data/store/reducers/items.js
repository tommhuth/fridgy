import { ItemsAction } from "../actions/creators/items"

const init = {
    data: [],
    error: null,
    isLoading: false
}

export default (state = init, action) => {
    switch (action.type) {
        case ItemsAction.Receive:
            return {
                ...state,
                error: null,
                data: action.payload
            }
        case ItemsAction.Error:
            return {
                ...state,
                data: [],
                error: action.payload
            }
        case ItemsAction.Loaded:
            return {
                ...state,
                isLoading: false
            }
        case ItemsAction.Loading:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}