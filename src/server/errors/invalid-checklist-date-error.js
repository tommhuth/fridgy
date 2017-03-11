export class InvalidChecklistDateError extends Error {
    constructor() {
        super() 
 
        this.message = "Invalid checklist date, should be on the format YYYY-MM-DD"
        this.status = 422
    }
}