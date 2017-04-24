import { ItemsAction } from "../actions/creators/items"
import { ItemAction } from "../actions/creators/item"

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
                error: action.payload
            }
        case ItemsAction.Loaded:
            return {
                ...state,
                isLoading: false
            }
        case ItemAction.Update:
            return {
                ...state,
                data: [
                    ...state.data.filter(i => i.id !== action.payload.id),
                    {
                        ...action.payload
                    }
                ]
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