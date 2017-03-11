export class DuplicateSlugError extends Error {
    constructor() {
        super() 
 
        this.message = "You have reached the maximum number of items with that title"
        this.status = 422
    }
}