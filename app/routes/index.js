/**
 * Created by Tomm on 07.04.2016.
 */
var express = require("express");
var router = express.Router();
var itemRouter = require("./items");


router.use("/items", itemRouter);

router.use((request, result) => result.status(404).send());

router.use((error, request, result) => result.status(500).send(error));


module.exports = router; 