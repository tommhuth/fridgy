export default (state = {}, action) => {
    switch(action.type) {
        case "RECEIVE_ITEM":
            return { ...action.item };
        case "CLEAR_ITEM":
            return {};
        default: return state;
    }
}