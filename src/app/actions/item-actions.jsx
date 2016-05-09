import fetch from 'isomorphic-fetch';


export function requestItems(){
    return {
        type: "REQUEST_ITEMS"
    }
}

export function receiveItems(items){
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

function loadItemsFail(){
    return {
        type: "LOAD_ITEMS_FAIL"
    }
}

export function fetchItems() {
    return (dispatch) => {
        dispatch(loadingItems());

        return fetch("/api/items")
            .then(response => response.json())
            .then(json => {
                dispatch(receiveItems(json));
                dispatch(loadedItems());
            })
    }
}