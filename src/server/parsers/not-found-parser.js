"use strict";

import { NotFoundError } from "../errors/not-found-error"

export default function (data) {
    if ((Array.isArray(data) && !data.length) || !data) {
        throw new NotFoundError();
    }

    return data;
}
