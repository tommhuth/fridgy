/**
 * Created by Tomm on 07.04.2016.
 */
var express = require("express");
var router = express.Router();
var Item = require("../models/item");
var errorParser = require("./error-handler");

router.post("/", function (request, result, next) {
    var item = new Item({
        title: request.body.title,
        category: request.body.category,
        amount: request.body.amount,
        favorite: request.body.favorite,
        listed: request.body.listed
    });

    item
        .save()
        .then((data) => result.status(201).json(data))
        .catch(console.log)
        .finally(next);
});

router.get("/", function (request, result, next) {
    Item.find()
        .exec()
        .then((data) => result.json(data))
        .catch(console.log)
        .finally(next);
});

router.get("/:item_slug", function (request, result, next) {
    Item.findBySlug(request.params.item_slug)
        .exec()
        .then(errorParser)
        .then((data) => result.json(data))
        .catch(console.log)
        .finally(next);
});

router["delete"]("/:item_slug", function (request, result, next) {
    Item.findBySlug(request.params.item_slug)
        .then(errorParser)
        .then((item) => item.remove())
        .then(() => result.status(204).send())
        .catch(console.log)
        .finally(next);
});

module.exports = router;