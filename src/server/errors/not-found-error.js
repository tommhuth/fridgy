export class NotFoundError extends Error {
    constructor() {
        super();
        this.status = 404;
    }
}