import { MenuAction } from "../actions/creators/menu"

const init = {
    visible: false
}

export default (state = init, action) => {
    switch (action.type) {
        case MenuAction.Show:
            return { ...state, visible: true }
        case MenuAction.Hide:
            return { ...state, visible: false }
        case MenuAction.Toggle:
            return { ...state, visible: !state.visible }
        default:
            return state
    }
}
