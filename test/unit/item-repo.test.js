const { expect } = require("chai")
const ItemRepo = require("../../build/server/repositories/item-repo")
const { NotFoundError } = require("../../build/server/errors/not-found-error")
const { ValidationError } = require("../../build/server/errors/validation-error")
const { InvalidTitleError } = require("../../build/server/errors/invalid-title-error")
const { InvalidChecklistDateError } = require("../../build/server/errors/invalid-checklist-date-error")

suite("ItemRepo")

let existingItem
let item = {
    title: "Test",
    category: "Test category",
    amount: 1,
    unit: "kg",
    favorite: true,
    tags: ["basics"]
}

test("#find() should get all items", function () {
    return ItemRepo.find()
        .then(res => {
            existingItem = res[0]

            expect(res).to.be.an("array")
            expect(res.length).to.equal(13)
        })
})

test("#find() should search for 'chocolate', category = dairy, ignoring case", function (done) {
    ItemRepo.find({ search: "chocolate", category: "dairy" })
        .then(res => {
            expect(res).to.be.an("array")
            expect(res.length).to.equal(1)
            done()
        })
        .catch(done)
})

test("#search() should find all items (partialy) containing 'ea' in the title or category", function (done) {
    ItemRepo.search("ea")
        .then(res => {
            expect(res).to.be.an("array")
            expect(res.length).to.equal(4)
            done()
        })
        .catch(done)
})

test("#get() should return single item by slug, with calculated similar items", function (done) {
    ItemRepo.get(existingItem.slug, true)
        .then(res => {
            expect(res.slug).to.equal(existingItem.slug)
            expect(res.similar).to.be.an("array")
            expect(res.similar.length).to.be.above(0)
            expect(res.similar.length).to.be.at.most(5)
            expect(res.similar[0].slug).to.be.a("string")
            expect(res.similar[0].title).to.be.a("string")
            done()
        })
        .catch(done)
})

test("#get() should fail getting unkown item", function (done) {
    ItemRepo.get("does-not-exist")
        .then(() => {
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.an.instanceof(NotFoundError)
            done()
        })
})

test("#insert() should add new item", function (done) {
    ItemRepo.insert(item)
        .then(res => {
            expect(res.createdAt).to.be.ok
            expect(res.updatedAt).to.be.ok
            expect(res.id).to.be.ok
            expect(res.slug).to.be.ok
            expect(res.title).to.equal(item.title)
            expect(res.unit).to.equal(item.unit)
            expect(res.category).to.equal(item.category)
            expect(res.favorite).to.equal(item.favorite)
            expect(res.amount).to.equal(item.amount)
            done()
        })
        .catch(done)
})

test("#insert() should add new item, ensuring unqiue slug", function (done) {
    ItemRepo.insert(item)
        .then(res => {
            expect(res.slug.includes("-1")).to.equal(true)
            expect(res.title).to.equal(item.title)
            done()
        })
        .catch(done)
})

test("#insert() should fail add new item, missing fields", function (done) {
    ItemRepo.insert({})
        .then(() => {
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.instanceof(ValidationError)
            expect(err.errors.length).to.equal(4)
            done()
        })
})

test("#insert() should fail add new item, invalid checklist date", function (done) {
    ItemRepo.insert(Object.assign({}, item, { checklist: "0-0-0" }))
        .then(() => {
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.instanceof(InvalidChecklistDateError)
            done()
        })
})

test("#insert() should fail add new item, slug must start with chars [a-z]", function (done) {
    ItemRepo.insert(Object.assign(item, { title: "*/" }))
        .then(() => {
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.an.instanceof(InvalidTitleError)
            done()
        })
})

test("#update() should partialy update item", function (done) {
    ItemRepo.update(existingItem.slug, { amount: 10, title: "New Test #2" })
        .then(res => {
            expect(res.title).to.equal("New Test #2")
            expect(res.createdAt).to.be.ok
            expect(res.updatedAt).to.be.ok
            expect(res.id).to.be.ok
            expect(res.slug).to.not.equal(existingItem.slug)
            expect(res.unit).to.equal(existingItem.unit)
            expect(res.category).to.equal(existingItem.category)
            expect(res.favorite).to.equal(existingItem.favorite)
            expect(res.amount).to.equal(10)

            existingItem = res

            done()
        })
        .catch(done)
})

test("#update() should fail update item, slug must start with chars [a-z]", function (done) {
    ItemRepo.update(existingItem.slug, { title: "#2" })
        .then(() => {
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.an.instanceof(InvalidTitleError)
            done()
        })
})

test("#update() should fail update non-exisitng item", function (done) {
    ItemRepo.update("does-not-exist", existingItem)
        .then(() => {
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.an.instanceof(NotFoundError)
            done()
        })
})

test("#remove() should remove item", function (done) {
    ItemRepo.remove(existingItem.slug)
        .then(() => {
            done()
        })
        .catch(done)
})
test("#remove() should fail remove non-existing item", function (done) {
    ItemRepo.remove("does-not-exist")
        .then(() => {
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.an.instanceof(NotFoundError)
            done()
        })
}) 