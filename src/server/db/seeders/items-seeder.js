import Item from "../../repositories/models/item-model"
import { default as toSentenceCase } from "../../helpers/to-sentence-case"
import debug from "debug"

const log = debug("fridgy-server:item-seeder")

let items = [
    {
        title: "chocolate milk",
        category: 0,
        unit: 0,
        tags: ["snacks", "candy", "dairy"]
    },
    {
        title: "butter",
        category: 0,
        unit: 2,
        tags: ["basic", "frying", "dairy"]
    },
    {
        title: "cheese",
        category: 0,
        unit: 1,
        tags: ["bread", "basic", "dairy"]
    },
    {
        title: "potatoes",
        category: 3,
        unit: 1,
        tags: ["dinner", "basic", "vegetables"]
    },
    {
        title: "carrots",
        category: 3,
        unit: 1,
        tags: ["dinner", "basic", "vegetables"]
    },
    {
        title: "lemon ice tea",
        category: 1,
        unit: 0,
        tags: ["drink"]
    },
    {
        title: "beer",
        category: 1,
        unit: 0,
        tags: ["party", "drink"]
    },
    {
        title: "pork chops",
        category: 2,
        unit: 1,
        tags: ["dinner", "basic", "meat"]
    },
    {
        title: "orange juice",
        category: 1,
        unit: 0,
        tags: ["drink", "breakfast"]
    },
    {
        title: "milk",
        category: 0,
        unit: 0,
        tags: ["drink", "basic", "dairy"]
    },
    {
        title: "olive oil",
        category: 4,
        unit: 0,
        tags: ["condiments", "dinner"]
    },
    {
        title: "fish fillet",
        category: 2,
        unit: 1,
        tags: ["dinner", "meat", "basic"]
    },
    {
        title: "chicken drumsticks",
        category: 2,
        unit: 1,
        tags: ["dinner", "meat", "basic"]
    }
]
let categories = ["dairy", "drinkables", "Meat and fish", "fruit and vegetables", "condiments"]
let units = ["l", "pcs", "kg"]

export default function () {
    return Item.remove({})
        .then(() => {
            let all = []

            for (let i of items) {
                let item = new Item({
                    title: toSentenceCase(i.title),
                    category: toSentenceCase(categories[i.category]),
                    unit: units[i.unit],
                    amount: Math.floor(Math.random() * 5),
                    favorite: Math.random() > .6,
                    checklist: Math.random() > .5 ? null : "2000-01-01",
                    tags: i.tags
                })

                all.push(item.save())
            }

            log(`Seeding collection, ${items.length} items`)
            log(`${categories.length} unique categories`)
            log(`${units.length} unique units`)

            return Promise.all(all)
        })
} 