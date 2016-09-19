import { expect } from "chai"
import { app } from "../../src/server/server"
import supertest from "supertest"

suite("API - /api/items")

let item = {
    title: "Test",
    amount: 1,
    category: "Test category",
    favorite: true,
    listed: true,
    tags: ["tag"]
}
let existingItem

test("Should get all items", function (done) {
    supertest(app)
        .get("/api/items")
        .expect(200)
        .expect(res => {
            res = res.body

            expect(res).to.be.an("array")
            expect(res.length).to.equal(13)
        })
        .end(done)
})

test("Should search for items", function (done) {
    supertest(app)
        .get("/api/items")
        .query({ search: "milk", category: "diary" })
        .expect(200)
        .expect(res => {
            res = res.body

            expect(res).to.be.an("array")
            expect(res.length).to.equal(2)
        })
        .end(done)
})

test("Should add item", function (done) {
    supertest(app)
        .post("/api/items")
        .send(item)
        .expect(201)
        .expect(res => {
            res = res.body
            existingItem = res

            expect(res.title).to.equal(item.title)
            expect(res.amount).to.equal(item.amount)
            expect(res.category).to.equal(item.category)
            expect(res.favorite).to.equal(item.favorite)
            expect(res.listed).to.equal(item.listed)
            expect(res.createdAt).to.be.ok
            expect(res.updatedAt).to.be.ok
            expect(res.slug).to.be.ok
            expect(res.id).to.be.ok
        })
        .end(done)
})

test("Should fail add item with missing input", function (done) {
    supertest(app)
        .post("/api/items")
        .send({ title: null })
        .expect(422)
        .expect(res => {
            res = res.body

            expect(res.status).to.equal(422)
            expect(res.message).to.be.ok
            expect(res.errors).to.be.an("array")
            expect(res.errors.length).to.equal(4)
        })
        .end(done)
})

test("Should fail with invalid JSON", function (done) {
    supertest(app)
        .post("/api/items")
        .send("{ invalid")
        .set("content-type", "application/json")
        .expect(400)
        .expect(res => {
            res = res.body

            expect(res.message).to.be.ok
            expect(res.status).to.equal(400)
        })
        .end(done)
})

test("Should get single item by slug", function (done) {
    supertest(app)
        .get("/api/items/" + existingItem.slug) 
        .expect(200)
        
        .expect(res => {
            res = res.body

            expect(res.title).to.equal(existingItem.title)
            expect(res.amount).to.equal(existingItem.amount)
            expect(res.category).to.equal(existingItem.category)
        })
        .end(done)
})

test("Should (partialy) update single item, ignoring invalid values", function (done) {
    supertest(app)
        .put("/api/items/" + existingItem.slug)
        .send({
            title: null,
            category: "Category",
            amount: "no",
            listed: true,
            favorite: true
        })
        .expect(200)
        .expect(res => {
            res = res.body

            expect(res.title).to.equal(existingItem.title)
            expect(res.amount).to.equal(existingItem.amount)
            expect(res.unit).to.equal(existingItem.unit)
            expect(res.category).to.equal("Category")
            expect(res.listed).to.equal(true)
            expect(res.favorite).to.equal(true)
        })
        .end(done)
})

test("Should remove item by slug", function (done) {
    supertest(app)
        .delete("/api/items/" + existingItem.slug)
        .expect(204)
        .end(done)
})

test("Should fail getting unknown item by slug", function (done) {
    supertest(app)
        .delete("/api/items/" + existingItem.slug)
        .expect(404)
        .end(done)
})

test("Should fail removing unknown item by slug", function (done) {
    supertest(app)
        .delete("/api/items/" + existingItem.slug)
        .expect(404)
        .end(done)
}) 
