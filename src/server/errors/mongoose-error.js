export class MongooseError extends Error {
    constructor(message) {
        super(message) 

        this.message = message
        this.status = 500 
    }
}