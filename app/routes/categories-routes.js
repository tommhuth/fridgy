/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

var express = require("express");
var router = express.Router();
var Item = require("../models/item");


router.get("/", function (request, result, next) {
    Item.aggregate(
            [
                {
                    $group: {
                        _id: "$category", popularity: {$sum: 1}
                    }
                },
                { $sort: {  "_id" : 1} }
            ]
        )
        .exec()
        .then((data) => data.map((e) => ({ category: e._id, popularity: e.popularity })))
        .then((data) => result.json(data))
        .finally(next);
});


module.exports = router;