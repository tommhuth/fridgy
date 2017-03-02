import express from "express"
import itemRouter from "./item-routes"
import categoriesRouter from "./category-routes"
import unitsRouter from "./unit-routes"
import tagsRouter from "./tags-routes"
import authRouter from "./auth-routes"
import { Auth } from "../auth/auth"

let router = express.Router()

// routes without auth
router.use("/auth", authRouter)

// basic api auth
router.use(Auth.requireReadAccess())

router.use("/items", itemRouter)
router.use("/categories", categoriesRouter)
router.use("/units", unitsRouter)
router.use("/tags", tagsRouter)

export default router