/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

var express = require("express");
var router = express.Router();
var itemRouter = require("./item-routes");
var categoriesRouter = require("./categories-routes");

router.use("/items", itemRouter);
router.use("/categories", categoriesRouter);

module.exports = router;