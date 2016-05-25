import fetch from 'isomorphic-fetch';

export function deleteItem(item){
    return (dispatch) => {
        dispatch(clearItem(item._id));
        dispatch(deletingItem());

        return fetch("/api/items/" + item.slug, { method: "DELETE"  })
            .then(() => dispatch(deletedItem()))
            .catch(() => dispatch(deleteItemFailed()))

    }
}

export function fetchItems() {
    return (dispatch) => {
        dispatch(loadingItems());

        return fetch("/api/items")
            .then(response => response.json())
            .then(items => {
                dispatch(receiveItems(items));
                dispatch(loadedItems());
            })
            .catch(error => dispatch(loadItemsFailed()))
    }
}

export function fetchItem(slug) {
    return (dispatch) => {
        dispatch(loadingItem());

        return fetch(`/api/items/${slug}`)
            .then(response => response.json())
            .then(item => {
                dispatch(receiveItem(item));
                dispatch(loadedItem());
            })
            .catch(error => dispatch(loadItemFailed()))

    }
}

export function clearItem(){
    return {
        type: "CLEAR_ITEM"
    }
}


function receiveItem(item){
    return {
        type: "RECEIVE_ITEM",
        item
    }
}

function loadingItem(){
    return {
        type: "LOADING_ITEM"
    }
}

function loadedItem(){
    return {
        type: "LOADED_ITEM"
    }
}

function loadItemFailed(){
    return {
        type: "LOAD_ITEM_FAILED"
    }
}


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


function deletingItem(){
    return {
        type: "DELETING_ITEM"
    }
}

function deletedItem(){
    return {
        type: "DELETED_ITEM"
    }
}

function deleteItemFailed(){
    return {
        type: "DELETE_ITEM_FAILED"
    }
}

function clearItem(id) {
    return {
        type: "CLEAR_ITEM",
        id
    }
}

