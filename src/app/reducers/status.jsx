export default (state = {}, action) => {
    switch(action.type){
        case 'LOADING_ITEMS':
            return {
                ...state,
                isLoadingItems: true,
                loadingSuccess: null
            };
        case 'LOADED_ITEMS':
            return {
                ...state,
                isLoadingItems: false,
                loadingSuccess: true
            };
        case 'LOAD_ITEMS_FAILED':
            return {
                ...state,
                isLoadingItems: false,
                loadingSuccess: false
            };
        case 'DELETING_ITEM':
            return {
                ...state,
                isDeletingItems: true,
                deletingSuccess: null
            };
        case 'DELETED_ITEM':
            return {
                ...state,
                isDeletingItems: false,
                deletingSuccess: true
            };
        case 'DELETE_ITEM_FAILED':
            return {
                ...state,
                isDeletingItems: false,
                deletingSuccess: false
            };
        default: return state;
    }
}