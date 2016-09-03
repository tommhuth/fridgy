"use strict";

import express from "express";
import * as ItemRepo from "../repositories/item";

let router = express.Router();

router.get("/", function (req, res, next) {
    ItemRepo.aggregateCategories()
        .then((data) => res.json(data))
        .catch((error) => next(error));
});


export default router;