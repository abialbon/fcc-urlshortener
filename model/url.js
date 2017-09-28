const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
   number: Number,
   url: String
});

const Url = mongoose.model('url', urlSchema);

module.exports = Url;