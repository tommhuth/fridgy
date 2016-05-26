export function setCategoryFilter(category){
    return {
        type: "SET_CATEGORY_FILTER",
        category
    }
}

export function setStockFilter(stock){
    return {
        type: "SET_STOCK_FILTER",
        stock
    }
}

export function filterItems(items, filter) {
    let filtered = [...items];

    switch(filter.stock) {
        case "IN_STOCK":
            filtered = filtered.filter(e => e.amount > 0);
            break;
        case "OUT_OF_STOCK":
            filtered = filtered.filter(e => !e.amount );
            break;
    }

    if(filter.category) {
        filtered = filtered.filter(e => e.category.toLowerCase() === filter.category.toLowerCase());
    }

    return filtered;
}