"use strict"

import { NotFoundError } from "../errors/not-found-error"

export default function (response) {
    if ((Array.isArray(response) && !response.length) || !response || ( response && response.result && response.result.n === 0 )) {
        throw new NotFoundError()
    }

    return response
}
