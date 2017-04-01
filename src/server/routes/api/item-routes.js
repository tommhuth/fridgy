import express from "express"
import * as ItemRepo from "../../repositories/item-repo"
import {Auth} from "../../auth/Auth"

let router = express.Router()

router.post("/", Auth.requireWriteAccess(), async function (req, res, next) {
    try {
        res.status(201).json(await ItemRepo.insert(req.body))
    } catch (e) {
        next(e)
    }
})

router.get("/", async function (req, res, next) {
    try {
        res.status(200).json(await ItemRepo.find(req.query))
    } catch (e) {
        next(e)
    }
})

router.get("/:slug", async function (req, res, next) {
    try {
        res.status(200).json(await ItemRepo.get(req.params.slug, true))
    } catch (e) {
        next(e)
    }
})

router.put("/:slug", Auth.requireWriteAccess(), async function (req, res, next) {
    try {
        res.status(200).json(await ItemRepo.update(req.params.slug, req.body))
    } catch (e) {
        next(e)
    }
})

router.delete("/:slug", Auth.requireWriteAccess(), async function (req, res, next) {
    try {
        res.status(204).json(await ItemRepo.remove(req.params.slug))
    } catch (e) {
        next(e)
    }
})

export default router
