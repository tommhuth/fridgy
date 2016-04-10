/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

import express from "express";
import { default as itemRouter } from  "./item-routes" ;
import { default as categoriesRouter } from "./categories-routes";

let router = express.Router();

router.use("/items", itemRouter);
router.use("/categories", categoriesRouter);


export default router;