import { default as Item } from "./models/item-model" 
import { default as notFoundParser } from "../parsers/not-found-parser"
import { default as validationErrorParser } from "../parsers/validation-error-parser"
import { default as mongooseErrorParser } from "../parsers/mongoose-error-parser"
import { default as toSentenceCase } from "../helpers/to-sentence-case"

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

export function all() {
    return Item.find().exec().then(mongooseErrorParser)
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
            item.unit = data.unit || item.unit
            item.amount = data.amount || item.amount
            item.listed = data.listed || item.listed
            item.favorite = data.favorite || item.favorite 

            return item.save()
        })
        .then(mongooseErrorParser)
        .catch(validationErrorParser)
}

export function remove(slug) {
    return Item.find({ slug:slug }).remove().exec()
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