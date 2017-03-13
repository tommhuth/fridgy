import { AuthAction } from "../actions/creators/auth"

const init = {
    data: {},
    error: null,
    isLoading: false
}

export default (state = init, action) => {
    switch (action.type) {
        case AuthAction.Success:
            return {
                ...state,
                error: null,
                data: action.payload
            }
        case AuthAction.Error:
            return {
                ...state,
                error: action.payload
            }
        case AuthAction.Loaded:
            return {
                ...state,
                isLoading: false
            }
        case AuthAction.Loading:
            return {
                ...state,
                isLoading: true
            }
        case AuthAction.ClearError:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}