import express from "express" 

let router = express.Router()

function render(req, res) {
    res.render("index")
}

router.get("/", render) 
router.get("/checklist", render)
router.get("/about", render)
router.get("/items", render)
router.get("/items/:slug", render)
router.get("/items/:slug/edit", render)


export default router