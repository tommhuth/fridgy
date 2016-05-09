export default (state = [], action) => {
    switch(action.type) {
        case "RECEIVE_ITEMS":
            return [...action.items];
        case "ADD_ITEM":
            return [
                ...state,
                {
                    _id: Date.now(),
                    name: action.name
                }
            ];
        case "REMOVE_ITEM":
            return [
                ...state.filter((i) => action._id !== i._id)
            ];
        default: return state;
    }
};