export const StockFilter = {
    OutOfStock: "OUT_OF_STOCK",
    InStock: "IN_STOCK"
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