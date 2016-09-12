import { expect } from "chai" 
import * as ItemRepo from "../../src/server/repositories/item-repo"
import {NotFoundError} from "../../src/server/errors/not-found-error"
import {ValidationError} from "../../src/server/errors/validation-error"
import {InvalidTitleError} from "../../src/server/errors/invalid-title-error"

suite("ItemRepo")

let existingItem
let item = {
    title: "Test",
    category: "Test category",
    amount: 1,
    unit: "kg",
    listed: true,
    favorite: true
}

test("#find() should get all items", function (done) {
    ItemRepo.find()
        .then(res => { 
            existingItem = res[0]

            expect(res).to.be.an("array")
            expect(res.length).to.equal(13) 
            done()
        })
        .catch(done)
})

test("#find() should search for 'chocolate', category = diary, ignoring case", function (done) {
    ItemRepo.find({ search: "chocolate", category: "diary"})
        .then(res => { 
            expect(res).to.be.an("array")
            expect(res.length).to.equal(1) 
            done()
        })
        .catch(done)
})

test("#get() should return single item by slug", function (done) {
    ItemRepo.get(existingItem.slug)
        .then(res => { 
            expect(res.slug).to.equal(existingItem.slug) 
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
            expect(res.listed).to.equal(item.listed)
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
            expect(err.errors.length).to.equal(3)
            done()
        })
})

test("#insert() should fail add new item, slug must start with chars [a-z]", function (done) { 
    ItemRepo.insert({ ...item, "title": "*/"})
        .then(() => {   
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.an.instanceof(InvalidTitleError)
            done()
        })
})

test("#update() should partialy update item", function (done) {
    ItemRepo.update(existingItem.slug, { amount: 10, title:"New Test #2"})
        .then(res => {    
            expect(res.title).to.equal("New Test #2")
            expect(res.createdAt).to.be.ok
            expect(res.updatedAt).to.be.ok
            expect(res.id).to.be.ok
            expect(res.slug).to.not.equal(existingItem.slug)
            expect(res.unit).to.equal(existingItem.unit)
            expect(res.category).to.equal(existingItem.category)
            expect(res.favorite).to.equal(existingItem.favorite)
            expect(res.listed).to.equal(existingItem.listed)
            expect(res.amount).to.equal(10) 

            existingItem = res

            done()
        })
        .catch(done)
})

test("#update() should fail update item, slug must start with chars [a-z]", function (done) {
    ItemRepo.update(existingItem.slug, { title:"#2" })
        .then(() => {    
            done(new Error("Should not get here"))
        })
        .catch(err => {
            expect(err).to.be.an.instanceof(InvalidTitleError)
            done()
        })
}) 

test("#update() should fail update non-exisitng item", function (done) {
    ItemRepo.update("does-not-exist", { ...existingItem })
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