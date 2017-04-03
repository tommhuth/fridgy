export const AppAction = {
    ToggleMenu: "menu:toggle",
    ShowMenu: "menu:show",
    HideMenu: "menu:hide"
}


export function toggle() {
    return {
        type: AppAction.ToggleMenu
    }
}

export function hide() {
    return {
        type: AppAction.HideMenu
    }
}

export function show() {
    return {
        type: AppAction.ShowMenu
    }
}