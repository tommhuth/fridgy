"use strict";

import express from "express";
import Item from "../models/item";

let router = express.Router();

router.get("/", function (request, result, next) {
    Item.aggregate(
            [
                {
                    $group: {
                        _id: "$unit", popularity: { $sum: 1 }
                    }
                },
                { $sort: {  "_id" : 1 } }
            ]
        )
        .exec()
        .then((data) => data.map((e) => ({ unit: e._id, popularity: e.popularity })))
        .then((data) => result.json(data))
        .catch((error) => next(error));
});


export default router;