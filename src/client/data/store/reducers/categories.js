import { CategoriesAction } from "../actions/creators/categories"

const init = {
    error: null,
    data: []
}

export default (state = init, action) => {
    switch (action.type) {
        case CategoriesAction.Receive: 
            return {
                ...state,
                error: null,
                data: action.payload
            }
        default: 
            return state
    }
}