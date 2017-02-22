export default (state = {}, action) => {
    switch (action.type) {
        case "SET_STOCK_FILTER":
            return {
                ...state,
                stock: action.stock
            }
        case "SET_CATEGORY_FILTER":
            return {
                ...state,
                category: action.category
            }
        default: return state
    }
}