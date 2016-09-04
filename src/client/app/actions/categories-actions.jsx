import fetch from "isomorphic-fetch"

export function fetchCategories() {
    return (dispatch) => {
        dispatch(loadingCategories())

        return fetch("/api/categories")
            .then(response => response.json())
            .then(categories => {
                dispatch(receiveCategories(categories))
                dispatch(loadedCategories())
            })
            .catch(() => dispatch(loadCategoriesFailed()))
    }
}

function receiveCategories(categories){
    return {
        type: "RECEIVE_CATEGORIES",
        categories
    }
}

function loadingCategories(){
    return {
        type: "LOADING_CATEGORIES"
    }
}

function loadedCategories(){
    return {
        type: "LOADED_CATEGORIES"
    }
}

function loadCategoriesFailed(){
    return {
        type: "LOAD_CATEGORIES_FAILED"
    }
}



