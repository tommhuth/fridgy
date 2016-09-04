"use strict"

import mongoose from "mongoose"
import timestamps from "mongoose-timestamp"
import slugger from "mongoose-url-slugs"
import uniqueValidator from "mongoose-unique-validator"
import hidden from "mongoose-hidden" 

let Schema = mongoose.Schema

let ItemSchema = new Schema(
    {
        _id: {
            type: String,
            default: mongoose.Types.ObjectId
        },
        __v: {
            type: Number,
            default: 0
        },
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
        },
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
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

ItemSchema.virtual("version").get(function () { return this.__v })
ItemSchema.virtual("id").get(function () { return this._id })

ItemSchema.plugin(timestamps)
ItemSchema.plugin(hidden())
ItemSchema.plugin(uniqueValidator, { message: "Attribute must be unique" })
ItemSchema.plugin(slugger("title"))

export default mongoose.model("Item", ItemSchema)
