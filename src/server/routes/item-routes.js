"use strict";

import express from "express";
import * as ItemRepo  from "../repositories/item-repo";

let router = express.Router();

router.post("/", function (req, res, next) {
    ItemRepo.insert(req.body)
        .then(item => res.status(201).json(item))
        .catch(error => next(error));
});

router.get("/", function (req, res, next) {
    ItemRepo.all()
        .then(items => res.json(items))
        .catch(error => next(error));
});

router.get("/:slug", function (req, res, next) {
    ItemRepo.get(req.params.slug)
        .then(item => res.json(item))
        .catch(error => next(error));
});

router.delete("/:slug", function (req, res, next) {
    ItemRepo.remove(req.params.slug)
        .then(() => res.status(204).end())
        .catch(error => next(error));
});

export default router;