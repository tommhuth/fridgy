"use strict"

import Item from "../repositories/models/item-model"
import { default as toSentenceCase } from "../helpers/to-sentence-case"
import debug from "debug"

const log = debug("fridgy-server:item-seeder") 

let items = [
    {
        title:  "chocolate milk",
        category: 0,
        unit: 0
    },
    {
        title:  "butter",
        category: 0,
        unit: 2
    },
    {
        title:  "cheese",
        category: 0,
        unit: 1
    },
    {
        title:  "potatoes",
        category: 3,
        unit: 1
    },
    {
        title:  "carrots",
        category: 3,
        unit: 1
    },
    {
        title:  "lemon ice tea",
        category: 1,
        unit: 0
    },
    {
        title:  "beer",
        category: 1,
        unit: 0
    },
    {
        title:  "pork chops",
        category: 2,
        unit: 1
    },
    {
        title: "orange juice",
        category: 1,
        unit: 0
    },
    {
        title: "milk",
        category: 0,
        unit: 0
    },
    {
        title: "olive oil",
        category: 4,
        unit: 0
    },
    {
        title: "fish fillet",
        category: 2,
        unit: 1
    },
    {
        title: "chicken drumsticks",
        category: 2,
        unit: 1
    }
]
let categories = ["Diary", "drinkables", "Meat and fish", "fruit and vegetables", "condiments"]
let units = ["l", "pcs", "kg"]

export default function() {
    return Item.remove({})
        .then(() => {
            let all = []

            for (let i of items) {
                let item = new Item({
                    title: toSentenceCase(i.title),
                    category: toSentenceCase(categories[i.category]),
                    unit: units[i.unit],
                    amount: Math.floor(Math.random() * 4),
                    favorite: Math.random() > .5,
                    listed:  Math.random() > .7
                })

                all.push(item.save())
            }

            log("Seeding items collection, " + items.length + " items")

            return Promise.all(all)
        })
}