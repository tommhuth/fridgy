/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

import express from "express";
import { default as Item } from "../models/item";
import { default as notFoundParser } from "../parsers/not-found-parser";
import { default as validationErrorsParser } from "../parsers/validation-errors-parser";
import { default as toSentenceCase } from "../helpers/to-sentence-case";

let router = express.Router();

router.post("/", function (request, result, next) {
    var item = new Item({
        title: toSentenceCase(request.body.title),
        category: toSentenceCase(request.body.category),
        unit: (request.body.type || '').toLowerCase(),
        amount: request.body.amount,
        favorite: request.body.favorite,
        listed: request.body.listed
    });

    item.save()
        .then((data) => result.status(201).json(data))
        .catch((error) => {
            let e = new Error();
            e.status = error.errors ? 422 : 500;

            if(error.errors) e.body = validationErrorsParser(error);

            next(e);
        })
        .done();
});

router.get("/", function (request, result, next) {
    Item.find()
        .then((data) => result.json(data))
        .catch((error) => next(error))
        .done();
});

router.get("/:slug", function (request, result,next) {
    Item.findBySlug(request.params.slug)
        .then(notFoundParser)
        .then((data) => result.json(data))
        .catch((error) => next(error))
        .done();
});

router["delete"]("/:slug", function (request, result, next) {
    Item.findBySlug(request.params.slug)
        .then(notFoundParser)
        .then((item) => item.remove())
        .then(() => result.status(204).send())
        .catch((error) => next(error))
        .done();
});

export default router;