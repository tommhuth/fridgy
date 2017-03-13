export const AuthAction = {
    Success: "auth:success",
    Loading: "auth:loading",
    Loaded: "auth:loaded",
    Error: "auth:error",
    ClearError: "auth:clear-error"
}


export function success(userAccess){
    return {
        type: AuthAction.Success,
        payload: userAccess
    }
}

export function clearError(){
    return {
        type: AuthAction.ClearError
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