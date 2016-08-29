"use strict";

import express from "express";
import { default as itemRouter } from  "./item-routes" ;
import { default as categoriesRouter } from "./category-routes";
import { default as unitsRouter } from "./unit-routes";

let router = express.Router();

router.use("/", function(req,res, next) {
    // haha
    //setTimeout(next, Math.random() * 150);
    next();
})
router.use("/items", itemRouter);
router.use("/categories", categoriesRouter);
router.use("/units", unitsRouter);


export default router;