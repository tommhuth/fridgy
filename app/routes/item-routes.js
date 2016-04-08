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
var _ = require("lodash");

router.post("/", function (request, result, next) {
    var item = new Item({
        title: toSentenceCase(request.body.title),
        category: toSentenceCase(request.body.category),
        amount: request.body.amount,
        favorite: request.body.favorite,
        listed: request.body.listed
    });

    item.save()
        .then((data) => result.status(201).json(data))
        .catch((errors) => result.status(422).send(validationErrorsParser(errors)))
        .done();
});

router.get("/", function (request, result, next) {
    Item.find()
        .then((data) => result.json(data))
        .done();
});

router.get("/:item_slug", function (request, result, next) {
    Item.findBySlug(request.params.item_slug)
        .then(notFoundParser)
        .then((data) => result.json(data))
        .catch((error) => result.status(404).send())
        .done();
});

router["delete"]("/:item_slug", function (request, result, next) {
    Item.findBySlug(request.params.item_slug)
        .then(notFoundParser)
        .then((item) => item.remove())
        .then(() => result.status(204).send())
        .catch((error) => result.status(404).send())
        .done()
});

module.exports = router;