const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = require("./Image");

const booru_schema = new Schema({
    imgs: {
        type: Array,
        of: Image,
        default: []
    },
    tags: {
        type: Map,
        of: Image, // TODO - Eventually each tag will map to an array of Images
        default: {}
    },
});

module.exports = booru_schema;