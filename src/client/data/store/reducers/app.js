import { AppAction } from "../actions/creators/app"

const init = {
    menuVisible: false,
    version: process.env.APP_VERSION
}

export default (state = init, action) => {
    switch (action.type) {
        case AppAction.ShowMenu:
            return { ...state, menuVisible: true }
        case AppAction.HideMenu:
            return { ...state, menuVisible: false }
        case AppAction.ToggleMenu:
            return { ...state, menuVisible: !state.menuVisible }
        default:
            return state
    }
}
