/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

import mongoose from "mongoose";
import seeder  from "./items-seeder";
import q from 'q';

mongoose.Promise = q.Promise;

export function connect(){
    mongoose.connect("mongodb://localhost:27017/fridgy");
    mongoose.connection.on("error", console.log);
}

export function seed() {
    seeder();
}
