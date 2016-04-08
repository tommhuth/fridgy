/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

var express = require("express");
var router = express.Router();
var Item = require("../models/item");
var notFoundParser = require("../parsers/not-found-parser");
var validationErrorsParser = require("../parsers/validation-errors-parser");
var toSentenceCase = require("../helpers/to-sentence-case");


router.post("/", function (request, result, next) {
    var item = new Item({
        title: toSentenceCase(request.body.title),
        category: request.body.category,
        amount: request.body.amount,
        favorite: request.body.favorite,
        listed: request.body.listed
    });

    item.save()
        .then((data) => result.status(201).json(data))
        .catch((errors) => result.status(422).send(validationErrorsParser(errors)));
});

router.get("/", function (request, result, next) {
    Item.find()
        .then((data) => result.json(data));
});

router.get("/:item_slug", function (request, result, next) {
    Item.findBySlug(request.params.item_slug)
        .then(notFoundParser)
        .then((data) => result.json(data));
});

router["delete"]("/:item_slug", function (request, result, next) {
    Item.findBySlug(request.params.item_slug)
        .then(notFoundParser)
        .then((item) => item.remove())
        .then(() => result.status(204).send());
});

module.exports = router;