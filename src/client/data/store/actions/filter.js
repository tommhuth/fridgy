import * as filterActions from "./creators/filter"

export function setCategoryFilter(category) {
    return (dispatch) => {
        dispatch(filterActions.setCategoryFilter(category))
    }
}

export function setStockFilter(stock) {
    return (dispatch) => {
        dispatch(filterActions.setStockFilter(stock))
    }
}
