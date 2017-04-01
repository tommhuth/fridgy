export const ItemAction = {
    Clear: "item:clear",
    Receive: "item:receive",
    Loading: "item:loading",
    Loaded: "item:loaded",
    Error: "item:error",
    Update: "item:update"
}

export function updateItem(item) {
    return {
        type: ItemAction.Update,
        payload: item
    }
}

export function clear() {
    return {
        type: ItemAction.Clear
    }
}

export function receive(item) {
    return {
        type: ItemAction.Receive,
        payload: item
    }
}


export function loading() {
    return {
        type: ItemAction.Loading
    }
}

export function loaded() {
    return {
        type: ItemAction.Loaded
    }
}

export function error() {
    return {
        type: ItemAction.Error
    }
}

