import * as menu from "./creators/menu"

export function toggleMenu() {
    return (dispatch) => {
        dispatch(menu.toggle())
    }
}

export function hideMenu() {
    return (dispatch) => {
        dispatch(menu.hide())
    }
}

export function showMenu() {
    return (dispatch) => {
        dispatch(menu.show())
    }
}