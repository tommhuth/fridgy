"use strict";

var mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');
var slugger = require('mongoose-url-slugs');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Attribute is required'],
        trim: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'Attribute is required']
    },
    amount: {
        type: Number,
        required: [true, 'Attribute is required']
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

});

ItemSchema.plugin(timestamps);
ItemSchema.plugin(uniqueValidator, {message: 'Attribute must be unique'});
ItemSchema.plugin(slugger("title"));


module.exports = mongoose.model("Item", ItemSchema);
