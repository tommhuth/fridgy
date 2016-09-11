export class InvalidTitleError extends Error {
    constructor(title) {
        super() 

        this.title = title
        this.message =  `Specified title cannot be sluggified (slug must contain a-z chars): '${title}'`
        this.status = 422
    }
}