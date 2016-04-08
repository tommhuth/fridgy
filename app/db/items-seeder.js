/**
 * Created by tomm.huth on 08/04/16.
 */
"use strict";

var Item = require('../models/item');
var toSentenceCase = require("../helpers/to-sentence-case");
var items = [
    {
        title:  "chocolate milk",
        category: 0
    },
    {
        title:  "butter",
        category: 0
    },
    {
        title:  "cheese",
        category: 0
    },
    {
        title:  "potatoes",
        category: 3
    },
    {
        title:  "carrots",
        category: 3
    },
    {
        title:  "lemon ice tea",
        category: 1
    },
    {
        title:  "beer",
        category: 1
    },
    {
        title:  "pork chops",
        category: 2
    },
    {
        title: "orange juice",
        category: 1
    },
    {
        title: "milk",
        category: 0
    },
    {
        title: "olive oil",
        category: 4
    },
    {
        title: "fish fillet",
        category: 2
    },
    {
        title: "chicken drumsticks",
        category: 2
    }
];
var categories = ["DIARY", "dDRInkables", "Meat and fish", "fruit and vegetables", "condIMents"];

module.exports = function() {
    Item.remove({});

    for (let key in items) {
        let item = new Item({
            title: toSentenceCase(items[key].title),
            category: toSentenceCase(categories[items[key].category]),
            amount: Math.floor(Math.random() * 4),
            favorite: Math.random() > .70,
            listed: Math.random() > .85
        });

        item.save().then(() => console.log("seeded " + items[key].title));
    }
};