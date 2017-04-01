import express from "express"
import { Auth } from "../../auth/Auth"

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