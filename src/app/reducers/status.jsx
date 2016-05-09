export default (state = {}, action) => {
    switch(action.type){
        case 'LOADING_ITEMS':
            return {
                ...state,
                isLoadingItems: true,
                success: null
            };
        case 'LOADED_ITEMS':
            return {
                ...state,
                isLoadingItems: false,
                success: true
            };
        case 'LOAD_ITEMS_FAILED':
            return {
                ...state,
                isLoadingItems: false,
                success: false
            };
        default: return state;

    }
}