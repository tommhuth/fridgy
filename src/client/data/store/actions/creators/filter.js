export const FilterAction = {
    SetCategory: "filter:set-category",
    SetStock: "filter:set-stock"
}

export function setCategoryFilter(category) {
    return {
        type: FilterAction.SetCategory,
        payload: category
    }
}

export function setStockFilter(stock) {
    return {
        type: FilterAction.SetStock,
        payload: stock
    }
}