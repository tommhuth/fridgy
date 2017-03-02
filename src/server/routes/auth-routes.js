import express from "express"
import { Auth } from "../auth/auth"

let router = express.Router()

router.post("/login", function (req, res, next) {
    try {
        let accessLevel = Auth.getAccessLevel(req.body.token)

        res.json(accessLevel)
    } catch (e) {
        next(e)
    }
})


export default router