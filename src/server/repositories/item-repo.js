import { default as Item } from "./models/item-model"
import { default as notFoundParser } from "../parsers/not-found-parser"
import { default as validationErrorParser } from "../parsers/validation-error-parser"
import { default as mongooseErrorParser } from "../parsers/mongoose-error-parser"
import { default as toSentenceCase } from "../helpers/to-sentence-case"
import buildSearchObject from "../helpers/build-search-query"

export function insert(data) {
    let item = new Item({
        title: toSentenceCase(data.title),
        category: toSentenceCase(data.category),
        unit: (data.unit || "").toLowerCase(),
        amount: data.amount,
        favorite: data.favorite,
        listed: data.listed
    })

    return item.save()
        .then(mongooseErrorParser)
        .catch(validationErrorParser)
}

export function find(options) {   
    if (!options || !Object.keys(options).length) {
        return Item.find().sort("title").exec().then(mongooseErrorParser)
    }

    return Item.find(...buildSearchObject(options))
        .sort(options.search ? { score: { $meta: "textScore" } } : "title")
        .exec()
}

export function get(slug) {
    return Item.findOne({ slug })
        .then(notFoundParser)
        .then(mongooseErrorParser)
        .catch(validationErrorParser)
}

export function update(slug, data) {
    return Item.findOne({ slug })
        .then(notFoundParser)
        .then(item => {
            item.title = data.title || item.title
            item.category = data.category || item.category
            item.unit = typeof data.unit === "number" ? data.unit : item.unit
            item.amount = typeof data.amount === "number" ? data.amount : item.amount
            item.listed = typeof data.listed === "boolean" ? data.amount : item.listed
            item.favorite = typeof data.favorite === "boolean" ? data.favorite : item.favorite

            return item.save()
        })
        .then(mongooseErrorParser)
        .catch(validationErrorParser)
}

export function remove(slug) {
    return Item.find({ slug: slug }).remove().exec()
        .then(notFoundParser)
        .then(mongooseErrorParser)
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
        .then(data => data.map((e) => ({ category: e._id, popularity: e.popularity })))
        .then(mongooseErrorParser)
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
        .then(mongooseErrorParser)
}