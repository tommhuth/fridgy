import fetch from "isomorphic-fetch"


export function fetchItems() {
    return (dispatch) => {
        dispatch(loadingItems())

        return fetch("/api/items")
            .then(response => response.json())
            .then(items => {
                dispatch(receiveItems(items))
                dispatch(loadedItems())
            })
            .catch(() => dispatch(loadItemsFailed()))
    }
}


// Action creators

function receiveItems(items){
    return {
        type: "RECEIVE_ITEMS",
        items
    }
}

function loadingItems(){
    return {
        type: "LOADING_ITEMS"
    }
}

function loadedItems(){
    return {
        type: "LOADED_ITEMS"
    }
}

function loadItemsFailed(){
    return {
        type: "LOAD_ITEMS_FAILED"
    }
}
