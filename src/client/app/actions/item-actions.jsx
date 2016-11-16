import fetch from "isomorphic-fetch"

export function deleteItem(item){
    return (dispatch) => {
        dispatch(clearItem(item._id))
        dispatch(deletingItem())

        return fetch("/api/items/" + item.slug, { method: "DELETE"  })
            .then(() => dispatch(deletedItem()))
            .catch(() => dispatch(deleteItemFailed()))

    }
}

export function fetchItem(slug) {
    return (dispatch) => {
        dispatch(loadingItem())

        return fetch(`/api/items/${slug}`)
            .then(response => response.json())
            .then(item => {
                dispatch(receiveItem(item))
                dispatch(loadedItem())
            })
            .catch(() => dispatch(loadItemFailed()))

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
 