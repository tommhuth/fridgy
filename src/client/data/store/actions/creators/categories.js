export const CategoriesAction = {
    Receive: "categories:receive",
    Loading: "categories:loading",
    Loaded: "categories:loaded",
    Error: "categories:error",
}


export function receive(categories){
    return {
        type: CategoriesAction.Receive,
        payload: categories
    }
}

export function loading(){
    return {
        type: CategoriesAction.Loading
    }
}

export function loaded(){
    return {
        type: CategoriesAction.Loaded
    }
}

export function error(e){
    return {
        type: CategoriesAction.Error,
        payload: e
    }
}