import express from "express"
import itemRouter from "./item-routes"
import categoriesRouter from "./category-routes"
import unitsRouter from "./unit-routes"
import tagsRouter from "./tags-routes"

let router = express.Router()

router.use("/items", itemRouter)
router.use("/categories", categoriesRouter)
router.use("/units", unitsRouter)
router.use("/tags", tagsRouter)


export default router