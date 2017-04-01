import * as menuActions from "./creators/menu"

export function toggleMenu() {
    return (dispatch) => {
        dispatch(menuActions.toggle())
    }
}

export function hideMenu() {
    return (dispatch) => {
        dispatch(menuActions.hide())
    }
}

export function showMenu() {
    return (dispatch) => {
        dispatch(menuActions.show())
    }
}