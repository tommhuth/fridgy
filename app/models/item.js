var mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');
var slugger = require('mongoose-url-slugs');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: String,
    category: String,
    amount: Number,
    listed: Boolean,
    slug: String,
    favorite: Boolean
});

ItemSchema.plugin(timestamps);
ItemSchema.plugin(slugger("title"));


module.exports = mongoose.model("Item", ItemSchema);
