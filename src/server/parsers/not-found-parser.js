"use strict"

import { NotFoundError } from "../errors/not-found-error"

export default function (data) {
    if ((Array.isArray(data) && !data.length) || !data || ( data && data.result && data.result.n === 0 )) {
        throw new NotFoundError()
    }

    return data
}
