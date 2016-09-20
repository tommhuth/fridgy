import { expect } from "chai"
import { app } from "../../src/server/server"
import supertest from "supertest"

suite("API - /api/tags")

test("Should get all tags aggregated", function (done) {
    supertest(app)
        .get("/api/tags")
        .expect(200)
        .expect(res => {
            res = res.body

            expect(res).to.be.an("array")
            expect(res.length).to.be.above(0)
            expect(res[0]).to.be.a("string") 
        })
        .end(done)
})
