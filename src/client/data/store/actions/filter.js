import * as filterActions from "./creators/filter"

export const StockFilter = {
    All: "ALL",
    OutOfStock: "OUT_OF_STOCK",
    InStock: "IN_STOCK"
}

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

export function filterItems(items, filter) {
    let filtered = [...items]

    switch (filter.stock) {
        case StockFilter.InStock:
            filtered = filtered.filter(e => e.amount > 0)
            break
        case StockFilter.OutOfStock:
            filtered = filtered.filter(e => !e.amount )
            break
    }

    if (filter.category) {
        filtered = filtered.filter(e => e.category.toLowerCase() === filter.category.toLowerCase())
    }

    return filtered
}