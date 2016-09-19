import { default as Item } from "./models/item-model"
import { default as notFoundParser } from "../parsers/not-found-parser" 
import { default as mongoErrorParser } from "../parsers/mongo-error-parser"
import { default as toSentenceCase } from "../helpers/to-sentence-case"
import buildSearchObject from "../helpers/build-search-query"


function some(query) { 
    return Item.find(...buildSearchObject(query))
        .sort(query.search ? { score: { $meta: "textScore" } } : "title")
        .exec()
        .catch(mongoErrorParser)
}

function all() {
    return Item.find()
        .sort("title")
        .exec()
        .catch(mongoErrorParser)
}

export function search(keyword) {
    return Item.find({ $or: [{ title: new RegExp(keyword, "i") },{ category:  new RegExp(keyword, "i") } ] })
        .sort("title")
        .exec()
        .catch(mongoErrorParser)
}

export function insert(data) {
    let tags = Array.isArray(data.tags) ? data.tags.map(tag => tag.trim().toLowerCase()) : null
    let item = new Item({
        title: toSentenceCase(data.title),
        category: toSentenceCase(data.category),
        unit: (data.unit || "").toLowerCase(),
        amount: data.amount,
        favorite: data.favorite,
        listed: data.listed,
        tags: tags
    })

    return item.save().catch(mongoErrorParser)
}

export function find(query) {   
    if (!query || !Object.keys(query).length) {
        return all()       
    }

    return some(query)
}

export function get(slug, includeSimiliar) {  
    return Item.findOne({ slug }) 
        .then(notFoundParser)  
        .then(item => {
            if(includeSimiliar && Array.isArray(item.tags) && item.tags.length){ 
                return getSimilar(item.tags, item.slug)
                    .then(similar => ({ ...item.toObject(), similar }))
            } 

            return item
        })
        .catch(mongoErrorParser)
}

export function update(slug, data) {
    return get(slug)
        .then(item => {
            item.title = data.title || item.title
            item.category = data.category || item.category
            item.unit = typeof data.unit === "number" ? data.unit : item.unit
            item.amount = typeof data.amount === "number" ? data.amount : item.amount
            item.listed = typeof data.listed === "boolean" ? data.amount : item.listed
            item.favorite = typeof data.favorite === "boolean" ? data.favorite : item.favorite

            return item.save()
        }) 
        .catch(mongoErrorParser)
}
 
export function remove(slug) {
    return Item.find({ slug: slug }).remove().exec()
        .then(notFoundParser) 
        .catch(mongoErrorParser)
}

export function getSimilar(tags, excludeId) {
    if(!Array.isArray(tags) || !tags.length) return

    return Item.aggregate([
        { $match: { tags: { $in: tags }, _id: { $ne: excludeId } } },
        { $project: { tags: 1, slug: 1, title: 1 } },
        { $unwind: "$tags" },
        { $match: { tags: { $in: tags } } },
        {
            $group: {
                "_id": "$_id",
                "score": { $sum: 1 },
                "slug": { $first: "$slug" },
                "title": { $first: "$title" }
            }
        },
        { $sort: { "score": -1 } },
        { $limit: 5 },
        { $project: { _id: 0,  slug: 1, title: 1, score: 1 } }
    ]).exec()
}

export function aggregateCategories() {
    // This should not be an error, eslint
    /*eslint-disable indent*/
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
        .catch(mongoErrorParser) 
    /*eslint-enable indent*/
}

export function aggregateUnits() { 
    // This should not be an error, eslint  
    /*eslint-disable indent*/
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
        .catch(mongoErrorParser)  
    /*eslint-enable indent*/
}