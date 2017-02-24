export const ItemAction = {
    Clear: "item:clear",
    Receive: "item:receive",
    Loading: "item:loading",
    Loaded: "item:loaded",
    Error: "item:error",
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

