export class ValidationError extends Error {
    constructor(errors) {
        super();
        let prettyErrors = [];

        for (let key in errors) {
            let error = {
                [key]: errors[key].message
            };

            prettyErrors.push(error)
        }

        this.message = "Validation error";
        this.status = 422;
        this.errors = prettyErrors;
    }
}