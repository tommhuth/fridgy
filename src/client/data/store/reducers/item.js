import { ItemAction } from "../actions/creators/item"

const init = {
    data: {},
    error: null,
    isLoading: false
}

export default (state = init, action) => {
    switch (action.type) {
        case ItemAction.Receive:
            return { 
                ...state,
                error: null,
                data: action.payload
            }
        case ItemAction.Clear:
            return {
                ...state,
                data: {}
            }
        case ItemAction.Error:
            return {
                ...state,
                error: action.payload,
            }
        case ItemAction.Loading: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ItemAction.Loaded: {
            return {
                ...state,
                isLoading: false
            }
        }
        default:
            return state
    }
}