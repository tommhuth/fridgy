export const AuthAction = {
    Success: "auth:success",
    Loading: "auth:loading",
    Loaded: "auth:loaded",
    Error: "auth:error",
}


export function success(userAccess){
    return {
        type: AuthAction.Success,
        payload: userAccess
    }
}

export function error(error){
    return {
        type: AuthAction.Error,
        payload: error
    }
}

export function loading(){
    return {
        type: AuthAction.Loading 
    }
} 

export function loaded(){
    return {
        type: AuthAction.Loaded 
    }
} 