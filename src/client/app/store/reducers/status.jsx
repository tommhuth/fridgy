export default (state = {}, action) => {
    switch(action.type){
    case "LOADING_ITEMS":
        return {
            ...state,
            isLoadingItems: true,
            loadingItemsSuccess: null
        }
    case "LOADED_ITEMS":
        return {
            ...state,
            isLoadingItems: false,
            loadingItemsSuccess: true
        }
    case "LOAD_ITEMS_FAILED":
        return {
            ...state,
            isLoadingItems: false,
            loadingItemsSuccess: false
        }
    case "DELETING_ITEM":
        return {
            ...state,
            isDeletingItems: true,
            deletingItemsSuccess: null
        }
    case "DELETED_ITEM":
        return {
            ...state,
            isDeletingItems: false,
            deletingItemsSuccess: true
        }
    case "DELETE_ITEM_FAILED":
        return {
            ...state,
            isDeletingItems: false,
            deletingItemsSuccess: false
        }
    case "LOADING_ITEM":
        return {
            ...state,
            isLoadingItem: true,
            loadingItemSuccess: null
        }
    case "LOADED_ITEM":
        return {
            ...state,
            isLoadingItem: false,
            loadingItemSuccess: true
        }
    case "LOAD_ITEM_FAILED":
        return {
            ...state,
            isLoadingItem: false,
            loadingItemSuccess: false
        }


    case "LOADING_CATEGORIES":
        return {
            ...state,
            isLoadingCategories: true,
            loadingCategoriesSuccess: null
        }
    case "LOADED_CATEGORIES":
        return {
            ...state,
            isLoadingCategories: false,
            loadingCategoriesSuccess: true
        }
    case "LOAD_CATEGORIES_FAILED":
        return {
            ...state,
            isLoadingCategories: false,
            loadingCategoriesSuccess: false
        }



    default: return state

    }
}