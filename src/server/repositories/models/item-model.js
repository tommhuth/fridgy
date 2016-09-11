"use strict"

import mongoose from "mongoose"
import timestamps from "mongoose-timestamp"
import slugger from "mongoose-slug-generator"
import uniqueValidator from "mongoose-unique-validator"
import hidden from "mongoose-hidden"  
import {InvalidTitleError} from "../../errors/invalid-title-error"  

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
            trim: true 
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
        slug: { 
            type: String, 
            slug: "title", 
            unique: true,
            slug_padding_size: 1
        } 
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
ItemSchema.plugin(slugger) 

ItemSchema.index(
    { 
        "title":"text", 
        "category": "text"
    }, 
    { 
        name: "index1", 
        weights:{
            title: 3,
            category: 1
        } 
    }
)

ItemSchema.pre("save", function (next) {  
    if(!/^[a-z]+/.test(this.slug)){
        next(new InvalidTitleError(this.title))
    }
    next()
})

export default mongoose.model("item", ItemSchema)
