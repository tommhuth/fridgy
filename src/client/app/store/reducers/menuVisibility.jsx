export default (state = false, action) => {
    switch(action.type) {
        case "SHOW_MENU": return true;
        case "HIDE_MENU": return false;
        case "TOGGLE_MENU": return !state;
        default: return state;
    }
};
