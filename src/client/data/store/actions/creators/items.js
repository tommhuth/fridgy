export const ItemsAction = {
    Receive: "items:receive",
    Loaded: "items:loaded",
    Loading: "items:loading",
    Error: "items:error"
}

export function receive(items) {
    return {
        type: ItemsAction.Receive,
        payload: items
    }
}

export function loading() {
    return {
        type: ItemsAction.Loading
    }
}

export function loaded() {
    return {
        type: ItemsAction.Loaded
    }
}

export function error() {
    return {
        type: ItemsAction.Error
    }
}
