import express from "express"
import * as ItemRepo from "../../repositories/item-repo"

let router = express.Router()

router.get("/:date", async function (req, res, next) {
    try {
        res.json(await ItemRepo.find({ checklist: req.params.date }))
    } catch (e) {
        next(e)
    }
})


export default router