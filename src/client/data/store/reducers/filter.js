import { FilterAction } from "../actions/creators/filter"

const init = {
    stock: null,
    category: null
}

export default (state = init, action) => {
    switch (action.type) {
        case FilterAction.SetStock:
            return {
                ...state,
                stock: action.payload
            }
        case FilterAction.SetCategory:
            return {
                ...state,
                category: action.payload
            }
        default:
            return state
    }
}