export default function (input) {
    let search = {}

    if (input.search) {
        search.$text = { $search: input.search, $language: "en" }
    }

    if (input.category) {
        search.category = { $regex: new RegExp(input.category, "i") }
    }

    if (input.title) {
        search.title = { $regex: new RegExp(input.title, "i") }
    }

    if (parseBoolean(input.listed)) {
        search.listed = input.listed === "true" ? true : false
    }

    if (parseBoolean(input.favorite)) {
        search.favorite = input.favorite === "true" ? true : false
    }

    return [search, search.$text ? { score: { $meta: "textScore" } } : null]
}

function parseBoolean(raw) {
    return raw === "false" || raw === "true"
}