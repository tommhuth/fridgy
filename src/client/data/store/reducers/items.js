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
        case ItemsAction.Checklist:
            return {
                ...state,
                data: [
                    ...state.data.filter(i => i.slug !== action.payload.slug),
                    { 
                        ...state.data.find(i => i.slug === action.payload.slug),
                        checklist: action.payload.date
                    }
                ]
            }
        case ItemsAction.Dechecklist:
            return {
                ...state,
                data: [
                    ...state.data.filter(i => i.slug !== action.payload),
                    { 
                        ...state.data.find(i => i.slug === action.payload),
                        checklist: null
                    }
                ]
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