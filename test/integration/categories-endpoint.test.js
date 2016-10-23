import { expect } from "chai"
import { app } from "../../src/server/server"
import supertest from "supertest"

suite("API: /api/categories")

test("Should get all categories aggregated", function (done) {
    supertest(app)
        .get("/api/categories")
        .expect(200)
        .expect(res => {
            res = res.body

            expect(res).to.be.an("array")
            expect(res.length).to.be.above(0)
            expect(res[0].name).to.be.ok
            expect(res[0].popularity).to.be.a("number")
        })
        .end(done)
})
