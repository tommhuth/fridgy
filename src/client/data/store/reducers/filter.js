import { FilterAction } from "../actions/creators/filter"

export default (state = {}, action) => {
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