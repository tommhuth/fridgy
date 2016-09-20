"use strict"

import express from "express"
import * as ItemRepo from "../repositories/item-repo"

let router = express.Router()

router.get("/", function (req, res, next) {
    ItemRepo.aggregateTags()
        .then((data) => res.json(data))
        .catch((error) => next(error))
})


export default router