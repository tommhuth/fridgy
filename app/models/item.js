"use strict";

import mongoose from "mongoose";
import timestamps from 'mongoose-timestamp';
import slugger from 'mongoose-url-slugs';
import uniqueValidator from 'mongoose-unique-validator';

let Schema = mongoose.Schema;

let ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        default: "",
        trim: true
    } ,
    amount: {
        type: Number,
        required: true
    },
    listed: {
        type: Boolean,
        default: false
    },
    favorite: {
        type: Boolean,
        default: false
    },
    slug: String
}, { versionKey: false });

ItemSchema.plugin(timestamps);
ItemSchema.plugin(uniqueValidator, {message: 'Attribute must be unique'});
ItemSchema.plugin(slugger("title"));


export default mongoose.model("Item", ItemSchema);
