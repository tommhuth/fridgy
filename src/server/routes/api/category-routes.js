import express from "express"
import * as ItemRepo from "../../repositories/item-repo"

let router = express.Router()

router.get("/", async function (req, res, next) {
    try {
        res.json(await ItemRepo.aggregateCategories())
    } catch (e) {
        next(e)
    } 
})


export default router