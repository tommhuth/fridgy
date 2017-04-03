import * as appActions from "./creators/app"

export function toggleMenu() {
    return (dispatch) => {
        dispatch(appActions.toggle())
    }
}

export function hideMenu() {
    return (dispatch) => {
        dispatch(appActions.hide())
    }
}

export function showMenu() {
    return (dispatch) => {
        dispatch(appActions.show())
    }
}