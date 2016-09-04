import { default as Item } from "./models/item-model"
import { ValidationError } from "../errors/validation-error"
import { default as notFoundParser } from "../parsers/not-found-parser"
import { default as toSentenceCase } from "../helpers/to-sentence-case"

export function insert(data) {
    let item = new Item({
        title: toSentenceCase(data.title),
        category: toSentenceCase(data.category),
        unit: (data.type || "").toLowerCase(),
        amount: data.amount,
        favorite: data.favorite,
        listed: data.listed
    })

    return item.save()
        .catch(error => {
            if (error.name === "ValidationError") {
                throw new ValidationError(error.errors)
            }

            throw error
        })
}

export function all() {
    return Item.find()
}

export function get(slug) {
    return Item.findBySlug(slug).then(notFoundParser)
}

export function remove(slug) {
    return get(slug).then(item => item.remove())
}

export function aggregateCategories() {
    return Item.aggregate([
        {
            $group: {
                _id: "$category", popularity: { $sum: 1 }
            }
        },
            { $sort: { "popularity": -1 } }
    ])
        .exec()
        .then(data => data.map((e) => ({ unit: e._id, popularity: e.popularity })))
}

export function aggregateUnits() {
    return Item.aggregate([
        {
            $group: {
                _id: "$unit", popularity: { $sum: 1 }
            }
        },
            { $sort: { "_id": 1 } }
    ])
        .exec()
        .then(data => data.map((e) => ({ unit: e._id, popularity: e.popularity })))
}