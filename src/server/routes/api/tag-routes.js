import express from "express"
import * as ItemRepo from "../../repositories/item-repo"

let router = express.Router()

router.get("/", async function (req, res, next) {
    try {
        res.status(200).json(await ItemRepo.aggregateTags())
    } catch (e) {
        next(e)
    }
})


export default router