export const ItemsAction = {
    Receive: "items:receive",
    Checklist: "items:checklist",
    Dechecklist: "items:dechecklist",
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

export function checklist(slug, date) {
    return {
        type: ItemsAction.Checklist,
        payload: { slug, date }
    }
}

export function dechecklist(slug) {
    return {
        type: ItemsAction.Dechecklist,
        payload: slug
    }
}

export function update(item) {
    return {
        type: ItemsAction.Update,
        payload: item
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
