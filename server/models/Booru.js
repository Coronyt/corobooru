const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = require("./schemas/Image");

const booru_schema = new Schema({
    owner: {
        type: String,
        required: true
    },
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
}, { collection: "_boorus" });

module.exports = mongoose.model("Booru", booru_schema);