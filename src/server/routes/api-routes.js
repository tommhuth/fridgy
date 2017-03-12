import express from "express"
import itemRouter from "./api/item-routes"
import categoryRouter from "./api/category-routes"
import unitRouter from "./api/unit-routes"
import tagRouter from "./api/tag-routes"
import authRouter from "./api/auth-routes"
import checklistRouter from "./api/checklist-routes"
import { Auth } from "../auth/auth"

let router = express.Router()

// routes without auth
router.use("/auth", authRouter)

// basic api auth
router.use(Auth.requireReadAccess())

router.use("/items", itemRouter)
router.use("/categories", categoryRouter)
router.use("/units", unitRouter)
router.use("/tags", tagRouter)
router.use("/checklist", checklistRouter)

export default router