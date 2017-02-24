export const MenuAction = {
    Toggle: "menu:toggle",
    Show: "menu:show",
    Hide: "menu:hide"
}


export function toggle() {
    return {
        type: MenuAction.Toggle
    }
}

export function hide() {
    return {
        type: MenuAction.Hide
    }
}

export function show() {
    return {
        type: MenuAction.Show
    }
}