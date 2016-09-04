export default (state = [], action) => {
    switch(action.type) {
    case "RECEIVE_ITEMS":
        return [...action.items]
    case "ADD_ITEM":
        return [
            ...state,
            {
                _id: Date.now(),
                name: action.name
            }
        ]
    case "CLEAR_ITEM":
        return [
            ...state.filter((i) => action.id !== i._id)
        ]
    default: return state
    }
}