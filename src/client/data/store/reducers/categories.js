import { CategoriesAction } from "../actions/creators/categories"

const init = []

export default (state = init, action) => {
    switch (action.type) {
        case CategoriesAction.Receive: 
            return [...action.payload]
        default: 
            return state
    }
}