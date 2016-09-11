export class MongoError extends Error {
    constructor(message, mongoErrorCode) {
        super(message)

        this.message = message
        this.status = 500
        this.mongoErrorCode = mongoErrorCode
    }
}